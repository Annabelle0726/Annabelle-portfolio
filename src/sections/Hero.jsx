import React from 'react';
import './hero.css';
import HeroRibbonScene from '../components/HeroRibbonScene';
import { HeroPortrait, HeroProjectAction, HeroSocials, HeroArrow } from '../components/HeroMobile';
import './hero-mobile.css';
import './hero-intro.css';

function HeroCopy({ language, onNavigate }) {
  const zh = language === 'zh';
  const lines = zh ? ['我是 Annabelle Zhu', '软件开发 · 产品设计 · 数据科学', '记录学习与创作中的想法，', '这里有我的作品、文字，', '以及一些想与你分享的发现。'] : ['I’m Annabelle Zhu', 'Software Development · Product Design · Data Science', 'A space for ideas from learning and creating, with my work, writing, and discoveries I’d love to share with you.'];
  return <div className="hero-container">
      <HeroPortrait />
      <h1>{lines[0]}</h1>
      <p className="hero-fields">{lines[1]}</p>
      <p className="hero-description" aria-label={lines.slice(2).join('')}>{lines.slice(2).map((line, index) => <React.Fragment key={line}>{index > 0 && <br />}{line}</React.Fragment>)}</p>
      <div className="hero-entry-links">
      <a className="hero-about" href="#about" onClick={onNavigate}>
        <span>{zh ? '关于我' : 'About me'}</span>
        <HeroArrow />
      </a>
      <HeroProjectAction language={language} onNavigate={onNavigate} ready />
      </div>
    </div>
  ;
}

export default function Hero({ language, onNavigate }) {
  return <section id="hero" className="hero-opened" lang={language === 'zh' ? 'zh-CN' : 'en'}>
    <HeroRibbonScene />
    <HeroCopy key={language} language={language} onNavigate={onNavigate} />
    <HeroSocials language={language} />
  </section>;
}
