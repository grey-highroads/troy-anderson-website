# Current builder handoff — October 25, 2026

This is the starting point for a new session. It supersedes the October 7–16 snapshots in older documents. Read current code and latest `main` alongside this document. Historical handoff: [through October 16](archive/HANDOFF_THROUGH_2026-10-16.md). No new implementation batch is pending approval or half-finished at this checkpoint.

## Start here

1. Read `AGENTS.md`, this file, `WORKING_GUIDELINES.md`, and `README.md`. Before changing Next.js code, read the relevant installed `node_modules/next/dist/docs/` guides.
2. Inspect branch, recent commits, status, and remote synchronization. Continue from latest `main`, not an old revision cited in historical notes.
3. Read `studio/README.md` for CMS changes; `CLOUDFLARE_RUNTIME.md` and `CONTACT_DELIVERY.md` for publishing or delivery; `DECISIONS.md` and `CLIENT_ACCOUNT_SETUP.md` for launch/account changes. `ROADMAP.md` is broader acceptance work, not authorization to start everything.
4. Follow the user's next request. For a proposed punchlist batch, explain what you intend to do in one pass and wait for approval. A direct request already authorizes its specified changes.

Workspace: `/Users/greygarner/Documents/Codex/2026-09-10/referenced-chatgpt-conversation-this-is-an-2`.
Repository: <https://github.com/grey-highroads/troy-anderson-website>, branch `main`.
Latest implementation at preparation: `c0d82ff` (October 25 hero assets). The handoff documentation commit will follow it; start from current HEAD.

## User preferences and scope

- Prioritize structural/layout/CSS work before unsettled copy. Content is ultimately the client's decision. Push back on feedback only for a concrete structural or engineering reason.
- Keep headlines ALL CAPS; current size reflects a follow-up increase halfway toward the original after the first reduction was too small. Preserve the current result instead of reapplying the initial reduction.
- Propose coherent batches, obtain approval, implement, check, push to GitHub, and verify the deployed result for browser review. Standing permission covers routine scoped commits/pushes.
- Leave homepage copy/CMS expansion alone unless requested. Later hero replacement requests explicitly authorized the assets only; they did not reopen the homepage content/design.
- Leave the Book sample destination as it is until the approved URL arrives.
- Preserve content drafts. Do not publish them as part of schema work or overwrite them with published data.
- Do not launch the client domain, change billing/plans, invite users, or change dataset visibility merely because the roadmap mentions those steps.
- Do not create another chat or delegate work just because this handoff exists.

## Live surfaces and infrastructure

| Surface | Address / behavior |
| --- | --- |
| Primary review | <https://troy-anderson-website.grey-4fe.workers.dev/> — Workers/vinext runtime, published Sanity content refresh without rebuilding |
| Secondary static preview | <https://grey-highroads.github.io/troy-anderson-website/> — GitHub Pages, rebuild required |
| Hosted Studio | <https://troy-anderson.sanity.studio/> — separate deployment from website |
| Sanity | project `gknd24m7`, dataset `production`; last confirmed public October 12; no plan/visibility change authorized |

Six routes: `/`, `/about/`, `/book/`, `/media/`, `/contact/`, `/press/`. Press is unlinked and has `noindex,nofollow`; it is publicly reachable by URL, **not access-controlled**. Do not describe the unlinked page as restricted access. A password/login restriction remains a separate client decision.

Code pushes to `main` run `.github/workflows/pages.yml`. Website/runtime paths additionally run `cloudflare-test.yml`; documentation-only pushes do not trigger the Worker deployment. The Worker workflow verifies publishing behavior after deployment. Studio schema changes require their own deploy. Keep the legacy CMS-to-Pages rebuild webhook until its retirement is approved. Never commit or print `.dev.vars`, environment tokens, or private migration backups.

## Completed since the previous handoff

- Homepage book promotion moved to immediately above the footer; Meet Troy precedes it. Story CTA targets `/about/#my-backstory`.
- Small introductory section labels removed and interior typography/banner hierarchy reduced, then rebalanced on request. Book headline wrapping was fixed by allowing the full column width.
- About duplicate hardcoded subhead removed. Backstory has video #14, an improved poster, and the restored pull quote below the video. Video settings and quote are editable in Sanity. Biography photo credit is editable and user approved **“Photo: Mark Laita”**.
- Book sample CTA is a proper button. Sanity has an expanded **Sample button** group: **Button copy**, **Unavailable button copy**, and destination URL. Unavailable copy is used when the URL is absent; it is not another visible button. Defaults remain intentional fallbacks.
- Bookseller graphics added for Amazon, Barnes & Noble, Bookshop.org; optional retailer image overrides are editable in Sanity.
- Media now focuses on YouTube and podcast appearances, with a podcast placeholder. Main subheadline/section copy fields match this page. Legacy press-resource fields/data remain hidden/read-only rather than discarded.
- Book, About, Contact copy controls were aligned to the rendered page; Contact includes form labels/messages/options. Homepage expansion was deliberately excluded.
- Restored the old Approved Images grid/styling on `/press/`, with a separate `press` Sanity document and 17 copied photo references. Legacy Media photos remain preserved. The publishing checker derives routes from registered content pages so Press participates.
- Hero assets refreshed October 23 and again October 25. Latest batch is committed in `c0d82ff`; both deployments succeeded and all 14 new loops were observed playing in the live browser.

Key revisions: `c701d83` structural pass; `982c901` Media restructuring; `cfee2c5` headline/About correction; `83e80c7` About video; `6cf31f5` pull quote/poster; `a2dd9d9` Book wrap; `815d96f` Media schema; `121e9f3` Book/About/Contact schema; `a63f11f` Press; `00b8a8c`/`8763725` publishing checks; `962debb` logos/credit; `63e5eda` Book button controls; `0ba6594`/`c0d82ff` hero batches.

## Hero asset maintenance

Current source ZIP: `/Users/greygarner/Desktop/Higher Roads/Clients/Troy Anderson/Assets/Clips/New Gifs/2/newGIFS.zip`.
Previous source: sibling `New Gifs/newGIFS.zip`. These contain MP4 files despite being called GIFs.

Clips: 02, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 17. Map `TA_BB_XX_gif.mp4` to `public/videos/hero-20261016/TA_BB_XX-preview.mp4` and matching `-poster.jpg`. Folder date stays October 16; content is October 25. Full `TA_BB_XX.mp4` files are the original click-to-play videos and were not replaced. About's dedicated `TA_BB_14-backstory-poster.jpg` is separate.

Latest encoding: H.264 CRF 24, medium preset, yuv420p, faststart, no audio, original dimensions/frame rate/duration retained. JPEG poster extracted at 0.5 seconds. All 14 optimized loops total 5,261,215 bytes versus 164,805,757 source bytes. `components/editorial-grid.tsx` uses `?v=20261025` on preview/poster requests to avoid stale cached assets. Update that version on future replacements.

No dependency was added for encoding. Temporary Python/ffmpeg tooling under `/tmp/troy-media-tools` and scripts under `/tmp/troy-new-hero-1025` may disappear; do not depend on them existing. See [hero maintenance](HOMEPAGE_VIDEO_POC.md) for reproducible settings. Preserve current viewport-contained gapless layouts: preview/poster `cover` anchored center/top; selected full video `contain`. Header, choreography, pause/reduced-motion behavior, and expanded videos were unchanged by these two batches.

## Remaining work / decisions

The original October 22 punchlist is retained as reference in [the source feedback](PUNCHLIST_2026-10-22_SOURCE.md). Its unchecked boxes are source feedback, not a current implementation checklist. The existing Google spreadsheet **Life Coach Troy — Website Copy Changes & Decisions** was located through Drive metadata on October 25. Its private Drive link is intentionally omitted from GitHub; find it by this exact title and spreadsheet file type through the connected Drive account. It is the requested spreadsheet replacement for the earlier Google Doc of the same name, grouped into ready to implement / needs a client decision with a suggester column. Re-read its current rows before using it; its contents/approval status were not re-audited in this documentation pass. Do not create a duplicate or treat the earlier Google Doc as the current tracker.

- Approved book sample content/URL is still awaited. Do not assume its expected October 23 date means it arrived.
- Confirm authoritative final-copy document and Kathy's final proofreading source.
- Resolve homepage promotional/closing copy, replacement homepage photography, testimonials wording/selection/credentials, repeated biography/free-coaching material, backstory continuity, Book inspiration-section retention, and Media navigation naming with the client. Do not silently choose competing suggestions.
- Review “Cisero” → “Cicero” against current published copy; the source punchlist requests it, but this handoff does not establish that it was applied.
- True Press access restriction remains undecided; unlinked/noindex is the delivered scope.
- Broad release gates remain: real-device/accessibility/reduced-motion/performance QA, final media/captions/titles and retailer destinations, production Contact recipient/privacy/capacity/failure checks, metadata and approved analytics/privacy, account/support/billing agreement, client editor onboarding, managed-production acceptance, and domain/DNS cutover. See operational docs; no cutover has occurred.

## Checks and deployment

Use Node 24 / pnpm 11; scripts are in `package.json`.

- Website: targeted ESLint and `pnpm typecheck`; normal full delivery checks are `GITHUB_PAGES=true pnpm check` and `pnpm cloudflare:build` as appropriate to the change. CI runs complete website checks/builds. Do not claim historical checks were rerun.
- Hero October 25: all 14 outputs decoded successfully; targeted ESLint, typecheck, diff whitespace checks passed; both deployed builds passed; live browser confirmed all 14 versioned sources and advancing playback, no media errors. This was not a fresh full mobile/device acceptance pass.
- Studio: `pnpm studio:build`, `pnpm --filter troy-anderson-website-1 exec tsc --noEmit`; from `studio/`, `pnpm exec sanity deploy --yes --schema-required`. Verify the hosted editor afterward.
- Verify actual page behavior after code deployment, not only HTTP 200/build success. Preserve browser screenshots as useful review evidence. Sanity publishes should appear on Workers independently of code deploys.
- If `gh` is unavailable, use the GitHub connector to inspect Actions runs/jobs/logs. Do not treat a queued run as success. A failed deploy can leave the previous healthy deployment serving; inspect the actual failing step.

## Existing unrelated working-tree changes

At this checkpoint these pre-existing files were deliberately left untouched and unstaged:

- `.superdesign/design-system.md`
- `.superdesign/resume.json`
- `next-env.d.ts`
- untracked `cloudflare.config 2.ts`, `scripts/package-cloudflare 2.mjs`, `vite.config 2.ts`

Do not discard, stage, or clean them up as part of a handoff or unrelated task. Review new status for additional user changes. No application code refactor or dependency update is required just to change builders.
