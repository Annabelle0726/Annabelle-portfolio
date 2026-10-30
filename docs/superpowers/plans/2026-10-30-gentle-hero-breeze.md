# Gentle hero breeze implementation plan

**Goal:** Apply the user's selected gentle silk-in-wind interaction with very small movement.
**Architecture:** Reuse the existing WebGL artwork and damped pointer tracking. Replace rigid rotation/translation with a broad local texture bend capped at 6 horizontal and 4 vertical CSS pixels, with a subtle blue highlight. Fade in place on leave.
**Tech stack:** Existing React and WebGL; no dependencies.
**Spec:** The user selected gentle silk and explicitly requested small movement in this chat. Preserve artwork, copy, navigation, mobile layout, reduced-motion behavior and existing uncommitted changes.

- [x] Update only the relevant interaction in `src/components/RibbonArt.jsx`.
- [x] Verify production compilation and existing Node tests (build passed, 18/18 tests passed).
- [x] Inspect desktop hover, leaving the image, mobile layout and reduced motion in a browser (WebGL error 0; strength faded from 1 to .0017 after leaving; 390px mobile had no overflow or hover; reduced motion had strength/time 0).

Review focus: pointer coordinates must use the canvas bounds; movement must stay local; leaving must fade without sweeping to the centre; touch and reduced motion must disable hover; the existing image fallback must remain available.
