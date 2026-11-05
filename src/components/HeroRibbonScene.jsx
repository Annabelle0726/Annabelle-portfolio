import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import desktopGauze from '../assets/hero-intro/gauze-desktop.webp';
import mobileGauze from '../assets/hero-intro/gauze-mobile.webp';
import desktopSatin from '../assets/hero-intro/satin-desktop.webp';
import mobileSatin from '../assets/hero-intro/satin-mobile.webp';
import pearlArtwork from '../assets/hero-intro/pearl.webp';

const ARRIVAL_KEY = 'annabelle-hero-arrival-v3';

function initialPhase() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'settled';
  try {
    return sessionStorage.getItem(ARRIVAL_KEY) ? 'settled' : 'pending';
  } catch {
    return 'settled';
  }
}

export default function HeroRibbonScene() {
  const [phase, setPhase] = useState(initialPhase);
  const shouldPlay = useRef(phase === 'pending');
  const layerRef = useRef(null);
  const fabricRef = useRef(null);
  const satinRef = useRef(null);
  const pearlRef = useRef(null);
  const anchorRef = useRef(null);

  useLayoutEffect(() => {
    const layer = layerRef.current;
    const fabric = fabricRef.current;
    const anchor = anchorRef.current;
    const mobile = window.matchMedia('(max-width: 767px) and (orientation: portrait)');

    // Match the picture's cover crop, so the pearl stays beside the same fold.
    const placePearl = () => {
      const portrait = mobile.matches;
      const imageWidth = portrait ? 1024 : 1536;
      const imageHeight = portrait ? 1536 : 1024;
      const scale = Math.max(layer.clientWidth / imageWidth, layer.clientHeight / imageHeight);
      const width = imageWidth * scale;
      const height = imageHeight * scale;
      const size = width * (portrait ? 0.105 : 0.072);
      const x = layer.clientWidth - width + width * (portrait ? 0.88 : 0.91);
      const y = (layer.clientHeight - height) / 2 + height * (portrait ? 0.92 : 0.855);
      anchor.style.left = `${x}px`;
      anchor.style.top = `${y}px`;
      anchor.style.width = `${size}px`;
      anchor.style.setProperty('--pearl-travel-x', `${width * 0.065}px`);
      anchor.style.setProperty('--pearl-travel-y', `${height * -0.49}px`);
    };

    placePearl();
    const observer = new ResizeObserver(placePearl);
    observer.observe(layer);
    fabric.addEventListener('load', placePearl);
    mobile.addEventListener('change', placePearl);
    return () => {
      observer.disconnect();
      fabric.removeEventListener('load', placePearl);
      mobile.removeEventListener('change', placePearl);
    };
  }, []);

  useEffect(() => {
    if (!shouldPlay.current) return;
    let disposed = false;
    let finished = false;
    let finishTimer;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const remember = () => {
      try { sessionStorage.setItem(ARRIVAL_KEY, '1'); } catch { /* Keep the page usable without storage. */ }
    };
    const settle = () => {
      if (disposed || finished) return;
      finished = true;
      clearTimeout(finishTimer);
      remember();
      setPhase('settled');
      detach();
    };
    const skipKey = event => {
      if (['Escape', 'Enter', ' ', 'Tab'].includes(event.key)) settle();
    };
    const reduceMotion = () => { if (motion.matches) settle(); };
    const animationEnd = event => {
      if (event.animationName === 'hero-pearl-arrive') settle();
    };
    const detach = () => {
      document.removeEventListener('pointerdown', settle);
      document.removeEventListener('keydown', skipKey);
      motion.removeEventListener('change', reduceMotion);
      pearlRef.current?.removeEventListener('animationend', animationEnd);
    };

    document.addEventListener('pointerdown', settle, { passive: true });
    document.addEventListener('keydown', skipKey);
    motion.addEventListener('change', reduceMotion);
    const pearl = pearlRef.current;
    pearl.addEventListener('animationend', animationEnd);

    // Decode the fabrics and pearl before playback; content and navigation are already visible.
    finishTimer = window.setTimeout(settle, 3000);
    Promise.all([fabricRef.current.decode(), satinRef.current.decode(), pearl.decode()]).then(() => {
      if (disposed || finished) return;
      if (motion.matches) { settle(); return; }
      remember();
      clearTimeout(finishTimer);
      setPhase('playing');
      finishTimer = window.setTimeout(settle, 2600);
    }).catch(settle);

    return () => {
      disposed = true;
      clearTimeout(finishTimer);
      detach();
    };
  }, []);

  return <div className="hero-ribbon-scene" data-phase={phase} aria-hidden="true">
    <div className="hero-art-layer" ref={layerRef}>
      <picture className="hero-art-fabric hero-art-gauze">
        <source media="(max-width: 767px) and (orientation: portrait)" srcSet={mobileGauze} width="1024" height="1536" />
        <img ref={fabricRef} src={desktopGauze} width="1536" height="1024" alt="" fetchPriority="high" />
      </picture>
      <picture className="hero-art-fabric hero-art-satin">
        <source media="(max-width: 767px) and (orientation: portrait)" srcSet={mobileSatin} width="1024" height="1536" />
        <img ref={satinRef} src={desktopSatin} width="1536" height="1024" alt="" fetchPriority="high" />
      </picture>
      <div className="hero-pearl-anchor" ref={anchorRef}>
        <span className="hero-pearl-shadow" />
        <img ref={pearlRef} className="hero-pearl" src={pearlArtwork} width="384" height="384" alt="" fetchPriority="high" />
      </div>
    </div>
  </div>;
}
