import React from 'react';
import './section-header.css';
import './project-typography.css';

export default function SectionHeader({ eyebrow, title, subtitle, titleId, as: Heading = 'h2', className = '', about = false }) {
  return <header className={`section-header ${subtitle ? 'project-header' : ''} ${className}`}>
    <p className={`section-eyebrow${about ? ' about-eyebrow' : ''}`} lang="en">ANNABELLE ZHU <span>/</span> {eyebrow}</p>
    <div className="section-title-line"><Heading id={titleId} className="section-header-title">{title}</Heading>
      <svg className={`section-signature${about ? ' about-signature' : ''}`} viewBox="0 0 120 64" aria-hidden="true">
        <path className="signature-ink" pathLength="100" d="M51 45C43 56 16 57 11 44 5 28 18 10 33 10c16 0 20 14 20 27 0 10 4 14 10 12 10-3 20-19 35-29 6-4 12-5 13-1 1 4-8 10-17 17L78 49c8 4 20 4 29 0" />
        <path className="signature-gold" pathLength="100" d="M107 49c3-1 5-3 7-5" />
      </svg>
    </div>
    {subtitle && <p className="project-subtitle">{subtitle.replace(/[。.]$/, '')}</p>}
  </header>;
}
