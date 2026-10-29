import React, { useEffect, useState } from 'react';
import About from './sections/About';
import Skills from './sections/Skills';
import Resume from './sections/Resume';
import Portfolio from './sections/Portfolio';
import DesignPortfolio from './sections/DesignPortfolio';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

const navigation = [
  ['hero', 'Home', 'bx-home'],
  ['about', 'About', 'bx-user'],
  ['resume', 'Resume', 'bx-file-blank'],
  ['portfolio', 'Portfolio', 'bx-book-content'],
  ['services', 'Projects', 'bx-server'],
  ['contact', 'Contact', 'bx-envelope'],
];

function Sidebar({ isMobile, isOpen, activeSection, onClose }) {
  return (
    <header id="header" inert={isMobile && !isOpen}>
      <div className="d-flex flex-column">
        <div className="profile">
          <div className="profile-name">Annabelle Zhu</div>
          <img className="profile-photo" src="assets/img/optimized/profile.webp" width="120" height="120" alt="Annabelle Zhu" fetchPriority="high" />
          <div className="social-links mt-3 text-center">
            <a href="https://www.instagram.com/0real_annabelle0/" aria-label="Instagram"><i className="bx bxl-instagram" aria-hidden="true" /></a>
            <a href="https://github.com/Annabelle0726" aria-label="GitHub"><i className="bx bxl-github" aria-hidden="true" /></a>
            <a href="https://www.linkedin.com/in/huizhu0726/" aria-label="LinkedIn"><i className="bx bxl-linkedin" aria-hidden="true" /></a>
          </div>
        </div>
        <nav id="navbar" className="nav-menu navbar" aria-label="Main navigation">
          <ul>
            {navigation.map(([id, label, icon]) => (
              <li key={id}><a href={'#' + id} className={'nav-link scrollto' + (activeSection === id ? ' active' : '')} aria-current={activeSection === id ? 'location' : undefined} onClick={onClose}><i className={'bx ' + icon} aria-hidden="true" /><span>{label}</span></a></li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

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
      if (event.key === 'Escape') setMenuOpen(false);
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
      for (const [id] of navigation) {
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
      <button className="mobile-nav-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-controls="header" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        <i className={'bi ' + (menuOpen ? 'bi-x' : 'bi-list')} aria-hidden="true" />
      </button>
      {isMobile && menuOpen && <button className="nav-backdrop" type="button" aria-label="Close navigation" tabIndex={-1} onClick={() => setMenuOpen(false)} />}
      <Sidebar isMobile={isMobile} isOpen={menuOpen} activeSection={activeSection} onClose={() => setMenuOpen(false)} />
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
    </>
  );
}
