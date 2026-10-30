import React from 'react';
import mapPreview from '../assets/contact-map-preview.webp';

export default function ContactMap({ language }) {
  return <div className="contact-map">
    <div className="contact-map-stage">
      <img src={mapPreview} alt={language === 'zh' ? '联系地址周边地图，静态图片' : 'Static map of the contact location'} width="1280" height="600"/>
    </div>
  </div>;
}