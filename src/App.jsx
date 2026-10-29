import React, { useEffect, useRef, useState } from 'react';
import Sidebar, { LanguageSwitch, useNavigationLanguage } from './components/Sidebar';
import SidebarIcon from './components/SidebarIcon';
import About from './sections/About';
import Resume from './sections/Resume';
import Portfolio from './sections/Portfolio';
import DesignPortfolio from './sections/DesignPortfolio';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import useContentNavigation from './hooks/useContentNavigation';
import Hero from './sections/Hero';
import ModelsTools from './sections/ModelsTools';
import ModelUsage from './sections/ModelUsage';
import AgencyBloom from './sections/AgencyBloom';
import AgencyBloomSecond from './sections/AgencyBloomSecond';
import AgencyBloomThird from './sections/AgencyBloomThird';

export default function App() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches);
  const [menuOpen, setMenuOpen] = useState(false);
  const { route, navigate } = useContentNavigation();
  const [language, setLanguage] = useNavigationLanguage();
  const menuButton = useRef(null);
  const closeMenu = (event) => {
    if (event?.metaKey || event?.ctrlKey || event?.shiftKey || event?.altKey) return;
    const destination = event?.currentTarget?.hash;
    if (destination) navigate(event);
    setMenuOpen(false);
    if (!destination && isMobile) window.requestAnimationFrame(() => menuButton.current?.focus());
  };

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const onChange = (event) => {
      setIsMobile(event.matches);
      if (!event.matches) setMenuOpen(false);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('mobile-nav-active', isMobile && menuOpen);
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && menuOpen && !document.querySelector('dialog[open]')) closeMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('mobile-nav-active');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMobile, menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [route.id]);

  const favoritesTitle = {
    models: language === 'zh' ? '模型与工具' : 'Models & tools',
    quotes: language === 'zh' ? '团队与语录' : 'Teams & quotes',
    'model-skills': language === 'zh' ? '模型 Skills' : 'Model skills',
  }[route.id];
  const views = {
    'agency-bloom': <AgencyBloom />,
    'agency-bloom-value': <AgencyBloomSecond />,
    'agency-bloom-applause': <AgencyBloomThird />,
    home: <Hero language={language} onNavigate={navigate} />,
    about: <About language={language} onNavigate={navigate} />,
    portfolio: <Portfolio />,
    design: <DesignPortfolio language={language} projectId={route.id} onNavigate={navigate} />,
    data: <Projects />,
    contact: <Contact language={language} />,
    'models-chatgpt': <ModelUsage language={language} tool="chatgpt" onNavigate={navigate} />,
    'models-claude-code': <ModelUsage language={language} tool="claude-code" onNavigate={navigate} />,
    resume: <Resume />,
    favorites: (route.id === 'models' || route.id === 'model-skills') ? <ModelsTools id={route.id} language={language} onNavigate={navigate} /> : <section id={route.id} className="favorites-view" lang={language === 'zh' ? 'zh-CN' : 'en'}><div className="container"><div className="section-title"><h2>{favoritesTitle}</h2></div><p>{language === 'zh' ? '即将更新' : 'Coming soon'}</p></div></section>,
  };

  return (
    <>
      <a className="skip-link" href="#main" onClick={event => { event.preventDefault(); document.getElementById('main').focus(); }}>Skip to main content</a>
      <div className={`shell-controls${isMobile && menuOpen ? ' is-drawer-open' : ''}`}>
        <LanguageSwitch language={language} onChange={setLanguage}/>
        <button ref={menuButton} className="mobile-nav-toggle" type="button" aria-label={language === 'zh' ? '打开导航' : 'Open navigation'} aria-controls="header" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><SidebarIcon name="menu"/></button>
      </div>
      {isMobile && menuOpen && <button className="nav-backdrop" type="button" aria-label={language === 'zh' ? '关闭导航' : 'Close navigation'} tabIndex={-1} onClick={closeMenu} />}
      <Sidebar isMobile={isMobile} isOpen={menuOpen} activeSection={route.id} activeGroup={route.group} onClose={closeMenu} language={language} onLanguageChange={setLanguage}/>
      <div inert={isMobile && menuOpen}>
      <main id="main" tabIndex={-1} className={`content-views${route.view === 'home' ? ' is-home' : ''}`}>
        {views[route.view]}
      </main>
      {route.view !== 'home' && route.view !== 'about' && route.view !== 'contact' && route.id !== 'models' && route.id !== 'model-skills' && route.group !== 'wechat' && <button type="button" className="back-to-top-link" aria-label={language === 'zh' ? '回到顶部' : 'Back to top'} onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}><i className="bi bi-arrow-up-short" aria-hidden="true" /></button>}
      </div>
    </>
  );
}
