import React from 'react';
import SectionHeader from '../components/SectionHeader';
import { modelUsage } from './model-usage';
import './models-tools.css';
import './model-usage.css';

export default function ModelUsage({ language = 'zh', tool = 'chatgpt', onNavigate }) {
  const index = tool === 'claude-code' ? 1 : 0;
  const name = index === 0 ? 'ChatGPT' : 'Claude Code';
  const id = index === 0 ? 'models-chatgpt' : 'models-claude-code';
  const t = modelUsage[language] || modelUsage.zh;
  const detail = t.tools[index];
  const back = <a className="model-usage-back" href="#models" onClick={onNavigate}>
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 12H3m6-6-6 6 6 6" /></svg>
    <span>{t.back}</span>
  </a>;
  return <section id={id} className="models-tools model-usage-page" lang={language === 'en' ? 'en' : 'zh-CN'}>
    <div className="models-art" aria-hidden="true"><div className="models-ribbon" /></div>
    <div className="models-page">
      <div>
        <SectionHeader eyebrow={'TOOLS / ' + name.toUpperCase()} title={t.pageTitle(name)} as="h1" />
        {back}
      </div>
      <article className="model-usage-article" aria-labelledby={id + '-title'}>
        <h2 id={id + '-title'}>{detail.title}</h2>
        <p className="model-usage-intro">{detail.intro}</p>
        <ol className="model-usage-steps">
          {detail.steps.map(([title, description], i) => <li key={title}>
            <span className="model-usage-number" aria-hidden="true">0{i + 1}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </li>)}
        </ol>
        <aside className="model-usage-project" aria-labelledby={id + '-project'}>
          <p className="model-usage-caption">{t.projectLabel}</p>
          <h3 id={id + '-project'} lang="en">{detail.project}</h3>
          <p>{detail.excerpt}</p>
        </aside>
      </article>
      <footer className="model-usage-footer">{back}</footer>
    </div>
  </section>;
}
