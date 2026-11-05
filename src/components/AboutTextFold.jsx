import React, { useId, useLayoutEffect, useRef } from 'react';
import './paper-fold.css';

// Clip a sheet against the diagonal fold x - y = crease.
function clipSheet(corners, crease, foldedSide) {
  const polygon = [];
  let previous = corners[corners.length - 1];
  let previousDistance = previous.x - previous.y - crease;
  for (const point of corners) {
    const distance = point.x - point.y - crease;
    const inside = foldedSide ? distance >= 0 : distance <= 0;
    const previousInside = foldedSide ? previousDistance >= 0 : previousDistance <= 0;
    if (inside !== previousInside) {
      const fraction = previousDistance / (previousDistance - distance);
      polygon.push({
        x: previous.x + (point.x - previous.x) * fraction,
        y: previous.y + (point.y - previous.y) * fraction,
      });
    }
    if (inside) polygon.push(point);
    previous = point;
    previousDistance = distance;
  }
  return polygon;
}
const pointsAttribute = points => points.map(point => point.x + ',' + point.y).join(' ');

export default function AboutTextFold({ reverseDirection = false, chapter = false, fromLeft = false }) {
  const svg = useRef(null);
  const cover = useRef(null);
  const reverse = useRef(null);
  const creaseLine = useRef(null);
  const gradientId = useId();

  useLayoutEffect(() => {
    const layer = svg.current;
    const page = layer.parentElement;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;
    const gentle = chapter || fromLeft;
    let frame = 0;
    let delay = 0;
    let progress = 0;
    let complete = false;
    let started = false;
    let startScroll = 0;
    let fading = null;
    let finishing = false;
    let width = 0;
    let height = 0;

    const measure = () => {
      const bounds = page.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      layer.setAttribute('viewBox', `0 0 ${width} ${height}`);
    };
    const paint = () => {
      if (fromLeft) {
        const crease = progress * width;
        cover.current.setAttribute('points', `${crease},0 ${width},0 ${width},${height} ${crease},${height}`);
        reverse.current.setAttribute('points', `${crease},0 ${2 * crease},0 ${2 * crease},${height} ${crease},${height}`);
        creaseLine.current.setAttribute('d', `M${crease},0 L${crease},${height}`);
        return;
      }
      if (chapter) {
        const crease = progress * height;
        cover.current.setAttribute('points', `0,${crease} ${width},${crease} ${width},${height} 0,${height}`);
        reverse.current.setAttribute('points', `0,${crease} ${width},${crease} ${width},${2 * crease} 0,${2 * crease}`);
        creaseLine.current.setAttribute('d', `M0,${crease} L${width},${crease}`);
        return;
      }
      const crease = width - progress * (width + height);
      const corners = [{ x: 0, y: 0 }, { x: width, y: 0 }, { x: width, y: height }, { x: 0, y: height }];
      cover.current.setAttribute('points', pointsAttribute(clipSheet(corners, crease, false)));
      // Reflect the lifted corner around the crease to show the back of the paper.
      const folded = clipSheet(corners, crease, true).map(point => ({ x: point.y + crease, y: point.x - crease }));
      reverse.current.setAttribute('points', pointsAttribute(folded));
      const start = crease >= 0 ? { x: crease, y: 0 } : { x: 0, y: -crease };
      const end = crease + height <= width ? { x: crease + height, y: height } : { x: width, y: width - crease };
      creaseLine.current.setAttribute('d', `M${start.x},${start.y} L${end.x},${end.y}`);
    };
    const finish = () => {
      complete = true;
      window.clearTimeout(delay);
      window.cancelAnimationFrame(frame);
      fading?.cancel();
      layer.style.display = 'none';
    };
    const finishEarly = () => {
      if (complete || finishing) return;
      finishing = true;
      window.clearTimeout(delay);
      window.cancelAnimationFrame(frame);
      fading = layer.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 180, easing: 'ease-out', fill: 'forwards',
      });
      fading.finished.then(finish, () => {});
    };
    const start = () => {
      if (started || complete) return;
      started = true;
      startScroll = window.scrollY;
      measure();
      paint();
      layer.style.display = 'block';
      delay = window.setTimeout(() => {
        let beginning = performance.now();
        const previousFold = chapter
          ? page.closest('li')?.previousElementSibling?.querySelector('.about-text-fold')
          : null;
        const tick = now => {
          if (previousFold?.style.display === 'block') {
            beginning = now;
            frame = requestAnimationFrame(tick);
            return;
          }
          const elapsed = Math.min(1, (now - beginning) / (gentle ? 1800 : 850));
          progress = gentle
            ? elapsed ** 3 * (elapsed * (6 * elapsed - 15) + 10)
            : elapsed * elapsed * (3 - 2 * elapsed);
          paint();
          if (elapsed < 1) frame = requestAnimationFrame(tick);
          else finish();
        };
        frame = requestAnimationFrame(tick);
      }, gentle ? 0 : 160);
    };
    const bounds = page.getBoundingClientRect();
    if (gentle && bounds.top >= window.innerHeight) {
      measure();
      paint();
      layer.style.display = 'block';
    }
    if (bounds.bottom <= 0) finish();
    else if (bounds.top < window.innerHeight - (gentle ? 24 : 0) && bounds.bottom > 0) start();
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        const current = page.getBoundingClientRect();
        if (current.bottom > 0 && current.top < window.innerHeight) start();
        else finish();
        observer.disconnect();
      }
    }, { threshold: gentle ? .16 : .08 });
    const onScroll = () => {
      if (complete || finishing) return;
      const current = page.getBoundingClientRect();
      const passedChapter = current.bottom <= 0;
      const movedQuickly = started && Math.abs(window.scrollY - startScroll) > Math.min(160, window.innerHeight * .2);
      if (passedChapter) {
        finish();
        observer.disconnect();
      } else if (movedQuickly) {
        finishEarly();
        observer.disconnect();
      }
    };
    if (gentle) window.addEventListener('scroll', onScroll, { passive: true });
    if (fromLeft) {
      page.addEventListener('pointerdown', finishEarly);
      page.addEventListener('focusin', finishEarly);
    }
    observer.observe(page);
    const resize = new ResizeObserver(() => {
      if (!complete && (started || gentle)) { measure(); paint(); }
    });
    resize.observe(page);
    const motionChange = () => { if (media.matches) finish(); };
    media.addEventListener('change', motionChange);
    return () => {
      finish();
      observer.disconnect();
      if (gentle) window.removeEventListener('scroll', onScroll);
      if (fromLeft) {
        page.removeEventListener('pointerdown', finishEarly);
        page.removeEventListener('focusin', finishEarly);
      }
      resize.disconnect();
      media.removeEventListener('change', motionChange);
    };
  }, [chapter, fromLeft]);

  return <svg ref={svg} className={'paper-fold about-text-fold' + (reverseDirection ? ' is-reversed' : '') + (chapter ? ' is-chapter' : '') + (fromLeft ? ' is-from-left' : '')} aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={gradientId} x1={chapter || fromLeft ? "0%" : "100%"} y1="0%" x2={fromLeft ? "100%" : "0%"} y2={fromLeft ? "0%" : "100%"}>
        <stop offset="0" stopColor="var(--fold-paper, var(--color-paper))" />
        <stop offset=".42" stopColor="var(--fold-paper, var(--color-paper))" />
        <stop offset="1" stopColor="var(--color-pale-gold)" stopOpacity=".55" />
      </linearGradient>
    </defs>
    <polygon ref={cover} fill="var(--fold-paper, var(--color-paper))" />
    <polygon ref={reverse} fill={`url(#${gradientId})`} className="about-fold-reverse" />
    <path ref={creaseLine} className="about-fold-crease" />
  </svg>;
}
