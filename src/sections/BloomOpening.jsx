import React, { useState } from 'react';
import dawn from '../assets/web-overview/bloom-valley.webp';
import water from '../assets/bloom-case/chapters/water.jpg';
import rest from '../assets/bloom-case/chapters/rest.jpg';
import path from '../assets/bloom-case/chapters/path.jpg';
import meadow from '../assets/bloom-case/chapters/meadow.jpg';

// Adapted from the five chapters of Agency Bloom's WelcomeOpening.
const chapters = [
  { image: dawn, label: ['变化中的生活', 'Life in transition'],
    heading: ['我想过的生活', 'The life I want'], question: ['向前，想抵达哪里？', 'Where am I heading?'],
    note: ['向前的意义，也许藏在你想过的一天里。', 'Perhaps the answer is in the day you want to live.'] },
  { image: water, label: ['一起看见可能', 'Finding possibilities'],
    heading: ['那些想要的', 'The things I want'], question: ['也许还有更多选择', 'There may be other ways.'],
    note: ['多一点选择，也多一点自己的余地。', 'Another option can give you room to choose.'] },
  { image: rest, label: ['给休息一点余地', 'Room to rest'],
    heading: ['还没有成为理想的自己', 'Still becoming'], question: ['也可以先好好生活', 'I can rest along the way.'],
    note: ['休息，不需要先用成绩换取。', 'Rest is not something you have to earn.'] },
  { image: path, label: ['让体验带来新理解', 'Learning by trying'],
    heading: ['现实会划出边界', 'Life has its limits'], question: ['选择仍可以慢慢发生', 'I can take one small step.'],
    note: ['先试一点，再决定继续、调整，还是放一放。', 'Try a little, then decide whether to continue, adjust, or pause.'] },
  { image: meadow, label: ['从此刻开始', 'Starting here'],
    heading: ['我还想', 'What I still want'], question: ['按自己的意愿活一活', 'To live on my own terms.'],
    note: ['不用先有答案，也可以开始。', 'You can begin before you have an answer.'] },
];

export default function BloomOpening({ en, onNavigate }) {
  const [{ page, previous }, setScene] = useState({ page: 0, previous: null });
  function choose(next) {
    setScene(current => current.page === next ? current : { page: next, previous: current.page });
  }
  const lang = en ? 1 : 0;
  const chapter = chapters[page];
  return <section className="web-project-cover bloom-opening" aria-label={en ? 'Agency Bloom opening' : 'Agency Bloom 开场选读'}>
    <div className="opening-landscape" aria-hidden="true">
      {previous !== null && <img className="opening-view" src={chapters[previous].image} alt="" />}
      <div key={page} className={previous === null ? 'opening-exposure' : 'opening-exposure is-changing'}>
        <img className="opening-view" src={chapter.image} alt="" />
        <img className="opening-view opening-near" src={chapter.image} alt="" />
      </div>
    </div>
    <div className="opening-story" aria-live="polite" aria-atomic="true">
      <div className="opening-folio"><span>0{page+1} / 05</span>{chapter.label[lang]}</div>
      <h3><span>{chapter.heading[lang]}</span>{chapter.question[lang]}</h3>
      <p>{chapter.note[lang]}</p>
    </div>
    <div className="opening-nav">
      <div className="opening-dots" role="group" aria-label={en ? 'Choose a chapter' : '选择章节'}>
        {chapters.map((item,i) => <button key={item.image} type="button" aria-pressed={page===i}
          aria-label={`0${i+1} / ${item.label[lang]}`} onClick={() => choose(i)}><span /></button>)}
      </div>
      {page < chapters.length-1 ? <button type="button" className="opening-next" onClick={() => choose(page+1)}>
        {en ? 'Next chapter' : '下一章'}<ChapterArrow />
      </button> : <a className="opening-next" href="#web-agency-bloom" onClick={onNavigate}>{en ? 'View project' : '进入项目'}<ChapterArrow outgoing /></a>}
    </div>
  </section>;
}

function ChapterArrow({ outgoing = false }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeLinejoin="round">
    <path d={outgoing ? 'M6 18 18 6M7 6h11v11' : 'M4 12h15m-6-6 6 6-6 6'} />
  </svg>;
}
