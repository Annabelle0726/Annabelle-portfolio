import React, { useEffect, useRef } from 'react';
import ProjectSilk from './ProjectSilk';
import './bloom-ribbon.css';

export default function BloomRibbon() {
  const root = useRef(null);
  useEffect(() => {
    const art = root.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = false;
    const update = () => {
      art.style.setProperty('--ribbon-play-state',
        inView && !document.hidden && !reduced.matches ? 'running' : 'paused');
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(art);
    reduced.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      reduced.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);
  return <div className="bloom-ribbon" ref={root} aria-hidden="true">
    <ProjectSilk className="bloom-ribbon-svg" />
  </div>;
}
