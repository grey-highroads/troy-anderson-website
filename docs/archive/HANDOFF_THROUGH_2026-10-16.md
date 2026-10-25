# Current Project Handoff

## October 16 no-spacing correction

Client review rejected the visible letterboxing in the first viewport version. `688003b` makes all preview loops and still posters fill their tile edge to edge with `cover`, anchored center/top to protect faces. Responsive preview/poster cropping is intentional; preserve source proportions without stretching. Full selected videos remain uncropped with `contain`. This supersedes the uncropped-poster/letterboxing guidance in the earlier viewport entry and D-014's initial implementation.

Cloudflare `38958589695` and Pages `38958589927` succeeded. Website lint/type/static export and Cloudflare build/types passed. Actual desktop/390px phone checks confirmed 14 tiles, zero grid gaps, full-frame media including all 14 paused posters, hero end at viewport bottom, and no horizontal overflow. Pause/resume and phone selection/Escape remained functional; full-player fit remains `contain`. Source media, header, CMS, and unrelated user files were untouched.

## October 16 viewport-contained hero

D-014 is implemented in `fd54bd9`, with the Workers still-poster correction in `ace47f1`. All 14 tiles now share the space remaining in the first stable viewport below the unchanged header; the book section starts at the next screen. This supersedes the earlier delivery's multi-screen grid dimensions. Header height is observed on resize, with a first-paint CSS fallback. Desktop, tablet, and phone use authored 6×4, 5×5, and 4×7 layouts; short wide screens use 6×4. Closing a clip mirrors the composition. Frames fit the available area; source posters/previews remain uncropped using `contain`, with dark letterboxing when needed. An explicit Image style preserves this on the Workers renderer as well as Next.js.

Playback stays inside the same hero height: a large player with 13 thumbnails beside it on larger screens and below it on phones. The section pause control has its own row inside the hero so it does not cover clips. Legacy expansion scrolling is removed; direct taps and Escape preserve page position and return focus. All media files, shared header artwork, CMS data, runtime publishing, and contact behavior are unchanged.

Final implementation runs: Cloudflare `38957016300` and Pages `38957016121` succeeded (initial layout runs `38956654067` / `38956653905` also passed). Website lint/type/static export and Cloudflare build/Worker checks passed. Live Workers checks at 1440×1000, 768×1024, 390×844, 320×568, and 844×390 confirmed 14 contained tiles, no overlaps/overflow, and hero/book boundary at the viewport bottom. Final desktop/phone checks confirmed uncropped stills, 14 loaded paused posters, pause/resume, contained native playback, switching, keyboard activation, direct tap without page scrolling, Escape/focus return, and no recorded browser errors. Pages was also browser-checked. Resize/orientation was checked locally. Reduced-motion handling is preserved; new OS emulation and real-device acceptance were not performed. User-owned Superdesign and the three unrelated untracked files remain untouched/unstaged.

## October 16 complete hero delivery and header replacement

`be59ead` replaces the homepage hero with all 14 pairs from `/Users/greygarner/Desktop/Higher Roads/Clients/Troy Anderson/Assets/Clips/New clips/TA_BB_delivery/` and swaps the shared header for an exact copy of `/Users/greygarner/Desktop/TA_siteheader.svg`. The hero has 14 real tiles and no placeholders; this supersedes the four-clip/six-tile counts in the historical October 9 notes below. Current assets are in `public/videos/hero-20261016/`; old `collage-poc` assets are retained but no longer referenced by the homepage. Full video `TA_BB_10b.mp4` is paired with `TA_BB_10_gif.mp4` under output stem `TA_BB_10`. Every other pair matches by number.

All supplied `_gif.mp4` files provide the silent loop and first-frame still. Preview shapes remain 2:1, 1:1, or 1:2; full playback remains 960×540. Two authored desktop arrangements and a two-column mobile arrangement fit all 14 without gaps, overlap, cropping, or visible per-tile labels/icons. Whole-tile selection, native playback, switching, Close/Escape, focus return, section pause/resume, and reduced-motion stills remain. The supplied SVG is unchanged; the header still starts at (0,0) and reaches the mint menu.

GitHub Pages run `38909241985` and Cloudflare run `38909241416` succeeded. `GITHUB_PAGES=true pnpm check` and `pnpm cloudflare:build` passed. Live Workers checks at 1440px/390px confirmed all 14 preview sources/dimensions, gap-free coverage, correct ratios, no overflow, representative full playback/switching, pause/resume, keyboard activation, and Escape/focus return. All 42 new media URLs on each host returned 200, with matching file sizes where reported; both deployed SVG files exactly match the supplied header. GitHub Pages was also browser-checked. No browser errors were recorded in the Workers check. Browser power/offscreen policies can pause offscreen previews; no hover requirement was added. Reduced-motion logic is preserved; no new OS/device emulation was performed for this delivery.

Prepared delivery totals 84,935,562 bytes (about 84.9 MB), including 2,140,622 bytes of silent previews. Full videos still load only on selection. Originals, CMS content/drafts, Media's 17 photos, runtime refresh, Contact delivery, account settings, and DNS are unchanged. Captions/editorial titles, real-device/performance QA, production media delivery, and release acceptance remain open. Preserve the two Superdesign modifications and unrelated untracked `cloudflare.config 2.ts`, `vite.config 2.ts`, and `scripts/package-cloudflare 2.mjs`; none were edited or staged.

## October 12 contact delivery update

The Cloudflare test Contact form now sends directly through the dedicated `Troy Contact — Test` Formspree form to verified `grey+troytest@higher-roads.com`. A real website test reached Formspree's normal inbox and the user confirmed receipt. Provider-side required-field/email/message-length validation, success/error handling, and desktop/mobile fit were checked. GitHub Pages retains disabled form delivery. Read [contact operations](../CONTACT_DELIVERY.md) before continuing.

The existing Formspree account is Free (50 monthly submissions shared across forms), not a paid Business subscription. No subscription was bought. Final client recipient, capacity/retention, production privacy review, bot-control/failure QA and release acceptance remain open. Sanity Growth/editor onboarding is still a deferred working plan under D-013. No domain/DNS cutover occurred. Preserve both user-owned Superdesign changes and the untracked `cloudflare.config 2.ts`; it appeared during this session and was not used or edited.

## October 12 Cloudflare migration update

Authenticated Book was proved first on <https://troy-anderson-website.grey-4fe.workers.dev/book/>, followed by D-011 across all five routes and shared Site settings. The existing repository, Sanity project/Studio, GitHub Pages deployment and rebuild webhook remain intact. Live-domain cutover is not approved or performed.

Published revision timing was 1.28–3.90 seconds; missed-notification recovery measured 20.81 seconds through ordinary requests and 59.98 seconds through a background alarm with no Book visits. Duplicate/out-of-order notifications, last-good content during CMS failure across Worker version changes, browser cache headers, desktop/mobile routes, Media's 17 photos, hero controls, and reduced-motion suppression were verified. Field values and existing drafts were preserved. Code commit `707948a` is published on main (the exact tested tree of local `2896077`). Cloudflare Actions run `38314286687` and retained GitHub Pages run `38314286625` both passed. All five routes and authenticated refresh were rechecked on the actual deployed sites.

Read [Cloudflare runtime operations](../CLOUDFLARE_RUNTIME.md) for the pinned beta integration, native build-output packaging, dedicated cache, secrets, commands, costs, measured limits and rollback evidence. Sanity now reports a Free project and **public** production dataset after its trial expired, contrary to the historical private-dataset notes below; no plan/visibility change was made. The agreed working plan is Growth with Grey as Administrator plus one named client Editor, USD 30/month before tax/overages once both are active. The publisher identity/invitation is deferred; no subscription or visibility change is authorized by this documentation. Private visibility remains undecided. See D-013 and [the launch plan](../CLIENT_ACCOUNT_SETUP.md) for confirmed facts, pricing and remaining decisions. Contact delivery, privacy/security, editorial approval and other launch gates remain open. Preserve the two user-owned Superdesign changes exactly.

**Project:** Troy Anderson website  
**Prepared:** October 9, 2026<br>
**Prepared by:** 2520 Consulting  
**Handoff point:** October 9 clip 04 addition and clip 08 preview refresh are live; core CMS slices are connected; production runtime publishing is approved and scheduled, not implemented

## Why this is the right handoff point

This is a stable chapter boundary. The repository, visual foundation, core public routes, hosted Sanity Studio, Homepage, Book, About, Contact, Media, and Site settings schemas, authenticated build-time content queries, and the automatic publish-to-deploy path are implemented. The temporary GitHub publishing path has observed dispatch, deployment, and cache failures; recovery of individual updates does not resolve those infrastructure limitations. The four content routes, approved Homepage sections, Media library, and shared footer social links are connected to published CMS content.

The latest requested hero replacement is complete and live-verified. No website implementation is left half-finished in this chat. Continue from current `main`, with the guardrails and remaining gates below. Historical verification records are retained to explain decisions, not to prescribe old behavior.

## Start here in the next chat

1. Read `AGENTS.md` completely. Then read this handoff, `PROJECT_PRIMER.md`, `WORKING_GUIDELINES.md`, `ROADMAP.md`, `DECISIONS.md`, `INFRASTRUCTURE_AND_HANDOFF.md`, `SITE_BUILD_DELIVERY_PLAYBOOK.md`, and `HOMEPAGE_VIDEO_POC.md` under `docs/`. Read `studio/README.md` when touching CMS work.
2. Inspect branch, recent commits, working-tree status, and remote synchronization before editing. Work from current `main`; do not check out an old handoff revision or reconstruct earlier chats.
3. Preserve `.superdesign/design-system.md` and `.superdesign/resume.json` exactly. They are user-owned uncommitted changes: never overwrite, discard, stage, or include them in unrelated commits. Do not use a Superdesign draft as the implementation source.
4. Before changing Next.js code, read the relevant installed guides under `node_modules/next/dist/docs/`. Installed Next.js 16.3.4 documentation takes precedence over older assumptions.
5. Report the branch/tree state, any discrepancy with this handoff, and the smallest intended file/change scope. Follow the user's next requested slice; do not begin speculative CMS/provider work just because it appears on the roadmap.
6. The user gave standing permission to push completed website work. Routine scoped commits/pushes do not need renewed permission. Verify lint/type/build and the actual deployed page for implementation changes; update milestone documentation after live verification. No subagents or new chats are requested by this handoff.

Workspace: `/Users/greygarner/Documents/Codex/2026-09-10/referenced-chatgpt-conversation-this-is-an-2`.

## Latest verified state and revisions

| Change | Revision | Evidence / current behavior |
| --- | --- | --- |
| Clip 04 addition / clip 08 poster-loop refresh | `2890bfa` | Actions `37953816452` succeeded; live 1440px/390px checks passed. Four real clips, two placeholders; clip 08 retains its 53-second full video. Both desktop arrangements and mobile retain source shapes and zero gutters. |
| Replacement hero media and simultaneous previews | `74a33f3` | Actions `37676230220` succeeded; actual live desktop/390px checks passed. All three previews loop without hover; no visible per-tile play icons; whole-tile playback, pause/resume, switching, Escape/focus return work. |
| Hero verification documentation | `f645d60` | Actions `37676678654` succeeded. This preceded the October 7 handoff refresh `df2b86e`. |
| Latest text accents | `2904187` | Actions `37669107772` succeeded and live computed colors were verified on Homepage, About, and Media. |
| Header flush to top/left | `11758fd` | Actions `37667593260` succeeded; live image origin (0,0), menu gap zero, no overflow at desktop/mobile. |
| White banner eyebrows / mint H1s | `8f6368b` | Actions `37667165489` succeeded; live colors verified. Scope is subpage banners, not all labels on white backgrounds. |
| Header reaches menu / mobile portrait crop | `3d895b3` | Live-verified; top-anchored About/Contact portrait styling below 900px. |
| Charcoal/white/mint palette and SVG header | `74d6040`, `51886d4` | Live-verified across all five routes; second revision preserves label contrast. |
| Content-sized subpage banners / flat homepage cover | `1be3390`, `2729eb4` | Live-verified desktop/mobile. |
| Homepage rich-text introduction | `ff541e4` | Website/Studio deployed; draft and published introduction converted separately and verified without publishing the draft. |

The original inherited handoff `90d249d` and Media poster implementation `d67a796` are historical milestones. They are not the current starting revision. This documentation-only refresh does not change application code, media, CMS documents, or infrastructure. Recheck the latest deployment after future pushes; do not treat the table as proof of an unverified later revision.

## Sources of truth

- Repository: <https://github.com/grey-highroads/troy-anderson-website>
- Temporary public preview: <https://grey-highroads.github.io/troy-anderson-website/>
- Live Book route: <https://grey-highroads.github.io/troy-anderson-website/book/>
- Live About route: <https://grey-highroads.github.io/troy-anderson-website/about/>
- Live Contact route: <https://grey-highroads.github.io/troy-anderson-website/contact/>
- Live Media route: <https://grey-highroads.github.io/troy-anderson-website/media/>
- Default branch: `main`
- Current implementation baseline: `2890bfa`; October 7 verification documentation: `f645d60`, handoff refresh: `df2b86e`. Use the latest `main` revision as authoritative.
- Sanity project: `Troy Anderson Website 1`
- Sanity project ID: `gknd24m7`
- Sanity dataset: `production` (public, confirmed October 12; private visibility undecided under D-013)
- Hosted Studio: <https://troy-anderson.sanity.studio/>
- Hosted Studio application ID: `t79qynbc05nitxgc59r4fq63` (public deployment identifier, not a credential)
- Local Studio URL when running: <http://127.0.0.1:3333/>

The repository documents are authoritative. Do not rely on a prior chat or a design-tool draft when the code or these documents say otherwise.

## Product and scope constraints

- Fixed-price build scope: $9,500.
- Default rule: choose the simplest implementation that fully solves the approved requirement.
- Do not add speculative features, infrastructure, content types, or abstractions.
- October 12 plan (D-006): Grey manages production in existing business accounts. Troy controls the domain and owns code/content; client editors use Sanity. Agree support/billing/exit terms before launch. See `CLIENT_ACCOUNT_SETUP.md`.
- Temporary 2520 GitHub, Sanity, Cloudflare, or review infrastructure may be used to avoid blocking development.
- The public experience is editorial and content-led; avoid explanatory card labels, metadata panels, or generic gallery chrome.
- Editors control structured content. Code controls layout, styling, responsive behavior, and motion.
- On October 7, 2026, the user gave standing permission to push completed website changes. Do not ask again for routine commits and pushes within the requested scope; preserve the user-owned Superdesign changes.

## Current visual direction

- October 7 palette update: charcoal `#1f2322` replaces oxblood; white `#ffffff` replaces both paper/yellow tokens; pale mint `#cee5de` replaces both blue highlight tokens. Existing secondary colors remain.
- Header name and subtitle use the supplied, unmodified `public/images/ta-site-header.svg` on a white background instead of live text. The artwork fills the available width up to the navigation button, flush to the top and left header edges; height follows its proportions. Only the existing bottom padding remains. The menu button background is pale mint `#cee5de`. It remains an accessible home link.
- Menu bars and small labels on white sections use charcoal for contrast; mint remains the highlight on dark sections and highlighted surfaces. The October 7 follow-up (`3d895b3`) also anchors About/Contact portraits to the top below 900px so mobile crops preserve Troy’s face; the mobile About portrait and header/menu alignment at 390px, 768px, and 1440px were live browser-verified. Lint, type checks, and production build passed.
- Palette/header implementation (`74d6040`, `51886d4`) is deployed and browser-verified across all five routes at desktop/mobile widths; header sizing was also checked at 768px and 320px. Navigation opens/closes with keyboard and pointer, and the SVG home link works. Lint, type checks, and production build passed.
- Installed headline font is Google Bebas Neue, weight 400, loaded through `next/font/google` in `app/layout.tsx`; Arial Narrow/sans-serif fallback. CSS supplies italic styling. Bebas Neue Pro is not installed. Body copy uses Source Code Pro, weight 400, with normal/italic styles. Header lettering is SVG artwork, not live font text.
- Homepage book promotion follows the supplied reference: book cover, large condensed italic title, directional arrow, and availability line.
- October 7 refinements are live: the homepage promotion uses the supplied flat book cover (`2729eb4`); shared About, Book, Media, and Contact banners size to their content instead of enforcing minimum heights (`1be3390`). Existing typography and padding remain. All four banners were checked at 1440px and 390px with no horizontal overflow; the short About banner measures approximately 393px on desktop and 269px on mobile. Lint, type checks, and the production build passed.
- Final text accents: subpage banner eyebrows white and H1s mint; homepage book-promo and testimonial titles mint, availability copy white; About story heading and pull quote mint; Media `Approved images` mint with no period. Small labels on white backgrounds remain charcoal for contrast. Do not turn every eyebrow white indiscriminately.
- Homepage Meet Troy body copy shares Biography's `.portable-copy` font, responsive size (`clamp(0.95rem, 1.15vw, 1.2rem)`), 1.65 line height, and paragraph spacing.
- Homepage flat cover is `public/images/troy-anderson-book-flat.jpg`, supplied from `/Users/greygarner/Desktop/Higher Roads/Clients/Troy Anderson/Book image/NeverWasteKick_FLAT.jpg`. The separate Book route retains its own existing cover; the homepage replacement did not change it.
- Supplied header source: `/Users/greygarner/Desktop/Higher Roads/Clients/Troy Anderson/Assets/TA_siteheader.svg`. Preserve the committed artwork. The initial 75% width request was superseded by fill-to-menu and flush-top/left requests; do not restore that inset or width.

## What is implemented

### Repository and application

- Next.js 16.3.4, React 19.2.8, TypeScript, pnpm 11.19.0, and Node.js 24.
- Static export configured in `next.config.ts`.
- Shared site header, navigation, subpage shell, and footer.
- Public routes currently present: `/`, `/about`, `/book`, `/contact`, and `/media`.
- Homepage editorial grid uses GSAP/Flip, two authored layouts, zero gutters, 14 real clips, no placeholder tiles, simultaneous source-proportioned silent previews, native full playback, and Close/Escape controls. See `docs/HOMEPAGE_VIDEO_POC.md` and D-012. Hero media and homepage book promotion are still local/code-managed, not fields in the Homepage schema.
- GitHub Pages publishes the `main` branch as the temporary browser review environment.
- `pnpm check` runs linting, TypeScript validation, and the production build.

### Sanity content slices

- Local Studio lives in `studio/` and is part of the pnpm workspace.
- Root commands include `pnpm studio:dev` and `pnpm studio:build`.
- Studio was deployed to Sanity hosting on September 18, 2026; routine editing no longer requires a local server.
- Hosted and local Studio use the same project and dataset. Existing content and publish automation were not migrated or duplicated.
- The hosted address, authenticated content list, Homepage editing form, and online publish operation were browser-verified with the intended editor account.
- `studio/sanity.cli.ts` records the hosted application ID with automatic Studio updates disabled. Deploy Studio/schema changes separately with `pnpm --filter troy-anderson-website-1 deploy`; website pushes do not update the hosted Studio.
- Current schema registry contains six document types: `homepage`, `book`, `about`, `contact`, `siteSettings`, and `mediaPage`.
- The Homepage model deliberately covers the approved Meet Troy section and testimonials: Meet Troy heading, rich-text introduction, portrait plus alt text, testimonial heading, and an ordered list of quote, name, and credentials.
- The intended editor populated and published every Homepage section successfully in the hosted Studio.
- The homepage fetches the newest published Homepage document during the static build and preserves intentional local fallback content when the private credential is absent.
- The Book model supports title, required subheader, introduction, cover plus alt text, overview heading and Portable Text, inspiration heading and Portable Text, sample URL, retailers, and endorsements. The foreword fields and public panel were removed at the user's request on October 7, 2026 (`e14685c`); the remaining Behind the Book panel spans the notes section.
- The intended editor populated every field and successfully published the document.
- The Book page fetches the newest published Book document during the static build.
- The page renders the published subheader beneath the title, plus Sanity image metadata, Portable Text, retailer links, endorsement attribution, and optional sample link.
- The About model supports its page heading and introduction, portrait plus alt text, biography heading and Portable Text, story heading and Portable Text, and a pull quote.
- The intended editor populated and published every About field successfully.
- The About page fetches the newest published About document during the static build and renders its portrait and Portable Text without changing the established page composition.
- The Contact model supports its page heading and introduction, portrait plus alt text, and form heading.
- The intended editor populated and published every Contact field successfully.
- The Contact page fetches the newest published Contact document during the static build while preserving the existing form fields, disabled delivery state, and page composition.
- The Site settings model deliberately contains only the three approved shared destinations: Instagram, YouTube, and LinkedIn.
- The intended editor populated and published all three Site settings fields successfully in the hosted Studio.
- The shared footer fetches the newest published Site settings document during the static build and renders all three destinations without changing the established footer composition.
- The Media model supports a page heading, video introduction, ordered platform-agnostic video or channel links with share copy and an optional custom thumbnail override, photography introduction, ordered downloadable photos with alternative text, publicity introduction, and ordered downloadable files.
- The intended editor populated and published every required Media field successfully in the hosted Studio. The first sample video intentionally has no custom thumbnail override. Two sample YouTube video cards were present at the last live Media check; do not revert to a one-video fixture.
- The Media page fetches the newest published Media document during the static build and renders a linked video poster, outbound video action, share-copy control, 17 approved portraits, and the publicity download.
- The Media photo gallery now uses a conventional responsive thumbnail grid: six columns at the wide desktop review size, four below 1200px, three below 900px, and two below 640px. Every portrait is centered and contained in a consistent 4:3 frame. Visible filenames were removed; each card now exposes only a consistent `Download image` action while retaining the Sanity title in its accessible label.
- The 17 portrait files were uploaded to Sanity, given consistent editor titles and alternative text, and published as 17 separate structured photo entries. A stale draft initially masked them with the original three sample entries and one incomplete row. On October 6, 2026, the draft's `photos` field was revision-guarded and synchronized to the published 17-entry array without changing any other draft field. The hosted Studio was then browser-verified in Draft view with editable portrait entries and no incomplete `Untitled` item.
- Video poster rendering is complete. The authenticated build-time Media query includes the optional Sanity thumbnail URL, dimensions, and alt text. `lib/media-poster.ts` prefers that override, otherwise resolves a recognized YouTube video URL and checks its high-resolution poster (then standard poster) at build time, otherwise returns the local branded SVG. Unsupported providers, channel URLs, and provider request failures use the branded fallback. The existing video card renders a contained 16:9 linked poster with useful alternative text, a named outbound action, and visible keyboard focus. No embeds, playback infrastructure, dependencies, schemas, or routes were added. Cloudflare URL handling remains deferred until its production format is selected.
- Media is present in the primary navigation. The page intentionally keeps outbound media URLs provider-neutral while the separate homepage video experience and clean hosted-video provider work continue.
- Local builds without the private Sanity credential render intentional fallback content on all connected surfaces.

### Deployment and automation

- GitHub repository secret: `SANITY_API_READ_TOKEN`.
- The secret is a Sanity Viewer token; its value must never be committed or documented.
- GitHub Actions exposes the secret only to the build step. Workflow is push-to-main or manual dispatch, with concurrency group `pages` and `cancel-in-progress: false`. Do not change/cancel queued publishing as an unrequested workaround; first diagnose the failing stage.
- A Sanity GROQ-powered webhook named `Rebuild website when connected content is published` is enabled.
- Webhook dataset: `production`.
- Webhook filter: `_type in ["homepage", "book", "about", "contact", "siteSettings", "mediaPage"]`.
- Webhook events: create and update.
- Draft and version triggers are disabled.
- Destination: the GitHub workflow-dispatch endpoint for `.github/workflows/pages.yml`.
- Payload: `{"ref": "main"}`.
- Webhook authorization uses a fine-grained GitHub token limited to this repository with Actions read/write permission.
- GitHub token expiration: December 10, 2026. Rotate it before that date and update only the Sanity webhook header.
- Automated test deployment: GitHub Actions run `34625761031` / run number 17, completed successfully.
- The live Book page was checked after the test and retained the published CMS content.
- Book subheader integration deployment: GitHub Actions run `37384768872` / run number 58 completed successfully. The live route rendered the published `MAKING MENTORS OUT OF TORMENTORS` value with no browser errors or horizontal overflow at desktop or mobile widths. Run `37385576539` / run number 60 then refined the full-width subheader into the paper-colored condensed display treatment while intentionally retaining the cyan monospace treatment on mobile; both layouts were browser-verified again.
- About integration deployment: GitHub Actions run `34629651918` / run number 20, completed successfully.
- About webhook delivery returned HTTP 204 and GitHub Actions run `34629920336` / run number 21 completed successfully.
- The live About page was checked in a browser and rendered every published CMS value and the uploaded portrait.
- Contact integration deployment: GitHub Actions run `34638437331` / run number 24, completed successfully.
- The live Contact page was checked in a browser and rendered every published CMS value and the uploaded portrait.
- A no-visible-change Contact update produced a successful webhook delivery with HTTP 204, and GitHub Actions run `34639151595` / run number 26 completed successfully.
- The live Contact page was checked again after the webhook-triggered deployment and retained every published CMS value and the uploaded portrait.
- Homepage Meet Troy integration deployment: GitHub Actions run `37351756738` / run number 31, completed successfully.
- The live homepage was checked in a browser and rendered the published Homepage heading, introduction, portrait, and alternative text directly from Sanity with no browser errors or horizontal overflow.
- The first Homepage-triggered webhook delivery produced GitHub Actions run `37356158546` / run number 34, which completed successfully.
- Homepage testimonial integration deployment: GitHub Actions run `37356694819` / run number 35, completed successfully.
- The live homepage was checked again and rendered the published testimonial heading, quote, name, and credentials directly from Sanity with no browser errors or horizontal overflow.
- Shared social-link integration deployment: GitHub Actions run `37361801626` / run number 39, completed successfully.
- The live footer was checked in a browser and rendered the published Instagram, YouTube, and LinkedIn destinations with no browser warnings or errors.
- Media integration deployment: GitHub Actions run `37368104814` / run number 44, attempt 2, completed successfully after an earlier attempt was cancelled during a GitHub Actions hosted-runner incident.
- The Media Publish action also produced workflow-dispatch run `37379435948` / run number 45, which completed successfully and independently reconfirmed the Sanity publish webhook path.
- The initial live Media page was checked in a browser and rendered the published heading, video URL, share copy, three sample photographs and alternative text values, and publicity download directly from Sanity. The share-copy control worked, all images loaded, and the route had no browser warnings, errors, or horizontal overflow at desktop or mobile widths. The later 17-photo replacement is recorded below.
- The webhook is enabled with the six-type filter above and the Media publish-to-deploy path is verified.
- Media photo-library refinements were deployed through commits `ad8edb4`, `e555199`, `86bfd52`, and `4367d75`. The final live route was browser-verified with all 17 CMS portraits, six desktop columns, two mobile columns, constrained 4:3 frames, complete uncropped portraits, simplified `Download image` actions, and no browser errors.
- Media video-poster implementation: commit `d67a796` (`Render Media video posters with provider fallback`), GitHub Actions run `37501781317` / run number 70, completed successfully. On October 6, 2026, the actual live sample loaded `https://i.ytimg.com/vi/9kY0iaKlYQM/maxresdefault.jpg` at its intrinsic 1280 × 720 dimensions. Browser verification at 1537px desktop and 390px mobile widths confirmed the visible poster, alternative text, keyboard focus, and functional poster and text links opening the correct YouTube destination. Neither Media view had browser warnings/errors or horizontal overflow; all 17 photo entries remained present and the mobile photo grid retained two columns. The deployed branded SVG was also viewed in a browser. Focused checks verified custom override precedence, supported YouTube URL forms, lower-resolution recovery, unsupported URLs, provider failures, authenticated thumbnail metadata normalization, and token-free local content; `pnpm check` passed locally and in deployment. No Sanity documents were changed.

## Important implementation files

| Area | File |
| --- | --- |
| Global app and fonts | `app/layout.tsx` |
| Homepage | `app/page.tsx` |
| Hero interaction, clip names, dimension metadata | `components/editorial-grid.tsx` |
| Current prepared hero files | `public/videos/hero-20261016/TA_BB_*` (14 full/preview/poster triplets) |
| Hero sources, encoding, operation, verification | `docs/HOMEPAGE_VIDEO_POC.md` |
| Introduction migration (already completed) | `studio/scripts/migrate-homepage-introduction.ts` |
| Book page integration | `app/book/page.tsx` |
| About page integration | `app/about/page.tsx` |
| Contact page integration | `app/contact/page.tsx` |
| Media page integration | `app/media/page.tsx` |
| Shared styling and design tokens | `app/globals.css` |
| Header and navigation | `components/site-header.tsx` |
| Footer | `components/site-footer.tsx` |
| Subpage structure | `components/subpage-shell.tsx` |
| Book query and content types | `lib/sanity/book.ts` |
| About query and content types | `lib/sanity/about.ts` |
| Contact query and content types | `lib/sanity/contact.ts` |
| Homepage query and content types | `lib/sanity/homepage.ts` |
| Site settings query and content types | `lib/sanity/site-settings.ts` |
| Media query and content types | `lib/sanity/media.ts` |
| Build-time video poster resolver | `lib/media-poster.ts` |
| Branded video poster fallback | `public/images/media-video-fallback.svg` |
| Sanity configuration | `studio/sanity.config.ts` |
| Book schema | `studio/schemaTypes/book.ts` |
| About schema | `studio/schemaTypes/about.ts` |
| Contact schema | `studio/schemaTypes/contact.ts` |
| Homepage schema | `studio/schemaTypes/homepage.ts` |
| Site settings schema | `studio/schemaTypes/siteSettings.ts` |
| Media schema | `studio/schemaTypes/mediaPage.ts` |
| Schema registry | `studio/schemaTypes/index.ts` |
| Static export and image rules | `next.config.ts` |
| Preview deployment | `.github/workflows/pages.yml` |
| Environment template | `.env.example` |

## Local working state at handoff

- Branch is `main`. Application work through `2890bfa` is pushed and live-verified (Actions `37953816452`). This refresh adds verification documentation; use latest `main`, not a historical baseline.
- All implementation and automation work is pushed.
- Two pre-existing Superdesign files remain modified locally and were deliberately not committed:
  - `.superdesign/design-system.md`
  - `.superdesign/resume.json`
- Treat those files as user-owned work. Do not discard, overwrite, or include them in an unrelated commit.
- The temporary webhook probe script was removed after the successful test.

## Known temporary content and limitations

- Publishing diagnosis, October 7, 2026: Book overview published at 16:53:32 UTC was saved correctly as two paragraphs, but GitHub's workflow-dispatch endpoint returned HTTP 500 on all three Sanity delivery attempts (16:53:33, 16:54:05, 16:54:35), so no rebuild started. Earlier run #87 (`37653513187`) built successfully but Pages rejected deployment with HTTP 400 because it still considered the previous deployment active; run #88 (`37654462021`) built in 46 seconds but spent over six minutes deploying. A recovery dispatch using the existing webhook credential returned HTTP 204 and run #89 (`37655882421`) succeeded in about 66 seconds. The actual Book page was browser-verified with both new paragraphs using `?publish=37655882421`; the ordinary URL still showed the older cached five-paragraph version. Response headers confirmed `cache-control: max-age=600`. No CMS content, credentials, or workflow configuration were changed. This recovers the update, not the underlying provider reliability/cache limitations. The build uses Node 24; Node 20 warnings refer to older helper-action declarations being forced to run under Node 24. Updating those action versions is maintenance, separate from the publishing failures.
- The current Sanity documents contain a mixture of client-entered copy and review/test content. Final editorial approval is pending; do not replace user copy with earlier placeholders or assume every value is final. Site settings contains the current published social destinations.
- The homepage now uses four user-supplied clips in a deployed review proof; two collage tiles remain placeholders. Prepared files are served directly with the static site, with no CMS clip controls or selected client production video service. Clip 08 now uses the supplied 53-second full video. Captions and editorial titles remain outstanding.
- Contact content and publish-triggered deployment are connected and verified.
- Media is now a public route. Its video entries are outbound provider-neutral links; clean in-site hosted playback and the homepage video experience remain separate parallel work.
- Video poster selection occurs during the static build. Provider availability is checked at that time; later image removal requires a rebuild to select a fallback. The current sample has no Sanity override and displays its YouTube poster. Custom override precedence was checked with a fixture without changing the published or draft Media documents. Cloudflare Stream poster resolution remains deferred until the production provider and URL or identifier format are selected.
- Cloudflare test form delivery is verified to Grey’s test inbox; the final client recipient and production acceptance remain open. GitHub Pages delivery stays disabled. See `CONTACT_DELIVERY.md`.
- No analytics, advertising pixels, consent manager, or cookie banner is currently installed.
- Add a privacy notice before enabling real form submissions or analytics. Decide on a cookie banner only after inventorying the actual cookies, embeds, and browser storage introduced by approved integrations.
- GitHub Pages is a temporary review surface; Cloudflare remains the intended production host.
- No Cloudflare production runtime deployment or domain cutover has occurred. October 12 D-006 removes separate client account transfers from the launch plan.
- Retain the existing Sanity project and Studio address under managed operation. Verify intended editor access before beta; no new collaborator access was granted by the October 12 planning update.
- Draft preview is not implemented and should not be added unless the client workflow requires it.

## Verified commands

```bash
pnpm install
pnpm dev
pnpm studio:dev
pnpm check
```

`GITHUB_PAGES=true pnpm check` passed after the latest hero replacement. The static review build produces `out/` and repository-prefixed URLs. `HOMEPAGE_VIDEO_POC=true pnpm dev` enables the same three clips locally without that prefix; plain `pnpm dev` uses the placeholder prototype. Build without a private token intentionally uses local content; this is not a CMS regression. The read token must remain server/build-only.

For Studio changes run `pnpm studio:build` and `pnpm --filter troy-anderson-website-1 exec tsc --noEmit`, then deploy the hosted Studio separately. A website push does not deploy schema/editor changes.

The introduction migration has already been applied. Do not rerun it to repair publishing or formatting. Its dry run, private local backup, field-only transaction, and revision guards exist for a future deliberately authorized migration; never replace a draft with published values or publish it automatically.

The last local hero preview server (127.0.0.1:3012) was stopped. Temporary extracted originals and conversion tools lived in `/private/tmp/`; they are not dependencies. Recreate them if needed rather than assuming temporary paths survive. Originals at the recorded client asset paths remain unchanged.

## Continuation priorities and unresolved gates

No new product work was selected at handoff. Resume the user's next creative/content request against the current site. Useful bounded work while content is being prepared is reduced-motion browser/device verification, real-device autoplay checks, and media/performance review; do not mark these complete from code inspection alone.

Before expanding scope, confirm Appearances' launch status and content requirements. Testimonials already lives on the Homepage; a separate route/schema is not approved. Clip CMS controls, the final six-tile creative composition, captions, descriptive titles, and production video delivery still need definition/approval. Four local clips do not mean the homepage is production-complete.

For the approved production build, follow D-011 in order: establish compatible Cloudflare Workers runtime/adapter and managed-account/secret prerequisites during Phase 6; prove secure Book runtime content refresh; extend to all connected content/shared settings; coordinate caches and missed-notification recovery; run rapid-publish/failure/freshness QA in Phase 7; reconfirm managed production configuration before Phase 8 DNS cutover. The 30-second freshness target is unmeasured, not a current promise. Do not replace this with a static Pages migration or move Worker configuration into a downstream QA-only step.

Keep the current static Sanity/GitHub publishing path until its runtime replacement is verified. Do not disable the webhook or expose private CMS credentials to the browser. When diagnosing delayed content, distinguish published CMS state, webhook delivery, Actions build, Pages deployment, and browser/CDN cache; successful Publish or build alone is not proof of a visible update. Temporary diagnosis can inspect a fresh query URL, but that is not a production editing solution.

## Completed slices and historical verification

October 9 hero update: `2890bfa` adds clip 04 using `TA_BB_04_gif.mp4` for its square poster/loop and refreshes clip 08 from `TA_BB_08_gif.gif` while retaining its existing 53-second full video. Actions `37953816452` succeeded. Actual live checks at 1440px/390px confirmed both desktop arrangements, source proportions, zero gutters, loaded posters, simultaneous loops, full playback, switching, pause/resume, keyboard activation, Escape/focus return, and no overflow or browser errors. Four clips and two placeholders remain. Website lint/type/build passed; originals, CMS, and user-owned Superdesign files were preserved. Reduced-motion browser emulation remains open. See `HOMEPAGE_VIDEO_POC.md` for assets and cache-aware verification details.

Homepage hero replacements (October 7, 2026): `74a33f3` replaces all three clips, preview loops, and first-frame stills from `TA_BB_output 2.zip`. Actions run `37676230220` succeeded. The actual public homepage was browser-verified on desktop and at 390px: all three previews run together without hover on desktop, source preview proportions remain 2:1 / 1:2 / 1:1, play icons are absent, and neither viewport overflows horizontally. The section-level pause/resume control stops/restarts previews. All three replacement full videos played successfully; clip 08 now opens as a 53-second 16:9 video. Switching, keyboard activation, Escape, and focus return work; no browser warnings/errors were observed. Lint, type checks, and production build passed. Prepared assets use versioned filenames and total about 8.8 MB; silent previews total 317 KB. D-012 supersedes hover-only guidance. Reduced-motion stills and live preference changes are implemented; OS/browser reduced-motion emulation remains unverified. The three other tiles remain placeholders. Originals, CMS content, and user-owned Superdesign changes were preserved.

Production migration requirement approved October 7, 2026: implement D-011, secure runtime content refresh on Cloudflare Workers, as part of the production migration build. The Phase 6 Book proof and rollout must precede Phase 7 client beta; Phase 8 must repeat publishing checks with managed production configuration before DNS cutover. Include rapid successive publishes, missed-notification recovery, and browser/CDN cache checks. The proposed normal-condition freshness target is 30 seconds and must be measured. This work is scheduled, not implemented; retain the existing temporary GitHub Pages workflow until the replacement is verified. See `docs/ROADMAP.md` for the ordered gates.

Homepage introduction editor (October 7, 2026): `ff541e4` changes `meetTroySummary` to the same Portable Text editor used for Biography and renders it through the existing library and shared typography. The query remains authenticated at build time, accepts legacy text during migration, and retains the token-free fallback. The migration script backs up content locally, defaults to a dry run, and revision-guards changes to this field only. Both existing published and draft introductions were converted separately into five paragraphs; their wording and all other fields were verified against the backup. The draft was not published. Website lint/type/build, Studio build/type checks, and focused paragraph, soft-break, and bold-rendering checks passed. The hosted Studio was deployed and browser-confirmed editable in Draft with working formatting controls. Actions run `37653062247` (#85) succeeded in 1m 4s; the CMS conversion triggered successful run `37653230029` (#86) in 1m 5s. The public homepage displays all five paragraphs, verified at 1440px and 390px without horizontal overflow. Editors use Enter for paragraphs, Shift+Enter for a line break, and Publish when their draft is ready.

Homepage About Troy typography (October 7, 2026): `1d9c86e` shares the biography's body-copy font, responsive size, and 1.65 line height through the existing CSS rule. Content and section layout were preserved. Lint, type checking, and the production build passed. Actions run `37650783720` (#83) completed successfully in 1m 1s. The actual public homepage was browser-verified at 1440px and 390px: the shared typography was applied, with no horizontal overflow.

Book editor correction (October 7, 2026): the apparent editing lock was the read-only Published perspective left selected during deployment diagnosis. The editor was returned to Draft, and editable plain-text and Portable Text fields were browser-confirmed. Use Draft for editing; Published is for read-only review. The hosted Studio was redeployed without the foreword fields, and only those two stored values were revision-guarded and removed from the existing Book document (no draft existed at that time). Other content was preserved. Website lint/type/build and Studio build passed. Website run `37648524559` (#80) completed successfully in 2m 2s. The actual public Book page was browser-verified at 1440px and 390px: no foreword, a full-width Behind the Book panel, and no horizontal overflow. A reload was needed to refresh the previously cached page.

The zero-gutter homepage collage refinement is live in `525c29d` (`Remove homepage collage gutters and empty cells`). Actions run `37539965894` (#75) completed successfully in 59 seconds. On October 6, 2026, live Chrome checks confirmed both desktop arrangements at 1440px fill the grid without gaps or empty cells, and the 390px mobile grid has zero spacing and no horizontal overflow. Clip 02 still opens and closes correctly. Preview proportions remain unchanged. Lint, type checking, and the production build passed before publication.

The homepage review proof was published in `89ca3f8` (`Publish three-clip homepage video collage proof`) via Actions run `37537815252` (#73), which completed in 50 seconds (build 32s, deploy 10s). On October 6, 2026, Chrome verification of the actual public homepage at 1440px and 390px confirmed loaded posters; source preview ratios of 2:1, 1:2, and 1:1; native playback for all three served MP4s; switching; Close/Escape; keyboard focus return; and no horizontal overflow or browser warnings/errors. Silent preview playback was also observed. Both desktop arrangements were verified locally. Reduced-motion suppression is implemented but has not been browser-emulated.

Continue creative review of the collage and compression. Finalize captions and descriptive titles, and decide whether CMS editing and separate media hosting are needed before client beta. The current proof is enabled by `GITHUB_PAGES=true` or locally by `HOMEPAGE_VIDEO_POC=true`. Its prepared media and source details are in `docs/HOMEPAGE_VIDEO_POC.md`; originals remain outside the repository and untouched. No Sanity documents, Media photo entries, dependencies, routes, client-domain settings, or production accounts were changed. The two user-owned Superdesign modifications remain uncommitted.

The Media video-poster correction is complete and live-verified. Before starting another content type, confirm whether Appearances is a launch route and obtain its approved content requirements. Do not create its schema until that product scope is established.

Keep the completed Media poster precedence: custom Sanity override, then an available recognized YouTube video poster, then the branded fallback. Extend provider resolution only when the production video provider and real URL or identifier format are selected. Clean hosted playback and the homepage video experience remain separate work.

The approved Testimonials content already lives in the connected Homepage model and works on the public site. Do not add a separate Testimonials document type or route unless the client later approves a distinct page and supplies requirements for it. Privacy and security remain later integration gates: follow the Phase 6 privacy inventory when forms, analytics, or third-party media are selected, and complete the formal front-end security review during Phase 7 before client beta.

## Regression guardrails

- Read `AGENTS.md` and the installed Next.js version documentation before changing framework code.
- Preserve the charcoal/white/mint palette, exact text-accent scopes, flat homepage book cover, content-sized page banners, and flush SVG header that reaches the mint menu.
- Preserve D-012: simultaneous silent loops, GIF-native preview shapes, 16:9 replacement full videos, no visible play icons, whole-tile keyboard/touch playback, section pause, and reduced-motion stills. Do not revert to hover-only preview behavior.
- Preserve all 17 structured Media photos in both published and draft documents. No replacement, migration, or synchronization is needed.
- Keep rich-text Meet Troy paragraphs/soft breaks and the removed Book foreword fields/panel. Use Studio Draft for editing; Published is read-only.
- Do not restore removed homepage taglines, card metadata, or instructional labels.
- Do not expose the private Sanity token through a `NEXT_PUBLIC_` variable or browser request.
- Keep CMS reads server-side: runtime on Cloudflare, build-time on GitHub Pages. Authentication does not make the currently public dataset private; see D-013.
- Do not remove fallback content; local builds currently depend on it when no private token is present.
- Do not enable Sanity draft webhook events; they would deploy on routine editor keystrokes.
- Do not broaden the webhook token beyond the single repository and Actions permission.
- Do not commit the modified Superdesign files unless the user explicitly requests it.
- Verify the deployed page after every CMS integration instead of stopping at a green build.

## Credential rotation note

Rotate the current webhook credential no later than December 10, 2026:

1. Create a replacement fine-grained GitHub token.
2. Limit it to `grey-highroads/troy-anderson-website`.
3. Grant repository Actions read/write permission only.
4. Replace the `Authorization` webhook header value in Sanity using `Bearer <new token>`.
5. Publish a no-visible-change revision to one connected type or make a real approved content update.
6. Confirm a new GitHub workflow run succeeds.
7. Revoke the old token.

Never record either token value in this document.

## Suggested opening prompt for the next chat

> Continue the Troy Anderson website from the repository's current `main`. Read `AGENTS.md` completely and the startup reading list in `docs/CURRENT_HANDOFF.md` before editing; read relevant installed Next.js 16.3.4 docs before framework code. Report branch/tree state, discrepancies, and the smallest intended change scope. Preserve the user-owned `.superdesign/design-system.md` and `.superdesign/resume.json` changes untouched and unstaged. Latest hero implementation is `2890bfa`, with live verification recorded in the October 9 update; these are milestones, not instructions to roll back newer main. Preserve simultaneous silent hero loops, supplied GIF proportions, 16:9 full clips, no visible play icons, whole-tile playback, pause/reduced-motion behavior, zero gutters, charcoal/white/mint styling, the flush SVG header reaching the mint menu, content-sized banners, rich-text Meet Troy introduction, and the removed Book foreword. Media posters and all 17 photos are complete; do not disturb them or add speculative provider handling. D-011 requires Cloudflare Workers runtime content refresh before beta, not a static Pages production migration; it is planned, not implemented. Follow my next requested task, avoid inventing routes/CMS scope, and use the recorded standing permission to push scoped completed changes. Verify the real deployed outcome before updating completion notes.

## Next handoff milestone

Refresh this document when either of these occurs first:

- the approved CMS types and public pages are fully connected; or
- a material decision changes hosting, routing, content architecture, motion, or account ownership.
