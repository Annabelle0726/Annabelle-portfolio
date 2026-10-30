import React from 'react';
import silk from '../assets/web-overview/blue-silk-gold-bell.webp';

// Reorient the overview artwork without cropping away its hanging gold sphere.
export default function ProjectSilk({ className = '' }) {
  return <svg className={className} viewBox="0 0 1536 1024" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
    <image href={silk} width="1024" height="1536" transform="translate(0 1024) rotate(-90)" />
  </svg>;
}
