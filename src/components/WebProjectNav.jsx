import React from 'react';
import './web-project-nav.css';

export default function WebProjectNav({ previous, next, onNavigate, en = false, compact = false }) {
  const link = (item, direction) => item && <a className={'web-project-nav-link is-' + direction} href={item.href} onClick={onNavigate}>
    {direction === 'right' && <span>{item.label}</span>}
    <span className="web-project-nav-gem" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" focusable="false">
        <path d={direction === 'left' ? 'M17 12H7m0 0 5-5m-5 5 5 5' : 'M7 12h10m0 0-5-5m5 5-5 5'} />
      </svg>
    </span>
    {direction === 'left' && <span>{item.label}</span>}
  </a>;
  return <nav className={'web-project-nav' + (compact ? ' is-compact' : '')} aria-label={en ? 'Other projects' : '其他项目'}>
    {link(previous, 'left')}
    {link(next, 'right')}
  </nav>;
}
