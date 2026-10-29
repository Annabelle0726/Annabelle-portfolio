# Model usage pages implementation plan

**Goal:** Publish the user's supplied accounts of working with ChatGPT and Claude Code as separate internal pages.

**Design:** The user selected dedicated pages. Each overview card links to its own hash route: #models-chatgpt or #models-claude-code. Each view reuses SectionHeader with the original signature, floating ribbon, localized title, opening, three numbered actions and a project excerpt. Links at the top and bottom return to #models. Preserve the existing navigation hook for deep links, focus, back/forward and reduced motion. Highlight Models & tools as the current sidebar location within either detail page. Long prose scrolls naturally.

**Content:** Preserve the supplied Chinese prose; provide faithful English counterparts for the existing language switch. Update Claude Code's role, summary and topics to UI observation, interaction refinement and visual review. No fabricated Before/After images or unconfirmed project outcomes.

**Files:** Add ModelUsage.jsx, model-usage.js and model-usage.css. Update ModelsTools.jsx and models-tools.css for links and the revised Claude summary. Add two routes in navigation.js, two view entries and an import in App.jsx, and parent-location marking in Sidebar.jsx. No dependency or existing route changes.

- [x] Add bilingual prose and the supplied Claude Code card copy.
- [x] Add independent route views and real overview/return links.
- [x] Style readable numbered rows and a project excerpt with mobile stacking and theme colors.
- [x] Node 22 production build and 14 current tests passed, including the new route regression. Both detail pages passed SSR checks in Chinese and English: one h1, three actions, shared signature/ribbon, matching route target, two return links and no accordion markup. The overview retains #quotes.
- [ ] Review and commit scoped changes, preserving concurrent project work.

Browser interaction and viewport QA remain blocked by the existing environment policy. Do not claim that screenshots or browser back/forward interactions were visually tested.
