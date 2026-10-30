import React, { useEffect, useRef } from 'react';

export default function AboutArtwork() {
  const ref = useRef(null);

  useEffect(() => {
    const layer = ref.current.querySelector('.about-artwork-motion');
    const area = ref.current.closest('.about-opening');
    const section = area.closest('#about');
    const portrait = ref.current.closest('.about-portrait');
    const main = section.closest('main');
    const alignToPage = () => {
      const offset = main.getBoundingClientRect().top - portrait.getBoundingClientRect().top;
      ref.current.style.setProperty('--about-artwork-top', `${offset.toFixed(2)}px`);
    };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compact = window.matchMedia('(max-width: 767px)');
    let frame = 0, previous = 0, visible = true;
    let y = 0, target = 0;
    const paint = () => { layer.style.transform = `translate3d(0, ${y.toFixed(3)}px, 0)`; };
    const cancel = () => { cancelAnimationFrame(frame); frame = previous = 0; };
    const reset = () => {
      cancel(); y = target = 0; layer.style.removeProperty('transform');
    };
    const animate = time => {
      frame = 0;
      if (reduced.matches || document.hidden || !visible) { cancel(); return; }
      const elapsed = previous ? Math.min(time - previous, 48) : 16;
      previous = time;
      // A slight delay softens wheel/touch scrolling without spring or overshoot.
      y += (target - y) * (1 - Math.exp(-elapsed / 240));
      if (Math.abs(target - y) < .02) {
        y = target; previous = 0; paint(); return;
      }
      paint(); frame = requestAnimationFrame(animate);
    };
    const update = () => {
      if (reduced.matches) { reset(); return; }
      if (document.hidden || !visible) return;
      // Counter a small portion of the page's upward travel: art scrolls more slowly.
      target = Math.max(0, Math.min(compact.matches ? 18 : 40, -section.getBoundingClientRect().top * .12));
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const onVisibility = () => { if (document.hidden) cancel(); else update(); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) update(); else cancel();
    });
    observer.observe(area);
    const resize = new ResizeObserver(alignToPage);
    resize.observe(area);
    resize.observe(portrait);
    portrait.addEventListener('animationend', alignToPage);
    alignToPage();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    reduced.addEventListener('change', update);
    compact.addEventListener('change', update);
    document.addEventListener('visibilitychange', onVisibility);
    update();
    return () => {
      reset(); observer.disconnect(); resize.disconnect();
      portrait.removeEventListener('animationend', alignToPage);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      reduced.removeEventListener('change', update);
      compact.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <div ref={ref} className="about-artwork" aria-hidden="true">
    <div className="about-artwork-motion"><div className="about-portrait-ribbon" />
    <svg className="about-portrait-lines" viewBox="0 0 440 560" fill="none"><path d="M420 12C280 16 515 210 372 367S38 472 20 546M374 4C280 152 482 316 226 515" /></svg>
    </div>
  </div>;
}
