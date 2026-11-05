import React, { useId, useRef, useState } from 'react';
import stationery from '../assets/contact-stationery.webp';

export default function ContactEnvelope({ language, email }) {
  const en = language === 'en';
  const [open, setOpen] = useState(false);
  const trigger = useRef(null);
  const closeButton = useRef(null);
  const letterId = useId();
  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => trigger.current?.focus());
  };
  return <div className="contact-art" data-open={open}>
    <button ref={trigger} className="contact-envelope-trigger" type="button"
      aria-expanded={open} aria-controls={letterId}
      onClick={() => {
        if (open) { close(); return; }
        setOpen(true);
        requestAnimationFrame(() => closeButton.current?.focus({ preventScroll: true }));
      }}>
      <img className="contact-envelope" src={stationery} alt="" width="1000" height="1000" decoding="async" fetchPriority="high" />
      <span>{en ? 'Take a letter ↗' : '抽出一封信 ↗'}</span>
    </button>
    <section id={letterId} className="contact-letter" hidden={!open}
      aria-label={en ? 'An invitation to write' : '写信邀请'}
      onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); close(); } }}>
      <button ref={closeButton} type="button" className="contact-letter-close" onClick={close}
        aria-label={en ? 'Put the letter back' : '收起信纸'}>×</button>
      <p className="contact-letter-eyebrow" lang="en">A NOTE TO YOU</p>
      <h2>{en ? 'A conversation starts here.' : '一封信，开始一次交流。'}</h2>
      <p>{en ? 'A work opportunity, a collaboration, or an idea you’d like to share. I’d love to hear from you.' : '无论是工作机会、合作，还是一个想分享的念头，都欢迎写信告诉我。'}</p>
      <p className="contact-letter-signature" lang="en">Annabelle Zhu</p>
      <a className="contact-primary" href={'mailto:' + email}>{en ? 'Write an email ↗' : '写邮件 ↗'}</a>
    </section>
  </div>;
}
