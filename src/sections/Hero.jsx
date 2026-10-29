import React, { useEffect, useState } from 'react';
import './hero.css';
import RibbonArt from '../components/RibbonArt';

function HeroCopy({ language, onNavigate }) {
  const zh = language === 'zh';
  const lines = zh ? ['我是 Annabelle Zhu', '软件开发 · 产品设计 · 数据科学', '记录学习与创作中的想法，', '这里有我的作品、文字，', '以及一些想与你分享的发现。'] : ['I’m Annabelle Zhu', 'Software Development · Product Design · Data Science', 'A space for ideas from learning and creating, with my work, writing, and discoveries I’d love to share with you.'];
  const [typing, setTyping] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const interval = zh ? 95 : 55;
  const linePause = 420;
  const duration = lines.join('').length * interval + (lines.length - 1) * linePause;
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finish = () => { if (media.matches) setTyping(false); };
    const timer = window.setTimeout(() => setTyping(false), duration);
    media.addEventListener('change', finish);
    return () => { window.clearTimeout(timer); media.removeEventListener('change', finish); };
  }, [duration]);
  let position = 0;
  const typeLine = (line, index) => Array.from(line).map((character, characterIndex) => {
    const delay = position++ * interval + index * linePause;
    return <span key={characterIndex} className="typed-character" style={{ '--type-delay': `${delay}ms` }} aria-hidden="true">{character}</span>;
  });

  return <div className={`hero-container${typing ? ' is-typing' : ' typing-complete'}`}>
      <h1 aria-label={lines[0]}>{typeLine(lines[0], 0)}</h1>
      <p className="hero-fields" aria-label={lines[1]}>{typeLine(lines[1], 1)}</p>
      <p className="hero-description" aria-label={lines.slice(2).join('')}>{lines.slice(2).map((line, index) => <React.Fragment key={line}>{index > 0 && <br />}{typeLine(line, index + 2)}</React.Fragment>)}</p>
      <a className="hero-about" href="#about" onClick={onNavigate} tabIndex={typing ? -1 : undefined} aria-hidden={typing || undefined}>
        <span>{zh ? '关于我' : 'About me'}</span>
        <svg viewBox="0 0 76 52" fill="none" aria-hidden="true">
          <circle className="hero-arrow-orbit" cx="49" cy="26" r="23" pathLength="100" />
          <g className="hero-arrow-shaft"><path d="M5 26H56M48 18l8 8-8 8" /></g>
        </svg>
      </a>
    </div>
  ;
}

export default function Hero({ language, onNavigate }) {
  return <section id="hero" lang={language === 'zh' ? 'zh-CN' : 'en'}>
    <div className="hero-art-window" aria-hidden="true"><div className="hero-art" /><RibbonArt /></div>
    <HeroCopy key={language} language={language} onNavigate={onNavigate} />
  </section>;
}
