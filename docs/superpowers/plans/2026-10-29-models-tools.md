# Models and tools implementation plan

**Goal:** Implement the approved two-card visual draft, exact shared header/signature, Skills aligned to their indices, and a working link to Teams & quotes.
**Architecture:** Localized ModelsTools section, existing favorites routing, scoped CSS and existing hero artwork. Preserve model-skills deep link as an alias while removing its redundant sidebar entry.
**Tech Stack:** React, Vite, CSS; no new runtime dependencies.
**Spec:** Approved conversation sketch and corrections; docs/section-header.md and docs/visual-style.md.

## Constraints and review focus
- Preserve shared header geometry and SVG; do not change About or Contact.
- Target 100dvh, with natural overflow on short screens/text enlargement. Never clip essential content.
- Skill names and descriptions start at index left edge. Desktop 3x2; mobile 2x3.
- Usage details are visibly unavailable placeholders, no fake link or unfinished modal.
- Quotes link uses existing navigation, focus, back/forward, and thin blue arrow/open gold circle.
- Develop in an isolated snapshot, apply only precise approved edits to active folder.

## Tasks
- [ ] Add ModelsTools.jsx and models-tools.css; reuse theme/signature/artwork; localize approved content.
- [ ] Mount models/model-skills, remove redundant sidebar entry, retain quotes placeholder.
- [ ] Build, run existing tests, inspect Chinese/English desktop/mobile, alignment, overflow, placeholders, quotes navigation, focus, shared signature.
- [ ] Review and apply scoped edits to active project; recheck build and tests.

## Decisions
User approved implementation; no additional approval gate. Existing contact/article work untouched.
No source-mirroring unit tests for presentational changes; use interaction/layout checks.
The user subsequently requested a local commit; publication is not requested.

## Verification record
- Node 22.23.3: production build passed; existing 10 tests passed.
- Component render checks passed in Chinese/English: two tool cards, six skills, exactly one real link to #quotes, both placeholders labeled, shared signature and legacy focus target present.
- Fresh source review identified narrow desktop topic overflow; fixed with stacking at 768–1099px and shrinkable/wrapping labels. Tablet skills use two columns intentionally to preserve readable text beside the 300px sidebar.
- Compact phones omit redundant introductory/topic labels; card descriptions and all six Skills stay available. Short windows/enlarged text retain natural vertical flow.
- Browser access was rejected by environment policy. Actual desktop/mobile screenshots, viewport-fit measurement and keyboard/back-forward interaction testing are outstanding; no claim of pixel identity or guaranteed one-screen fit.
- Final source review performed independently. No blocking source findings remain after the narrow-width fix; browser QA remains the limitation.

## Applied result
- Scoped files applied to the active Annabelle-portfolio folder; existing App/Sidebar edits preserved through exact replacements with pre-apply backups.
- Shared SectionHeader files remain byte-identical to the pre-implementation snapshot.
- A broad git whitespace check reports pre-existing trailing spaces in about.css at lines 91 and 94; that unrelated file was not changed. Scoped App/Sidebar whitespace checks passed.

## Decorative motion refinement
The user clarified that the original blue/gold ribbon was correct and requested subtle floating motion, with no spherical decoration. This supersedes the earlier orb interpretation committed in 2254181.
Restore the existing hero-art.png ribbon and its original desktop/mobile corner treatment. A 14-second alternating CSS transform adds 8px of vertical float, 6px of lateral drift and a subtle 0.8-degree sway. A stationary mask clips only the decorative layer; reduced-motion disables animation. Remove the orb asset and its desktop text reservation.
Keep the shared signature, page content, placeholders, index alignment and #quotes link unchanged. This correction is a separate scoped commit.
Browser visual verification remains blocked by environment policy; build and existing tests are checked before commit.
