import React from 'react';
import './hero.css';
import RibbonArt from '../components/RibbonArt';

export default function Hero({ language, onNavigate }) {
  const zh = language === 'zh';

  return <section id="hero" lang={zh ? 'zh-CN' : 'en'}>
    <div className="hero-art-window" aria-hidden="true"><div className="hero-art" /><RibbonArt /></div>
    <div className="hero-container">
      <h1><span>{zh ? '我是' : 'I’m'}</span> Annabelle Zhu</h1>
      <p className="hero-fields">{zh ? '软件开发 · 产品设计 · 数据科学' : 'Software Development · Product Design · Data Science'}</p>
      <p className="hero-description">{zh ? <>记录学习与创作中的想法，<br />这里有我的作品、文字，<br />以及一些想与你分享的发现。</> : 'A space for ideas from learning and creating, with my work, writing, and discoveries I’d love to share with you.'}</p>
      <a className="hero-about" href="#about" onClick={onNavigate}>
        <span>{zh ? '关于我' : 'About me'}</span>
        <svg viewBox="0 0 76 52" fill="none" aria-hidden="true">
          <circle className="hero-arrow-orbit" cx="49" cy="26" r="23" pathLength="100" />
          <g className="hero-arrow-shaft"><path d="M5 26H56M48 18l8 8-8 8" /></g>
        </svg>
      </a>
    </div>
  </section>;
}
