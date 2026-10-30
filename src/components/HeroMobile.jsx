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
  return <div className="hero-mobile-portrait"><img src="assets/img/optimized/profile.webp" width="64" height="72" alt="Annabelle Zhu" /></div>;
}
export function HeroMobileActions({ language, onNavigate }) {
  return <div className="hero-mobile-actions"><a href="#portfolio" onClick={onNavigate}>{language === 'zh' ? '看项目' : 'View projects'}<span aria-hidden="true">→</span></a></div>;
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
