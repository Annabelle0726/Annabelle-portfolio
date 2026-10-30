import React, { useEffect, useRef, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import ProjectPagination from '../components/ProjectPagination';
import home from '../assets/somnia-case/home.webp';
import library from '../assets/somnia-case/library.webp';
import match from '../assets/somnia-case/match.webp';
import interaction from '../assets/somnia-case/interaction.mp4';
import interactionPoster from '../assets/somnia-case/interaction.jpg';
import './somnia-case.css';

const screens = [
  { id: 'home', src: home, width: 1600, height: 746, label: ['首页', 'Home'], title: ['让阅读，拥有自己的空间', 'A space of your own for reading'], body: ['深色背景、衬线字体与温暖的亮色，让首页先呈现阅读的氛围。登录与开始使用的入口放在介绍旁边，连接感受与操作。', 'A dark canvas, serif typography, and warm accents establish the reading atmosphere. Sign-in and getting-started actions sit beside the introduction, connecting the mood with a clear next step.'], details: [['阅读氛围', 'Reading atmosphere'], ['清楚的起点', 'A clear starting point'], ['视觉与功能衔接', 'Style with purpose']] },
  { id: 'library', src: library, width: 1600, height: 741, label: ['书库', 'Library'], title: ['找到想读的那一本', 'Find the book you want to read'], body: ['书籍封面是浏览的第一条线索，书名和作者补充识别信息。搜索、收藏与添加入口集中在内容附近，减少在页面之间来回寻找。', 'Covers provide the first cue when browsing, with titles and authors adding context. Search, favorites, and adding books stay close to the collection so the next action is easy to find.'], details: [['封面与书籍信息', 'Covers and book details'], ['搜索与收藏', 'Search and favorites'], ['添加到个人书库', 'Add to your collection']] },
  { id: 'match', src: match, width: 756, height: 469, label: ['选书引导', 'Reading mood'], title: ['从今天想读的故事出发', 'Start with the story you are craving'], body: ['用具体的故事氛围帮助读者表达偏好：奇幻、浓烈、温暖，或轻快。这里展示首页中的选书引导预览，观察问题、选项与书籍线索如何组织在一起。', 'Concrete story moods help readers express a preference: sweeping fantasy, intensity, warmth, or something light. This is the matching preview shown on the homepage, highlighting how its question, choices, and book cues are arranged.'], details: [['具体的情境提问', 'A concrete mood question'], ['易于比较的选项', 'Options you can compare'], ['首页选书预览', 'Homepage matching preview']] },
];

function ScreenImage({ screen, en, eager = false, preview = false }) {
  const dialog = useRef(null);
  const label = screen.label[en ? 1 : 0];
  const closeOutside = event => {
    if (event.target !== event.currentTarget) return;
    const box = event.currentTarget.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.current.close();
  };
  return <figure className={'somnia-screen somnia-screen-' + screen.id}>
    <button type="button" className="somnia-image-trigger" aria-label={(en ? 'Enlarge: ' : '放大查看：') + label} onClick={() => dialog.current.showModal()}>
      <img src={screen.src} alt={(en ? 'Somnia Library — ' : 'Somnia Library：') + label} width={screen.width} height={screen.height} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      {!preview && <span className="somnia-expand" aria-hidden="true">⛶</span>}
    </button>
    <dialog ref={dialog} className="somnia-dialog" aria-label={label} onClick={closeOutside}>
      <div className="somnia-dialog-bar"><span>{label}</span><button type="button" autoFocus onClick={() => dialog.current.close()}>{en ? 'Close ×' : '关闭 ×'}</button></div>
      <div className="somnia-dialog-image"><img src={screen.src} alt={label} width={screen.width} height={screen.height} /></div>
    </dialog>
  </figure>;
}

export default function SomniaCase({ language = 'zh', onNavigate }) {
  const en = language === 'en', lang = en ? 1 : 0;
  const t = (zh, english) => en ? english : zh;
  const [selected, setSelected] = useState(1);
  const [reduced, setReduced] = useState(false);
  const opening = useRef(null), gallery = useRef(null), notes = useRef(null), tabs = useRef([]);
  const screen = screens[selected];

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media.matches);
    sync(); media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const jump = ref => {
    ref.current.focus({ preventScroll: true });
    ref.current.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' });
  };
  const changeTab = (event, index) => {
    const keys = { ArrowRight: (index + 1) % screens.length, ArrowLeft: (index + screens.length - 1) % screens.length, Home: 0, End: screens.length - 1 };
    if (!(event.key in keys)) return;
    event.preventDefault(); setSelected(keys[event.key]); tabs.current[keys[event.key]].focus();
  };

  return <section id="web-somnia" className="somnia-page" lang={en ? 'en' : 'zh-CN'}>
    <div className="somnia-inner">
      <div className="somnia-opening" ref={opening}>
        <SectionHeader as="h1" eyebrow="READING & DESIGN" title="Somnia Library" subtitle={t("让阅读，拥有自己的空间", "A space of your own for reading")} />
        <div className="somnia-hero">
          <div className="somnia-intro">
            <p>{t('把想读、在读、读过的书收进一处，让每次打开都更接近自己的阅读兴趣', 'Keep the books you want to read, are reading, and have finished in one place, shaped around your reading interests.')}</p>
          </div>
          <div className="somnia-actions"><button type="button" className="somnia-primary" onClick={() => jump(gallery)}>{t('查看项目界面', 'Explore the interface')} <svg className="somnia-primary-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14m-5-5 5 5 5-5" /></svg></button></div>
        </div>
        <div className="somnia-hero-visual"><ScreenImage screen={screens[0]} en={en} eager /><p className="somnia-caption">{t('Welcome · 阅读从这里开始 · 点击查看大图', 'Welcome · A starting point for reading · Select to enlarge')}</p></div>
        <dl className="somnia-facts">
          <div><dt>{t('项目类型', 'Project')}</dt><dd>{t('阅读管理 Web 应用', 'Reading management web app')}</dd></div>
          <div><dt>{t('基础项目', 'Based on')}</dt><dd>Reverie · Greg Chism</dd></div>
          <div><dt>{t('我的工作', 'My work')}</dt><dd>{[t('首页与书籍界面', 'Homepage & book interfaces'), t('认证体验', 'Authentication experience'), t('移动端导航', 'Mobile navigation')].map(item => <span className="somnia-fact-line" key={item}>{item}</span>)}</dd></div>
        </dl>
      </div>
      <section className="somnia-gallery somnia-chapter" ref={gallery} tabIndex={-1} aria-labelledby="somnia-gallery-title">
        <p className="somnia-kicker" lang="en">01 / INSIDE THE LIBRARY</p>
        <div className="somnia-gallery-heading"><h2 id="somnia-gallery-title">{t('从封面，找到下一本书', 'Find your next book, cover first')}</h2><div className="somnia-tabs" role="tablist" aria-label={t('选择展示界面', 'Choose a screen')}>{screens.map((item, index) => <button type="button" role="tab" key={item.id} id={'somnia-tab-' + item.id} aria-selected={selected === index} aria-controls="somnia-panel" tabIndex={selected === index ? 0 : -1} ref={el => { tabs.current[index] = el; }} onClick={() => setSelected(index)} onKeyDown={event => changeTab(event, index)}>{item.label[lang]}</button>)}</div></div>
        <div id="somnia-panel" className="somnia-panel" role="tabpanel" tabIndex={0} aria-labelledby={'somnia-tab-' + screen.id}>
          <div className={'somnia-gallery-image somnia-gallery-image-' + screen.id}><ScreenImage key={screen.id} screen={screen} en={en} /><p className="somnia-caption">{selected === 2 ? t('首页中的选书引导预览 · 点击放大', 'Matching preview from the homepage · Click to enlarge') : t('项目界面截图 · 点击放大', 'Project screenshot · Click to enlarge')}</p></div>
          <div className="somnia-screen-notes"><h3>{screen.title[lang]}</h3><p>{screen.body[lang]}</p><p className="somnia-smallnote">{t('展示重点', 'Focus')}<br />{t('视觉层级 · 内容组织 · 跨屏体验', 'Visual hierarchy · Organization · Responsive experience')}</p></div>
        </div>
      </section>
      <section className="somnia-chapter somnia-notes" ref={notes} tabIndex={-1} aria-labelledby="somnia-notes-title"><p className="somnia-kicker" lang="en">02 / INTERACTION DETAILS</p><h2 id="somnia-notes-title">{t('让氛围，回应每一次探索', 'An atmosphere that responds to exploration')}</h2>
        <div className="somnia-interaction-row"><div className="somnia-screen-notes"><h3>{t('卡片展开，给内容留出位置', 'Expanding cards make room for detail')}</h3><p>{t('功能介绍随指针停留呈现更多内容。视频里的卡片状态，让静态截图之外的交互也能被看见。', 'Feature cards reveal more detail on hover. The recording shows how these states respond beyond a still screenshot.')}</p><p className="somnia-smallnote">{t('桌面录屏 · 悬停与滚动细节', 'Desktop recording · Hover and scrolling details')}</p></div><figure className="somnia-recording"><video controls playsInline muted preload="none" poster={interactionPoster} aria-label={t('Somnia 功能卡片悬停与滚动演示，无语音', 'Somnia feature-card hover and scrolling demonstration, no speech')}><source src={interaction} type="video/mp4" /><a href={interaction}>{t('下载交互录屏', 'Download the interaction recording')}</a></video><figcaption className="somnia-caption">{t('Match & Discover · 功能卡片交互', 'Match & Discover · Feature-card interaction')}</figcaption></figure></div>
      </section>
    <ProjectPagination routeId="web-somnia" en={en} onNavigate={onNavigate} />
    </div>
  </section>;
}
