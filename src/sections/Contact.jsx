import React, { useRef, useState } from 'react';
import { AccountDialog } from '../components/Sidebar';
import SectionHeader from '../components/SectionHeader';
import ContactEnvelope from '../components/ContactEnvelope';
import instagram from '../assets/sidebar-icons/instagram.svg';
import github from '../assets/sidebar-icons/github.svg';
import linkedin from '../assets/sidebar-icons/linkedin.svg';
import wechat from '../assets/sidebar-icons/wechat.svg';
import xiaohongshu from '../assets/sidebar-icons/xiaohongshu.svg';
import { contactText } from './contact-content';
import ContactMap from '../components/ContactMap';
import chineseResume from '../assets/resumes/诸惠简历.pdf';
import englishResume from '../assets/resumes/Annabelle_Zhu_Full_Stack_Resume_20261103.pdf';
import './contact.css';

const email = '0realannabelle0@gmail.com';
const profiles = [
  [instagram, 'instagram', 'Instagram', 'https://www.instagram.com/0real_annabelle0/'],
  [github, 'github', 'GitHub', 'https://github.com/Annabelle0726'],
  [linkedin, 'linkedin', 'LinkedIn', 'https://www.linkedin.com/in/huizhu0726/'],
];
function ContactIcon({ name }) {
  const paths = {
    phone: <path d="m7 3 3 5-2 2c2 3 3 4 6 6l2-2 5 3-1 3c-1 3-7 0-11-4S2 6 4 4Z" />,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">{paths[name]}</svg>;
}
export default function Contact({ language = 'zh' }) {
  const t = contactText[language];
  const [account, setAccount] = useState(null);
  const trigger = useRef(null);
  const openAccount = (name, event) => { trigger.current = event.currentTarget; setAccount(name); };
  const closeAccount = () => { setAccount(null); requestAnimationFrame(() => trigger.current?.focus()); };
  return <section id="contact" className="contact-editorial" lang={language === 'zh' ? 'zh-CN' : 'en'}>
    <div className="contact-page">
      <SectionHeader eyebrow="CONTACT" title={t.title} as="h1" />
      <div className="contact-copy">
          <p className="contact-intro">{t.intro}</p>
          <div className="contact-email-block">
            <span className="contact-label">{t.email}</span>
            <a className="contact-email" href={`mailto:${email}`}>0realannabelle0<wbr/>@gmail.com</a>
          </div>
          <div className="contact-bottom">
        <div className="contact-detail"><ContactIcon name="phone"/><div><span className="contact-label">{t.phone}</span><a className="contact-value" href="tel:+8617621800415">+86 176 2180 0415</a></div></div>
        <div className="contact-detail"><ContactIcon name="pin"/><div><span className="contact-label">{t.city}</span><span className="contact-value">{t.location}</span><span className="contact-remote">{t.remote}</span></div></div>
          </div>
          <ContactMap language={language}/>
      </div>
      <ContactEnvelope />
      <footer className="contact-footer">
        <div className="contact-social">
          <nav aria-label={t.social}>
            {profiles.map(([icon, key, label, url]) => <a className={`social-item social-${key}`} key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <span className="social-tile"><span className="social-glyph" style={{'--social-icon': `url("${icon}")`}}/></span><span className="social-tooltip">{label}</span>
            </a>)}
            {[[wechat, 'wechat', t.wechat], [xiaohongshu, 'xiaohongshu', t.rednote]].map(([icon, key, label]) => <button className={`social-item social-${key}`} type="button" key={key} aria-label={label} aria-haspopup="dialog" onClick={e => openAccount(key, e)}>
              <span className="social-tile"><span className="social-glyph" style={{'--social-icon': `url("${icon}")`}}/></span><span className="social-tooltip">{label}</span>
            </button>)}
          </nav>
        </div>
        <div className="resume-downloads">
          <a href={chineseResume} download="诸惠简历.pdf">{language === 'zh' ? '下载中文简历' : 'Download Chinese résumé'}</a>
          <a href={englishResume} download="Annabelle_Zhu_Full_Stack_Resume_20261103.pdf">{language === 'zh' ? '下载英文简历' : 'Download English résumé'}</a>
        </div>
      </footer>
    </div>
    {account && <AccountDialog account={account} language={language} onClose={closeAccount}/>}
  </section>;
}
