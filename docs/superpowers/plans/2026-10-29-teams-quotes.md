# Teams & Quotes Implementation Plan

> For agentic workers: use superpowers:executing-plans for this small page change.

**Goal:** Implement the approved four-item collection sketch, with an animated upper-right ribbon and a footer link to Contact.
**Architecture:** New TeamsQuotes React view and scoped CSS; integrate the existing quotes route in App without changing navigation or shared header tokens.
**Tech Stack:** Existing React/Vite; CSS motion; existing hero artwork.
**Spec:** User-approved desktop/mobile sketch, docs/section-header.md, docs/visual-style.md, plus the user's Contact-link and animation correction.

## Constraints
- Preserve all existing uncommitted changes. Work on an isolated snapshot, then apply only this page and exact App integration edits.
- Reuse SectionHeader and original signature. Support Chinese and English and narrow-screen wrapping.
- Use the existing #quotes and #contact routes and onNavigate callback.
- Keep external source URLs and attribution. The video has no verified date or transcript; use an original decorative illustration, no invented metadata.
- Reuse hero-art.png for a small decorative ribbon; disable motion under prefers-reduced-motion.
- No publishing or commits requested.

## Review focus
- Narrow English titles must wrap with no horizontal overflow.
- Footer must open Contact, preserve browser back, and be keyboard reachable.
- Ribbon must not intercept clicks or cover text; reduced motion must disable animation.
- External links must have safe rel attributes and accessible labels.
- Existing page edits must remain intact during integration.

## Tasks
- [x] Create TeamsQuotes.jsx and teams-quotes.css with four bilingual source cards, an illustrative video cover, shared page heading, and Contact footer.
- [x] Integrate only the quotes placeholder in App and suppress the overlapping floating back-to-top control for this view.
- [x] Run existing tests, production build, bilingual SSR assertions and scoped style/link checks; attempt browser verification if an authorized local surface exists.
- [x] Review exact diff and apply these files plus minimal App edits to the user's active project.

## Verification baseline
Existing node --test: 10 passed. Main checkout contains unrelated uncommitted changes, preserved in the isolated source snapshot. The installed runtime is Node 24; use Node 22 for production verification if available.

## Completion evidence
- Node 22.13.1: isolated baseline had 10 passing tests; the active project's final suite had 13 passing tests (including concurrent UX/UI additions). Vite production build and static copy passed in both workspaces.
- Bilingual SSR checks passed: four source cards, safe external links, shared header/signature, heading hierarchy, and both internal navigation callbacks.
- Reduced-motion stylesheet and decorative non-interaction checks passed.
- Independent static review found no actionable issues.
- No connected local browser tool was available; actual desktop/mobile rendering and animation remain unverified in browser.
- Only two new page files and three guarded App substitutions were applied. Existing unrelated edits were preserved. No commit or publishing action performed.
