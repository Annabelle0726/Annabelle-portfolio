# Belay case page implementation plan

Goal: Implement the approved restrained blue/gold Belay concept in the existing web-belay route.
Architecture: Dedicated BelayCase component and scoped CSS, shared SectionHeader, existing navigation. Original uploaded Sol screenshots remain factual images; the portfolio uses local state for demonstrations, without model calls.
Spec: User-approved final concept in this conversation (2026-10-30).

Constraints: Preserve all concurrent changes; do not change shared header/sidebar styling or Agency Bloom. Use original SVG via SectionHeader. Content titles 22–26px, body 14–16px; header tokens unchanged. Use theme colors, reduced motion, keyboard access and mobile wrapping. Keep brand imagery in the upper-right opening only. The user subsequently requested a scoped Belay commit; publication is not requested.

- [x] Prepare optimized original screenshots and ribbon asset in src/assets/belay-case.
- [x] Add src/sections/BelayCase.jsx and belay-case.css: three scene controls, success/error controls, native image dialog, native Glass Box disclosure, quote-followup explanation, bilingual copy and previous/next navigation.
- [x] Route web-belay to the standalone component through a surgical App.jsx edit.
- [x] Validate production build, 16 existing tests, image asset hashes and source review.
- [ ] Complete browser verification of desktop/mobile Chinese/English, interaction and keyboard behavior. Browser connection was unavailable; source review does not substitute for runtime checks.

Latest user adjustment: inspected models-tools.css and teams-quotes.css as the requested Favorites references. Adopted their compact upper-right radial fade, multiply blending, oversized inner art and small 14-second drift. Added top/right edge feathering for Belay's inset artwork. Desktop art is capped at 520px wide and 340px high; mobile stays upper-right at 45% width, 200px height and .4 opacity. Typography, copy and interactions remain unchanged. Follow-up: top-aligned the desktop introduction and applied one reusable SVG jewel arrow to screenshot zoom, interface links, follow-up disclosure and adjacent-project navigation. Production build succeeded in 3.19s; all 16 existing tests passed. Commit scope includes only the Belay assets/component/styles/plan and its App/navigation entries; other concurrent work stays uncommitted.

Ruling: Work in the user’s active local checkout to preserve and use the approved uncommitted site work; isolate this task by new uniquely named files and one route edit. Do not alter or commit other changes.
Ruling: Native browser checks will cover reversible presentation interactions rather than adding tests that duplicate component markup.
