import WebProjectNav from '../components/WebProjectNav';
import React from 'react';
import SectionHeader from '../components/SectionHeader';
import openai from '../assets/tool-icons/openai.svg';
import claude from '../assets/tool-icons/claude.svg';
import './models-tools.css';

const content = {
  zh: {
    title: '模型与工具',
    intro: '我用它们推敲想法、推进实现，也不断检查自己的判断',
    skillsTitle: '我的 Skills 选集',
    skillsIntro: '把常用的方法，放进具体的工作里。',
    usage: '我的使用方式', next: '团队与语录',
    tools: [
      { name: 'ChatGPT', role: '思考 · 研究 · 表达', description: '把还没成形的想法带进对话，通过讨论、查证与修改，逐渐明确自己在意什么。', topics: ['产品方向', '方案推敲', '文字表达'] },
      { name: 'Claude Code', role: '界面观察 · 交互优化 · 视觉验收', description: '我喜欢让 Claude Code 直接查看页面，从布局、排版到交互反馈，发现设计与实际呈现之间的差距，再通过代码把细节调整到位。', topics: ['界面观察', '交互优化', '视觉验收'] },
    ],
    skills: [
      ['把问题问清楚', 'GrillMe', '追问目标、前提与真正需要解决的问题。'],
      ['组织开发过程', 'Superpowers', '拆解任务，寻找原因，核对完成结果。'],
      ['检查真实页面', 'Browser', '查看界面、操作流程，确认实际体验。'],
      ['探索视觉表达', 'ImageGen · Visualize', '用图像与交互草图比较不同方向。'],
      ['整理交付材料', 'Documents · PDF · Slides · Sheets', '把资料组织成清晰、可使用的成果。'],
      ['保留自己的表达', 'Write Like Me', '让文字更准确，也更接近自己的语气。'],
    ],
  },
  en: {
    title: 'Models & tools',
    intro: 'Tools I use to explore ideas, build things, and keep checking my own judgment',
    skillsTitle: 'My Skills selection',
    skillsIntro: 'Useful methods, woven into everyday work.',
    usage: 'How I use it', next: 'Teams & quotes',
    tools: [
      { name: 'ChatGPT', role: 'Thinking · Research · Writing', description: 'I bring unfinished ideas into conversation, then discuss, check, and revise them to clarify what matters to me.', topics: ['Product direction', 'Exploring options', 'Writing'] },
      { name: 'Claude Code', role: 'UI observation · Interaction refinement · Visual review', description: 'I like asking Claude Code to inspect actual pages, from layout and typography to interaction feedback, then refine the code to close the gap between the design and what appears on screen.', topics: ['UI observation', 'Interaction refinement', 'Visual review'] },
    ],
    skills: [
      ['Ask better questions', 'GrillMe', 'Clarify goals, assumptions, and the real problem.'],
      ['Structure development', 'Superpowers', 'Break down tasks, find causes, and check results.'],
      ['Check real pages', 'Browser', 'Inspect interfaces, flows, and the actual experience.'],
      ['Explore visual ideas', 'ImageGen · Visualize', 'Compare directions with images and interactive sketches.'],
      ['Prepare deliverables', 'Documents · PDF · Slides · Sheets', 'Turn source material into clear, usable outputs.'],
      ['Keep my own voice', 'Write Like Me', 'Make writing more precise while keeping my voice.'],
    ],
  },
};

export default function ModelsTools({ language = 'zh', onNavigate, id = 'models' }) {
  const t = content[language] || content.zh;
  return <section id={id} className="models-tools" lang={language === 'en' ? 'en' : 'zh-CN'}>
    <div className="models-art" aria-hidden="true"><div className="models-ribbon" /></div>
    <div className="models-page">
      <div className="models-opening">
        <SectionHeader eyebrow="TOOLS" title={t.title} />
        <p className="models-intro">{t.intro}</p>
      </div>
      <div className="models-cards">
        {t.tools.map((tool, i) => <article className="model-card" key={tool.name} aria-labelledby={'model-name-' + i}>
          <header className="model-card-heading">
            <span className="model-logo" style={{ '--tool-logo': `url("${[openai, claude][i]}")` }} aria-hidden="true" />
            <div className="model-identity">
              <div className="model-name-line"><h3 id={'model-name-' + i}>{tool.name}</h3></div>
              <p className="model-role">{tool.role}</p>
            </div>
            <span className="model-index" aria-hidden="true">0{i + 1}</span>
          </header>
          <p className="model-description">{tool.description}</p>
          <ul className="model-topics">{tool.topics.map(topic => <li key={topic}>{topic}</li>)}</ul>
          <a className="model-usage-link" href={i === 0 ? '#models-chatgpt' : '#models-claude-code'} onClick={onNavigate} aria-label={t.usage + ' · ' + tool.name}>
            <span>{t.usage}</span>
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 10h13m-5-5 5 5-5 5" /></svg>
          </a>
        </article>)}
      </div>
      <section className="models-skills" aria-labelledby="models-skills-title">
        <header className="models-skills-heading">
          <div><p className="models-kicker" lang="en">A SELECTED TOOLKIT</p><h3 id="models-skills-title">{t.skillsTitle}</h3></div>
          <p className="models-skills-intro">{t.skillsIntro}</p>
        </header>
        <ol className="models-skills-grid">
          {t.skills.map(([title, name, description], i) => <li key={name}>
            <div className="model-skill-title"><span aria-hidden="true">0{i + 1}</span><h4>{title}</h4></div>
            <p className="model-skill-name" lang="en">{name}</p>
            <p className="model-skill-description">{description}</p>
          </li>)}
        </ol>
      </section>
      <WebProjectNav en={language === 'en'} onNavigate={onNavigate} previous={{ href: '#agency-bloom', label: language === 'en' ? 'WeChat articles' : '微信公众号' }} next={{ href: '#quotes', label: t.next }} />
    </div>
  </section>;
}
