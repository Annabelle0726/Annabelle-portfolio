import React, { useRef, useState } from 'react';

const slides = [
  { title: 'Sprinkles Cupcakes', href: 'Cupcakes/cupcake.html', image: 'assets/img/optimized/cupcakes.webp' },
  { title: 'Discover Your Dream Getaway: Marriott Bonvoy Hotels and Villas', href: 'PortfolioDigitalProduct/prototype.html', image: 'assets/img/optimized/hotel.webp' },
  { title: 'Love Across Mythologies — Exploring Eternal Bonds in Classical Tales', href: 'Signature160D2/signature.html', image: 'assets/img/optimized/mythologies.webp' },
  { title: 'Asian visual culture', href: 'ART%20150/index.html', image: 'assets/img/optimized/autobiography.webp' },
];

export default function PortfolioCarousel() {
  const [current, setCurrent] = useState(0);
  const touchStart = useRef(null);
  const suppressClickUntil = useRef(0);
  const slide = slides[current];
  const move = (step) => setCurrent((index) => (index + step + slides.length) % slides.length);
  const onTouchStart = (event) => {
    if (event.touches.length !== 1) {
      touchStart.current = null;
      return;
    }
    touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  };
  const onTouchEnd = (event) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy) * 1.2) return;
    suppressClickUntil.current = Date.now() + 700;
    move(dx < 0 ? 1 : -1);
  };
  return (
    <div className="portfolio-carousel" aria-label="Website portfolio" aria-roledescription="carousel">
      <div className="portfolio-slide" aria-live="polite" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchCancel={() => { touchStart.current = null; }}>
        <a href={slide.href} onClick={(event) => { if (Date.now() < suppressClickUntil.current) event.preventDefault(); }}>
          <img src={slide.image} alt={slide.title} width="1200" height="750" loading="lazy" decoding="async" />
          <span className="portfolio-caption">{slide.title}</span>
        </a>
      </div>
      <button type="button" className="carousel-arrow carousel-arrow-prev" aria-label="Previous project" onClick={() => move(-1)}>‹</button>
      <button type="button" className="carousel-arrow carousel-arrow-next" aria-label="Next project" onClick={() => move(1)}>›</button>
      <div className="carousel-dots" aria-label="Choose a project">
        {slides.map((item, index) => (
          <button key={item.href} type="button" aria-label={'Show project ' + (index + 1) + ': ' + item.title} aria-pressed={index === current} onClick={() => setCurrent(index)} />
        ))}
      </div>
    </div>
  );
}
