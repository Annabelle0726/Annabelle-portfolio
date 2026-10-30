import React, { useRef, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import ProjectIntroLink from '../components/ProjectIntroLink';
import ProjectPagination from '../components/ProjectPagination';
import { destinationsFor } from './uxui-demo';
import cupcakesOverview from '../assets/uxui/cupcakes-overview.webp';
import cupcakesBefore from '../assets/uxui/cupcakes-before.webp';
import cupcakesAfter from '../assets/uxui/cupcakes-after.webp';
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

const projects = [
  {
    id: 'XD-cupcakes', name: 'Cupcakes', category: ['品牌网站 · 交互体验', 'Brand website · Interaction'],
    subtitle: ['让一次点击，多一点期待', 'A little anticipation in a single click'],
    description: ['Cupcakes 是一个以甜点选购为场景的品牌网站项目，将产品展示、品牌氛围与趣味互动结合。明快的色彩和大幅产品摄影传递轻盈、愉悦的第一印象；「今日口味」通过礼盒揭晓，把浏览过程变成一次有期待、有回应的小探索。', 'Cupcakes is a brand website project that brings product discovery and playful interaction into the dessert-shopping experience. Bright colors and generous product photography create an inviting first impression, while a gift-box reveal turns the daily flavor into a small moment of anticipation and reward.'],
    role: ['参与网页交互实现，重点呈现「今日口味」的点击揭晓与状态反馈。页面使用 Sprinkles 的品牌及产品素材。', 'Implemented web interactions with a focus on the daily-flavor reveal and its visual feedback. The page uses Sprinkles brand and product materials.'],
    focus: ['从提示到点击，再到即时反馈，让操作结果清楚可见', 'A clear cue, a deliberate click, and immediate visual feedback'],
    screens: [
      { src: cupcakesOverview, label: ['首页', 'Overview'], alt: ['Cupcakes 首页，彩色纸杯蛋糕产品展示', 'Cupcakes landing page with colorful cupcake photography'] },
      { src: cupcakesBefore, label: ['揭晓前', 'Before reveal'], alt: ['今日口味揭晓前的礼盒状态', 'Gift-box state before revealing the daily cupcake flavor'] },
      { src: cupcakesAfter, label: ['揭晓后', 'After reveal'], alt: ['今日口味揭晓后的 S’mores 纸杯蛋糕', 'S’mores cupcake shown after the flavor reveal'] },
    ],
  },
  {
    id: 'XD-reverie', name: 'Reverie Reads', category: ['阅读产品 · 协作项目', 'Reading product · Collaboration'],
    subtitle: ['给阅读，留一个安静的位置', 'A quiet place for a reading life'],
    description: ['Reverie Reads（现名 Midniht）是一款围绕个人阅读生活展开的产品，把书籍整理、阅读发现与未来计划连接起来。读者可以用自己的方式组织书架，从喜欢的故事或当下心情出发寻找下一本书，再把想读的内容放进开放的阅读计划。深色背景、月光意象与衬线字体共同营造出私人书房般的氛围，让书籍与个人感受成为界面的中心。', 'Reverie Reads, now Midniht, brings a personal reading life together through library organization, book discovery, and flexible planning. Readers can arrange their shelves, find a next read through a favorite story or a current mood, and make space for it in an open-ended plan. Dark surfaces, moonlit imagery, and serif typography give the experience the character of a private reading room, keeping books and personal preferences at its center.'],
    role: ['以协作形式参与项目的开发支持与局部改进。所展示的界面呈现产品整体体验，帮助理解这些工作所在的阅读场景。', 'Contributed development support and focused improvements as a collaborator. The screens present the wider product experience and the reading context around that work.'],
    focus: ['让「收藏—发现—计划」形成连贯的阅读路径。用清楚的选中状态、分层导航和温和的提示，帮助读者保持自己的节奏与选择权。', 'Connect collecting, discovering, and planning into a coherent reading journey. Clear selection states, layered navigation, and considerate prompts help readers retain their own pace and choices.'],
    highlights: [
      { title: ['属于自己的书架', 'A library of your own'], text: ['按阅读状态、书籍形式与自定义清单整理藏书，同一本书可以出现在多个书架中。封面与书脊的展示保留了翻看实体书架的熟悉感，让整理也成为阅读体验的一部分。', 'Organize books by reading state, format, or personal lists, with a book able to belong to more than one shelf. Cover and spine views bring the familiarity of browsing a physical bookshelf into a personal digital library.'] },
      { title: ['从兴趣出发，发现下一本', 'Find a next read through intent'], text: ['Discover 提供喜欢的书、当下心情和尝试不同三种探索起点，也保留书名、作者或 ISBN 的直接搜索入口。清楚知道目标和暂时只有一种感觉，都能找到合适的开始方式。', 'Discover offers three starting points: a loved book, a mood, or something different, alongside direct search by title, author, or ISBN. It accommodates both a specific book in mind and a less defined feeling.'] },
      { title: ['给想读的书留出位置', 'Make room for what comes next'], text: ['Planner 将计划、日历与新书动态分开呈现，允许为下一本书安排时间、调整顺序或改变主意。计划保留弹性，移动或删除计划也不会改写已经留下的阅读记录。', 'Planner separates plans, the calendar, and upcoming releases, making room to schedule a book, reorder priorities, or change direction. Plans remain flexible: moving or removing one leaves existing reading history intact.'] },
    ],
    screens: [
      { src: reverieHome, label: ['阅读首页', 'Landing page'], alt: ['Midniht 首页，月亮与阅读者插画、个人书库介绍', 'Midniht landing page with a moonlit reader and personal-library introduction'] },
      { src: reverieDiscover, label: ['发现好书', 'Discover'], alt: ['Midniht Discover 页面，搜索框、三条发现路径与已选书籍', 'Midniht Discover screen with search, three discovery paths, and a selected book'] },
      { src: reverieShelves, label: ['个人书架', 'Shelves'], alt: ['Midniht 个人书架，心愿书单、书封与书脊浏览视图', 'Midniht personal shelves with a wishlist and cover-and-spine browsing view'] },
      { src: reveriePlanner, label: ['阅读计划', 'Planner'], alt: ['Midniht 阅读计划，计划、日历与新书动态入口及书籍排序', 'Midniht reading planner with Plan, Calendar, and Releases tabs and book ordering'] },
    ],
  },
  {
    id: 'XD-travel', name: 'Travel Discovery', category: ['旅行产品 · 目的地探索', 'Travel product · Discovery'],
    subtitle: ['从「想去哪」到一个更具体的选择', 'From a travel mood to a destination'],
    description: ['Travel Discovery 是一个面向旅行灵感与目的地选择的网站项目。以海滩、城市和山野三种旅行偏好作为入口，结合目的地卡片与视觉浏览，把「想出去走走」这样宽泛的愿望，转化为可以比较、继续探索的具体选项。页面采用 Marriott Homes & Villas 的品牌与旅行素材。', 'Travel Discovery is a website project for travel inspiration and destination exploration. Beach, city, and mountain preferences provide an approachable starting point; destination cards turn an open-ended wish to get away into concrete places to compare and explore. The page uses Marriott Homes & Villas brand and travel materials.'],
    role: ['参与目的地卡片与偏好选择的交互实现，关注选择、浏览与结果呈现之间的衔接', 'Worked on destination-card and preference-selection interactions, focusing on the connection between choosing, browsing, and presenting results.'],
    focus: ['让偏好选择、筛选结果与重新选择保持在同一段浏览流程里', 'Keep preference selection, filtered results, and changing one’s mind within the same flow.'],
    screens: [
      { src: travelOverview, label: ['首页', 'Overview'], alt: ['旅行项目首页与目的地探索入口', 'Travel project landing page and destination-discovery entry'] },
      { src: travelPreferences, label: ['偏好选择', 'Preferences'], alt: ['旅行项目的海滩、城市与山野偏好选项', 'Beach, city, and mountain preference choices in the travel project'] },
      { src: travelDestinations, label: ['目的地列表', 'Destinations'], alt: ['旅行项目默认目的地卡片列表', 'Default destination-card collection in the travel project'] },
    ],
  },
];
const pick = (pair, language) => pair[language === 'en' ? 1 : 0];

function ProjectDetail({ project, language }) {
  const en = language === 'en';
  const [screenIndex, setScreenIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [preference, setPreference] = useState('all');
  const [discovery, setDiscovery] = useState(0);
  const dialog = useRef(null);
  const screen = project.screens[screenIndex];
  const t = pair => pick(pair, language);
  const paths = [
    [['喜欢的一本书', 'A book I loved'], ['从一本念念不忘的书开始，再寻找相近的阅读体验', 'Start with a book that stayed with you, then look for a similar reading experience.']],
    [['此刻的心情', 'A mood I’m in'], ['先想想此刻想感受到什么，再缩小找书的方向。', 'Choose how you want to feel before narrowing your search.']],
    [['一点新鲜感', 'Something different'], ['暂时离开熟悉的书架，给不同的故事一个机会。', 'Step outside your usual shelf and make room for a different story.']],
  ];
  return <article className="uxui-project" aria-labelledby="uxui-project-title" tabIndex={-1}>
    <figure className="uxui-preview">
      <div className="uxui-preview-bar"><span>{project.name} <span aria-hidden="true">/</span> {t(screen.label)}</span><button type="button" onClick={() => dialog.current.showModal()}>{en ? 'Enlarge image' : '放大图片'} <span aria-hidden="true">↗</span></button></div>
      <button type="button" className="uxui-image-button" onClick={() => dialog.current.showModal()} aria-label={en ? 'Enlarge current screenshot' : '放大当前截图'}><img src={screen.src} alt={t(screen.alt)} width={project.id === 'XD-reverie' ? (screenIndex === 0 ? 1808 : 1902) : 1348} height={project.id === 'XD-reverie' ? (screenIndex === 0 ? 1031 : 887) : 926}/></button>
      <figcaption><span>{en ? 'Screen preview' : '界面预览'} <span className="uxui-counter">0{screenIndex + 1} / 0{project.screens.length}</span></span><div className="uxui-screen-options" role="group" aria-label={en ? 'Choose a screenshot' : '选择截图'}>{project.screens.map((item, index) => <button type="button" key={item.src} aria-pressed={screenIndex === index} onClick={() => setScreenIndex(index)}>{t(item.label)}</button>)}</div></figcaption>
    </figure>
    {project.highlights && <div className="uxui-highlights" aria-label={en ? 'Product experience' : '产品体验'}>{project.highlights.map((item, index) => <div key={item.title[1]}><p className="uxui-kicker">0{index + 1}</p><h2>{t(item.title)}</h2><p>{t(item.text)}</p></div>)}</div>}
    <div className="uxui-details">
      <div className="uxui-story"><h2>{en ? 'About the project' : '项目介绍'}</h2><p>{t(project.description)}</p><dl><dt>{en ? 'My involvement' : '我的参与'}</dt><dd>{t(project.role)}</dd><dt>{en ? 'Interaction focus' : '交互重点'}</dt><dd>{t(project.focus)}</dd></dl></div>
      <div className="uxui-demo"><p className="uxui-kicker">{en ? 'TRY THE INTERACTION' : '动手体验'}</p>
        {project.id === 'XD-cupcakes' && <><h2>{en ? 'A small, sweet surprise' : '揭晓一份小惊喜'}</h2><p>{en ? 'Click to move from anticipation to the revealed flavor' : '点一下，让等待变成清楚可见的反馈'}</p><div className="uxui-flavor" aria-live="polite"><span aria-hidden="true">{revealed ? '✦' : '?'}</span><strong>{revealed ? 'S’mores' : en ? 'What’s inside?' : '今天会是什么口味？'}</strong><small>{revealed ? (en ? 'The flavor is revealed' : '口味已经揭晓') : (en ? 'A flavor worth discovering' : '留一点好奇，等你发现')}</small></div><button className="uxui-action" type="button" onClick={() => { setRevealed(!revealed); setScreenIndex(revealed ? 1 : 2); }}>{revealed ? (en ? 'Try again' : '再体验一次') : (en ? 'Reveal the flavor' : '揭晓今日口味')} <span aria-hidden="true">→</span></button></>}
        {project.id === 'XD-reverie' && <><h2>{en ? 'Where would you begin?' : '你想从哪里开始？'}</h2><p>{en ? 'Explore the intent behind the three discovery paths' : '选一条路径，看看它如何引导阅读意图'}</p><div className="uxui-choice-list" role="group" aria-label={en ? 'Discovery starting point' : '阅读发现起点'}>{paths.map((path, index) => <button type="button" key={index} aria-pressed={discovery === index} onClick={() => { setDiscovery(index); setScreenIndex(1); }}><span>0{index + 1}</span>{t(path[0])}<span aria-hidden="true">{discovery === index ? '✓' : '↗'}</span></button>)}</div><p className="uxui-demo-result" role="status">{t(paths[discovery][1])}</p></>}
        {project.id === 'XD-travel' && <><h2>{en ? 'What kind of escape?' : '这次，想去哪里？'}</h2><p>{en ? 'Choose a preference to narrow six sample destinations' : '选一种偏好，筛选六个示例目的地'}</p><div className="uxui-filters" role="group" aria-label={en ? 'Travel preference' : '旅行偏好'}>{[['all', ['全部', 'All']], ['beach', ['海滩', 'Beach']], ['city', ['城市', 'City']], ['mountains', ['山野', 'Mountains']]].map(([key, label]) => <button type="button" key={key} aria-pressed={preference === key} onClick={() => setPreference(key)}>{t(label)}</button>)}</div><p className="uxui-result-count" role="status">{destinationsFor(preference).length} {en ? 'destinations' : '个目的地'}</p><ul className="uxui-destinations">{destinationsFor(preference).map(place => <li key={place.name}><strong>{place.name}</strong><span>{place.location}</span></li>)}</ul></>}
        <p className="uxui-demo-note">{en ? 'Portfolio interaction demo. Screenshots document the original interface; this local example illustrates the flow.' : '作品集交互演示：截图展示原界面，下方示例用于体验操作流程'}</p>
      </div>
    </div>
    <dialog ref={dialog} className="uxui-image-dialog" aria-label={en ? 'Enlarged screenshot' : '截图大图'} onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }}><div className="uxui-dialog-bar"><span>{project.name} · {t(screen.label)}</span><button type="button" autoFocus onClick={() => dialog.current.close()}>{en ? 'Close' : '关闭'} <span aria-hidden="true">×</span></button></div><img src={screen.src} alt={t(screen.alt)}/></dialog>
  </article>;
}

export default function DesignPortfolio({ language = 'zh', projectId = 'XD', onNavigate }) {
  const en = language === 'en';
  if (projectId === 'XD') return <DesignOverview language={language} onNavigate={onNavigate} />;
  const project = projects.find(item => item.id === projectId) || projects[0];
  return <section id={project.id} className="uxui-page" lang={en ? 'en' : 'zh-CN'}><div className="uxui-inner">
    <SectionHeader as="h1" titleId="uxui-project-title" eyebrow="UX / UI DESIGN" title={project.name} subtitle={pick(project.subtitle, language)}/>
    <nav className="uxui-project-nav" aria-label={en ? 'UX/UI projects' : 'UX/UI 作品'}>{projects.map((item, index) => <a key={item.id} href={`#${item.id}`} onClick={onNavigate} aria-current={project.id === item.id ? 'page' : undefined}><img src={item.screens[0].src} alt=""/><span><small>0{index + 1} / {pick(item.category, language)}</small><strong>{item.name}</strong></span><span className="uxui-nav-arrow" aria-hidden="true">↗</span></a>)}</nav>
    <ProjectDetail key={project.id} project={project} language={language}/>
    <ProjectPagination routeId={project.id} en={en} onNavigate={onNavigate} />
  </div></section>;
}

const overviewArt = [ribbonCascade, ribbonLoop, ribbonWave];
const overviewGestures = ['cascade', 'loop', 'wave'];
const overviewSizes = [[1363, 936], [1808, 1031], [1348, 926]];
// Excerpts from the existing descriptions, kept alongside the original detail content.
const overviewCopy = [
  ['Cupcakes 是一个以甜点选购为场景的品牌网站项目，将产品展示、品牌氛围与趣味互动结合。', 'Cupcakes is a brand website project that brings product discovery and playful interaction into the dessert-shopping experience.'],
  ['Reverie Reads（现名 Midniht）是一款围绕个人阅读生活展开的产品，把书籍整理、阅读发现与未来计划连接起来。', 'Reverie Reads, now Midniht, brings a personal reading life together through library organization, book discovery, and flexible planning.'],
  ['Travel Discovery 是一个面向旅行灵感与目的地选择的网站项目。以海滩、城市和山野三种旅行偏好作为入口，结合目的地卡片与视觉浏览，把「想出去走走」这样宽泛的愿望，转化为可以比较、继续探索的具体选项。', 'Travel Discovery is a website project for travel inspiration and destination exploration. Beach, city, and mountain preferences provide an approachable starting point; destination cards turn an open-ended wish to get away into concrete places to compare and explore.'],
];

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
        <a className="uxui-overview-cover" href={`#${project.id}`} onClick={onNavigate} aria-label={`${en ? 'Explore' : '查看'} ${project.name}`}>
          <span className="uxui-overview-cover-window"><img src={project.screens[0].src} alt={t(project.screens[0].alt)} width={overviewSizes[index][0]} height={overviewSizes[index][1]} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" /></span>
        </a>
      </article>)}</div>
    <ProjectPagination routeId="XD" en={en} onNavigate={onNavigate} />
    </div>
  </section>;
}
