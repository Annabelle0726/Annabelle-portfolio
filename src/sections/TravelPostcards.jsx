import React, { useState } from 'react';

const postcards = [
  { place: ['威尼斯', 'Venice'], country: ['意大利', 'Italy'], photo: 'venice', coords: '45.44° N · 12.33° E' },
  { place: ['富士山', 'Mount Fuji'], country: ['日本', 'Japan'], photo: 'mt-fuji', coords: '35.36° N · 138.73° E' },
  { place: ['莱夫卡达岛', 'Lefkada'], country: ['希腊', 'Greece'], photo: 'lefkada-greece', coords: '38.72° N · 20.65° E' },
];

export default function TravelPostcards({ en, onNavigate }) {
  const [index, setIndex] = useState(0);
  const card = postcards[index];
  const lang = en ? 1 : 0;
  const move = step => setIndex(i => (i + step + postcards.length) % postcards.length);
  return <section className="postcard-album" aria-label={en ? 'Destination postcards' : '目的地明信片'}>
    <div className="postal-strip"><span lang="en">POSTCARDS</span><span>{String(index + 1).padStart(2, '0')} / 03</span></div>
    <a href="#XD-travel" onClick={onNavigate} className="postal-photo" aria-label={en ? 'Explore Travel Discovery' : '查看 Travel Discovery 项目'}>
      <img key={card.photo} src={import.meta.env.BASE_URL + 'PortfolioDigitalProduct/assets/images/popular-destinations/' + card.photo + '.jpg'}
        alt={card.place[lang]} loading="lazy" />
    </a>
    <div className="postal-address" aria-live="polite" aria-atomic="true">
      <div><small>{card.country[lang]}</small><strong>{card.place[lang]}</strong></div>
      <span lang="en">{card.coords}</span>
    </div>
    <div className="postal-controls">
      <button type="button" onClick={() => move(-1)} aria-label={en ? 'Previous postcard' : '上一张明信片'}>←</button>
      <button type="button" onClick={() => move(1)}>{en ? 'Next postcard' : '换张明信片'} <span aria-hidden="true">→</span></button>
    </div>
  </section>;
}
