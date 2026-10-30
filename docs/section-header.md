# Secondary-page header standard

The user selected the About header shown in the reference screenshot as the fixed visual standard for secondary sidebar content views. Match the existing About implementation, not the screenshot's apparent pixel dimensions or the estimates in the suggested prompt. The screenshot is a visual reference; the green outline is an annotation, not part of the design. This document records requirements; it does not implement the shared header.

## Source of truth

Read `src/sections/About.jsx` and `src/sections/about.css` before implementation. The current header consists of the English eyebrow, gold slash and rule, localized title, and the inline handwritten blue-and-gold SVG. Reuse that exact SVG artwork and its proportions. Do not substitute the separate `brand-mark.svg` or the text signature currently used in Contact. The About page is the reference: preserve its appearance, including center alignment of title and signature; do not change to baseline alignment unless the user asks.

The actual current CSS values below supersede the earlier screenshot estimates. They are CSS pixels, not measurements from a scaled screenshot:

| Property | Desktop / default | Mobile, at 767px and below |
| --- | --- | --- |
| Page padding | 28px top; horizontal `clamp(28px, 3vw, 56px)` | 32px top; at least 24px horizontal, respecting safe areas |
| Page max width | 1120px, centered | Same constraint, within available width |
| Eyebrow font | `400 11px/1.6 system-ui, sans-serif`; letter spacing `.16em` | 10px; letter spacing `.18em`; gap 12px |
| Eyebrow layout | flex, centered vertically, 14px gap; 14px bottom margin | 20px bottom margin |
| Eyebrow colors | `--color-text-secondary`; slash `--color-imperial-gold` | Same |
| Rule | 72px by 1px, `--color-champagne-gold`, opacity `.6` | 32px wide |
| Title | `Georgia, 'Songti SC', 'STSong', SimSun, serif`; weight 500; `clamp(34px, 3vw, 42px)`; line-height 1.25; letter spacing `.025em`; `--color-text` | 34px; other values unchanged |
| Title and signature | flex, center aligned, 24px gap | 18px gap |
| Signature | 78 × 42px; sapphire ink and champagne-gold detail | 68 × 36px |
| Header to next content | 20px bottom margin on the heading area | Heading margin 0; opening flex container has a 20px gap |

For reference, About body text is 16px at line-height 1.8, with a 17px first paragraph and 16px paragraph spacing; on mobile the body line-height is 1.85. Its portrait floats right at 36% width with 32px left margin on wide screens, and moves above the introduction at widths up to 1099px. These body and portrait arrangements describe About only: the user selected the boxed header, not a mandatory identical body layout for every page.

## Implementation requirements for future work

1. Capture the current About header at matched desktop and mobile viewport sizes, in both languages and after animations settle. Extract its existing values into shared header tokens and a reusable React `SectionHeader` without changing the baseline. Preserve reduced-motion behavior, meaningful heading hierarchy, font fallbacks and accessible signature handling.
2. Apply the same shared header to secondary content views, using one source for sizing, spacing, colors and signature. The component should accept an English eyebrow and localized title; choose a semantic `h1` or `h2` appropriate to the rendered view, with at most one `h1` per view. Preserve the current About `h2` if changing it would alter the baseline; assess semantics across the view rather than nesting a heading inside a paragraph.
3. Use colors from `src/theme.css` and `docs/visual-style.md`; introduce no unrelated color palette. Translate the title when the site's language changes; keep the eyebrow in English. Handle long English titles and narrow widths without overlap, clipping or horizontal scrolling; identical sizing does not require identical line wrapping.
4. Preserve existing content, sidebar appearance, language control, existing navigation and links. Do not invent translations or unconfirmed project information.

## Current sidebar destinations

These are actual current IDs, not a new route scheme. Labels below are suggestions for future header data, not approved copy:

| Sidebar entry | ID / destination | Header treatment |
| --- | --- | --- |
| Home overview | `hero` | Existing Hero is a special homepage; do not force a secondary header onto it. |
| About me | `about` | Reference header: `ANNABELLE ZHU / ABOUT`. |
| Web & product | `portfolio` | Shared header; proposed eyebrow `PROJECTS / WEB`. |
| UX/UI design | `XD` | Shared header; proposed eyebrow `PROJECTS / UX·UI`. Preserve ID case. |
| Data & AI | `services` | Shared header; proposed eyebrow `PROJECTS / DATA & AI`. |
| Get in touch | `contact` | Shared header; proposed eyebrow `CONTACT`. Contact currently has its own title and text signature, so reconcile it without duplicating headings. |
| Models & tools, Teams & quotes, Model skills | `models`, `quotes`, `model-skills` | Shared header when these views are developed; currently placeholders. |
| Agency Bloom article | `agency-bloom` | Internal article with its own editorial header; assess how to apply the common page header without destroying the article title or duplicating `h1`. |
| Other WeChat articles | External URLs | External destinations are outside this site's control; do not alter their content. |

## Navigation and validation

The application currently mounts separate views via `src/navigation.js` and `src/hooks/useContentNavigation.js`. Clicking a sidebar item switches views and updates the hash; the sidebar selection follows the route. Do not replace this with a long continuous page or add scroll-position-based `IntersectionObserver` navigation. Preserve browser back/forward, deep links, focus management, reduced-motion behavior and scrolling within a long individual view.

Before rolling out, compare About before and after at the same viewport, zoom, language, font availability and settled animation state; investigate any visible differences. Compare at least two secondary headers at the same viewport, check Chinese and English, mobile wrapping and keyboard navigation, and verify a change to a shared token updates all applicable headers. Only claim pixel identity if actually measured under controlled conditions.
