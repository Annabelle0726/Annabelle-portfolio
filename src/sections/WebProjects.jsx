import React, { useRef, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import SomniaCase from './SomniaCase';
import BloomRibbon from '../components/BloomRibbon';
import opening from '../assets/bloom-case/opening.webp';
import concerns from '../assets/bloom-case/concerns.webp';
import preferences from '../assets/bloom-case/preferences.webp';
import progress from '../assets/bloom-case/progress.webp';
import poster from '../assets/bloom-case/demo-poster.webp';
import demo from '../assets/bloom-case/demo.mp4';
import belayPreview from '../assets/belay-case/success.webp';
import somniaHome from '../assets/somnia-case/home.webp';
import somniaLibrary from '../assets/somnia-case/library.webp';
import overviewRibbon from '../assets/web-overview/blue-silk-gold-bell.webp';
import './web-projects.css';

const projects = [
  { id: 'web-agency-bloom', name: 'Agency Bloom', type: ['独立产品 · 微信小程序', 'Independent product · WeChat mini program'], summary: ['围绕探索、选择与行动，把自己的想法带向真实的生活。', 'A space to explore, make choices, and carry your ideas into everyday life.'] },
  { id: 'web-belay', name: 'Belay', type: ['协作开发 · AI 学习工具', 'Collaborative development · AI learning tool'], summary: ['围绕学习过程，参与界面、会话保存与恢复，以及访问和预算管理。', 'Contributing to the learning experience, conversation persistence, access, and budget management.'] },
  { id: 'web-somnia', name: 'Somnia Library', type: ['二次开发 · 阅读管理', 'Product adaptation · Reading management'], summary: ['基于 Reverie 的二次开发，探索个人书架与阅读体验的界面和交互。', 'An adaptation of Reverie exploring interfaces and interactions for a personal library and reading experience.'] },
];

function Screenshot({ src, label, en, className = '', eager = false }) {
  const dialog = useRef(null);
  return <figure className={`web-screen ${className}`}>
    <button type="button" onClick={() => dialog.current.showModal()} aria-label={`${en ? 'Enlarge: ' : '放大查看：'}${label}`}>
      <img src={src} alt={label} width="944" height="2048" loading={eager ? 'eager' : 'lazy'} decoding="async" />
      <span className="web-screen-zoom" aria-hidden="true">↗</span>
    </button>
    <figcaption>{label}</figcaption>
    <dialog ref={dialog} className="web-image-dialog" aria-label={label} onClick={event => {
      if (event.target !== event.currentTarget) return;
      const r = event.currentTarget.getBoundingClientRect();
      if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.current.close();
    }}>
      <div className="web-dialog-bar"><span>{label}</span><button type="button" autoFocus onClick={() => dialog.current.close()}>{en ? 'Close ×' : '关闭 ×'}</button></div>
      <img src={src} alt={label} width="944" height="2048" />
    </dialog>
  </figure>;
}

function ChapterTitle({ number, eyebrow, children }) {
  return <header className="web-chapter-title"><p className="web-kicker">{number} / {eyebrow}</p><h2>{children}</h2></header>;
}

function ProjectPreview({ project, en }) {
  const belay = project.id === 'web-belay';
  return <div className={`web-preview-stage ${belay ? 'web-preview-belay' : 'web-preview-somnia'}`}>
    <div className="web-preview-window">
      <img src={belay ? belayPreview : somniaHome}
        alt={belay ? (en ? 'Belay learning workspace with code, results, and AI feedback' : 'Belay 学习工作区：代码、运行结果与 AI 反馈') : (en ? 'Somnia Library homepage and reading discovery' : 'Somnia Library 首页与选书引导')}
        width={belay ? 1900 : 1600} height={belay ? 1460 : 746} loading="lazy" decoding="async" />
    </div>
    {!belay && <img className="web-preview-inset" src={somniaLibrary} alt={en ? 'Somnia personal bookshelf' : 'Somnia 个人书架界面'} width="1600" height="741" loading="lazy" decoding="async" />}
  </div>;
}

function BloomCase({ en, onNavigate }) {
  const t = (zh, english) => en ? english : zh;
  const story = useRef(null), videoSection = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const jump = ref => {
    ref.current.focus({ preventScroll: true });
    ref.current.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  return <>
    <div className="web-case-opening">
    <SectionHeader as="h1" eyebrow="INDEPENDENT PRODUCT" title="Agency Bloom" className="web-bloom-title" />
    <BloomRibbon />
    <div className="web-case-hero">
      <div className="web-hero-copy">
        <p className="web-hero-line">{t('把自己的想法，带向真实的生活。', 'Bring your ideas into the life you want to live.')}</p>
        <p className="web-lead">{t('一款围绕探索、选择与行动展开的微信小程序。从工作、学习与生活中的具体困扰出发，帮助用户梳理想法、比较可能，并记录自己的尝试。', 'A WeChat mini program built around exploration, choice, and action. Starting with real questions about work, learning, and everyday life, it helps people organize their thoughts, explore possibilities, and record what they try.')}</p>
        <div className="web-actions"><button className="web-button" type="button" onClick={() => jump(videoSection)}>{t('观看演示', 'Watch the demo')} <span aria-hidden="true">▷</span></button><button className="web-text-button" type="button" onClick={() => jump(story)}>{t('了解设计过程', 'Explore the design')} <span aria-hidden="true">↓</span></button></div>
        <p className="web-status"><span aria-hidden="true" />{t('微信小程序 · 已上线', 'WeChat mini program · Launched')}</p>
      </div>
    </div>
      <div className="web-hero-screens">
        <Screenshot src={opening} label={t('从想过的生活出发', 'Start with the life you want')} en={en} eager />
        <Screenshot src={progress} label={t('把尝试与进展留下来', 'Keep a record of your next steps')} en={en} eager />
      </div>
    <dl className="web-facts">
      <div><dt>{t('我的角色', 'My role')}</dt><dd>{t('产品构思 · 交互设计 · 前后端开发', 'Product concept · Interaction design · Frontend & backend')}</dd></div>
      <div><dt>{t('产品形态', 'Platform')}</dt><dd>{t('微信小程序', 'WeChat mini program')}</dd></div>
      <div><dt>{t('工作范围', 'Scope')}</dt><dd>{t('从需求梳理到上线迭代', 'From requirements to launch and iteration')}</dd></div>
    </dl>
    </div>
    <section className="web-chapter web-start" ref={story} tabIndex={-1}>
      <div className="web-prose">
        <ChapterTitle number="01" eyebrow="START WITH WHAT MATTERS">{t('从说不清的困扰开始', 'Start before the question is clear')}</ChapterTitle>
        <p>{t('人们并不总能一开始就清楚表达自己需要什么。工作、学习与生活中的选择，往往还夹杂着情绪、现实条件和未知。我希望让用户在还没有完整答案、甚至还没想好怎样提问的时候，也能开始一次有意义的探索。', 'People do not always arrive knowing exactly what they need. Choices about work, learning, and life are often tangled with feelings, practical constraints, and uncertainty. I wanted to make room for exploration even before someone knows how to phrase the question.')}</p>
        <p>{t('因此，引导从可多选的具体困扰开始，同时保留用自己的话补充的空间。用户可以先指出眼下在意什么，再逐步说清已有的经验、想了解的问题与现实限制。', 'The introduction starts with concrete concerns that people can select together, while leaving room for their own words. They can identify what matters now, then build up the context of their experience, questions, and constraints.')}</p>
        <p>{t('回应方式也交给用户选择：先听我说、发现新的可能、比较几个选择，或尝试一个小实验。不同需要对应不同的交流方式，不要求每次对话都立刻形成行动。', 'Users also choose how they want the conversation to unfold: being heard, discovering possibilities, comparing options, or trying a small experiment. A useful conversation does not always need to end with an action.')}</p>
      </div>
      <div className="web-onboarding-screens"><Screenshot src={concerns} label={t('多选与自由表达并存', 'Multiple choices, with room for your own words')} en={en}/><Screenshot src={preferences} label={t('回应方式由用户选择', 'Let the user choose the kind of support')} en={en}/></div>
    </section>
    <section className="web-chapter">
      <ChapterTitle number="02" eyebrow="CHOICE & FOLLOW-THROUGH">{t('让交流延续到现实里', 'Carry the conversation into real life')}</ChapterTitle>
      <div className="web-steps">{[
        [t('梳理', 'Clarify'), t('把在意的事情、已有经验和现实条件说清楚，让模糊的问题有可以讨论的起点。', 'Put priorities, experience, and practical constraints into words so the question has a starting point.')],
        [t('选择', 'Choose'), t('讨论不同方向的前提、代价与未知。决策卡整理已确认的信息，让下一步有据可依。', 'Consider the assumptions, tradeoffs, and unknowns behind different options. A decision card brings confirmed information together.')],
        [t('尝试与回看', 'Try and reflect'), t('由用户确认愿意尝试的一步，再记录现实中的进展。也可以暂停、调整或改变主意。', 'Choose a step you are willing to try, then record what happens. Pausing, adjusting, or changing your mind remain valid choices.')],
      ].map(([title, body], i) => <div key={title}><span className="web-step-number">0{i + 1}</span><h4>{title}</h4><p>{body}</p></div>)}</div>
      <div className="web-followup"><div className="web-progress-detail"><img src={progress} alt={t('行动记录页：记录新进展、调整这一步、先放一放或换个方向', 'Action record: add an update, adjust the step, pause, or change direction')} width="944" height="2048" loading="lazy"/></div><div className="web-prose"><h4>{t('记录进展，也保留调整的余地', 'Room for progress—and a change of direction')}</h4><p>{t('我把后续记录也看作产品体验的一部分。用户再次打开时，可以围绕同一件事继续交流，把做过的尝试、遇到的新情况和改变的想法留下来。一次讨论由此有机会成为持续探索的起点。', 'Follow-up is part of the product experience. When people return, they can continue around the same question and record what they tried, what changed, and what they now think. A conversation can become the starting point for ongoing exploration.')}</p><p className="web-note">{t('选择权始终属于用户。AI 提供整理和讨论的支持，现实中的判断与行动由人来决定。', 'The choice stays with the user. AI supports reflection and discussion; people make the decisions and take action in their own lives.')}</p></div></div>
    </section>
    <section className="web-chapter web-demo-section" ref={videoSection} tabIndex={-1}>
      <div className="web-prose"><ChapterTitle number="03" eyebrow="SEE IT IN USE">{t('看一次真实的交流', 'See a conversation unfold')}</ChapterTitle><p>{t('这段演示从“快毕业了，还没找到工作，AI 又发展得很快”的具体困扰开始，展示用户如何补充经历、继续追问，并把讨论推向更具体的下一步。', 'This demo starts with a concrete concern: approaching graduation without a job while AI is changing quickly. It shows the user adding context, continuing the discussion, and considering a more specific next step.')}</p><p>{t('求职是其中一个使用场景；产品也围绕学习、创作和生活中的选择展开。', 'Job searching is one use case. The product also makes room for choices about learning, creating, and everyday life.')}</p><span className="web-media-label">00:43 / {t('真机演示 · 中文', 'Product demo · Chinese')}</span><p className="web-note">{t('点击播放，可使用播放器展开全屏。', 'Press play; use the player controls to enter full screen.')}</p><a className="web-inline-link" href={demo} download="agency-bloom-demo.mp4">{t('下载演示视频', 'Download the demo')} ↗</a>
        <details className="web-demo-text"><summary>{t('演示内容文字说明', 'Read the demo walkthrough')}</summary><ol>
          <li>{t('用户提出困扰：临近毕业、还没找到工作，也担心跟不上 AI 的变化。Bloom 先询问已经做过哪些尝试。', 'The user is approaching graduation without a job and worries about keeping up with AI. Bloom asks what they have tried so far.')}</li>
          <li>{t('用户补充：喜欢用 AI 辅助开发产品，但还没有得到明确的付费反馈。对话进一步区分个人兴趣与真实需求验证。', 'The user enjoys building products with AI but has not received clear feedback about willingness to pay. The conversation separates personal interest from testing real demand.')}</li>
          <li>{t('用户询问先找工作还是继续做产品。Bloom 建议先解决收入问题，同时以较小的时间投入验证产品，并提出联系潜在使用者、了解现有做法与付费经历的尝试。', 'The user asks whether to find a job or keep building. Bloom suggests addressing income needs while testing the product with a limited time commitment, starting with conversations about potential users’ current practices and payment experiences.')}</li>
          <li>{t('演示最后进入行动记录页：选一个做过的产品，写下三个可以联系的人。用户可以记录进展、调整这一步、暂停或换个方向。', 'The demo ends on the action record: choose one product and list three people to contact. Users can record progress, adjust the step, pause, or change direction.')}</li>
        </ol><p>{t('以上为画面内容整理，原视频保留中文配音。', 'This is a written walkthrough of the on-screen content. The original video retains its Chinese voiceover.')}</p></details></div>
      <div className="web-video-frame"><video controls playsInline preload="none" poster={poster} aria-label={t('Agency Bloom 43 秒中文演示', 'Agency Bloom 43-second demo in Chinese')} onError={() => setVideoError(true)}><source src={demo} type="video/mp4"/>{t('你的浏览器暂不支持视频播放。', 'Your browser does not support this video.')}</video>{videoError && <p role="status">{t('视频暂时无法播放，可使用旁边的下载链接查看。', 'The video could not load. Please use the download link to view it.')}</p>}</div>
    </section>
    <section className="web-chapter"><ChapterTitle number="04" eyebrow="MY CONTRIBUTION">{t('我在其中做了什么', 'My work on the product')}</ChapterTitle><div className="web-contributions">{[
      [t('产品与流程', 'Product & flows'), t('从使用场景出发，梳理引导、对话、决策卡与后续记录之间的关系，明确每一步需要用户理解和确认的信息。', 'Shaped the relationship between onboarding, conversation, decision cards, and follow-up, identifying what users need to understand and confirm at each step.')],
      [t('界面与交互', 'Interface & interaction'), t('设计页面结构、主题与操作反馈，持续检查文字密度、选择状态、按钮响应和移动端阅读体验。', 'Designed page structure, themes, and interaction feedback, refining text density, selection states, button responses, and mobile readability.')],
      [t('开发与迭代', 'Development & iteration'), t('参与前后端实现、数据管理和功能验证，将产品上线，并通过实际使用继续检查会话衔接、信息保存与功能可靠性。', 'Worked across frontend and backend implementation, data management, and validation, launching the product and checking conversation continuity, saved information, and reliability through use.')],
    ].map(([title, body], i) => <article key={title}><span className="web-step-number">0{i + 1}</span><h4>{title}</h4><p>{body}</p></article>)}</div></section>
    <footer className="web-case-footer"><div><small>AGENCY BLOOM</small><p>{t('探索、选择，然后亲自尝试。', 'Explore, choose, and try it for yourself.')}</p></div><a href="#web-belay" onClick={onNavigate}><small>{t('下一个项目', 'NEXT PROJECT')}</small><strong>Belay <span aria-hidden="true">→</span></strong></a></footer>
  </>;
}

function RelatedCase({ project, en, onNavigate }) {
  const t = (zh, english) => en ? english : zh;
  const belay = project.id === 'web-belay';
  const parts = belay ? [
    [t('学习者的使用体验', 'The learner experience'), t('围绕学习者如何进入工具、展开对话并继续学习，参与界面与使用流程的改进。', 'Contributed to interfaces and flows for entering the tool, starting conversations, and continuing the learning process.')],
    [t('让会话能够继续', 'Conversation continuity'), t('参与会话持久化、保存与恢复，让学习过程中的讨论能够继续，而不必每次重新开始。', 'Worked on conversation persistence, saving, and recovery so discussions can continue across sessions.')],
    [t('使用范围与运行管理', 'Access & operation'), t('围绕班级隔离、访问控制与模型调用预算，参与运行约束和集成方式的梳理。', 'Contributed to class separation, access control, model usage budgets, and integration constraints.')],
  ] : [
    [t('从原有产品继续发展', 'Building on an existing product'), t('Somnia Library 基于 Greg 的 Reverie 进行二次开发。在原有阅读产品的基础上，我参与首页、认证与书籍界面的改进。', 'Somnia Library is an adaptation of Greg’s Reverie. My contributions build on the existing reading product, including improvements to the homepage, authentication, and book interfaces.')],
    [t('阅读内容的组织', 'Organizing the reading experience'), t('围绕书架和书籍信息，探索更清楚的信息层级，让内容与操作入口更容易被找到。', 'Explored clearer information hierarchy around the library and book information, making content and actions easier to find.')],
    [t('跨屏幕的交互', 'Interaction across screens'), t('参与移动端导航与页面布局改进，关注桌面与手机上的操作路径和阅读体验。', 'Contributed to mobile navigation and layout improvements, with attention to interaction paths and readability across desktop and mobile.')],
  ];
  return <><header className="web-related-intro"><p className="web-kicker">{en ? project.type[1] : project.type[0]}</p><h2>{project.name}</h2><p className="web-lead">{en ? project.summary[1] : project.summary[0]}</p></header><div className="web-contributions">{parts.map(([title, body], i) => <article key={title}><span className="web-step-number">0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div><nav className="web-related-links" aria-label={t('其他项目', 'Other projects')}>{projects.filter(p => p.id !== project.id).map(p => <a key={p.id} href={'#' + p.id} onClick={onNavigate}>{p.name} ↗</a>)}</nav></>;
}

export default function WebProjects({ language = 'zh', projectId = 'portfolio', onNavigate }) {
  if (projectId === 'web-somnia') return <SomniaCase language={language} onNavigate={onNavigate} />;
  const en = language === 'en', t = (zh, english) => en ? english : zh;
  const project = projects.find(p => p.id === projectId);
  return <section className={`web-project-page${projectId === 'portfolio' ? ' web-overview' : ''}`} id={projectId} lang={en ? 'en' : 'zh-CN'}>
    {projectId === 'portfolio' && <div className="web-overview-art" aria-hidden="true">{['top', 'middle', 'bottom'].map(position => <img key={position} className={`web-overview-ribbon web-overview-ribbon-${position}`} src={overviewRibbon} alt="" width="1024" height="1536" />)}</div>}
    <div className="web-project-inner">
    {projectId !== 'web-agency-bloom' && <SectionHeader as="h1" eyebrow="PROJECTS / WEB & DESIGN" title={t('网站与设计', 'Web & design')}/>}
    {project ? <>{projectId !== 'web-agency-bloom' && <nav className="web-breadcrumb" aria-label={t('面包屑导航', 'Breadcrumb')}><a href="#portfolio" onClick={onNavigate}>{t('网站与设计', 'Web & design')}</a><span aria-hidden="true">/</span><span>{project.name}</span></nav>}{projectId === 'web-agency-bloom' ? <BloomCase en={en} onNavigate={onNavigate}/> : <RelatedCase project={project} en={en} onNavigate={onNavigate}/>}</> : <>
      <div className="web-overview-intro"><p>{t('从想法到体验，把产品做出来。', 'From an idea to an experience people can use.')}</p></div>
      <div className="web-project-list">{projects.map((p, i) => <article key={p.id} className={`web-project-row${i === 1 ? ' web-project-row-reverse' : ''}`} ><a className="web-project-cover" href={'#' + p.id} onClick={onNavigate} aria-label={t('查看 ', 'Explore ') + p.name}>{i === 0 ? <div className="web-cover-pair"><img src={opening} alt={t('Agency Bloom 开场界面', 'Agency Bloom opening screen')}/><img src={progress} alt={t('Agency Bloom 行动记录', 'Agency Bloom action record')}/></div> : <ProjectPreview project={p} en={en} />}</a><div className="web-project-summary"><p className="web-kicker">0{i + 1} / {en ? p.type[1] : p.type[0]}</p><h2><a href={'#' + p.id} onClick={onNavigate}>{p.name}</a></h2><p>{en ? p.summary[1] : p.summary[0]}</p><a className="web-inline-link" href={'#' + p.id} onClick={onNavigate}>{t('查看项目介绍', 'Explore the project')} ↗</a></div>{i === 1 && <div className="web-mobile-project-art" aria-hidden="true"><img src={overviewRibbon} alt="" width="1024" height="1536" /></div>}</article>)}</div>
    </>}
  </div></section>;
}
