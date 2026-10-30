import React, { useEffect, useState } from 'react';
import './hero.css';
import RibbonArt from '../components/RibbonArt';
import { HeroPortrait, HeroMobileActions, HeroSocials, HeroArrow } from '../components/HeroMobile';
import './hero-mobile.css';

function HeroCopy({ language, onNavigate }) {
  const zh = language === 'zh';
  const lines = zh ? ['我是 Annabelle Zhu', '软件开发 · 产品设计 · 数据科学', '记录学习与创作中的想法，', '这里有我的作品、文字，', '以及一些想与你分享的发现。'] : ['I’m Annabelle Zhu', 'Software Development · Product Design · Data Science', 'A space for ideas from learning and creating, with my work, writing, and discoveries I’d love to share with you.'];
  const [shown, setShown] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches ? Infinity : 0);
  const interval = zh ? 95 : 55;
  const total = lines.join('').length;
  const typing = shown < total;
  const [aboutReady, setAboutReady] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reveal = () => { if (!typing && media.matches) setAboutReady(true); };
    reveal();
    media.addEventListener('change', reveal);
    return () => media.removeEventListener('change', reveal);
  }, [typing]);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    let count = 0;
    let boundary = 0;
    const boundaries = lines.slice(0, -1).map(line => (boundary += line.length));
    const advance = () => {
      count += 1;
      setShown(count);
      if (count < total) timer = window.setTimeout(advance, interval + (boundaries.includes(count) ? 420 : 0));
    };
    const finish = () => {
      if (media.matches) { window.clearTimeout(timer); setShown(Infinity); }
    };
    if (!media.matches) timer = window.setTimeout(advance, interval);
    media.addEventListener('change', finish);
    return () => { window.clearTimeout(timer); media.removeEventListener('change', finish); };
  }, [language, interval, total]);
  let position = 0;
  const typeLine = line => Array.from(line).map((character, characterIndex) => {
    const visible = position++ < shown;
    return <span key={characterIndex} className="typed-character" style={{ visibility: visible ? 'visible' : 'hidden' }} aria-hidden="true">{character}</span>;
  });

  return <div className={`hero-container${typing ? ' is-typing' : ' typing-complete'}`}>
      <HeroPortrait />
      <h1 aria-label={lines[0]}>{typeLine(lines[0], 0)}</h1>
      <p className="hero-fields" aria-label={lines[1]}>{typeLine(lines[1], 1)}</p>
      <p className="hero-description" aria-label={lines.slice(2).join('')}>{lines.slice(2).map((line, index) => <React.Fragment key={line}>{index > 0 && <br />}{typeLine(line, index + 2)}</React.Fragment>)}</p>
      <div className="hero-entry-links">
      <a className="hero-about" onAnimationEnd={event => { if (event.target === event.currentTarget && event.animationName === 'hero-about-arrive') setAboutReady(true); }} href="#about" onClick={onNavigate} tabIndex={typing ? -1 : undefined} aria-hidden={typing || undefined}>
        <span>{zh ? '关于我' : 'About me'}</span>
        <HeroArrow />
      </a>
      <HeroMobileActions language={language} onNavigate={onNavigate} ready={aboutReady} />
      </div>
    </div>
  ;
}

export default function Hero({ language, onNavigate }) {
  return <section id="hero" lang={language === 'zh' ? 'zh-CN' : 'en'}>
    <div className="hero-art-window" aria-hidden="true"><div className="hero-art" /><RibbonArt /></div>
    <span className="hero-mobile-orb" aria-hidden="true" />
    <HeroCopy key={language} language={language} onNavigate={onNavigate} />
    <HeroSocials language={language} />
  </section>;
}
