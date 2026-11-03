import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from './SidebarIcon';
import useNavigationIndicator from '../hooks/useNavigationIndicator';
import brandMark from '../assets/brand-mark.svg';
import instagram from '../assets/sidebar-icons/instagram.svg';
import github from '../assets/sidebar-icons/github.svg';
import linkedin from '../assets/sidebar-icons/linkedin.svg';
import wechat from '../assets/sidebar-icons/wechat.svg';
import xiaohongshu from '../assets/sidebar-icons/xiaohongshu.svg';
import wechatCard from '../assets/social/wechat-card.jpg';
import rednoteCard from '../assets/social/xiaohongshu-card.jpg';
import './sidebar.css';

const accounts = {
  wechat: { name: '独钓江雪 9447', image: wechatCard, icon: wechat, url: 'http://weixin.qq.com/r/mp/Jiers6jEuPXHrezQ93I0', copy: '独钓江雪 9447' },
  xiaohongshu: { name: '独钓江雪', image: rednoteCard, icon: xiaohongshu, url: 'http://xhslink.com/m/8H8ak5Ryu49', copy: '315247955' },
};
const copy = {
  zh: { nav: '主导航', home: '首页', overview: '首页概览', about: '关于我', projects: '项目', web: '网站与设计', design: 'UX/UI 设计', data: '数据与 AI', wechat: '微信公众号', favorites: '灵感收藏', models: '模型与工具', quotes: '团队与语录', skills: '模型 Skills', soon: '即将更新', contact: '联系我', contactInfo: '联系方式', expand: '展开', collapse: '收起', close: '关闭', xiaohongshu: '小红书', scanWechat: '用微信扫一扫，关注公众号', scanRednote: '用小红书扫一扫，找到我', copyName: '复制公众号名称', copyId: '复制小红书 ID', copied: '已复制', copyFailed: '复制未成功，可选中上方文字手动复制。', open: '打开账号', save: '保存二维码原图' },
  en: { nav: 'Main navigation', home: 'Home', overview: 'Overview', about: 'About me', projects: 'Projects', web: 'Web & design', design: 'UX/UI design', data: 'Data & AI', wechat: 'WeChat', favorites: 'Favorites', models: 'Models & tools', quotes: 'Teams & quotes', skills: 'Model skills', soon: 'Coming soon', contact: 'Contact', contactInfo: 'Get in touch', expand: 'Expand', collapse: 'Collapse', close: 'Close', xiaohongshu: 'Rednote', scanWechat: 'Scan in WeChat to follow', scanRednote: 'Scan in Rednote to find me', copyName: 'Copy account name', copyId: 'Copy Rednote ID', copied: 'Copied', copyFailed: 'Could not copy. Select the account text above to copy it manually.', open: 'Open profile', save: 'Save original QR card' },
};

export function useNavigationLanguage() {
  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem('annabelle-nav-language') === 'en' ? 'en' : 'zh'; } catch { return 'zh'; }
  });
  useEffect(() => { try { localStorage.setItem('annabelle-nav-language', language); } catch { /* A blocked store must never prevent navigation. */ } }, [language]);
  return [language, setLanguage];
}

export function LanguageSwitch({ language, onChange }) {
  return <div className="sidebar-language" data-lang={language} role="group" aria-label={language === 'zh' ? '导航语言' : 'Navigation language'} lang={language === 'zh' ? 'zh-CN' : 'en'}>
    <span className="sidebar-language-thumb" aria-hidden="true" />
    <button type="button" lang="zh-CN" aria-label="中文" aria-pressed={language === 'zh'} onClick={() => onChange('zh')}>ZH</button>
    <button type="button" lang="en" aria-label="English" aria-pressed={language === 'en'} onClick={() => onChange('en')}>EN</button>
  </div>;
}

export function AccountDialog({ account, language, onClose }) {
  const ref = useRef(null);
  const [status, setStatus] = useState('');
  const t = copy[language];
  const data = accounts[account];
  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  const copyAccount = async () => {
    try { await navigator.clipboard.writeText(data.copy); setStatus('copied'); }
    catch { setStatus('copyFailed'); }
  };
  return createPortal(<dialog ref={ref} className="account-dialog" aria-labelledby="account-dialog-title" lang={language === 'zh' ? 'zh-CN' : 'en'} onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) { const r = event.currentTarget.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) onClose(); } }}>
    <button className="account-close" type="button" onClick={onClose} aria-label={t.close} autoFocus><Icon name="close"/></button>
    <div className={`account-platform social-${account}`}><img src={data.icon} alt=""/></div>
    <p className="account-platform-name">{t[account]}</p>
    <h2 id="account-dialog-title" lang="zh-CN">{data.name}</h2>
    {account === 'xiaohongshu' && <p className="account-id">Rednote ID: <span>315247955</span></p>}
    <div className={`account-qr qr-${account}`}><img src={data.image} alt={t[account] + (language === 'zh' ? '二维码' : ' QR code')}/></div>
    <p className="account-instruction">{account === 'wechat' ? t.scanWechat : t.scanRednote}</p>
    <div className="account-actions"><button type="button" onClick={copyAccount}><Icon name={status === 'copied' ? 'check' : 'copy'}/>{status === 'copied' ? t.copied : account === 'wechat' ? t.copyName : t.copyId}</button><a href={data.url} target="_blank" rel="noopener noreferrer">{t.open}<Icon name="external"/></a></div>
    <p className="account-feedback" role="status">{status ? t[status] : ''}</p>
    <a className="account-save" href={data.image} download={`${account}-Annabelle.jpg`}><Icon name="download"/>{t.save}</a>
  </dialog>, document.body);
}

export default function Sidebar({ isMobile, isOpen, activeSection, activeGroup, onClose, language, onLanguageChange }) {
  const t = copy[language];
  const header = useRef(null);
  const { nav, indicator } = useNavigationIndicator(activeGroup);
  const [expanded, setExpanded] = useState({ home: true, projects: false, wechat: false, favorites: false, contact: false });
  const [webExpanded, setWebExpanded] = useState(activeSection === 'portfolio' || activeSection.startsWith('web-'));
  useEffect(() => { if (activeSection === 'portfolio' || activeSection.startsWith('web-')) setWebExpanded(true); }, [activeSection]);
  const [designExpanded, setDesignExpanded] = useState(activeSection === 'XD' || activeSection.startsWith('XD-'));
  useEffect(() => { if (activeSection === 'XD' || activeSection.startsWith('XD-')) setDesignExpanded(true); }, [activeSection]);
  const [dataExpanded, setDataExpanded] = useState(activeSection === 'services' || activeSection.startsWith('data-'));
  useEffect(() => { if (activeSection === 'services' || activeSection.startsWith('data-')) setDataExpanded(true); }, [activeSection]);
  const [account, setAccount] = useState(null);
  const accountTrigger = useRef(null);
  const openAccount = (key, event) => {
    accountTrigger.current = event.currentTarget;
    setAccount(key);
  };
  const closeAccount = () => {
    setAccount(null);
    window.requestAnimationFrame(() => {
      const trigger = accountTrigger.current;
      if (trigger?.isConnected && !trigger.closest('[inert]') && trigger.getClientRects().length) trigger.focus();
      else document.querySelector('.shell-controls .mobile-nav-toggle')?.focus();
    });
  };
  useEffect(() => { setExpanded(previous => ({ ...previous, [activeGroup]: true })); }, [activeGroup]);
  useEffect(() => {
    if (!isMobile || !isOpen) return;
    header.current.querySelector('.sidebar-close').focus();
    const trap = event => {
      if (event.key !== 'Tab' || document.querySelector('dialog[open]')) return;
      const focusable = [...header.current.querySelectorAll('a[href], button:not([disabled])')].filter(el => el.getClientRects().length && !el.closest('[hidden], [inert]'));
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', trap);
    return () => document.removeEventListener('keydown', trap);
  }, [isMobile, isOpen]);
  const openGroup = (key, target, event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    setExpanded(previous => ({ ...previous, [key]: activeSection === target ? !previous[key] : true }));
    onClose(event);
  };
  const child = (id, label) => <li><a href={`#${id}`} aria-current={(activeSection === id || (activeSection === 'skills' && id === 'about') || (activeSection === 'model-skills' && id === 'models')) ? 'page' : ((activeSection.startsWith('notes-') && id === 'quotes') || ((activeSection === 'models-chatgpt' || activeSection === 'models-claude-code') && id === 'models')) ? 'location' : undefined} onClick={onClose}><span>{label}</span></a></li>;
  const group = (key, target, children) => <li data-group={key} className={`sidebar-group${activeGroup === key ? ' is-active' : ''}`}>
    <div className="sidebar-nav-row">
      <a className="sidebar-parent" href={`#${target}`} onClick={event => openGroup(key, target, event)} aria-current={activeSection === target ? 'page' : undefined} aria-expanded={expanded[key]} aria-controls={`sidebar-${key}`}><span className="sidebar-icon-tray"><Icon name={key}/></span><span>{t[key]}</span></a>
    </div>
    <div id={`sidebar-${key}`} className={`sidebar-children-shell${expanded[key] ? ' is-expanded' : ''}`} inert={!expanded[key]} aria-hidden={!expanded[key]}>
      <div className="sidebar-children-clip"><ul className="sidebar-children">{children}</ul></div>
    </div>
  </li>;
  return <>
    <aside id="header" className="site-sidebar" ref={header} inert={isMobile && !isOpen} lang={language === 'zh' ? 'zh-CN' : 'en'} role={isMobile ? 'dialog' : undefined} aria-modal={isMobile && isOpen ? true : undefined} aria-label={t.nav}>
      <div className="sidebar-mobile-tools"><LanguageSwitch language={language} onChange={onLanguageChange}/><button className="sidebar-close" type="button" aria-label={t.close} onClick={onClose}><Icon name="close"/></button></div>
      <div className="sidebar-identity">
        <div className="sidebar-identity-copy"><a className="sidebar-name" href="#hero" onClick={onClose}>Annabelle Zhu<span className="sidebar-brand-dot">.</span></a>
          <p className="sidebar-tagline">{language === 'zh' ? '软件开发者与产品设计者' : 'Software Developer & Product Designer'}</p>
          <div className="sidebar-socials" aria-label={language === 'zh' ? '社交账号' : 'Social profiles'}>
            {[[instagram, 'instagram', 'Instagram', 'https://www.instagram.com/0real_annabelle0/'], [github, 'github', 'GitHub', 'https://github.com/Annabelle0726'], [linkedin, 'linkedin', 'LinkedIn', 'https://www.linkedin.com/in/huizhu0726/']].map(([icon, key, label, url]) => <a key={key} className={`social-item social-${key}`} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}><span className="social-tile"><span className="social-glyph" style={{ '--social-icon': `url("${icon}")` }}/></span><span className="social-tooltip">{label}</span></a>)}
            {['wechat','xiaohongshu'].map(key => <button type="button" key={key} className={`social-item social-${key}`} aria-label={t[key]} aria-haspopup="dialog" onClick={event => openAccount(key, event)}><span className="social-tile"><span className="social-glyph" style={{ '--social-icon': `url("${accounts[key].icon}")` }}/></span><span className="social-tooltip">{t[key]}</span></button>)}
          </div>
        </div>
        <div className="sidebar-portrait-frame">
          <img className="sidebar-portrait" src="assets/img/头像.png" width="64" height="80" alt="Annabelle Zhu" fetchPriority="high"/>
        </div>
      </div>
      <nav ref={nav} id="navbar" className="sidebar-navigation" aria-label={t.nav}>
        <span ref={indicator} className="sidebar-selection" aria-hidden="true"/>
        <ul className="sidebar-menu">
        {group('home', 'hero', <>{child('hero', t.overview)}{child('about', t.about)}</>)}
        {group('projects', 'portfolio', <><li className="sidebar-design-branch"><div className="sidebar-design-row"><a href="#portfolio" onClick={onClose} aria-current={activeSection === 'portfolio' ? 'page' : undefined} className={activeSection.startsWith('web-') ? 'is-ancestor' : undefined}>{t.web}</a><button type="button" aria-label={(webExpanded ? t.collapse : t.expand) + ' ' + t.web} aria-expanded={webExpanded} aria-controls="sidebar-web-projects" onClick={() => setWebExpanded(value => !value)}><Icon name="chevron"/></button></div><ul id="sidebar-web-projects" className="sidebar-grandchildren" hidden={!webExpanded}>{child('web-agency-bloom', 'Agency Bloom')}{child('web-belay', 'Belay')}{child('web-somnia', 'Somnia Library')}</ul></li><li className="sidebar-design-branch"><div className="sidebar-design-row"><a href="#XD" onClick={onClose} aria-current={activeSection === 'XD' ? 'page' : undefined} className={activeSection.startsWith('XD-') ? 'is-ancestor' : undefined}>{t.design}</a><button type="button" aria-label={`${designExpanded ? t.collapse : t.expand} ${t.design}`} aria-expanded={designExpanded} aria-controls="sidebar-design-projects" onClick={() => setDesignExpanded(value => !value)}><Icon name="chevron"/></button></div><ul id="sidebar-design-projects" className="sidebar-grandchildren" hidden={!designExpanded}>{child('XD-cupcakes', 'Cupcakes')}{child('XD-reverie', 'Reverie Reads')}{child('XD-travel', language === 'zh' ? '旅行探索' : 'Travel Discovery')}</ul></li><li className="sidebar-design-branch"><div className="sidebar-design-row"><a href="#services" onClick={onClose} aria-current={activeSection === 'services' ? 'page' : undefined} className={activeSection.startsWith('data-') ? 'is-ancestor' : undefined}>{t.data}</a><button type="button" aria-label={(dataExpanded ? t.collapse : t.expand) + ' ' + t.data} aria-expanded={dataExpanded} aria-controls="sidebar-data-projects" onClick={() => setDataExpanded(value => !value)}><Icon name="chevron"/></button></div><ul id="sidebar-data-projects" className="sidebar-grandchildren" hidden={!dataExpanded}>{child('data-athub', language === 'zh' ? 'AtHub 异常检测' : 'AtHub anomalies')}{child('data-visualization', language === 'zh' ? '公共数据可视化' : 'Public data visuals')}{child('data-energy', language === 'zh' ? '数据中心选址' : 'Data-center siting')}</ul></li></>)}
        {group('wechat', 'agency-bloom', <>
              {['https://mp.weixin.qq.com/s/xbY_lSzfr1YvotELeE3LsA', 'https://mp.weixin.qq.com/s/byApMNE4pbO2M4OX62F4Cg', 'https://mp.weixin.qq.com/s/pThuorA_l3hqmpPardULOg', 'https://mp.weixin.qq.com/s/VSMctNqPAuP6FyYJsgE6_A'].map((url, index) => <li key={url}><a href={index === 0 ? '#agency-bloom' : index === 1 ? '#agency-bloom-value' : index === 2 ? '#agency-bloom-applause' : '#agency-bloom-ideas'} aria-current={((index === 0 && activeSection === 'agency-bloom') || (index === 1 && activeSection === 'agency-bloom-value') || (index === 2 && activeSection === 'agency-bloom-applause') || (index === 3 && activeSection === 'agency-bloom-ideas')) ? 'page' : undefined} onClick={onClose}><span>{index === 0 ? (language === 'zh' ? 'Agency Bloom：想抵达的生活' : 'Agency Bloom: A life of our own') : index === 1 ? (language === 'zh' ? '在变化中寻找自己的价值' : 'Finding our value') : index === 2 ? (language === 'zh' ? '暂时没有掌声也想继续做下去' : 'Continuing without applause') : (language === 'zh' ? '给想法一次认真的尝试' : 'Giving ideas a real try')}</span></a></li>)}
              {child('design-care', '好看，想让你多看一眼；用心，想让你心动')}
              {child('being-seen', '想被看见，也想看见你')}
        </>)}
        {group('favorites', 'models', <>{child('models', t.models)}{child('quotes', t.quotes)}</>)}
        <li data-group="contact" className={`sidebar-group${activeGroup === 'contact' ? ' is-active' : ''}`}><div className="sidebar-nav-row"><a className="sidebar-parent" href="#contact" onClick={onClose} aria-current={activeSection === 'contact' ? 'page' : undefined}><span className="sidebar-icon-tray"><Icon name="contact"/></span><span>{t.contact}</span></a></div></li>
        </ul>
      </nav>
      <div className="sidebar-footer"><img className="sidebar-footer-mark" src={brandMark} alt="" aria-hidden="true"/><span>© {new Date().getFullYear()} Annabelle Zhu</span></div>
    </aside>
    {account && <AccountDialog key={account} account={account} language={language} onClose={closeAccount}/>}
  </>;
}
