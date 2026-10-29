# Navigation motion and state reference

The existing site is React. Original content sections are retained; no color values are added. Component colors use the existing variables from `docs/visual-style.md` and `src/theme.css`.

| Interaction | Duration | Easing | Implementation |
| --- | --- | --- | --- |
| Primary selection slider | 230ms | `cubic-bezier(.2,.8,.2,1)` | One decorative element moves with `transform`; gradient itself is not transitioned |
| Submenu height | 200ms | `ease-out` | CSS grid `0fr` ↔ `1fr` |
| Submenu content | 200ms | `ease-out` | Opacity and `translateY(-8px)` ↔ `0` |
| Secondary hover/press/color | 160ms | `ease-out` | Only background-color, color and transform |
| Content enter | 200ms | `ease-out` | Main-only fade-in and 8px upward movement |
| Content exit (native transition) | 120ms | `ease-out` | Main-only fade-out |
| Same-view anchors | Browser-defined | Native smooth scroll | Intercepted links avoid the browser's initial instant anchor jump |
| Existing mobile drawer | 240ms | `cubic-bezier(.2,.8,.2,1)` | Transform; disabled under reduced motion |

Times are centralized as `--motion-*` variables in `src/theme.css`. `src/motion.js` accepts both `ms` and `s`, since production CSS minification normalizes these units.

Secondary links use 8px/12px padding, 10px corners and no underline in any interaction state. Non-current hover uses a 50% mix of `--color-highlight` with transparency. Current links remain unfilled and use weight plus a solid champagne-gold dot. Each link retains a 2px gold keyboard focus outline.

`useNavigationIndicator` measures the active row relative to the nav, independently of sidebar scrolling and drawer transforms. Initial layout and idle resizes snap into place; an ongoing slide retargets when a submenu changes the row's position. ResizeObserver handles font, language and viewport changes. The moving element is decorative and does not receive input. Native `nav`, `ul`, `li` and `a` semantics and `aria-current` identify real navigation.

`useContentNavigation` coordinates hash URLs, native browser history and main-only View Transitions. The root has no snapshot name; the sidebar remains mounted and interactive. Unsupported browsers get a Web Animations fallback on main only. Rapid navigation cancels stale transitions and ignores stale callbacks. Existing `#skills` loads still focus and scroll to Skills inside About. Home and About are separate views, so they use the content transition; About/Skills or a repeated current anchor uses native smooth scrolling. Favorites pages share a template but get separate content transitions.

Top spacing was tightened again after user feedback: a title lands roughly 44px from the desktop top (24px main + 20px section), or 68px on mobile (56px + 12px). Anchor offsets use 24px/56px, matching those landing positions. Heading-to-body spacing is also reduced. Home layout is unaffected.

Reduced motion skips content View Transitions and fallback movement, snaps the indicator and submenu, disables control displacement, and keeps 160ms background/text color feedback. Collapsed panels remain inert and hidden from assistive technology, and the mobile focus trap excludes their links.

Verification: navigation/timing unit tests and production build; real intermediate slider positions and final alignment; main-only transition duration; rapid navigation/history; secondary hover spacing and no fill on current; fallback timing after minification; reduced-motion geometry and retained color duration; desktop/mobile title positions; mobile navigation/focus/inert. Native smooth-scroll calls were verified; duration remains a platform decision. Physical-phone feel was not tested. An independent source review found Skills deep-link positioning and indicator retargeting issues, both corrected. Scratch checks and screenshots are ignored in `.oil-ui/nav-motion/`.
