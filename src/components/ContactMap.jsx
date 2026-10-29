import React, { useEffect, useState } from 'react';
import mapPreview from '../assets/contact-map-preview.webp';

// Original embed retained from commit 0455143. Local preview remains available offline.
const mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3419.348431206446!2d121.20244743607454!3d31.016540571974605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35b2f397f0b3de2f%3A0x95e02b31972e3477!2zVmVyb25hIFBhbGFjZSDvvIhTb3V0aCBHYXRl77yJ!5e0!3m2!1sen!2sil!4v1723727652974!5m2!1sen!2sil';

export default function ContactMap({ language }) {
  const zh = language === 'zh';
  const [interactive, setInteractive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!interactive || loaded) return;
    const timer = setTimeout(() => { setInteractive(false); setFailed(true); }, 8000);
    return () => clearTimeout(timer);
  }, [interactive, loaded]);
  const toggle = () => { setLoaded(false); setFailed(false); setInteractive(value => !value); };
  return <div className="contact-map">
    <div className="contact-map-toolbar">
      <span>{zh ? '上海 · 所在区域' : 'Shanghai · Local area'}</span>
    </div>
    <div className="contact-map-stage">
      <img src={mapPreview} alt={zh ? '原联系地址周边地图，静态截图' : 'Static map of the original contact location'} width="1280" height="600"/>
      {interactive && <iframe src={mapUrl} title={zh ? 'Google 地图：上海' : 'Google map of Shanghai'} referrerPolicy="no-referrer-when-downgrade" onLoad={() => setLoaded(true)} onError={() => { setInteractive(false); setFailed(true); }}/>}
      {failed && <p className="contact-map-status" role="status">{zh ? '暂未加载，已显示静态地图。' : 'Showing the static map while Google Maps is unavailable.'}</p>}
    </div>
    <div className="contact-map-actions">
      <button type="button" className="contact-map-toggle" onClick={toggle} aria-pressed={interactive}>
        {interactive ? (zh ? '显示静态图' : 'Show static map') : (zh ? 'Google 地图 ↗' : 'Google Maps ↗')}
      </button>
    </div>
  </div>;
}
