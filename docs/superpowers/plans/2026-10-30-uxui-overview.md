# UX/UI overview implementation plan

Goal: implement the approved A1 overview while preserving all three existing project details.

Design: desktop preview left and copy right; mobile copy followed by preview. Cupcakes gets a right cascade, Reverie a left loop, Travel a low horizontal wave. Reuse existing project copy, imagery, shared header and palette. Remove the selected-works badge. Preserve bilingual navigation and deep links.

- [x] Add rendering and navigation regression checks for the overview/detail boundary.
- [x] Add overview markup in DesignPortfolio using the existing project data, plus a return link on detail pages.
- [x] Add scoped responsive styles and independent decorative ribbon assets.
- [x] Verify rendering checks, production build, desktop/mobile layouts and navigation in the browser.

Files: src/sections/DesignPortfolio.jsx, src/sections/uxui-overview.css, src/navigation.js, src/assets/uxui/, tests/uxui-overview.test.mjs.

Review focus: three real projects visible; decorative art never blocks controls; no mobile overflow; detail links and browser history; English wrapping; reduced motion.
