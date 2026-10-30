import React, { useEffect, useId, useRef } from 'react';
import ribbonMaterial from '../assets/hero-art.png';
import './bloom-ribbon.css';

export default function BloomRibbon() {
  const root = useRef(null);
  const id = useId();
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 200" preserveAspectRatio="none" className="bloom-ribbon-svg" aria-hidden="true" focusable="false">
<defs>
 {/* Borrow the homepage artwork's material, clipped to the existing ribbon silhouette. */}
 <pattern id={`${id}-material`} width="1000" height="200" patternUnits="userSpaceOnUse">
  <image href={ribbonMaterial} x="0" y="0" width="1000" height="200" preserveAspectRatio="xMidYMid slice"/>
 </pattern>
 <filter id={`${id}-foil`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency=".12 .3" numOctaves="2" seed="4" result="grain"/>
  <feDiffuseLighting in="grain" surfaceScale=".7" diffuseConstant="1.05" lightingColor="#fff0c9" result="relief">
   <feDistantLight azimuth="210" elevation="55"/>
  </feDiffuseLighting>
  <feBlend in="SourceGraphic" in2="relief" mode="soft-light" result="metal"/>
  <feComposite in="metal" in2="SourceGraphic" operator="in"/>
 </filter>

 <linearGradient id={`${id}-blue`} x1=".12" y1=".15" x2=".8" y2=".95" gradientUnits="objectBoundingBox">
  <stop stopColor="#0879ad"/><stop offset=".32" stopColor="#36c9db"/><stop offset=".58" stopColor="#139fc4"/><stop offset=".84" stopColor="#075d99"/><stop offset="1" stopColor="#159db9"/>
 </linearGradient>
 <linearGradient id={`${id}-pearl`} x1="0" y1="0" x2=".8" y2="1">
  <stop stopColor="#eafcfa" stopOpacity=".9"/><stop offset=".3" stopColor="#76dce3" stopOpacity=".72"/><stop offset=".56" stopColor="#1da7c7" stopOpacity=".64"/><stop offset=".78" stopColor="#086b9e" stopOpacity=".5"/><stop offset="1" stopColor="#c4f5ef" stopOpacity=".78"/>
 </linearGradient>
 <linearGradient id={`${id}-rear`} x1="0" y1="0" x2=".8" y2="1">
  <stop stopColor="#006893" stopOpacity=".2"/><stop offset=".45" stopColor="#08aac6" stopOpacity=".62"/><stop offset=".7" stopColor="#b0eeeb" stopOpacity=".7"/><stop offset="1" stopColor="#008ea9" stopOpacity=".4"/>
 </linearGradient>
 <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2=".4">
  <stop stopColor="#b57a18" stopOpacity=".2"/><stop offset=".2" stopColor="#dba52d"/><stop offset=".38" stopColor="#ffdf85"/><stop offset=".5" stopColor="#f8e9b6"/><stop offset=".65" stopColor="#ad7417"/><stop offset=".83" stopColor="#e8ba4e"/><stop offset="1" stopColor="#ce982b" stopOpacity=".2"/>
 </linearGradient>
 <linearGradient id={`${id}-fade`}><stop stopColor="white" stopOpacity="0"/><stop offset=".055" stopColor="white"/><stop offset=".945" stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0"/></linearGradient>
 <mask id={`${id}-ends`} maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="200" style={{ maskType: 'alpha' }}><rect width="1000" height="200" fill={`url(#${id}-fade)`}/></mask>
 <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2=".25" y2="1">
  <stop stopColor="#eafbfa" stopOpacity=".5"/><stop offset=".48" stopColor="#d9f7f5" stopOpacity=".08"/><stop offset="1" stopColor="#00558b" stopOpacity=".12"/>
 </linearGradient>
 <path id={`${id}-main`} d="M-16 127 C105 133 157 113 254 72 C342 36 407 15 492 22 C590 30 637 132 736 143 C834 155 917 80 1016 42 L1016 47 C921 92 839 185 735 182 C626 181 574 185 482 137 C381 87 331 54 254 80 C159 118 104 137 -16 129Z"/>
</defs>
<g mask={`url(#${id}-ends)`}>
 <g className="bloom-ribbon-layer bloom-ribbon-rear">
  <path d="M-18 138 C120 128 178 54 292 42 C442 23 489 149 657 153 C803 157 881 82 1018 71 L1018 75 C888 93 817 185 661 178 C489 171 436 65 295 63 C179 63 117 139 -18 140Z" fill={`url(#${id}-rear)`}/>
  <path d="M0 138 C120 128 178 54 292 42 C442 23 489 149 657 153 C803 157 881 82 1000 73" fill="none" stroke={`url(#${id}-gold)`} strokeWidth=".7"/>
 </g>
 <g className="bloom-ribbon-layer bloom-ribbon-main">
  <path d="M-16 127 C105 133 157 113 254 72 C342 36 407 15 492 22 C590 30 637 132 736 143 C834 155 917 80 1016 42 L1016 47 C921 92 839 185 735 182 C626 181 574 185 482 137 C381 87 331 54 254 80 C159 118 104 137 -16 129Z" fill={`url(#${id}-blue)`} opacity=".98"/>
  <path d="M254 76 C365 52 427 95 482 137 C574 185 626 181 735 182 C648 163 590 126 531 84 C458 28 369 42 254 76Z" fill={`url(#${id}-pearl)`} opacity=".62"/>
  <use href={`#${id}-main`} fill={`url(#${id}-material)`} opacity=".38" style={{ mixBlendMode: 'soft-light' }}/>
  <use href={`#${id}-main`} fill={`url(#${id}-sheen)`}/>
  <path d="M-16 127 C105 133 157 113 254 72 C342 36 407 15 492 22 C590 30 637 132 736 143 C834 155 917 80 1016 42" fill="none" stroke={`url(#${id}-gold)`} strokeWidth=".85"/>
  <path d="M254 76 C365 52 427 95 482 137 C574 185 626 181 735 182" fill="none" stroke="#efffff" strokeOpacity=".24" strokeWidth=".65"/>
  <path d="M1016 47 C921 92 839 185 735 182 C626 181 574 185 482 137" fill="none" stroke={`url(#${id}-gold)`} strokeWidth=".8"/>
 </g>
 <g className="bloom-ribbon-layer bloom-ribbon-gold">
  <path d="M-12 150 C134 152 209 105 327 107 C471 110 536 60 657 54 C813 46 850 108 1012 94 L1012 96 C850 116 811 54 658 60 C536 66 470 115 327 110 C209 107 133 154 -12 151Z" fill={`url(#${id}-gold)`} opacity=".95" filter={`url(#${id}-foil)`}/>
 </g>
</g>
</svg>
  </div>;
}
