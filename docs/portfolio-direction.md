# Portfolio direction and content review

Recorded 2026-10-29. The user selected option 1, soft yellow and blue, and wants sidebar navigation between content views rather than one continuous scrolling page. This document records the direction and outstanding decisions; the documentation update does not implement the redesign.

## Goal and direction

Help first-time visitors understand Annabelle's positioning and see her data analysis, web development and UX/UI skills through concrete work. Create a personal, work-focused portfolio with a recognizable yellow-and-blue identity, while keeping content and project previews central.

## Design recommendations

- **First screen:** Present the name and a concise introduction; consider a direct entry to featured work. Use mobile height and spacing to encourage exploration.
- **Content structure:** Use the sidebar to open content views; the homepage may feature project links. Allow normal scrolling within longer views. The user will decide the featured selection and order.
- **Projects:** Prioritize clear previews, a brief problem or goal, personal role, outcomes and a clear link. Do not invent results or metrics.
- **Color and typography:** Retain the yellow-and-blue identity with restrained saturation, quiet backgrounds and consistent type and spacing. See [visual-style.md](visual-style.md).
- **Navigation and responsive behavior:** Show the selected view in the sidebar; provide an accessible mobile menu. Consider the existing sidebar plan and implementation without assuming it is complete. The current long-page anchor model needs to change.
- **Long content:** Make resume, skills and project descriptions easy to scan. The user will decide what to shorten and how to present details.

## Awaiting user input

### About and personal information

The user plans to revise About later. Preserve the current text and personal information for now; do not infer or silently rewrite them. Check potentially outdated or inconsistent details such as degree and age against the user's updated information.

### Project selection

The user says some historical work is outdated, but has not identified which. Listing the following current entries does **not** imply they should be hidden or deleted:

| Current entry | Decision |
| --- | --- |
| Sprinkles Cupcakes | Awaiting user input |
| Marriott Bonvoy Hotels and Villas | Awaiting user input |
| Love Across Mythologies | Awaiting user input |
| Asian visual culture | Awaiting user input |
| UX/UI Portfolio (Adobe XD) | Awaiting user input |
| Each Data Science project | Awaiting user input individually |

For each project, the user can choose to feature it, retain it with lower priority, hide it from the homepage while preserving files and links, or explicitly request removal. Consider relevance, completion, available visuals and link availability. Verify roles, descriptions, outcomes and metrics.

## Scope and verification

- This is a design and content record; it does not change the page, project files, personal information or publication status.
- For a later redesign, inspect desktop and mobile, including project entries, images, navigation, links and accessibility.
- Some areas in the earlier full-page screenshot appeared blank or dark. It may have been captured before lazy loading completed; this is not proof of a defect. Check after scrolling and waiting for loading.
