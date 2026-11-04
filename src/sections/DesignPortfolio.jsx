import React, { useRef, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import ProjectIntroLink from '../components/ProjectIntroLink';
import ProjectPagination from '../components/ProjectPagination';
import ReadingDeck from './ReadingDeck';
import './uxui-interaction.css';
import CupcakeReveal from './CupcakeReveal';
import FlavorWeek from './FlavorWeek';
import travelPageDesktop from '../assets/uxui/travel-page-desktop.webp';
import travelPageMobile from '../assets/uxui/travel-page-mobile.webp';
import TravelPostcards from './TravelPostcards';
import TravelSelector from './TravelSelector';
import cupcakesOverview from '../assets/uxui/cupcakes-overview.webp';
import cupcakePageDesktop from '../assets/uxui/cupcakes-page-desktop.webp';
import cupcakePageMobile from '../assets/uxui/cupcakes-page-mobile.webp';
import reverieHome from '../assets/uxui/reverie-home.webp';
import reverieDiscover from '../assets/uxui/reverie-discover.webp';
import reveriePlanner from '../assets/uxui/reverie-planner.webp';
import reverieShelves from '../assets/uxui/reverie-shelves.webp';
import travelOverview from '../assets/uxui/travel-overview.webp';
import travelPreferences from '../assets/uxui/travel-preferences.webp';
import travelDestinations from '../assets/uxui/travel-destinations.webp';
import './design-portfolio.css';
import ribbonCascade from '../assets/web-overview/blue-silk-gold-bell.webp';
import ribbonLoop from '../assets/uxui/ribbon-loop.webp';
import ribbonWave from '../assets/uxui/ribbon-wave.webp';
import './uxui-overview.css';

import { uxCases } from './ux-case-content.mjs';

const screenAssets = {cupcakesOverview, reverieHome, reverieDiscover, reverieShelves, reveriePlanner, travelOverview, travelPreferences, travelDestinations};
const projects = uxCases.map(project => ({
  ...project,
  screens: project.screens.map(screen => ({...screen, src:screenAssets[screen.src]})),
}));
const pick = (pair, language) => pair[language === 'en' ? 1 : 0];

function FullPagePreview({ en, travel }) {
  const title = en ? 'Full homepage preview' : '完整首页预览';
  return <figure className="uxui-preview cupcake-page-preview">
    <figcaption>
      <div><strong>{title}</strong><span>{en ? 'Scroll inside to explore the original layout ↓' : '在预览内向下滚动，浏览原页布局 ↓'}</span></div>
      <a href={import.meta.env.BASE_URL + (travel ? 'PortfolioDigitalProduct/prototype.html' : 'Cupcakes/cupcake.html')} target="_blank" rel="noopener noreferrer">
        {en ? 'Open original page ↗' : '打开原网页 ↗'}
      </a>
    </figcaption>
    <div className="cupcake-page-scroll" role="region" aria-label={title} tabIndex={0}>
      <picture>
        <source media="(max-width: 767px)" srcSet={travel ? travelPageMobile : cupcakePageMobile} width="780" height={travel ? 9492 : 7886} />
        <img src={travel ? travelPageDesktop : cupcakePageDesktop} width="2380" height={travel ? 4136 : 6180} loading="lazy"
          alt={travel ? (en ? 'Travel homepage: search, recommended destinations, a static map and footer.' : '旅行首页：搜索、目的地推荐、静态地图和页脚。') : en ? 'Sprinkles homepage from top to bottom: ordering options, promotion, flavor of the day, product categories and footer.' : 'Sprinkles 首页从上到下依次为选购入口、活动横幅、今日口味、产品分类和页脚。'} />
      </picture>
    </div>
  </figure>;
}

function ProjectDetail({ project, language }) {
  const en = language === 'en';
  const [screenIndex, setScreenIndex] = useState(0);
  const [discovery, setDiscovery] = useState(0);
  const dialog = useRef(null);
  const screen = project.screens[screenIndex];
  const t = pair => pick(pair, language);
  const paths = [
    [['喜欢的一本书', 'A book I loved'], ['从一本念念不忘的书开始，再寻找相近的阅读体验', 'Start with a book that stayed with you, then look for a similar reading experience.']],
    [['此刻的心情', 'A mood I’m in'], ['先想想此刻想感受到什么，再缩小找书的方向。', 'Choose how you want to feel before narrowing your search.']],
    [['一点新鲜感', 'Something different'], ['暂时离开熟悉的书架，给不同的故事一个机会。', 'Step outside your usual shelf and make room for a different story.']],
  ];
  const isReading = project.id === 'XD-reverie';
  return <article className="uxui-project" aria-labelledby="uxui-project-title" tabIndex={-1}>
    {isReading ? <ReadingDeck screens={project.screens} en={en} selected={screenIndex} onSelect={setScreenIndex} onEnlarge={() => dialog.current.showModal()} />
      : <FullPagePreview en={en} travel={project.id === 'XD-travel'} />}
    {project.highlights && <div className="uxui-highlights" aria-label={en ? 'Product experience' : '产品体验'}>{project.highlights.map((item, index) => <div key={item.title[1]}><p className="uxui-kicker">0{index + 1}</p><h2>{t(item.title)}</h2><p>{t(item.text)}</p></div>)}</div>}
    <div className="uxui-details">
      <div className="uxui-story"><h2>{en ? 'About the project' : '项目介绍'}</h2><p>{t(project.description)}</p><dl><dt>{en ? 'My involvement' : '我的参与'}</dt><dd>{t(project.role)}</dd><dt>{en ? 'Interaction focus' : '交互重点'}</dt><dd>{t(project.focus)}</dd></dl></div>
      {project.id === 'XD-reverie' && <div className="uxui-demo"><p className="uxui-kicker">{en ? 'TRY THE INTERACTION' : '动手体验'}</p>
        {project.id === 'XD-reverie' && <><h2>{en ? 'Where would you begin?' : '你想从哪里开始？'}</h2><p>{en ? 'Explore the intent behind the three discovery paths' : '选一条路径，看看它如何引导阅读意图'}</p><div className="uxui-choice-list" role="group" aria-label={en ? 'Discovery starting point' : '阅读发现起点'}>{paths.map((path, index) => <button type="button" key={index} aria-pressed={discovery === index} onClick={() => { setDiscovery(index); setScreenIndex(1); }}><span>0{index + 1}</span>{t(path[0])}<span aria-hidden="true">{discovery === index ? '✓' : '↗'}</span></button>)}</div><p className="uxui-demo-result" role="status">{t(paths[discovery][1])}</p></>}
        <p className="uxui-demo-note">{en ? 'Portfolio interaction demo. Screenshots document the original interface; this local example illustrates the flow.' : '作品集交互演示：截图展示原界面，下方示例用于体验操作流程'}</p>
      </div>}
    </div>
    {isReading && <dialog ref={dialog} className="uxui-image-dialog" aria-label={en ? 'Enlarged screenshot' : '截图大图'} onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }}><div className="uxui-dialog-bar"><span>{project.name} · {t(screen.label)}</span><button type="button" autoFocus onClick={() => dialog.current.close()}>{en ? 'Close' : '关闭'} <span aria-hidden="true">×</span></button></div><img src={screen.src} alt={t(screen.alt)}/></dialog>}
  </article>;
}

export default function DesignPortfolio({ language = 'zh', projectId = 'XD', onNavigate }) {
  const en = language === 'en';
  if (projectId === 'XD') return <DesignOverview language={language} onNavigate={onNavigate} />;
  const project = projects.find(item => item.id === projectId) || projects[0];
  return <section id={project.id} className="uxui-page" lang={en ? 'en' : 'zh-CN'}><div className="uxui-inner">
    <SectionHeader as="h1" titleId="uxui-project-title" eyebrow="UX / UI DESIGN" title={project.name} subtitle={pick(project.subtitle, language)}/>
    {project.id === 'XD-cupcakes' && <CupcakeReveal en={en} />}
    {project.id === 'XD-travel' && <TravelSelector en={en} />}
    <a className="uxui-overview-return" href="#XD" onClick={onNavigate}>
      <span aria-hidden="true">← </span>{en ? 'All UX/UI projects' : '全部 UX/UI 作品'}
    </a>
    <nav className="uxui-project-nav" aria-label={en ? 'UX/UI projects' : 'UX/UI 作品'}>{projects.map((item, index) => <a key={item.id} href={`#${item.id}`} onClick={onNavigate} aria-current={project.id === item.id ? 'page' : undefined}><img src={item.screens[0].src} alt=""/><span><small>0{index + 1} / {pick(item.category, language)}</small><strong>{item.name}</strong></span><span className="uxui-nav-arrow" aria-hidden="true">↗</span></a>)}</nav>
    <ProjectDetail key={project.id} project={project} language={language}/>
    <ProjectPagination routeId={project.id} en={en} onNavigate={onNavigate} />
  </div></section>;
}

const overviewArt = [ribbonCascade, ribbonLoop, ribbonWave];
const overviewGestures = ['cascade', 'loop', 'wave'];
// Excerpts from the existing descriptions, kept alongside the original detail content.
const overviewCopy = [
  ['Cupcakes 是一个以甜点选购为场景的品牌网站项目，将产品展示、品牌氛围与趣味互动结合。', 'Cupcakes is a brand website project that brings product discovery and playful interaction into the dessert-shopping experience.'],
  ['Reverie Reads（现名 Midniht）是一款围绕个人阅读生活展开的产品，把书籍整理、阅读发现与未来计划连接起来。', 'Reverie Reads, now Midniht, brings a personal reading life together through library organization, book discovery, and flexible planning.'],
  ['Travel Discovery 是一个面向旅行灵感与目的地选择的网站项目。以海滩、城市和山野三种旅行偏好作为入口，结合目的地卡片与视觉浏览，把「想出去走走」这样宽泛的愿望，转化为可以比较、继续探索的具体选项。', 'Travel Discovery is a website project for travel inspiration and destination exploration. Beach, city, and mountain preferences provide an approachable starting point; destination cards turn an open-ended wish to get away into concrete places to compare and explore.'],
];

function OverviewPreview({ project, language, onNavigate }) {
  const [trying, setTrying] = useState(false);
  const [reading, setReading] = useState(0);
  const en = language === 'en';
  const t = pair => pick(pair, language);
  const previewId = project.id + '-preview';
  if (project.id === 'XD-cupcakes') return <div className="uxui-overview-cover overview-sampler"><FlavorWeek en={en} /></div>;
  if (project.id === 'XD-travel') return <div className="uxui-overview-cover overview-sampler"><TravelPostcards en={en} onNavigate={onNavigate} /></div>;
  return <div className="uxui-overview-cover overview-sampler">
    <button type="button" className="sampler-toggle" aria-expanded={trying} aria-controls={previewId}
      onClick={() => setTrying(!trying)}>
      <span>{trying ? (en ? 'Back to cover' : '返回封面') : t(['抽一张阅读卡', 'Draw a reading card'])}</span>
      <span aria-hidden="true">{trying ? '↶' : '→'}</span>
    </button>
    <div id={previewId}>
      {!trying ? <a className="uxui-overview-cover-window" href={'#' + project.id} onClick={onNavigate}
        aria-label={(en ? 'Explore ' : '查看 ') + project.name}>
        <img src={project.screens[0].src} alt={t(project.screens[0].alt)} width="1808"
          height="1031" loading="lazy" />
      </a> : <ReadingDeck screens={project.screens} en={en} selected={reading} onSelect={setReading} />}
    </div>
  </div>;
}

function DesignOverview({ language, onNavigate }) {
  const en = language === 'en';
  const t = pair => pick(pair, language);
  return <section id="XD" className="uxui-page uxui-overview" lang={en ? 'en' : 'zh-CN'}>
    <img className="uxui-overview-art uxui-overview-top-art" src={ribbonCascade} alt="" aria-hidden="true" width="1024" height="1536" />
    <div className="uxui-inner">
      <SectionHeader as="h1" eyebrow="UX / UI DESIGN" title={en ? 'UX/UI design' : 'UX/UI 设计'} subtitle={en ? 'Interfaces to explore, details to feel' : '看见界面，也感受细节'} />
      <div className="uxui-overview-list">{projects.map((project, index) => <article key={project.id} className={`uxui-overview-project uxui-overview-${overviewGestures[index]}`} aria-labelledby={`${project.id}-overview-title`}>
        {index > 0 && <img className="uxui-overview-art" src={overviewArt[index]} alt="" aria-hidden="true" decoding="async" />}
        <div className="uxui-overview-summary">
          <p className="uxui-overview-category">0{index + 1} / {t(project.category)}</p>
          <h2 id={`${project.id}-overview-title`}><a href={`#${project.id}`} onClick={onNavigate}>{project.name}</a></h2>
          <p className="uxui-overview-description">{t(overviewCopy[index])}</p>
          <ProjectIntroLink href={'#' + project.id} onNavigate={onNavigate} en={en} projectName={project.name} />
        </div>
        <OverviewPreview project={project} language={language} onNavigate={onNavigate} />
      </article>)}</div>
    <ProjectPagination routeId="XD" en={en} onNavigate={onNavigate} />
    </div>
  </section>;
}
