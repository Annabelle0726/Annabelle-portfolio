import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { resolveNavigation, sameContentView } from '../navigation';
import { durationMilliseconds } from '../motion';
import '../navigation-motion.css';

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function focusDestination(id, sameView) {
  const target = document.getElementById(id) || document.getElementById('main');
  target.setAttribute('tabindex', '-1');
  window.requestAnimationFrame(() => { if (target.isConnected) target.focus({ preventScroll: true }); });
  if (sameView || id === 'skills') target.scrollIntoView({ behavior: sameView && !reducedMotion() ? 'smooth' : 'instant', block: 'start' });
  else window.scrollTo({ top: 0, behavior: 'instant' });
}

export default function useContentNavigation() {
  const [route, setRoute] = useState(() => resolveNavigation(window.location.hash) || resolveNavigation('#hero'));
  const destination = useRef(route);
  const rendered = useRef(null);
  const sequence = useRef(0);
  const transition = useRef(null);
  const fallbackAnimation = useRef(null);
  const nativeCommit = useRef(false);

  const changeRoute = next => {
    if (next.id === destination.current.id) return;
    const sameView = sameContentView(next, destination.current);
    destination.current = next;
    const request = ++sequence.current;
    transition.current?.skipTransition();
    fallbackAnimation.current?.cancel();
    if (!sameView && !reducedMotion() && typeof document.startViewTransition === 'function') {
      const nextTransition = document.startViewTransition(() => {
        if (request !== sequence.current) return;
        nativeCommit.current = true;
        flushSync(() => setRoute(next));
      });
      transition.current = nextTransition;
      nextTransition.ready.catch(() => {});
      nextTransition.finished.catch(() => {}).finally(() => {
        if (transition.current === nextTransition) transition.current = null;
      });
    } else {
      nativeCommit.current = false;
      setRoute(next);
    }
  };

  useEffect(() => {
    const onLocationChange = () => {
      const next = resolveNavigation(window.location.hash || '#hero');
      if (next) changeRoute(next);
    };
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stopMotion = () => {
      if (media.matches) { transition.current?.skipTransition(); fallbackAnimation.current?.cancel(); }
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
      fallbackAnimation.current?.cancel();
    };
  }, []);

  useLayoutEffect(() => {
    const previous = rendered.current;
    const sameView = previous && sameContentView(previous, route);
    if (previous || resolveNavigation(window.location.hash)) focusDestination(route.id, sameView);
    if (previous && !sameView && !nativeCommit.current && !reducedMotion()) {
      const main = document.getElementById('main');
      const duration = durationMilliseconds(getComputedStyle(document.documentElement).getPropertyValue('--motion-content'), 200);
      fallbackAnimation.current = main.animate(
        [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration, easing: 'ease-out' },
      );
    }
    rendered.current = route;
    nativeCommit.current = false;
  }, [route.id]);

  const navigate = event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
    const next = resolveNavigation(event.currentTarget.hash);
    if (!next) return false;
    event.preventDefault();
    if (next.id === destination.current.id) {
      transition.current?.skipTransition();
      window.requestAnimationFrame(() => focusDestination(next.id, true));
    } else {
      window.history.pushState(null, '', `#${next.id}`);
      changeRoute(next);
    }
    return true;
  };
  return { route, navigate };
}
