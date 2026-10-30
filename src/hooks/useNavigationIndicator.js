import { useLayoutEffect, useRef } from 'react';

// Absolute layout coordinates cancel sidebar scroll and drawer transforms.
// Idle layout changes snap; an active slide retargets as panels expand.
export default function useNavigationIndicator(activeGroup) {
  const nav = useRef(null);
  const indicator = useRef(null);
  const position = useRef(null);
  useLayoutEffect(() => {
    const container = nav.current;
    const marker = indicator.current;
    const measure = animate => {
      const target = container.querySelector(`[data-group="${activeGroup}"] .sidebar-nav-row`);
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const box = container.getBoundingClientRect();
      const next = { y: rect.top - box.top + container.scrollTop, height: rect.height };
      const previous = position.current;
      if (previous && Math.abs(next.y - previous.y) < .25 && Math.abs(next.height - previous.height) < .25) return;
      if (!animate || !previous) marker.style.transition = 'none';
      marker.style.transform = `translate3d(0, ${next.y}px, 0)`;
      marker.style.height = `${next.height}px`;
      marker.dataset.ready = 'true';
      if (!animate || !previous) {
        void marker.offsetHeight;
        marker.style.transition = '';
      }
      position.current = next;
    };
    measure(true);
    const observer = new ResizeObserver(() => measure(marker.getAnimations().length > 0));
    observer.observe(container);
    container.querySelectorAll('.sidebar-group, .sidebar-parent').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [activeGroup]);
  return { nav, indicator };
}
