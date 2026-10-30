import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { resolveNavigation, sameContentView } from '../navigation';
import '../navigation-motion.css';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function focusDestination(id, sameView, position) {
  const target = document.getElementById(id) || document.getElementById('main');
  const heading = target.querySelector('h1, h2') || target;
  heading.setAttribute('tabindex', '-1');
  window.requestAnimationFrame(() => { if (heading.isConnected) heading.focus({ preventScroll: true }); });
  if (position) {
    window.scrollTo({ ...position, behavior: 'instant' });
    return;
  }
  if (sameView || id === 'skills') target.scrollIntoView({ behavior: sameView && !reducedMotion() ? 'smooth' : 'instant', block: 'start' });
  else window.scrollTo({ top: 0, behavior: 'instant' });
}

export default function useContentNavigation() {
  const [route, setRoute] = useState(() => resolveNavigation(window.location.hash) || resolveNavigation('#hero'));
  const destination = useRef(route);
  const rendered = useRef(null);
  const sequence = useRef(0);
  const transition = useRef(null);
  const positions = useRef(new Map());
  const entryKey = useRef(null);
  const restorePosition = useRef(null);

  const savePosition = () => {
    if (entryKey.current) positions.current.set(entryKey.current, { left: window.scrollX, top: window.scrollY });
  };
  const identifyEntry = () => {
    let key = window.history.state?.portfolioEntry;
    if (!key) {
      key = crypto.randomUUID();
      window.history.replaceState({ ...window.history.state, portfolioEntry: key }, '');
    }
    return key;
  };

  const changeRoute = (next, restoring = false) => {
    if (next.id === destination.current.id && !restoring) return;
    const sameView = sameContentView(next, destination.current);
    destination.current = next;
    const request = ++sequence.current;
    transition.current?.skipTransition();
    if (!sameView && !reducedMotion() && typeof document.startViewTransition === 'function') {
      const nextTransition = document.startViewTransition(() => {
        if (request !== sequence.current) return;
        flushSync(() => setRoute(next));
      });
      transition.current = nextTransition;
      nextTransition.ready.catch(() => {});
      nextTransition.finished.catch(() => {}).finally(() => {
        if (transition.current === nextTransition) transition.current = null;
      });
    } else {
      setRoute(next);
    }
  };

  useEffect(() => {
    entryKey.current = identifyEntry();
    const onLocationChange = () => {
      const next = resolveNavigation(window.location.hash || '#hero');
      if (!next) return;
      const key = identifyEntry();
      // A traversal may emit both popstate and hashchange; handle it once.
      if (key === entryKey.current && next.id === destination.current.id) return;
      savePosition();
      entryKey.current = key;
      restorePosition.current = positions.current.get(key) || null;
      changeRoute(next, true);
    };
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stopMotion = () => {
      if (media.matches) transition.current?.skipTransition();
    };
    const restoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    window.addEventListener('hashchange', onLocationChange);
    window.addEventListener('popstate', onLocationChange);
    media.addEventListener('change', stopMotion);
    return () => {
      window.removeEventListener('hashchange', onLocationChange);
      window.removeEventListener('popstate', onLocationChange);
      media.removeEventListener('change', stopMotion);
      window.history.scrollRestoration = restoration;
      transition.current?.skipTransition();
    };
  }, []);

  useLayoutEffect(() => {
    const previous = rendered.current;
    const sameView = previous && sameContentView(previous, route);
    if (previous || resolveNavigation(window.location.hash)) focusDestination(route.id, sameView, restorePosition.current);
    restorePosition.current = null;
    rendered.current = route;
  }, [route]);

  const navigate = event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
    const next = resolveNavigation(event.currentTarget.hash);
    if (!next) return false;
    event.preventDefault();
    if (next.id === destination.current.id) {
      transition.current?.skipTransition();
      window.requestAnimationFrame(() => focusDestination(next.id, true));
    } else {
      savePosition();
      entryKey.current = crypto.randomUUID();
      restorePosition.current = null;
      window.history.pushState({ portfolioEntry: entryKey.current }, '', `#${next.id}`);
      changeRoute(next);
    }
    return true;
  };
  return { route, navigate };
}
