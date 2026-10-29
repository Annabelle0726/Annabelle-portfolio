import React, { useEffect, useRef } from 'react';

export default function AboutArtwork() {
  const ref = useRef(null);

  useEffect(() => {
    const layer = ref.current;
    const area = layer.closest('.about-opening');
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let frame = 0, previous = 0, visible = true;
    let x = 0, y = 0, targetX = 0, targetY = 0;
    let returning = false;
    const paint = () => { layer.style.transform = `translate3d(${x.toFixed(3)}px, ${y.toFixed(3)}px, 0)`; };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = previous = 0;
      x = y = targetX = targetY = 0;
      layer.style.removeProperty('transform');
    };
    const animate = time => {
      frame = 0;
      if (!media.matches || !visible || document.hidden) { stop(); return; }
      const elapsed = previous ? Math.min(time - previous, 48) : 16;
      previous = time;
      // Time-based damping gives the same gentle response on 60Hz and 120Hz screens.
      const blend = 1 - Math.exp(-elapsed / (returning ? 460 : 320));
      x += (targetX - x) * blend;
      y += (targetY - y) * blend;
      if (Math.abs(targetX - x) < .02 && Math.abs(targetY - y) < .02) {
        x = targetX; y = targetY; previous = 0; paint(); return;
      }
      paint();
      frame = requestAnimationFrame(animate);
    };
    const start = () => { if (!frame) frame = requestAnimationFrame(animate); };
    const follow = event => {
      if (event.pointerType !== 'mouse' || !media.matches || !visible || document.hidden) return;
      const bounds = area.getBoundingClientRect();
      const normalize = value => Math.max(-1, Math.min(1, value));
      targetX = normalize((event.clientX - bounds.left) / bounds.width * 2 - 1) * 12;
      targetY = normalize((event.clientY - bounds.top) / bounds.height * 2 - 1) * 8;
      returning = false;
      start();
    };
    const release = () => {
      targetX = targetY = 0;
      returning = true;
      if (media.matches && visible && !document.hidden) start();
      else stop();
    };
    const onVisibility = () => { if (document.hidden) stop(); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) stop();
    });
    observer.observe(area);
    area.addEventListener('pointermove', follow, { passive: true });
    area.addEventListener('pointerleave', release);
    window.addEventListener('blur', release);
    window.addEventListener('scroll', release, { passive: true });
    media.addEventListener('change', stop);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop(); observer.disconnect();
      area.removeEventListener('pointermove', follow);
      area.removeEventListener('pointerleave', release);
      window.removeEventListener('blur', release);
      window.removeEventListener('scroll', release);
      media.removeEventListener('change', stop);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <div ref={ref} className="about-artwork" aria-hidden="true">
    <div className="about-portrait-ribbon" />
    <svg className="about-portrait-lines" viewBox="0 0 440 560" fill="none"><path d="M420 12C280 16 515 210 372 367S38 472 20 546M374 4C280 152 482 316 226 515" /></svg>
  </div>;
}
