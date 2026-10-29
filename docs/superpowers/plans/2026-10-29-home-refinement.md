# Homepage refinement plan

Goal: implement the approved first visual sketch with a restrained single-line introduction and an About link.
Architecture: dedicated React Hero with scoped CSS, existing navigation handler and original artwork. No new dependencies.
Spec: user-selected first sketch; retain Chinese default and English; preserve existing sidebar and other content.

- [x] Extract Hero and replace oversized title with a moderate serif heading.
- [x] Add native About anchor with precise SVG arrow and focus/hover treatment.
- [x] Clip artwork separately; animate transform and sheen; support pause and reduced motion.
- [x] Verify desktop/mobile, both languages, keyboard link, return navigation, reduced motion and production build.

Decision: retain raster art with CSS motion (user option 2) to preserve the approved material quality. Pure CSS shapes would change the visual identity.

Verification: production build passed; desktop 1440x900 and mobile 320x780/390x844 visually inspected; Chinese/English, keyboard About navigation and destination focus, browser Back, pause and reduced-motion checked. Screenshots in .oil-ui/home-refinement/. Main-agent visual review; no independent review.

## Follow-up: composition and perceptible motion
- User reported excess whitespace, stacked mobile layout and imperceptible motion.
- Confirmed old CSS animation was running with reduced motion off; 20-second duration and ~1% drift were too subtle.
- Moved art boundary from 50% to 19%; mobile now uses the same layered full-height composition with a reading veil.
- Added a lightweight WebGL texture deformation with traveling waves and blue-region lighting; retained CSS fallback, pause, reduced-motion and lifecycle cleanup.
- Built successfully; inspected motion frames two seconds apart. GPU time advanced from 0.183 to 2.415 seconds; pause held steady. About navigation and animation remount passed. English 320x700 layout fits one screen without horizontal overflow. Reduced-motion emulation was invoked but the immediate uniform read preceded its asynchronous event; no claim of completed reduced-motion runtime verification in this follow-up.

Final refinement: removed pause control as requested; reduced wave speed from 0.28 to 0.16 and displacement by about 20%. Full-canvas reading gradient replaces the local text veil. Build and browser continuous-animation checks passed; pause button absent. System reduced-motion and offscreen suspension remain supported.
