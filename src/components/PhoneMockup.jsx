import React, { useEffect, useRef } from 'react';
import './phone-mockup.css';

export function PhoneStage({ children, className = '' }) {
  const root = useRef(null);
  useEffect(() => {
    const stage = root.current;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 768px)');
    const animations = new Set();
    let visible = false;
    const reset = () => { stage.style.setProperty('--mx', 0); stage.style.setProperty('--my', 0); stage.classList.remove('is-pointing'); };
    const sync = () => {
      stage.classList.toggle('is-floating', visible && !reduced.matches && pointer.matches);
      if (reduced.matches || !pointer.matches) { reset(); animations.forEach(a => a.cancel()); }
    };
    const observer = typeof IntersectionObserver === 'function' ? new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      sync();
      if (!visible || stage.dataset.entered) return;
      stage.dataset.entered = 'true';
      if (reduced.matches) return;
      stage.querySelectorAll('.phone-entry').forEach((el, i) => {
        el.style.willChange = 'transform, opacity';
        const a = el.animate([{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 600, delay: i * 120, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'backwards' });
        animations.add(a);
        a.finished.catch(() => {}).finally(() => { animations.delete(a); el.style.willChange = ''; });
      });
    }, { threshold: .1 }) : null;
    observer?.observe(stage);
    const move = e => {
      if (reduced.matches || !pointer.matches) return;
      const r = stage.getBoundingClientRect();
      stage.classList.add('is-pointing');
      stage.style.setProperty('--mx', Math.max(-1, Math.min(1, (e.clientX-r.left)/r.width*2-1)));
      stage.style.setProperty('--my', Math.max(-1, Math.min(1, (e.clientY-r.top)/r.height*2-1)));
    };
    stage.addEventListener('pointermove', move);
    stage.addEventListener('pointerleave', reset);
    reduced.addEventListener('change', sync);
    pointer.addEventListener('change', sync);
    return () => { observer?.disconnect(); animations.forEach(a => a.cancel()); stage.removeEventListener('pointermove', move); stage.removeEventListener('pointerleave', reset); reduced.removeEventListener('change', sync); pointer.removeEventListener('change', sync); };
  }, []);
  return <div ref={root} className={`phone-stage stage ${className}`}>{children}</div>;
}

export default function PhoneMockup({ src, alt, variant = 'front', caption, tone = 'light', href, onClick }) {
  const Tag = href ? 'a' : onClick ? 'button' : 'div';
  return <div className={`phone-position phone-${variant}`}>
    <div className="phone-entry"><div className="phone-float">
      <Tag className={`phone-device device phone-tone-${tone}`} href={href} onClick={onClick} type={Tag === 'button' ? 'button' : undefined}>
        <div className="bezel"><div className="screen">
          <div className="phone-art"><img src={src} alt={alt} width="944" height="2048" loading="lazy" decoding="async" /></div>
          <div className="phone-status" aria-hidden="true"><span>9:41</span><svg viewBox="0 0 48 14"><path d="M1 11V9m4 2V6m4 5V3m4 8V0"/><path d="M19 4q6-5 12 0m-10 3q4-3 8 0m-6 3h4"/><rect x="35" y="3" width="10" height="8" rx="2"/><path d="M47 5v4"/></svg></div>
          <span className="island" aria-hidden="true"/><span className="glare" aria-hidden="true"/>
        </div></div>
      </Tag>
      {caption && <div className="phone-caption">{caption}</div>}
    </div></div>
  </div>;
}
