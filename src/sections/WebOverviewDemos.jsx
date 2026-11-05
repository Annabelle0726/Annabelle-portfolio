import React, { useRef, useState } from 'react';
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
  { title: 'Fifty Shades of Grey', x: 380, cloth: '#33515c' },
  { title: 'Fifty Shades Darker', x: 617, cloth: '#534061' },
  { title: 'Grey', x: 852, cloth: '#364943' },
  { title: 'Fifty Shades Freed', x: 1088, cloth: '#73494c' },
];
const titles = books.map(book => book.title);

export function SomniaShelf({ en }) {
  const [current, setCurrent] = useState(0);
  const [saved, save] = useDemoChoices('portfolio.somnia.shelf.v1', titles);
  const touchStart = useRef(null);
  const swiped = useRef(false);
  const title = titles[current];
  const isSaved = saved.includes(title);

  function finishSwipe(event) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || event.touches.length) return;
    const end = event.changedTouches[0];
    const dx = end.clientX - start.clientX;
    if (Math.abs(dx) < 32 || Math.abs(dx) <= Math.abs(end.clientY - start.clientY)) return;
    swiped.current = true;
    setCurrent(index => Math.max(0, Math.min(books.length - 1, index - Math.sign(dx))));
  }

  function navigate(event, index) {
    let next;
    switch (event.key) {
      case 'ArrowLeft': next = Math.max(0, index - 1); break;
      case 'ArrowRight': next = Math.min(books.length - 1, index + 1); break;
      case 'Home': next = 0; break;
      case 'End': next = books.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setCurrent(next);
    event.currentTarget.parentElement.children[next].focus({ preventScroll: true });
  }

  return <section className="web-project-cover somnia-sample" aria-label={en ? 'Somnia library demo' : 'Somnia 书架示例'}>
    <header className="shelf-heading">
      <h3>{en ? 'My bookshelf' : '我的书架'}</h3>
      <span aria-hidden="true">0{current + 1} / 04</span>
    </header>
    <div className="shelf-stage" onTouchStart={event => {
      swiped.current = false;
      touchStart.current = event.touches.length === 1 ? event.touches[0] : null;
    }} onTouchEnd={finishSwipe} onTouchCancel={() => { touchStart.current = null; }}
      onClickCapture={event => {
        if (swiped.current && event.detail > 0) event.stopPropagation();
        swiped.current = false;
      }} onPointerDown={() => { swiped.current = false; }}>
      <div className="shelf-books" role="group" aria-label={en ? 'Choose a book' : '选一本书'}>
        {books.map((book, i) => <button type="button" key={book.title} className="shelf-book"
          aria-label={book.title} aria-pressed={current === i} onClick={() => setCurrent(i)}
          onKeyDown={event => navigate(event, i)} style={{ '--cloth': book.cloth }}>
          <span className="shelf-spine" aria-hidden="true"><span>{book.title}</span></span>
          <span className="shelf-jacket" aria-hidden="true">
            <span className="shelf-jacket-title">{book.title}</span>
            <span className="shelf-illustration" style={{ backgroundImage: 'url(' + library + ')', backgroundPositionX: (book.x + 20) / (1600 - 164) * 100 + '%' }} />
            <span className="shelf-author">E L James</span>
          </span>
        </button>)}
      </div>
    </div>
    <div className="shelf-selection">
      <strong aria-live="polite">{title}</strong>
      <button type="button" aria-pressed={isSaved} aria-label={(en ? 'Favorite ' : '收藏：') + title}
        onClick={() => save(isSaved ? saved.filter(item => item !== title) : [...saved, title])}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20S3 14.4 3 8.8a4.7 4.7 0 0 1 9-1.8 4.7 4.7 0 0 1 9 1.8C21 14.4 12 20 12 20Z" /></svg>
        {isSaved ? (en ? 'Saved' : '已收藏') : (en ? 'Save' : '收藏')}
      </button>
    </div>
  </section>;
}
