import React from 'react';
import AboutTextFold from '../components/AboutTextFold';

const notes = [
  ['按兴趣或心情寻找下一本书。', 'Find a next read through a favorite book or a mood.'],
  ['在封面与书脊之间浏览自己的藏书。', 'Browse your library by cover or spine.'],
  ['给想读的书安排时间，也可以改变计划。', 'Make room for a next read and rearrange your plans.'],
];

export default function ReadingDeck({ screens, en, selected, onSelect, onEnlarge }) {
  const lang = en ? 1 : 0;
  const screen = screens[selected];
  return <section className="reading-deck" aria-label={en ? 'Reading room' : '阅读室'}>
    <p className="deck-eyebrow" lang="en">MIDNIHT / READING ROOM</p>
    <h3>{en ? 'Draw a reading card' : '抽一张阅读卡'}</h3>
    <div className="deck-hand">
      {screens.slice(1).map((card, i) => <button type="button" key={card.src}
        style={{ '--angle': ((i - 1) * 6.5) + 'deg' }} aria-pressed={selected === i + 1}
        onClick={() => onSelect(selected === i + 1 ? 0 : i + 1)}>
        <small lang="en">VOL. 0{i + 1}</small><strong>{card.label[lang]}</strong>
      </button>)}
    </div>
    <div className="deck-page uxui-image-fold" key={screen.src}>
      <img src={screen.src} alt={screen.alt[lang]} />
      <AboutTextFold fromLeft />
    </div>
    <p className="deck-note" role="status">{selected ? notes[selected - 1][lang] :
      en ? 'Pick a volume to explore its screen.' : '选一卷看它的界面，再点一次回到阅读首页。'}</p>
    {onEnlarge && <button className="deck-enlarge" type="button" onClick={onEnlarge}>{en ? 'Enlarge screen ↗' : '放大界面 ↗'}</button>}
  </section>;
}
