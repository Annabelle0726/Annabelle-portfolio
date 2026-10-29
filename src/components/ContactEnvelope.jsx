import React from 'react';
import stationery from '../assets/contact-stationery.webp';

export default function ContactEnvelope() {
  return <figure className="contact-art" aria-hidden="true">
    <img className="contact-envelope" src={stationery} alt="" width="1000" height="1000" decoding="async" fetchPriority="high" />
  </figure>;
}
