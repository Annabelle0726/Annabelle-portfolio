import React from 'react';
import SectionHeader from '../components/SectionHeader';
import './teams-quotes.css';

const sources = {
  felix: 'https://felixrieseberg.com/how-to-be-more-ambitious-a-tutorial-for-humans-with-models/',
  video: 'https://www.bilibili.com/video/BV1sphK66Ege/',
  work: 'https://www.anthropic.com/research/employment-at-anthropic',
  judgment: 'https://www.anthropic.com/research/agents-judgment-calls',
};

const copy = {
  zh: {
    title: '团队与语录',
    intro: '一些让我继续追问的文章、研究与片段。',
    featured: '精选摘录',
    quote: '我想让这个任务做得更深，而不是做得更大。',
    quoteNote: '文中提示词节选 · 译文',
    articleTitle: 'How to be more ambitious',
    articleSubtitle: 'A tutorial for humans with models',
    read: '阅读原文',
    videoCategory: '视频收藏',
    videoTitle: 'AI 时代，程序员的护城河在哪里？',
    videoDescription: '只会提产品需求，是工程师还是产品经理？',
    watch: '观看视频',
    coverNote: '主题插画',
    workCategory: '团队观察',
    workTitle: 'AI 正在怎样改变工作与招聘？',
    workDescription: '当智能体承担更多执行，团队如何重新理解人的贡献？',
    judgmentCategory: '独立判断',
    judgmentTitle: '我们的判断，如何受到 AI 的影响？',
    judgmentDescription: '与 AI 合作时，也审视自己接受建议的理由。',
    research: '阅读研究',
    previous: '模型与工具',
    next: '联系我',
    newTab: '（在新标签页打开）',
  },
  en: {
    title: 'Teams & quotes',
    intro: 'Articles, research, and moments that keep me asking questions.',
    featured: 'Selected quote',
    quote: 'I want a deeper version of this task, not a bigger one.',
    quoteNote: 'An excerpt from a prompt in the article',
    articleTitle: 'How to be more ambitious',
    articleSubtitle: 'A tutorial for humans with models',
    read: 'Read the article',
    videoCategory: 'Video collection',
    videoTitle: 'What is a programmer’s moat in the AI era?',
    videoDescription: 'If you only specify product requirements, are you an engineer or a product manager?',
    watch: 'Watch the video',
    coverNote: 'Editorial illustration',
    workCategory: 'Inside a team',
    workTitle: 'How AI is changing work and hiring',
    workDescription: 'As agents take on more execution, how do teams rethink human contributions?',
    judgmentCategory: 'Independent judgment',
    judgmentTitle: 'How does AI influence our judgment?',
    judgmentDescription: 'Working with AI also means examining why we accept its advice.',
    research: 'Read the research',
    previous: 'Models & tools',
    next: 'Get in touch',
    newTab: ' (opens in a new tab)',
  },
};

function SourceLink({ href, children, newTab }) {
  return <a className="quotes-source-link" href={href} target="_blank" rel="noopener noreferrer">
    <span>{children}</span><span aria-hidden="true">↗</span><span className="quotes-sr-only">{newTab}</span>
  </a>;
}

// An original editorial illustration, not the video's cover or a playback UI.
function VideoIllustration() {
  return <svg className="quotes-video-art" viewBox="0 0 600 180" fill="none" aria-hidden="true">
    <g className="quotes-blueprint-grid">
      {[40, 80, 120, 160].map(y => <path key={y} d={'M0 ' + y + 'H600'} />)}
      {[60, 120, 180, 240, 300, 360, 420, 480, 540].map(x => <path key={x} d={'M' + x + ' 0V180'} />)}
    </g>
    <circle className="quotes-blueprint-wash" cx="78" cy="166" r="96" />
    <circle className="quotes-blueprint-wash" cx="550" cy="20" r="74" />
    <g className="quotes-blueprint-blue">
      <path d="M233 47h-26v86h26M367 47h26v86h-26" strokeWidth="9" />
      <path d="m316 64-32 52" strokeWidth="3" />
      <path d="M25 102h120m-72-55v108M451 137h125m-65-96v121" strokeWidth="1" opacity=".4" />
    </g>
    <g className="quotes-blueprint-gold">
      <circle cx="310" cy="91" r="75" strokeDasharray="240 52" />
      <path d="M485 32 445 150m40-118 40 118M459 111h52" strokeWidth="2" />
      <circle cx="485" cy="32" r="7" strokeWidth="2" />
      <path d="M99 21c51 7 85 36 81 78s-29 57-64 73" opacity=".65" />
    </g>
    <circle className="quotes-blueprint-dot" cx="73" cy="102" r="5" />
  </svg>;
}

export default function TeamsQuotes({ language = 'zh', onNavigate }) {
  const t = copy[language] || copy.zh;
  return <section id="quotes" className="teams-quotes" lang={language === 'en' ? 'en' : 'zh-CN'}>
    <div className="quotes-art" aria-hidden="true"><div className="quotes-ribbon" /></div>
    <div className="quotes-page">
      <div className="quotes-opening">
        <SectionHeader eyebrow="TEAMS & QUOTES" title={t.title} />
        <p className="quotes-intro">{t.intro}</p>
      </div>
      <div className="quotes-grid">
        <article className="quotes-card quotes-featured" aria-labelledby="quotes-felix-title">
          <p className="quotes-kicker"><span aria-hidden="true">01 / </span>{t.featured}</p>
          <p className="quotes-byline">Felix Rieseberg <span aria-hidden="true">·</span> <time dateTime="2026-10-13">2026.10.13</time></p>
          <div className="quotes-excerpt">
            <span className="quotes-mark" aria-hidden="true">“</span>
            <blockquote><p>{t.quote}</p></blockquote>
            <p className="quotes-excerpt-note">{t.quoteNote}</p>
          </div>
          <div className="quotes-featured-source">
            <h3 id="quotes-felix-title" lang="en">{t.articleTitle}</h3>
            <p lang="en">{t.articleSubtitle}</p>
          </div>
          <div className="quotes-actions"><SourceLink href={sources.felix} newTab={t.newTab}>{t.read}</SourceLink><a className="quotes-note-link" href="#notes-felix" onClick={onNavigate}>{language === 'en' ? 'My reflections' : '我的思考'} <span aria-hidden="true">→</span></a></div>
        </article>
        <article className="quotes-card quotes-video" aria-labelledby="quotes-video-title">
          <p className="quotes-kicker"><span aria-hidden="true">02 / </span>{t.videoCategory}</p>
          <p className="quotes-byline"><span lang="zh-CN">荒野芯智观察</span> <span aria-hidden="true">·</span> Bilibili</p>
          <div className="quotes-video-copy">
            <h3 id="quotes-video-title">{t.videoTitle}</h3>
            <p className="quotes-description">{t.videoDescription}</p>
          </div>
          <figure className="quotes-video-figure"><VideoIllustration /><figcaption>{t.coverNote}</figcaption></figure>
          <div className="quotes-actions"><SourceLink href={sources.video} newTab={t.newTab}>{t.read}</SourceLink><a className="quotes-note-link" href="#notes-video" onClick={onNavigate}>{language === 'en' ? 'My reflections' : '我的思考'} <span aria-hidden="true">→</span></a></div>
        </article>
        <article className="quotes-card quotes-research" aria-labelledby="quotes-work-title">
          <p className="quotes-kicker"><span aria-hidden="true">03 / </span>{t.workCategory}</p>
          <p className="quotes-byline">Anthropic <span aria-hidden="true">·</span> <time dateTime="2026-10-16">2026.10.16</time></p>
          <h3 id="quotes-work-title">{t.workTitle}</h3>
          <p className="quotes-description">{t.workDescription}</p>
          <div className="quotes-actions"><SourceLink href={sources.work} newTab={t.newTab}>{t.read}</SourceLink><a className="quotes-note-link" href="#notes-work" onClick={onNavigate}>{language === 'en' ? 'My reflections' : '我的思考'} <span aria-hidden="true">→</span></a></div>
        </article>
        <article className="quotes-card quotes-research" aria-labelledby="quotes-judgment-title">
          <p className="quotes-kicker"><span aria-hidden="true">04 / </span>{t.judgmentCategory}</p>
          <p className="quotes-byline">Anthropic <span aria-hidden="true">·</span> <time dateTime="2026-10-27">2026.10.27</time></p>
          <h3 id="quotes-judgment-title">{t.judgmentTitle}</h3>
          <p className="quotes-description">{t.judgmentDescription}</p>
          <div className="quotes-actions"><SourceLink href={sources.judgment} newTab={t.newTab}>{t.read}</SourceLink><a className="quotes-note-link" href="#notes-judgment" onClick={onNavigate}>{language === 'en' ? 'My reflections' : '我的思考'} <span aria-hidden="true">→</span></a></div>
        </article>
      </div>
      <footer className="quotes-footer">
        <a className="quotes-previous" href="#models" onClick={onNavigate}><span aria-hidden="true">←</span> {t.previous}</a>
        <span className="quotes-footer-rule" aria-hidden="true" />
        <a className="quotes-next" href="#contact" onClick={onNavigate}>
          <span>{t.next}</span>
          <svg viewBox="0 0 76 52" fill="none" aria-hidden="true">
            <circle className="quotes-next-orbit" cx="49" cy="26" r="23" pathLength="100" />
            <g className="quotes-next-arrow"><path d="M5 26H56M48 18l8 8-8 8" /></g>
          </svg>
        </a>
      </footer>
    </div>
  </section>;
}
