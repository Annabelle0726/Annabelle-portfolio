import React, { useState } from 'react';
import dawn from '../assets/bloom-case/chapters/dawn.jpg';
import water from '../assets/bloom-case/chapters/water.jpg';
import rest from '../assets/bloom-case/chapters/rest.jpg';
import path from '../assets/bloom-case/chapters/path.jpg';
import meadow from '../assets/bloom-case/chapters/meadow.jpg';

// Adapted from the five chapters of Agency Bloom's WelcomeOpening.
const chapters = [
  { image: dawn, accent: '#883e2d', label: ['变化中的生活', 'Life in transition'],
    heading: ['我想过的生活', 'The life I want'], question: ['向前，想抵达哪里？', 'Where am I heading?'],
    note: ['向前的意义，也许藏在你想过的一天里。', 'Perhaps the answer is in the day you want to live.'] },
  { image: water, accent: '#245c55', label: ['一起看见可能', 'Finding possibilities'],
    heading: ['那些想要的', 'The things I want'], question: ['也许还有更多选择', 'There may be other ways.'],
    note: ['多一点选择，也多一点自己的余地。', 'Another option can give you room to choose.'] },
  { image: rest, accent: '#794525', label: ['给休息一点余地', 'Room to rest'],
    heading: ['还没有成为理想的自己', 'Still becoming'], question: ['也可以先好好生活', 'I can rest along the way.'],
    note: ['休息，不需要先用成绩换取。', 'Rest is not something you have to earn.'] },
  { image: path, accent: '#405832', label: ['让体验带来新理解', 'Learning by trying'],
    heading: ['现实会划出边界', 'Life has its limits'], question: ['选择仍可以慢慢发生', 'I can take one small step.'],
    note: ['先试一点，再决定继续、调整，还是放一放。', 'Try a little, then decide whether to continue, adjust, or pause.'] },
  { image: meadow, accent: '#50542c', label: ['从此刻开始', 'Starting here'],
    heading: ['我还想', 'What I still want'], question: ['按自己的意愿活一活', 'To live on my own terms.'],
    note: ['不用先有答案，也可以开始。', 'You can begin before you have an answer.'] },
];

export default function BloomOpening({ en, onNavigate }) {
  const [page, setPage] = useState(0);
  const lang = en ? 1 : 0;
  const chapter = chapters[page];
  return <section className="web-project-cover bloom-opening" aria-label={en ? 'Agency Bloom opening' : 'Agency Bloom 开场选读'}>
    <img className="opening-view" key={chapter.image} src={chapter.image} alt="" />
    <div className="opening-brand" lang="en">AGENCY BLOOM</div>
    <div className="opening-story" aria-live="polite" aria-atomic="true">
      <small>0{page+1} / {chapter.label[lang]}</small>
      <h3>{chapter.heading[lang]}<em style={{color:chapter.accent}}>{chapter.question[lang]}</em></h3>
    </div>
    <div className="opening-bottom">
      <p>{chapter.note[lang]}</p>
      <div className="opening-nav">
        <div className="opening-dots" role="group" aria-label={en ? 'Choose a chapter' : '选择章节'}>
          {chapters.map((item,i) => <button key={item.image} type="button" aria-pressed={page===i}
            aria-label={`0${i+1} / ${item.label[lang]}`} onClick={() => setPage(i)}><span /></button>)}
        </div>
        {page < chapters.length-1 ? <button type="button" className="opening-next" onClick={() => setPage(page+1)}>
          {en ? 'Read on' : '继续阅读'} →
        </button> : <a className="opening-next" href="#web-agency-bloom" onClick={onNavigate}>{en ? 'Explore project' : '了解项目'} ↗</a>}
      </div>
    </div>
  </section>;
}
