# Project guidance

## Project and scope

- This repository contains Annabelle Zhu's portfolio. The main page is a React application built with Vite; the linked portfolio examples are independent static websites.
- React entry points are `src/main.jsx` and `src/App.jsx`. Main-page sections live in `src/sections/`, reusable components in `src/components/`, and styling in `src/styles.css` and the existing `assets/css/style.css`.
- Keep the existing portfolio content, personal information and working project links intact unless the user asks to change them. Do not invent or silently update biographical details.
- The current site has no resume view or navigation entry. Do not restore the retired `#resume` route.
- Respect existing uncommitted changes and do not modify IDE files or unrelated work.

## Development and verification

- Use Node.js 20.19+ within the 20.x series, or Node.js 22.12+.
- Install dependencies with `npm install`; start the development server with `npm run dev` and use the URL it prints. An IDE's static HTML preview cannot compile the React source.
- Run `npm run build` to check production compilation. Use `npm run preview` to inspect the built site. For UI changes, check desktop and mobile layouts and the relevant interactions in a browser.
- Keep the first-screen content visible while the application loads; do not make essential content depend on external scripts or scroll-animation initialization. Preserve accessible navigation and avoid horizontal overflow on mobile.

## Portfolio direction and content review

- For portfolio Q&A (RAG), read [docs/portfolio-rag.md](docs/portfolio-rag.md) for the knowledge sources, rollout scope, session behavior, and verification status.
- The user selected assistant direction B: a warm, conversational AI guide with an abstract blue/turquoise avatar. Keep assistant styling and behavior scoped to RAG; do not redesign the surrounding pages. Allow ordinary LLM conversation while grounding portfolio facts in registered public sources. Opening the assistant must not call the model or force the mobile keyboard.
- Read [docs/portfolio-direction.md](docs/portfolio-direction.md) before planning visual or content changes. It records the direction discussed with the user and decisions still awaiting their input; it is not authorization to implement a redesign.
- The user selected the jewel-blue, lake-turquoise and champagne-gold direction and wants content accessed through the sidebar instead of one continuous scrolling page. Follow [docs/visual-style.md](docs/visual-style.md) and `src/AGENTS.md` when working on the main React site. The current hash navigation switches content views; preserve that behavior.
- For secondary sidebar views, follow [docs/section-header.md](docs/section-header.md): the existing About header is the visual baseline for the shared header.
- Some historical work may be outdated. Do not guess which work to remove, change biographical details, or delete project files. Confirm the intended display and treatment of each project before changing it.

## Assets and publishing

- `vite.config.js` uses a relative base so the built site can work under a subdirectory. Preserve this behavior when changing asset paths or routing.
- `scripts/copy-static.mjs` copies the independent portfolio examples and required static assets into `dist/`. Update it when adding or moving files that must be included in the published site, and check their links in the build.
- Publish the complete build output, not the development `index.html`. GitHub Pages can host the built static files; configure a build-and-deploy workflow when the user requests publication.
- The existing `ART 150` example has missing stylesheet and script files in the original repository. Do not assume the missing files can be reconstructed from upload-temporary files.

## Language and commits

- Google Translate has been removed. Keep the existing content language until the user requests the planned internationalization work; the future target is Chinese and English, with Chinese as the default.
- Write commit messages entirely in English, using Conventional Commits, for example `feat: add portfolio filters` or `style: refine mobile navigation`. Choose the type according to the actual change.
