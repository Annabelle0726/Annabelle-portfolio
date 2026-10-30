import React, { useEffect, useRef, useState } from 'react';
import './back-to-top.css';

// Viewport-height multiplier: 0.5 shows the button after half a screen; 1 waits for a full screen.
const SHOW_AFTER = 0.5;

export default function BackToTop({ language, routeId, menuOpen }) {
  const sentinel = useRef(null);
  const [pastThreshold, setPastThreshold] = useState(false);
  useEffect(() => {
    setPastThreshold(false);
    const observer = new IntersectionObserver(([entry]) => setPastThreshold(!entry.isIntersecting), { root: null, threshold: 0 });
    observer.observe(sentinel.current);
    return () => observer.disconnect();
  }, [routeId]);

  const visible = pastThreshold && !menuOpen;
  const scrollToTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('main')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };
  return <>
    <div ref={sentinel} className="back-top-sentinel" style={{ '--show-after': SHOW_AFTER }} aria-hidden="true" />
    <button type="button" className={`back-top${visible ? ' is-visible' : ''}`} aria-label={language === 'zh' ? '回到顶部' : 'Back to top'} aria-hidden={!visible} tabIndex={visible ? 0 : -1} onClick={scrollToTop}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
  </>;
}
