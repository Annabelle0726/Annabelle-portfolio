import React from 'react';

// One 24-unit grid, rounded 1.6-unit strokes, and a small warm accent.
export default function SidebarIcon({ name, className = '' }) {
  const art = {
    home: <><path className="icon-wash" d="m4 10 8-6 8 6v10H4Z"/><path d="m3 10 9-7 9 7M5 9v11h14V9M10 20v-6h4v6"/><path className="icon-accent" d="M15.5 8.5h2v2h-2z"/></>,
    projects: <><rect className="icon-wash" x="4" y="8" width="16" height="12" rx="3"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M4 13v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/><path d="M3 8h18v4l-7 3h-4l-7-3z"/><path className="icon-accent" d="M10 12h4v4h-4z"/></>,
    wechat: <><path className="icon-wash" d="M20 10c0 4-4 7-9 7l-6 3 1-5C1 10 5 3 12 3c5 0 8 3 8 7Z"/><path d="M20.5 10c0 4-3.8 7-8.5 7-1 0-2-.1-3-.4L4 20l1-5C1 10 5 3 12 3c4.7 0 8.5 3 8.5 7Z"/><circle cx="8.5" cy="9.5" r=".8" fill="currentColor" stroke="none"/><circle cx="14.5" cy="9.5" r=".8" fill="currentColor" stroke="none"/><path className="icon-accent" d="m17 15 2-1 2 1v5l-2-1-2 1z"/></>,
    favorites: <><path className="icon-wash" d="M6 3h12v18l-6-4-6 4Z"/><path d="M8 3H6a1 1 0 0 0-1 1v17l7-4 7 4v-8M12 3h7v6"/><path className="icon-accent" d="m15 3 1.2 3.8L20 8l-3.8 1.2L15 13l-1.2-3.8L10 8l3.8-1.2z"/></>,
    contact: <><rect className="icon-wash" x="3" y="5" width="18" height="14" rx="3"/><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/><circle className="icon-accent" cx="19" cy="18" r="3"/></>,
    chevron: <path d="m9 5 7 7-7 7"/>,
    external: <><path d="M8 5h11v11M19 5 5 19"/></>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
    menu: <><path d="M4 6h16M4 12h16M4 18h10"/><circle className="icon-accent" cx="19" cy="18" r="1"/></>,
    copy: <><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M15 5V3H4v13h2"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    download: <><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></>,
  };
  return <svg className={`sidebar-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{art[name]}</svg>;
}
