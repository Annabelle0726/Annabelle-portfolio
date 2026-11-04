import React, { useEffect, useRef } from 'react';

export default function SidebarPortrait({ language, onNavigate }) {
  const link = useRef(null);
  const pendingFrame = useRef(null);

  const reset = () => {
    window.cancelAnimationFrame(pendingFrame.current);
    pendingFrame.current = null;
    link.current?.style.removeProperty('--portrait-x');
    link.current?.style.removeProperty('--portrait-y');
  };

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    motion.addEventListener('change', reset);
    return () => {
      motion.removeEventListener('change', reset);
      window.cancelAnimationFrame(pendingFrame.current);
    };
  }, []);

  const followPointer = event => {
    if (event.pointerType !== 'mouse' ||
      !window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    window.cancelAnimationFrame(pendingFrame.current);
    pendingFrame.current = window.requestAnimationFrame(() => {
      link.current?.style.setProperty('--portrait-x', x.toFixed(3));
      link.current?.style.setProperty('--portrait-y', y.toFixed(3));
      pendingFrame.current = null;
    });
  };

  return <a ref={link} className="sidebar-portrait-link" href="#about"
    aria-label={language === 'zh' ? '认识 Annabelle Zhu，关于我' : 'Meet Annabelle Zhu, about me'}
    onClick={event => { reset(); onNavigate(event); }}
    onPointerMove={followPointer} onPointerLeave={reset} onPointerCancel={reset} onBlur={reset}>
    <span className="sidebar-portrait-frame">
      <span className="sidebar-portrait-window">
        <img className="sidebar-portrait" src="assets/img/头像.png" width="64" height="80"
          alt="" fetchPriority="high" />
      </span>
    </span>
    <span className="sidebar-portrait-hint" aria-hidden="true">{language === 'zh' ? '认识我 ↗' : 'Meet me ↗'}</span>
  </a>;
}
