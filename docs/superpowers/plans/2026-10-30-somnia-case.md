# Somnia Library implementation plan

Goal: implement the user-approved desktop/mobile case-study draft with the existing signature and a restrained animated blue-white-gold image ribbon.

Spec: approved Somnia mockup in this conversation, plus docs/section-header.md and docs/visual-style.md.
Architecture: isolated SomniaCase component and scoped CSS, early route from WebProjects. Reuse SectionHeader unchanged. Preserve current uncommitted work and routes.

- [ ] Prepare supplied home/library screenshots, a clearly identified home-page match preview, and transparent generated ribbon as compressed WebP assets.
- [ ] Implement bilingual introduction, role/attribution, screenshot selector with keyboard support, native image dialog, design notes, and project links.
- [ ] Add decorative ribbon float and pointer response, manual pause, reduced-motion support and mobile layouts.
- [ ] Run existing navigation tests and production build. Check screenshot integrity, heading/signature styles, overflow and interactions with an available browser. Record any unavailable verification.

No publish or commit requested. Do not alter other in-progress project sections.

## Implementation and verification

- Assets, bilingual case, original shared signature, keyboard-operable screen tabs and native image dialogs implemented.
- Generated WebP ribbon: 61,558 bytes, CSS float, pointer response, pause control, reduced-motion handling, offscreen/background pause.
- Existing route tests: 6/6 passed. Both Chinese and English server renders verified one h1, unique IDs, three tabs, default library selection, attribution, and original signature component.
- Production build passed after implementation. Independent code review found swapped mobile safe-area sides; corrected and rebuilt.
- Browser visual/interaction validation remains outstanding: connected local browser tools were unavailable; cloud browser could not reach the temporary local preview (connection refused). No pixel-identity or device-layout claim is made.
- Existing unrelated whitespace in about.css was observed by whole-repository diff checking and left untouched.
- No commit or publication performed.
