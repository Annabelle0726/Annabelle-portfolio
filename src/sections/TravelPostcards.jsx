import React, { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

const postcards = [
  { place: ['威尼斯', 'Venice'], country: ['意大利', 'Italy'], photo: 'venice', coords: '45.44° N · 12.33° E' },
  { place: ['富士山', 'Mount Fuji'], country: ['日本', 'Japan'], photo: 'mt-fuji', coords: '35.36° N · 138.73° E' },
  { place: ['莱夫卡达岛', 'Lefkada'], country: ['希腊', 'Greece'], photo: 'lefkada-greece', coords: '38.72° N · 20.65° E' },
];
const wrap = index => (index + postcards.length) % postcards.length;

function Postcard({ index, en, front }) {
  const card = postcards[index];
  const lang = en ? 1 : 0;
  return <span className={'postal-card' + (front ? ' is-front' : ' is-under')} aria-hidden={!front}>
    <span className="postal-strip"><span lang="en">POSTCARDS</span><span>{String(index + 1).padStart(2, '0')} / 03</span></span>
    <span className="postal-photo">
      <img src={import.meta.env.BASE_URL + 'PortfolioDigitalProduct/assets/images/popular-destinations/' + card.photo + '.jpg'}
        alt="" loading="lazy" draggable={false} width="1280" height="853" />
    </span>
    <span className="postal-address">
      <span><small>{card.country[lang]}</small><strong>{card.place[lang]}</strong></span>
      <span lang="en">{card.coords}</span>
    </span>
  </span>;
}

export default function TravelPostcards({ en }) {
  const [index, setIndex] = useState(0);
  const [target, setTarget] = useState(1);
  const [busy, setBusy] = useState(false);
  const viewport = useRef(null);
  const animation = useRef(null);
  const changing = useRef(false);

  useEffect(() => () => animation.current?.cancel(), []);

  const settle = async (next, direction) => {
    if (changing.current) return;
    changing.current = true;
    setBusy(true);
    setTarget(next);
    const card = viewport.current.querySelector('.is-front');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) {
      const destination = direction * (viewport.current.clientWidth + 45);
      const tilt = x => Math.max(-6, Math.min(6, x / 24));
      const transform = x => `translateX(${x}px) rotate(${tilt(x)}deg)`;
      animation.current = card.animate([
        { transform: transform(0) },
        { transform: transform(destination) },
      ], { duration: 320, easing: 'cubic-bezier(.22,.75,.25,1)', fill: 'forwards' });
      try { await animation.current.finished; } catch { return; }
    }
    // Replace the outgoing card before removing its final offscreen transform.
    flushSync(() => {
      setIndex(next);
      setTarget(wrap(next + 1));
      setBusy(false);
    });
    animation.current?.cancel();
    animation.current = null;
    changing.current = false;
  };

  const choose = next => {
    if (changing.current || next === index) return;
    settle(next, next === wrap(index + 1) ? -1 : 1);
  };
  const card = postcards[index];
  return <section className="postcard-album" aria-roledescription={en ? 'carousel' : '轮播'} aria-label={en ? 'Destination postcards' : '目的地明信片'}>
    <p className="postal-instruction">{en ? 'Tap the postcard to turn the page' : '点一下明信片，翻到下一页'}</p>
    <button type="button" className="postal-viewport" ref={viewport} aria-disabled={busy}
      aria-label={en ? card.place[1] + '. Turn to the next postcard' : card.place[0] + '。点击翻到下一张明信片'}
      onClick={() => choose(wrap(index + 1))}
      onKeyDown={event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          choose(wrap(index + (event.key === 'ArrowRight' ? 1 : -1)));
        }
      }}>
      <span className="postal-stack">
        <Postcard index={target} en={en} front={false} />
        <Postcard key={index} index={index} en={en} front />
      </span>
    </button>
    <p className="postal-status" role="status" aria-atomic="true">{card.country[en ? 1 : 0]} · {card.place[en ? 1 : 0]} · {index + 1} / 3</p>
    <div className="postal-controls">
      <button type="button" aria-disabled={busy} onClick={() => choose(wrap(index - 1))} aria-label={en ? 'Previous postcard' : '上一张明信片'}>←</button>
      <div className="postal-dots" role="group" aria-label={en ? 'Choose a destination' : '选择目的地'}>
        {postcards.map((item, i) => <button type="button" key={item.photo} aria-disabled={busy}
          aria-label={item.place[en ? 1 : 0]} aria-current={index === i ? 'true' : undefined}
          onClick={() => choose(i)}><span /></button>)}
      </div>
      <button type="button" aria-disabled={busy} onClick={() => choose(wrap(index + 1))} aria-label={en ? 'Next postcard' : '下一张明信片'}>→</button>
    </div>
  </section>;
}
