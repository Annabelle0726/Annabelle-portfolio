import React, { useEffect, useRef, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import WebProjectNav from '../components/WebProjectNav';
import home from '../assets/somnia-case/home.webp';
import library from '../assets/somnia-case/library.webp';
import match from '../assets/somnia-case/match.webp';
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
  return <figure className="somnia-screen">
    <button type="button" className="somnia-image-trigger" aria-label={(en ? 'Enlarge: ' : '放大查看：') + label} onClick={() => dialog.current.showModal()}>
      <img src={screen.src} alt={(en ? 'Somnia Library — ' : 'Somnia Library：') + label} width={screen.width} height={screen.height} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      {!preview && <span className="somnia-expand" aria-hidden="true">↗</span>}
    </button>
    <dialog ref={dialog} className="somnia-dialog" aria-label={label} onClick={closeOutside}>
      <div className="somnia-dialog-bar"><span>{label}</span><button type="button" autoFocus onClick={() => dialog.current.close()}>{en ? 'Close ×' : '关闭 ×'}</button></div>
      <img src={screen.src} alt={label} width={screen.width} height={screen.height} />
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
        <SectionHeader as="h1" eyebrow="READING & DESIGN" title="Somnia Library" />
        <div className="somnia-hero">
          <div className="somnia-intro"><p className="somnia-kicker">{t('个人书库 · 阅读体验', 'PERSONAL LIBRARY · READING EXPERIENCE')}</p>
            <h2>{t('让阅读，拥有自己的空间', 'A space of your own for reading')}</h2>
            <p>{t('把想读、在读、读过的书收进一处，让每次打开都更接近自己的阅读兴趣。', 'Keep the books you want to read, are reading, and have finished in one place, shaped around your reading interests.')}</p>
            <div className="somnia-actions"><button type="button" className="somnia-primary" onClick={() => jump(gallery)}>{t('浏览界面', 'Explore the interface')} <span aria-hidden="true">↗</span></button><button type="button" className="somnia-text-button" onClick={() => jump(notes)}>{t('查看设计思路', 'Design notes')} <span className="somnia-design-arrow" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 7v10m0 0-5-5m5 5 5-5" /></svg></span></button></div>
          </div>
          <div className="somnia-hero-visual"><ScreenImage screen={screens[1]} en={en} eager preview /><span className="somnia-image-label">{t('个人书架预览 · 点击图片放大', 'Personal library preview · Select image to enlarge')}</span></div>
        </div>
        <dl className="somnia-facts">
          <div><dt>{t('项目类型', 'Project')}</dt><dd>{t('阅读管理 Web 应用', 'Reading management web app')}</dd></div>
          <div><dt>{t('基础项目', 'Based on')}</dt><dd>Reverie · Greg Chism</dd></div>
          <div><dt>{t('我的工作', 'My work')}</dt><dd>{[t('首页与书籍界面', 'Homepage & book interfaces'), t('认证体验', 'Authentication experience'), t('移动端导航', 'Mobile navigation')].map(item => <span className="somnia-fact-line" key={item}>{item}</span>)}</dd></div>
          <div><dt>{t('展示重点', 'Focus')}</dt><dd>{t('视觉层级 · 内容组织 · 跨屏体验', 'Visual hierarchy · Organization · Responsive experience')}</dd></div>
        </dl>
      </div>
      <section className="somnia-gallery somnia-chapter" ref={gallery} tabIndex={-1} aria-labelledby="somnia-gallery-title">
        <p className="somnia-kicker" lang="en">01 / EXPLORE THE INTERFACE</p>
        <div className="somnia-gallery-heading"><h2 id="somnia-gallery-title">{t('走进我的书库', 'Inside the library')}</h2><div className="somnia-tabs" role="tablist" aria-label={t('选择展示界面', 'Choose a screen')}>{screens.map((item, index) => <button type="button" role="tab" key={item.id} id={'somnia-tab-' + item.id} aria-selected={selected === index} aria-controls="somnia-panel" tabIndex={selected === index ? 0 : -1} ref={el => { tabs.current[index] = el; }} onClick={() => setSelected(index)} onKeyDown={event => changeTab(event, index)}>{item.label[lang]}</button>)}</div></div>
        <div id="somnia-panel" className="somnia-panel" role="tabpanel" tabIndex={0} aria-labelledby={'somnia-tab-' + screen.id}>
          <div className={'somnia-gallery-image somnia-gallery-image-' + screen.id}><ScreenImage key={screen.id} screen={screen} en={en} /><p className="somnia-caption">{selected === 2 ? t('首页中的选书引导预览 · 点击放大', 'Matching preview from the homepage · Click to enlarge') : t('项目界面截图 · 点击放大', 'Project screenshot · Click to enlarge')}</p></div>
          <div className="somnia-screen-notes"><h3>{screen.title[lang]}</h3><p>{screen.body[lang]}</p><ol>{screen.details.map((item, index) => <li key={index}><span aria-hidden="true">0{index + 1}</span>{item[lang]}</li>)}</ol></div>
        </div>
      </section>
      <section className="somnia-chapter somnia-notes" ref={notes} tabIndex={-1} aria-labelledby="somnia-notes-title"><p className="somnia-kicker" lang="en">02 / DESIGN NOTES</p><h2 id="somnia-notes-title">{t('有氛围，也有秩序', 'Atmosphere, with a sense of order')}</h2>
        <div className="somnia-note-grid">{[
          [t('让封面成为线索', 'Let covers lead the way'), t('以封面和书名建立浏览顺序，把识别一本书需要的信息留在同一处。色彩与留白帮助区分内容、状态和操作。', 'Covers and titles set the browsing order, keeping the information needed to recognize a book together. Color and spacing separate content, states, and actions.')],
          [t('把入口留在手边', 'Keep actions within reach'), t('搜索、收藏和添加围绕书籍内容展开；导航承载不同阅读任务，让人知道自己在哪里，也能找到下一步。', 'Search, favorites, and adding books are organized around the collection. Navigation separates reading tasks, helping people understand where they are and where to go next.')],
          [t('在不同屏幕上继续阅读', 'Carry the experience across screens'), t('我参与移动端导航与布局改进，关注屏幕变窄之后的信息顺序、按钮触达和文字阅读，让视觉风格延续到实际操作。', 'My work includes mobile navigation and layout improvements, with attention to reading order, reachable controls, and legible text as screens get narrower.')],
        ].map(([title, body], index) => <article key={title}><span className="somnia-note-number">0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>
      <WebProjectNav en={en} onNavigate={onNavigate} previous={{ href: '#web-belay', label: 'Belay' }} next={{ href: '#portfolio', label: t('返回作品目录', 'Back to projects') }} />
    </div>
  </section>;
}
