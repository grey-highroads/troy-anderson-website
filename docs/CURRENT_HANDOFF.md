# Current Project Handoff

**Project:** Troy Anderson website  
**Prepared:** October 6, 2026<br>
**Prepared by:** 2520 Consulting  
**Handoff point:** Core CMS slices and Media are connected; the three-clip homepage video review proof is deployed and live-verified

## Why this is the right handoff point

This is a stable chapter boundary. The repository, visual foundation, core public routes, hosted Sanity Studio, Homepage, Book, About, Contact, Media, and Site settings schemas, authenticated build-time content queries, and the automatic publish-to-deploy path all work. The four content routes, approved Homepage sections, Media library, and shared footer social links are connected to published CMS content.

Do not wait until the entire Sanity model is complete to hand off this conversation. That would make the context larger while adding several similar implementation loops. Start a fresh conversation from this document, and update it again when the CMS layer is complete or before another major architecture change.

## Sources of truth

- Repository: <https://github.com/grey-highroads/troy-anderson-website>
- Temporary public preview: <https://grey-highroads.github.io/troy-anderson-website/>
- Live Book route: <https://grey-highroads.github.io/troy-anderson-website/book/>
- Live About route: <https://grey-highroads.github.io/troy-anderson-website/about/>
- Live Contact route: <https://grey-highroads.github.io/troy-anderson-website/contact/>
- Live Media route: <https://grey-highroads.github.io/troy-anderson-website/media/>
- Default branch: `main`
- Homepage schema baseline before its page integration: `ee02553` (`Add homepage Meet Troy content model`). Use the latest `main` revision as authoritative.
- Sanity project: `Troy Anderson Website 1`
- Sanity project ID: `gknd24m7`
- Sanity dataset: `production` (private)
- Hosted Studio: <https://troy-anderson.sanity.studio/>
- Hosted Studio application ID: `t79qynbc05nitxgc59r4fq63` (public deployment identifier, not a credential)
- Local Studio URL when running: <http://127.0.0.1:3333/>

The repository documents are authoritative. Do not rely on a prior chat or a design-tool draft when the code or these documents say otherwise.

## Product and scope constraints

- Fixed-price build scope: $9,500.
- Default rule: choose the simplest implementation that fully solves the approved requirement.
- Do not add speculative features, infrastructure, content types, or abstractions.
- The client must own production infrastructure before launch.
- Temporary 2520 GitHub, Sanity, Cloudflare, or review infrastructure may be used to avoid blocking development.
- The public experience is editorial and content-led; avoid explanatory card labels, metadata panels, or generic gallery chrome.
- Editors control structured content. Code controls layout, styling, responsive behavior, and motion.
- On October 7, 2026, the user gave standing permission to push completed website changes. Do not ask again for routine commits and pushes within the requested scope; preserve the user-owned Superdesign changes.

## Current visual direction

- Dominant homepage color: oxblood.
- Supporting palette: black/blue-black, warm paper/yellow, cyan/blue, and warm red.
- Header name: Source Code Pro, white, widely tracked.
- Header subhead: Source Code Pro italic, paper/light color, sized so `AUTHOR` ends with the final `N` in `ANDERSON`.
- Header black and oxblood bands are equal height. The name is bottom-aligned in black; the subhead is top-aligned in oxblood.
- Display and thumbnail typography: Bebas Neue Pro where available, with the current repository fallback strategy.
- Homepage book promotion follows the supplied reference: book cover, large condensed italic title, directional arrow, and availability line.
- Future changes were expected to focus more on layout than palette.

## What is implemented

### Repository and application

- Next.js 16.3.4, React 19, TypeScript, pnpm 11, and Node.js 24.
- Static export configured in `next.config.ts`.
- Shared site header, navigation, subpage shell, and footer.
- Public routes currently present: `/`, `/about`, `/book`, `/contact`, and `/media`.
- Homepage editorial grid review proof uses GSAP and Flip, three prepared clips, source-proportioned previews, native playback, and Close/Escape controls. See `docs/HOMEPAGE_VIDEO_POC.md`.
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
- The Homepage model deliberately covers the approved Meet Troy teaser and testimonial section: Meet Troy heading, short introduction, portrait plus alt text, testimonial heading, and an ordered list of quote, name, and credentials.
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
- The intended editor populated and published every required Media field successfully in the hosted Studio. The current sample video intentionally has no custom thumbnail override.
- The Media page fetches the newest published Media document during the static build and renders a linked video poster, outbound video action, share-copy control, 17 approved portraits, and the publicity download.
- The Media photo gallery now uses a conventional responsive thumbnail grid: six columns at the wide desktop review size, four below 1200px, three below 900px, and two below 640px. Every portrait is centered and contained in a consistent 4:3 frame. Visible filenames were removed; each card now exposes only a consistent `Download image` action while retaining the Sanity title in its accessible label.
- The 17 portrait files were uploaded to Sanity, given consistent editor titles and alternative text, and published as 17 separate structured photo entries. A stale draft initially masked them with the original three sample entries and one incomplete row. On October 6, 2026, the draft's `photos` field was revision-guarded and synchronized to the published 17-entry array without changing any other draft field. The hosted Studio was then browser-verified in Draft view with editable portrait entries and no incomplete `Untitled` item.
- Video poster rendering is complete. The authenticated build-time Media query includes the optional Sanity thumbnail URL, dimensions, and alt text. `lib/media-poster.ts` prefers that override, otherwise resolves a recognized YouTube video URL and checks its high-resolution poster (then standard poster) at build time, otherwise returns the local branded SVG. Unsupported providers, channel URLs, and provider request failures use the branded fallback. The existing video card renders a contained 16:9 linked poster with useful alternative text, a named outbound action, and visible keyboard focus. No embeds, playback infrastructure, dependencies, schemas, or routes were added. Cloudflare URL handling remains deferred until its production format is selected.
- Media is present in the primary navigation. The page intentionally keeps outbound media URLs provider-neutral while the separate homepage video experience and clean hosted-video provider work continue.
- Local builds without the private Sanity credential render intentional fallback content on all connected surfaces.

### Deployment and automation

- GitHub repository secret: `SANITY_API_READ_TOKEN`.
- The secret is a Sanity Viewer token; its value must never be committed or documented.
- GitHub Actions exposes the secret only to the build step.
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

- Latest handoff baseline before this slice: `90d249d` (`Refresh handoff after Media refinements`). Current implementation baseline: `d67a796` (`Render Media video posters with provider fallback`). Use the latest `main` revision as authoritative.
- All implementation and automation work is pushed.
- Two pre-existing Superdesign files remain modified locally and were deliberately not committed:
  - `.superdesign/design-system.md`
  - `.superdesign/resume.json`
- Treat those files as user-owned work. Do not discard, overwrite, or include them in an unrelated commit.
- The temporary webhook probe script was removed after the successful test.

## Known temporary content and limitations

- The current Sanity Homepage, Book, About, Contact, and Media documents contain test copy entered to validate every field. They are not final client copy. Site settings contains the current published social destinations.
- The homepage now uses three user-supplied clips in a deployed review proof; three collage tiles remain placeholders. Prepared files are served directly with the static site, with no CMS clip controls or selected client production video service. Clip 08 is only 2.7 seconds long. Captions and editorial titles remain outstanding.
- Contact content and publish-triggered deployment are connected and verified.
- Media is now a public route. Its video entries are outbound provider-neutral links; clean in-site hosted playback and the homepage video experience remain separate parallel work.
- Video poster selection occurs during the static build. Provider availability is checked at that time; later image removal requires a rebuild to select a fallback. The current sample has no Sanity override and displays its YouTube poster. Custom override precedence was checked with a fixture without changing the published or draft Media documents. Cloudflare Stream poster resolution remains deferred until the production provider and URL or identifier format are selected.
- Contact form behavior is not connected to a delivery service.
- No analytics, advertising pixels, consent manager, or cookie banner is currently installed.
- Add a privacy notice before enabling real form submissions or analytics. Decide on a cookie banner only after inventorying the actual cookies, embeds, and browser storage introduced by approved integrations.
- GitHub Pages is a temporary review surface; Cloudflare remains the intended production host.
- No client-owned production migration has occurred.
- Hosted Studio ownership remains with the existing development project. Confirm transfer or migration and retention of the editing address before client beta; no new collaborator access was granted during deployment.
- Draft preview is not implemented and should not be added unless the client workflow requires it.

## Verified commands

```bash
pnpm install
pnpm dev
pnpm studio:dev
pnpm check
```

`pnpm check` passed after the Media video-poster implementation. The static build produces the public site in `out/`.

## Recommended next slice

Homepage About Troy typography (October 7, 2026): `1d9c86e` shares the biography's body-copy font, responsive size, and 1.65 line height through the existing CSS rule. Content and section layout were preserved. Lint, type checking, and the production build passed. Actions run `37650783720` (#83) completed successfully in 1m 1s. The actual public homepage was browser-verified at 1440px and 390px: the shared typography was applied, with no horizontal overflow.

Book editor correction (October 7, 2026): the apparent editing lock was the read-only Published perspective left selected during deployment diagnosis. The editor was returned to Draft, and editable plain-text and Portable Text fields were browser-confirmed. Use Draft for editing; Published is for read-only review. The hosted Studio was redeployed without the foreword fields, and only those two stored values were revision-guarded and removed from the existing Book document (no draft existed at that time). Other content was preserved. Website lint/type/build and Studio build passed. Website run `37648524559` (#80) completed successfully in 2m 2s. The actual public Book page was browser-verified at 1440px and 390px: no foreword, a full-width Behind the Book panel, and no horizontal overflow. A reload was needed to refresh the previously cached page.

The zero-gutter homepage collage refinement is live in `525c29d` (`Remove homepage collage gutters and empty cells`). Actions run `37539965894` (#75) completed successfully in 59 seconds. On October 6, 2026, live Chrome checks confirmed both desktop arrangements at 1440px fill the grid without gaps or empty cells, and the 390px mobile grid has zero spacing and no horizontal overflow. Clip 02 still opens and closes correctly. Preview proportions remain unchanged. Lint, type checking, and the production build passed before publication.

The homepage review proof was published in `89ca3f8` (`Publish three-clip homepage video collage proof`) via Actions run `37537815252` (#73), which completed in 50 seconds (build 32s, deploy 10s). On October 6, 2026, Chrome verification of the actual public homepage at 1440px and 390px confirmed loaded posters; source preview ratios of 2:1, 1:2, and 1:1; native playback for all three served MP4s; switching; Close/Escape; keyboard focus return; and no horizontal overflow or browser warnings/errors. Silent preview playback was also observed. Both desktop arrangements were verified locally. Reduced-motion suppression is implemented but has not been browser-emulated.

Continue creative review of the collage and compression. Obtain the longer clip 08 if intended, finalize captions and descriptive titles, and decide whether CMS editing and separate media hosting are needed before client beta. The current proof is enabled by `GITHUB_PAGES=true` or locally by `HOMEPAGE_VIDEO_POC=true`. Its prepared media and source details are in `docs/HOMEPAGE_VIDEO_POC.md`; originals remain outside the repository and untouched. No Sanity documents, Media photo entries, dependencies, routes, client-domain settings, or production accounts were changed. The two user-owned Superdesign modifications remain uncommitted.

The Media video-poster correction is complete and live-verified. Before starting another content type, confirm whether Appearances is a launch route and obtain its approved content requirements. Do not create its schema until that product scope is established.

Keep the completed Media poster precedence: custom Sanity override, then an available recognized YouTube video poster, then the branded fallback. Extend provider resolution only when the production video provider and real URL or identifier format are selected. Clean hosted playback and the homepage video experience remain separate work.

The approved Testimonials content already lives in the connected Homepage model and works on the public site. Do not add a separate Testimonials document type or route unless the client later approves a distinct page and supplies requirements for it. Privacy and security remain later integration gates: follow the Phase 6 privacy inventory when forms, analytics, or third-party media are selected, and complete the formal front-end security review during Phase 7 before client beta.

## Regression guardrails

- Read `AGENTS.md` and the installed Next.js version documentation before changing framework code.
- Preserve the oxblood-led palette and current header proportions unless the user requests a change.
- Do not restore removed homepage taglines, card metadata, or instructional labels.
- Do not expose the private Sanity token through a `NEXT_PUBLIC_` variable or browser request.
- Do not replace the build-time CMS approach with client-side fetching for the private dataset.
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

> Continue the Troy Anderson website from `docs/CURRENT_HANDOFF.md`. Read that file plus `AGENTS.md`, `docs/ROADMAP.md`, `docs/DECISIONS.md`, and the relevant installed Next.js documentation before editing. Preserve the two uncommitted `.superdesign` files. The Media photo library and video posters are complete and live-verified; retain the custom Sanity override, YouTube poster, branded fallback precedence. Do not add Cloudflare URL handling until the production format is selected. The approved Testimonials content is already connected through the Homepage model; do not create a separate Testimonials schema or route without new approval. Confirm the launch status and requirements for Appearances before modeling it.

## Next handoff milestone

Refresh this document when either of these occurs first:

- the approved CMS types and public pages are fully connected; or
- a material decision changes hosting, routing, content architecture, motion, or account ownership.
