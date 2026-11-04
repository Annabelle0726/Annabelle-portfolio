import React, { useState } from 'react';
import library from '../assets/somnia-case/library.webp';
import './web-overview-demos.css';

// Store only choices from these examples, for the lifetime of the current tab.
function useDemoChoices(key, options) {
  const [items, setItems] = useState(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(key));
      return Array.isArray(saved) ? [...new Set(saved.filter(id => options.includes(id)))] : [];
    } catch { return []; }
  });
  function save(next) {
    setItems(next);
    try { sessionStorage.setItem(key, JSON.stringify(next)); } catch { /* Keep the demo usable in memory. */ }
  }
  return [items, save];
}

const books = [
  ['Fifty Shades of Grey', 380], ['Fifty Shades Darker', 617], ['Grey', 852], ['Fifty Shades Freed', 1088],
];
const titles = books.map(([title]) => title);
export function SomniaShelf({ en }) {
  const t = (zh, english) => en ? english : zh;
  const [saved, save] = useDemoChoices('portfolio.somnia.shelf.v1', titles);
  const [query, setQuery] = useState('');
  const [onlySaved, setOnlySaved] = useState(false);
  const visible = books.filter(([title]) => (!onlySaved || saved.includes(title)) && title.toLowerCase().includes(query.trim().toLowerCase()));
  return <section className="web-project-cover somnia-sample" aria-label={t('Somnia 书库示例','Somnia library demo')}>
    <div className="shelf-head"><small>SOMNIA / LIBRARY</small><span>{t('作品集交互示例','Portfolio demo')}</span></div>
    <h3>{t('给喜欢的书留个位置','Make room for a favorite')}</h3>
    <label className="shelf-search">{t('查找书名','Find a title')}<input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={t('试试 Grey','Try Grey')} /></label>
    <div className="shelf-views">
      <button type="button" aria-pressed={!onlySaved} onClick={() => setOnlySaved(false)}>{t('全部','All')} · 4</button>
      <button type="button" aria-pressed={onlySaved} onClick={() => setOnlySaved(true)}>{t('已收藏','Favorites')} · {saved.length}</button>
    </div>
    <ul className="shelf-volumes">{visible.map(([title,x]) => {
      const marked = saved.includes(title);
      return <li key={title}><button type="button" aria-pressed={marked} aria-label={t('收藏 ','Favorite ') + title}
        onClick={() => save(marked ? saved.filter(b => b!==title) : [...saved,title])}>
        <span className="shelf-art" aria-hidden="true"><img src={library} alt="" loading="lazy" style={{left:(-x/204*100)+'%'}} /></span>
        <strong>{title}</strong><small>{marked ? '♥' : '♡'} {marked ? t('已收藏','Saved') : t('收藏','Save')}</small>
      </button></li>;
    })}</ul>
    {!visible.length && <p role="status">{query ? t('没有匹配的书，试试其他书名。','No matches. Try another title.') : t('在「全部」里点一本书，就能在这里找到它。','Save a book from All to find it here.')}</p>}
  </section>;
}
