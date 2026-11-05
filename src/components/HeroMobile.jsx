import React, { useRef, useState } from 'react';
import { AccountDialog } from './Sidebar';
import brandMark from '../assets/brand-mark.svg';
import instagram from '../assets/sidebar-icons/instagram.svg';
import linkedin from '../assets/sidebar-icons/linkedin.svg';
import github from '../assets/sidebar-icons/github.svg';
import wechat from '../assets/sidebar-icons/wechat.svg';
import rednote from '../assets/sidebar-icons/xiaohongshu.svg';

export function MobileSignature({ onNavigate }) {
  return <a className="mobile-signature" href="#hero" onClick={onNavigate} aria-label="Annabelle Zhu"><img src={brandMark} alt="Annabelle Zhu" width="56" height="32" /></a>;
}
export function HeroPortrait() {
  return <div className="hero-mobile-portrait"><img src="assets/img/头像.png" width="64" height="72" alt="Annabelle Zhu" /></div>;
}
export function HeroArrow() {
  return <svg viewBox="0 0 76 52" fill="none" aria-hidden="true">
    <circle className="hero-arrow-orbit" cx="49" cy="26" r="23" pathLength="100" />
    <g className="hero-arrow-shaft"><path d="M5 26H56M48 18l8 8-8 8" /></g>
  </svg>;
}
export function HeroProjectAction({ language, onNavigate, ready }) {
  return <div className="hero-project-action"><a className="hero-about hero-projects" data-ready={ready} href="#portfolio" onClick={onNavigate} tabIndex={ready ? undefined : -1} aria-hidden={!ready || undefined}><span>{language === 'zh' ? '项目' : 'Projects'}</span><HeroArrow /></a></div>;
}
export function HeroSocials({ language }) {
  const [account, setAccount] = useState(null);
  const trigger = useRef(null);
  const open = (key, event) => { trigger.current = event.currentTarget; setAccount(key); };
  const close = () => { setAccount(null); requestAnimationFrame(() => trigger.current?.focus()); };
  return <div className="hero-mobile-socials" aria-label={language === 'zh' ? '社交账号' : 'Social profiles'}>
    <div className="sidebar-socials">
      {[[instagram, 'Instagram', 'https://www.instagram.com/0real_annabelle0/'], [github, 'GitHub', 'https://github.com/Annabelle0726'], [linkedin, 'LinkedIn', 'https://www.linkedin.com/in/huizhu0726/']].map(([icon, label, url]) => <a key={label} className="social-item" href={url} target="_blank" rel="noopener noreferrer" aria-label={label}><span className="social-tile"><span className="social-glyph" style={{ '--social-icon': `url("${icon}")` }} /></span><span className="social-tooltip">{label}</span></a>)}
      {[[wechat, 'wechat', language === 'zh' ? '微信公众号' : 'WeChat'], [rednote, 'xiaohongshu', language === 'zh' ? '小红书' : 'Rednote']].map(([icon, key, label]) => <button key={key} className="social-item" type="button" aria-label={label} aria-haspopup="dialog" onClick={event => open(key, event)}><span className="social-tile"><span className="social-glyph" style={{ '--social-icon': `url("${icon}")` }} /></span><span className="social-tooltip">{label}</span></button>)}
    </div>
    {account && <AccountDialog account={account} language={language} onClose={close} />}
  </div>;
}
