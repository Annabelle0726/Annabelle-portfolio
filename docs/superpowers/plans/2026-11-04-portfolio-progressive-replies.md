# Progressive portfolio replies

User request: remove the answer/privacy disclosure, commit, then show thinking and progressive answer output.

- [x] Remove the disclosure and commit the current RAG feature without unrelated page changes.
- [x] Add tests for thinking before output, incremental text, cancellation, reduced motion and refresh recovery.
- [x] Implement a bounded client-side presentation sequence after source validation: pending → generating → completed. Keep references hidden until completion; do not display internal model reasoning.
- [x] Preserve next-message drafts, existing reading position, close/reopen behavior and reset cancellation. Keep unfinished text out of model context.
- [x] Check real browser transitions on desktop and mobile, run relevant tests and build, update the handoff, and commit the progressive-output change.

This is progressive rendering of a validated answer, not provider-token streaming. The current JSON response must be complete before citation validation. Local case answers use the same presentation and a short, visible preparation state. No change to case pages or model credentials.
