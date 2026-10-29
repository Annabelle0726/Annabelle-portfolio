# Sidebar content views

The user authorized splitting the existing long page into independent content views on 2026-10-29. Original section components and their content are reused unchanged.

| Address | Mounted content | Sidebar group |
| --- | --- | --- |
| `#hero` or no fragment | Original Hero | Home |
| `#about` | About and Skills | Home |
| `#skills` | About and Skills, focused/scrolled to Skills | Home (About child) |
| `#portfolio` | Website Portfolio and its existing carousel | Projects |
| `#XD` | Existing UX/UI section | Projects |
| `#services` | Existing data projects | Projects |
| `#contact` | Existing Contact | Contact & résumé |
| `#resume` | Existing Resume | Contact & résumé |
| `#models`, `#quotes`, `#model-skills` | Corresponding Favorites heading and existing “Coming soon” status | Favorites |

Native fragment links keep the existing GitHub Pages/subdirectory deployment and published deep links working without a new router dependency. `src/navigation.js` resolves supported fragments; unknown fragments do not replace the current view, and an unknown initial fragment falls back to Home. The skip link focuses the main content without adding a history entry.

Route changes mount only the selected view, close the mobile menu, focus the destination and reset scroll. The retained Skills fragment scrolls to Skills within About. Browser back/forward and reload restore the view. Scrolling within long content does not change the selected sidebar group. Back-to-top scrolls within the current view. Download and external project URLs are untouched. Menu headings continue to expand/collapse their child links; WeChat continues to open the account dialog.

The social icon bottom edge is reduced from 2px to 1px (hover 3px to 2px). Selected navigation depth is reduced from 2px to 1px, with a smaller and lighter diffuse shadow. Colors still come from shared theme variables.

Validation: `node --test tests/navigation.test.mjs` and `npm run build`; production-browser checks for all content destinations, published UX/UI and Skills deep links, reload, history, portfolio carousel, résumé download target, Favorites selection, mobile menu/focus, language persistence and 320px overflow. Original files under `src/sections/` are unchanged. Independent source review found a Skills/About selection mismatch, which was corrected. Browser evidence is kept in ignored `.oil-ui/content-views/`. Physical-phone testing has not been performed.
