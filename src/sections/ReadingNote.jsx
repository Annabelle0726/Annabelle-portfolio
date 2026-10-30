import React, { useEffect, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { readingNotes } from './reading-notes';
import './teams-quotes.css';
import './reading-note.css';

export default function ReadingNote({ noteId, language = 'zh', onNavigate }) {
  const key = noteId.replace('notes-', '');
  const note = readingNotes[key];
  const en = language === 'en';
  const t = note[en ? 'en' : 'zh'];
  const index = String(Object.keys(readingNotes).indexOf(key) + 1).padStart(2, '0');
  const headings = en ? ['Why save this', 'How I understand it', 'What I want to test'] : ['为什么收藏', '我如何理解', '想亲自验证'];
  const back = en ? 'Teams & quotes' : '团队与语录';
  const [activeChapter, setActiveChapter] = useState(0);
  useEffect(() => {
    const chapters = [...document.querySelectorAll(`#${noteId} .note-chapter`)];
    const update = () => {
      const line = window.innerHeight * .35;
      let current = 0;
      chapters.forEach((chapter, i) => {
        if (chapter.getBoundingClientRect().top <= line) current = i;
      });
      const last = chapters.at(-1)?.getBoundingClientRect();
      if (last && last.top < window.innerHeight * .8 && last.bottom <= window.innerHeight + 1) current = chapters.length - 1;
      setActiveChapter(current);
    };
    // Observe each heading crossing the reading line, including reverse scrolling.
    const observer = new IntersectionObserver(update, { rootMargin: '0px 0px -65% 0px', threshold: [0, 1] });
    chapters.forEach(chapter => observer.observe(chapter.querySelector('h2')));
    const endObserver = new IntersectionObserver(update, { threshold: [0, 1] });
    if (chapters.length) endObserver.observe(chapters.at(-1));
    update();
    window.addEventListener('resize', update);
    return () => { observer.disconnect(); endObserver.disconnect(); window.removeEventListener('resize', update); };
  }, [noteId, language]);
  const jumpToChapter = i => {
    const target = document.getElementById(`${noteId}-chapter-${i}`);
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  const contents = mobile => <nav className={`note-toc${mobile ? ' note-toc-mobile' : ''}`} aria-label={en ? 'On this page' : '本页目录'}>
    <p className="note-toc-label">{en ? 'ON THIS PAGE' : '本页目录'}</p>
    <ol>{headings.map((heading, i) => <li key={heading}><button type="button" onClick={() => jumpToChapter(i)} aria-current={activeChapter === i ? 'location' : undefined}>
      <span className="note-toc-dot" aria-hidden="true" /><span className="note-toc-number" aria-hidden="true">0{i + 1}</span><span>{heading}</span>
    </button></li>)}</ol>
  </nav>;
  return <section id={noteId} className="teams-quotes reading-note" lang={en ? 'en' : 'zh-CN'}>
    <div className="quotes-art" aria-hidden="true"><div className="quotes-ribbon" /></div>
    <div className="quotes-page">
      <SectionHeader eyebrow="READING NOTES" title={en ? 'My reflections' : '我的思考'} />
      <a className="quotes-previous note-back" href="#quotes" onClick={onNavigate}>← {back}</a>
      <div className="note-layout">
        <div className="note-introduction">
          <p className="quotes-kicker">{index} / {en ? 'Reading note' : '阅读笔记'}</p>
          <h1>{t.title}</h1>
          {key === 'felix' ? <div className="note-quotation"><span aria-hidden="true">“</span><blockquote><p>{en ? 'I want a deeper version of this task, not a bigger one.' : '我想让这个任务做得更深，而不是做得更大。'}</p><cite>Felix Rieseberg · {en ? 'Prompt excerpt from the article' : '文中提示词节选 · 译文'}</cite></blockquote></div> : <p className="note-lead">{t.lead}</p>}
          <p className="note-editorial-label">{en ? 'Why I saved this, questions I am still exploring, and what I want to try next.' : '记下收藏的理由、还在追问的问题，以及接下来想尝试的事。'}</p>
        </div>
        <div className="note-reading-body">
          {contents(true)}
          <div className="note-chapters">
          {t.prompts.map(([title, body, prompt], i) => <section id={`${noteId}-chapter-${i}`} tabIndex={-1} className="note-chapter" key={headings[i]} aria-labelledby={`note-chapter-${i}`}>
            <span className="note-number" aria-hidden="true">0{i + 1}</span>
            <div><h2 id={`note-chapter-${i}`}>{headings[i]}</h2><h3>{title}</h3><p>{body}</p><p className="note-prompt">{prompt}</p></div>
          </section>)}
          </div>
        </div>
        <aside className="note-source" aria-label={en ? 'Source information' : '来源信息'}>
          <p className="note-source-eyebrow">THE SOURCE</p>
          <p className="note-author">{note.source}</p>
          <h2>{note.sourceTitle}</h2>
          <p>{note.subtitle}</p>
          {note.date && <time dateTime={note.date.replaceAll('.', '-')}>{note.date}</time>}
          <p className="note-topic">{t.topic}</p>
          <a className="quotes-source-link" href={note.url} target="_blank" rel="noopener noreferrer">{en ? 'Read original' : '阅读原文'} <span aria-hidden="true">↗</span><span className="quotes-sr-only">{en ? ' (opens in a new tab)' : '（在新标签页打开）'}</span></a>
          <div className="note-bookmark" aria-hidden="true" />
          {contents(false)}
        </aside>
      </div>
      <footer className="quotes-footer note-footer">
        <a className="quotes-previous" href="#quotes" onClick={onNavigate}>← {en ? 'Back to collection' : '返回团队与语录'}</a>
        <a className="quotes-next" href="#contact" onClick={onNavigate}><span>{en ? 'Get in touch' : '联系我'}</span><svg viewBox="0 0 76 52" fill="none" aria-hidden="true"><circle className="quotes-next-orbit" cx="49" cy="26" r="23" pathLength="100" /><g className="quotes-next-arrow"><path d="M5 26H56M48 18l8 8-8 8" /></g></svg></a>
      </footer>
    </div>
  </section>;
}
