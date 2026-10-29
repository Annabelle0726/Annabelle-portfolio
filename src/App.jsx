import React, { useEffect, useRef, useState } from 'react';
import Sidebar, { LanguageSwitch, useNavigationLanguage } from './components/Sidebar';
import SidebarIcon from './components/SidebarIcon';
import About from './sections/About';
import Skills from './sections/Skills';
import Resume from './sections/Resume';
import Portfolio from './sections/Portfolio';
import DesignPortfolio from './sections/DesignPortfolio';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

const navigation = ['hero', 'about', 'skills', 'resume', 'portfolio', 'XD', 'services', 'contact'];

function Hero() {
  return (
    <section id="hero" className="d-flex flex-column justify-content-center align-items-center">
      <div className="hero-container">
        <h2>Hi, this is</h2>
        <h1>Annabelle Zhu</h1>
        <p>I'm <span>Data Scientist, Tech-Enthusiast, UX/UI Designer</span></p>
      </div>
    </section>
  );
}

export default function App() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [language, setLanguage] = useNavigationLanguage();
  const menuButton = useRef(null);
  const closeMenu = (event) => {
    const destination = event?.currentTarget?.hash?.slice(1);
    setMenuOpen(false);
    if (isMobile) window.requestAnimationFrame(() => {
      const target = destination && document.getElementById(destination);
      if (target) {
        const alreadyFocusable = target.hasAttribute('tabindex');
        if (!alreadyFocusable) {
          target.setAttribute('tabindex', '-1');
          target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
        }
        target.focus({ preventScroll: true });
      } else menuButton.current?.focus();
    });
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
      if (event.key === 'Escape' && !document.querySelector('dialog[open]')) closeMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('mobile-nav-active');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMobile, menuOpen]);

  useEffect(() => {
    let frame = 0;
    const updateActive = () => {
      frame = 0;
      let current = 'hero';
      for (const id of navigation) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 140) current = id;
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActive);
    };
    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!window.location.hash) return undefined;
    let targetId;
    try {
      targetId = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      return undefined;
    }
    const target = document.getElementById(targetId);
    if (!target) return undefined;
    const frame = window.requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <div className={`shell-controls${isMobile && menuOpen ? ' is-drawer-open' : ''}`}>
        <LanguageSwitch language={language} onChange={setLanguage}/>
        <button ref={menuButton} className="mobile-nav-toggle" type="button" aria-label={language === 'zh' ? '打开导航' : 'Open navigation'} aria-controls="header" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><SidebarIcon name="menu"/></button>
      </div>
      {isMobile && menuOpen && <button className="nav-backdrop" type="button" aria-label={language === 'zh' ? '关闭导航' : 'Close navigation'} tabIndex={-1} onClick={closeMenu} />}
      <Sidebar isMobile={isMobile} isOpen={menuOpen} activeSection={activeSection} onClose={closeMenu} language={language} onLanguageChange={setLanguage}/>
      <div inert={isMobile && menuOpen}>
      <Hero />
      <main id="main">
        <About />
        <Skills />
        <Resume />
        <Portfolio />
        <DesignPortfolio />
        <Projects />
        <Contact />
      </main>
      <a href="#hero" className="back-to-top-link" aria-label="Back to top"><i className="bi bi-arrow-up-short" aria-hidden="true" /></a>
      </div>
    </>
  );
}
