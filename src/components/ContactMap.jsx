import React from 'react';
import mapPreview from '../assets/contact-location.webp';

export default function ContactMap({ language }) {
  return <img className="contact-map" src={mapPreview} width="700" height="310"
    alt={language === 'en' ? 'Location map of Songjiang, Shanghai' : '上海松江位置图'} />;
}
