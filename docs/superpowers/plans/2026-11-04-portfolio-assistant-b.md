# Portfolio assistant B implementation plan

> Execute inline in the current working copy, preserving the existing uncommitted RAG work. The user selected B and authorized implementation and documentation updates; no extra design approval is needed.

**Goal:** Make the existing portfolio assistant approachable, conversational and reliable without redesigning other pages.

**Architecture:** Keep the four existing entry routes and session. Use local social replies and evidenced examples, and a single server model response for general conversation or grounded portfolio answers. Validate citations against the public passage registry. Render all generated text as plain text.

**Tech stack:** Existing React 19, Vite 7, Node 22, CSS and Node test runner; no new application dependencies.

**Spec:** User-selected B sketch and `docs/portfolio-rag.md` (updated with implementation).

## Constraints

- Modify only assistant components/styles, assistant conversation/search/server files, related tests and documentation.
- Reuse shared palette variables. Do not change site navigation, shared theme or case content.
- Ordinary conversation is allowed; project facts require registered sources; no invented contributions, private facts or metrics.
- Preserve drafts/history across closing, navigation and refresh. Reset cancels pending results.
- Keep production credentials server-side and distinguish unavailable AI from missing evidence.

## Tasks

- [x] Add failing behavioral tests: local greetings without evidence, model-generated general replies, grounded natural answers, valid source IDs, bounded full conversation history, unavailable service and HTTP validation.
- [x] Implement shared local social replies and model response contract. Update live checks for ordinary conversation; do not treat stubbed tests as live verification.
- [x] Render B as a compact floating chat: abstract avatar, readable bubbles, three concise evidence-backed suggestions, unified composer and expandable privacy explanation.
- [x] Implement opening transition, desktop input focus, mobile non-keyboard focus, focus return, saved reading position, pending-message feedback and reset cancellation; respect reduced motion. Closing is immediate to restore focus promptly.
- [x] Run relevant Node tests and production build with Node 22. Check desktop/mobile, local greeting, examples, failure, source navigation, session restoration, reset and keyboard behavior in browser.
- [x] Update `docs/portfolio-rag.md` and the RAG guidance in `AGENT.md` with final behavior and exact verification limits. Review changed file scope.

## Review focus

- Provider text never creates source URLs; unknown IDs invalidate a grounded answer.
- Model or HTTP failure preserves the question and offers retry; a greeting is never an evidence error.
- A response arriving after reset cannot restore an old conversation.
- Opening on a phone does not steal the keyboard; desktop remains directly usable.
- Reading older turns is not interrupted by reopening or a new assistant response.

## Rulings

- Work in place: the current assistant and its tests are untracked work and would not exist in a fresh checkout. Keep unrelated modifications intact; do not commit or publish.
- The desktop remains a floating panel: the sketch's extra sidebar would unnecessarily affect other pages.
- Final evidence: 27 offline tests pass; production build passes. Actual provider authentication is HTTP 401 and all nine live tests fail with unavailable replies. Browser response simulation validates the UI contract only. Mobile screenshot capture was blocked by minimized browser state; mobile DOM/layout and interaction assertions passed. Desktop screenshot reviewed. Review was performed inline, not by an independent reviewer.
