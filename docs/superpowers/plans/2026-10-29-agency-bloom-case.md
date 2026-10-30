# Agency Bloom case implementation plan

Approved: user accepted the supplied editorial sketch and requested implementation with the supplied 42.6-second video and existing signature.

Goal: replace the old web-project carousel with a three-project entry and an expanded Agency Bloom case; preserve existing article routes.
Architecture: React/Vite hash views, existing SectionHeader, scoped web-project styles and bilingual copy. Work in an isolated snapshot of current uncommitted source; apply only owned files and surgical integration edits to the live checkout.

- [ ] Add route regression coverage for web-agency-bloom, web-belay, web-somnia and preserve agency-bloom article routing.
- [ ] Create WebProjects overview and Agency Bloom case with four original screenshots, accessible enlargements, native video controls and bilingual text. Belay/Somnia have concise truthful project introductions; full case studies are future work.
- [ ] Add the third-level sidebar branch and App views without replacing other pending edits.
- [ ] Verify tests, production build, asset paths, responsive layout and media metadata. Recheck integration against fresh live files before copying owned source.

Constraints: use theme tokens; exact existing SectionHeader SVG; no invented impact metrics; no model branding; no dead QR CTA or public placeholder copy. Source screenshots remain Chinese when surrounding copy is English. No autoplay, video uses preload=none and poster. Keep legacy project files, existing UX/UI and data routes.

Review focus: Chinese/English at narrow widths; article and case routes do not collide; browser back/forward and keyboard focus; close image dialog returns focus; video is valid under relative Vite base.

Progress: baseline 15 tests passed. Video SHA256 matches uploaded file. Existing worktree contains concurrent unrelated changes; no broad reset/stash/commit.

## Completion record

- Implemented WebProjects.jsx / web-projects.css, four optimized original screenshots, poster, original verified video, image enlargement dialogs, native video controls, bilingual case and written demo walkthrough.
- Integrated new distinct web-* routes and third-level sidebar in the live checkout using fresh exact-anchor edits. Preserved article route and concurrent data/quotes changes. No commit or push performed.
- Route regression observed RED before implementation, then full suite GREEN (16/16) in isolated and live checkouts. Live npm run build succeeded.
- Live Vite HTTP HEAD checks: component and media returned 200; video Content-Type video/mp4; SHA256 equals uploaded file.
- Independent static review found no critical or confirmed important code defects. Added an on-screen walkthrough for video reading; it is not a verbatim caption track.
- Browser visual/interactive QA is incomplete: cloud browser cannot reach sandbox loopback; host preview permission was rejected by environment policy. Do not claim pixel match, real playback validation, or desktop/mobile visual acceptance.
- Global git diff --check found pre-existing trailing whitespace in unrelated src/sections/about.css lines 91 and 94; left untouched. Scoped integration and new source have no whitespace errors.
