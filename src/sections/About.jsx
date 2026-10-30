import React, { useState } from 'react';
import brandMark from '../assets/brand-mark.svg';
import AboutArtwork from '../components/AboutArtwork';
import './about.css';
import SectionHeader from '../components/SectionHeader';
import { birthday, getAge } from './about-profile.js';

const content = {
  zh: {
    title: '关于我',
    intro: [
      '我是 Annabelle Zhu，一名软件开发者与产品设计者，目前正在亚利桑那大学（University of Arizona）攻读数据科学硕士学位。我喜欢从真实的需求出发，把模糊的想法拆解成清晰的问题，再通过设计与代码，将它们做成可以使用的产品。',
      '我设计、开发并上线了 Agency Bloom，一款帮助人们梳理想法、探索方向，并将自己的选择付诸行动的微信小程序。从产品构思、交互设计，到前后端开发、数据管理与功能验证，我持续参与产品的整个过程。我在意界面是否清晰、操作是否顺畅，也关注功能是否可靠、用户的反馈能否真正推动改进。此外，我也参与面向学习场景的 AI 工具开发，探索智能体在工作中的应用。',
      '数据科学让我重视证据与逻辑，设计让我留意人的感受，开发则让我把想法付诸实践。我希望自己做出的产品，能帮助人们理解复杂的问题，看见更多可能，并更有把握地迈出自己选择的下一步。',
    ],
    personal: '个人信息',
    chapters: ['好奇与判断', '写作与表达', '审美与灵感'],
    city: '所在城市', work: '工作方式', learning: '当前学习',
    study: 'Data Science · 硕士在读', expand: '更多资料', collapse: '收起资料',
    moreTitle: '更多关于我',
    labels: ['生日', '城市', '电话', '年龄', '学位', '邮箱', '工作方式'],
    more: [
      '我喜欢顺着一个问题继续追问，也享受自主学习带来的发现。遇到不同的观点，我会试着理解它们各自的理由，弄清自己认同什么，又对什么保留疑问。我重视独立判断，也愿意在有了新的认识之后调整自己的看法。',
      '写作是我整理思绪的一种方式。我会记录学习中的发现，也写下对变化、选择与创造的思考。有些念头起初并不清楚，认真写下来之后，我才逐渐明白自己真正想表达什么、在意什么。',
      '我也喜欢收集有意思的文章、工具与灵感，留意文字和画面里细微的差别。一句恰当的表达、一种舒服的配色，或一个有个性的细节，都可能让我停下来多看一会儿。这些发现常常带来新的兴趣，也让我愿意继续探索自己还不了解的东西。',
    ],
  },
  en: {
    title: 'About me',
    intro: [
      'I’m Annabelle Zhu, a software developer and product designer currently pursuing a master’s degree in Data Science at the University of Arizona. I like starting with real needs, breaking down loosely formed ideas into clear questions, and using design and code to turn them into products people can use.',
      'I designed, developed, and launched Agency Bloom, a WeChat mini program that helps people organize their thoughts, explore possible directions, and act on their own choices. From shaping the product and designing interactions to frontend and backend development, data management, and feature validation, I stay involved throughout the process. I care about clear interfaces and smooth interactions, as well as reliable features and whether user feedback leads to meaningful improvements. I also contribute to AI tools for learning and explore how agents can support work.',
      'Data science teaches me to value evidence and logic, design helps me pay attention to how people feel, and development gives me a way to put ideas into practice. I hope the products I build help people understand complex problems, see more possibilities, and take their next step with greater confidence in the choices they make.',
    ],
    personal: 'Personal info',
    chapters: ['Curiosity & judgment', 'Writing & expression', 'Aesthetics & inspiration'],
    city: 'Based in', work: 'Work style', learning: 'Currently studying',
    study: 'Data Science · Master’s student', expand: 'More details', collapse: 'Fewer details',
    moreTitle: 'A Little More About Me',
    labels: ['Birthday', 'City', 'Phone', 'Age', 'Degree', 'Email', 'Work type'],
    more: [
      'I like following a question beyond its first answer. I enjoy learning independently, exploring different perspectives, and understanding why I agree with something—or why I still have questions. Having my own point of view matters to me, as does being willing to revise it.',
      'Writing helps me make sense of what I’m thinking. I write about what I’m learning, as well as change, choices, and creativity. Sometimes, putting an idea into words is how I discover what I really want to say and what matters to me.',
      'I’m also drawn to thoughtful language and visual details. I collect articles, tools, and ideas that catch my attention, and enjoy noticing how a word, a color, or a small design choice can change the way something feels. These discoveries often lead me toward new interests and things I’d like to understand better.',
    ],
  },
};

export default function About({ language = 'zh', onNavigate }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const t = content[language];
  const zh = language === 'zh';
  const birthDate = new Date(Date.UTC(birthday.year, birthday.month - 1, birthday.day));
  const birthLabel = new Intl.DateTimeFormat(zh ? 'zh-CN' : 'en-GB', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }).format(birthDate);
  const facts = [birthLabel, zh ? '中国上海' : 'Shanghai, China', '+86 176-2180-0415', `${getAge()}${zh ? ' 岁' : ''}`, zh ? '文学学士（BA）' : 'Bachelor of Arts (BA)', '0realannabelle0@gmail.com', zh ? '远程' : 'Remote'];
  return <section id="about" className="about about-editorial" lang={zh ? 'zh-CN' : 'en'}>
    <div className="about-page">
      <div className="about-opening">
        <SectionHeader eyebrow="ABOUT" title={t.title} className="about-heading-area" about />
        <figure className="about-portrait">
          <AboutArtwork />
          <div className="about-photo-frame"><img src="assets/img/about.jpg" alt={zh ? 'Annabelle Zhu 的照片' : 'Annabelle Zhu portrait'} width="1280" height="1227" decoding="async" fetchPriority="high" /></div>
        </figure>
        <div className="about-prose about-introduction">{t.intro.map(p => <p key={p}>{p}</p>)}</div>
      </div>
      <section className="about-profile" aria-label={t.personal}>
        <div className="about-profile-band">
          <dl className="about-profile-summary">
            <div><dt>{t.city}</dt><dd>{zh ? '中国 · 上海' : 'Shanghai, China'}</dd></div>
            <div><dt>{t.work}</dt><dd>{zh ? '远程' : 'Remote'}</dd></div>
            <div><dt>{t.learning}</dt><dd>{t.study}</dd></div>
          </dl>
          <button className="about-details-toggle" type="button" aria-expanded={detailsOpen} aria-controls="about-details" onClick={() => setDetailsOpen(open => !open)}>
            <span>{detailsOpen ? t.collapse : t.expand}</span>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
          </button>
        </div>
        <div id="about-details" className={`about-details${detailsOpen ? ' is-open' : ''}`} inert={!detailsOpen} aria-hidden={!detailsOpen}>
          <div className="about-details-clip"><dl className="about-facts">{[0, 3, 4, 2, 5].map(i => <div key={t.labels[i]}><dt>{t.labels[i]}</dt><dd>{i === 2 ? <a href="tel:+8617621800415">{facts[i]}</a> : i === 5 ? <a href="mailto:0realannabelle0@gmail.com">{facts[i]}</a> : facts[i]}</dd></div>)}</dl></div>
        </div>
      </section>
      <section className="about-more" aria-labelledby="about-more-title">
        <header className="about-more-header">
          <p className="about-eyebrow" lang="en">{zh ? 'A LITTLE MORE ABOUT ME' : 'BEYOND THE WORK'}</p>
          <h3 id="about-more-title">{t.moreTitle}</h3>
        </header>
        <ol className="about-chapters">{t.more.map((p, i) => <li key={t.chapters[i]}>
          <span className="about-chapter-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <h4>{t.chapters[i]}</h4><p>{p}</p>
        </li>)}</ol>
      </section>
      <div className="about-closing"><span aria-hidden="true" /><img src={brandMark} alt="" /><a href="#portfolio" onClick={onNavigate} className="about-project-link">{zh ? '看看我的项目' : 'Explore my projects'}<svg viewBox="0 0 76 52" fill="none" aria-hidden="true"><circle className="about-project-orbit" cx="49" cy="26" r="23" pathLength="100" /><g className="about-project-arrow"><path d="M5 26H56M48 18l8 8-8 8" /></g></svg></a></div>
    </div>
  </section>;
}
