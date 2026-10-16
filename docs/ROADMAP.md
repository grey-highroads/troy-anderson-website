# Roadmap

The roadmap is organized around evidence-producing milestones. Dates can be added once design inputs, content readiness, and stakeholder availability are confirmed.

## Progress overview

| Phase | Chapter | Status | Milestone |
| --- | --- | --- | --- |
| 0 | Documentation and setup | Complete | Repository and temporary review deployment are operational |
| 1 | Inputs and content model | In progress | Build requirements are agreed |
| 2 | Technical proof | In progress | Motion and CMS approaches are approved |
| 3 | Application foundation | In progress | Core site and CMS architecture work together |
| 4 | Homepage experience | In progress | Approved editorial compositions work responsively |
| 5 | Content routes | In progress | Core public site is feature-complete |
| 6 | Content and integrations | In progress; Cloudflare runtime review deployment verified | Real content and external services work end to end |
| 7 | QA and client beta | Not started | Release candidate is approved |
| 8 | Migration, launch, and handoff | Not started | Managed production works; client edits content and controls the domain |

## October 16 continuation snapshot

Latest hero layout is `688003b`, correcting `fd54bd9` / `ace47f1` (D-014) to remove letterboxing between clips, using the October 16 assets/header from `be59ead`, following the October 12 runtime/Contact work `38fad8f`. Five public routes, six CMS types, 17 Media photos/poster rendering, rich-text Meet Troy, and the complete 14-clip hero delivery are live. Recent creative refinements (charcoal/white/mint, flush SVG header reaching the menu, mobile top-anchored portraits, flat homepage cover, content-sized banners, and exact text accents) are complete; see the handoff's revision/evidence table.

Open broad checkboxes below represent final scope or production acceptance, not absence of the partial proofs. All hero placeholders are replaced; real-device/media performance QA, final content/captions/titles, Appearances scope, clip CMS/production delivery, forms, metadata/analytics/privacy, and managed production launch remain unresolved. No new implementation task was selected at handoff. D-011's Worker setup must precede QA/beta; do not interpret the Phase 7 tests as the place to first configure hosting.

## Phase 0: Documentation and setup

- [x] Establish project primer and working principles.
- [x] Record initial architecture and ownership decisions.
- [x] Define phased roadmap and milestone criteria.
- [x] Initialize the application and development tooling.
- [x] Add a safe environment-variable template with no secrets.
- [x] Establish staging deployment in temporary 2520 infrastructure.

**Milestone:** A new contributor can understand the project, run the application once it exists, and find the current decisions without relying on chat history.

## Phase 1: Inputs and content model

- [ ] Collect Jonathan's approved compositions, type choices, breakpoints, and motion references.
- [ ] Inventory available clips, preview assets, books, appearances, testimonials, biography, and contact content.
- [ ] Confirm which routes ship at launch and which remain hidden.
- [ ] Define CMS fields, validation, ordering, and publishing behavior.
- [ ] Agree on representative content for prototype testing.
- [ ] Inventory planned forms, analytics, embedded media, social widgets, cookies, browser storage, and other third-party data flows.
- [ ] Confirm the intended audience and jurisdictions so privacy, consent, and legal-review requirements can be scoped accurately.

**Milestone:** Stakeholders approve the launch content model and the inputs needed for the technical proof are available.

## Phase 2: Technical proof

- [x] Build the header and first homepage composition with representative tiles.
- [x] Prototype tile expansion and layout changes with GSAP Flip.
- [x] Replace representative tiles with the supplied 14 full/preview pairs and no placeholders. `be59ead`, October 16; published on both review hosts. Final editorial/media acceptance remains open.
- [ ] Test desktop, mobile, touch, keyboard, and reduced-motion behavior.
- [x] Create the local Sanity Studio and prove the first structured Book schema.
- [x] Let the intended editor populate and publish the first content type without coaching.
- [x] Connect published Book content to the temporary public preview.
- [x] Trigger and verify automatic deployment after a published Book change.
- [x] Build, populate, publish, and connect the About content type.
- [x] Extend and verify automatic deployment for published About changes.
- [x] Build, populate, publish, and connect the Contact content type.
- [x] Extend and verify automatic deployment for published Contact changes.
- [x] Build, populate, publish, and connect the Homepage Meet Troy content slice.
- [x] Build, populate, publish, and connect the Homepage testimonials content slice.
- [x] Build, populate, publish, and connect the shared footer social-link settings.
- [x] Build, populate, publish, and connect the Media page content slice.
- [x] Limit the publish webhook to Homepage, Book, About, Contact, Site settings, and Media page content.
- [x] Deploy the existing Studio to a stable online editing address with authenticated access.
- [x] Confirm an authorized editor can sign in to the hosted Studio and complete an online publish-to-deploy cycle.
- [ ] Extend the proven CMS pattern to the remaining approved content types.
- [x] Record current prototype decisions and unresolved risks in D-010/D-011/D-012, the hero proof document, and the current handoff. Continue updating them as scope is finalized.

**Milestone:** Jonathan approves the motion direction and Andrew confirms the CMS workflow is understandable.

## Phase 3: Application foundation

- [x] Establish application structure, initial routes, shared layout, and environment configuration.
- [x] Connect the first typed Sanity query with authenticated build-time rendering and local fallback content.
- [x] Create shared typography, spacing, color, and media rules from the approved design.
- [x] Add global navigation, metadata, and baseline accessibility.
- [x] Establish temporary preview checks and deployment documentation.
- [ ] Extend content queries, error handling, and metadata across every approved launch route.

**Milestone:** The application, CMS, and staging deployment work together using representative content.

## Phase 4: Homepage experience

- [x] Correct visible spacing after client review: `688003b` fills every preview/poster frame edge to edge with top-anchored responsive crops; full playback remains uncropped. Both deployment builds and actual desktop/phone checks passed.

- [x] Contain all 14 clips and selected playback in the first stable viewport below the header (D-014). `fd54bd9` / `ace47f1`; final Cloudflare `38957016300` and Pages `38957016121` passed. Five responsive sizes, desktop/phone playback, keyboard/tap/Escape/focus, pause/stills and source containment were verified live. Real-device and final editorial acceptance remain open.

- [ ] Implement the approved desktop compositions.
- [ ] Implement authored tablet and mobile compositions.
- [ ] Complete preview playback and full-media expansion.
- [ ] Add book, appearance, quote, or promotional blocks approved for the homepage.
- [x] Add and connect the approved Meet Troy homepage teaser.
- [x] Give Meet Troy introduction the Biography rich-text editor and render paragraphs and formatting. `ff541e4`, runs #85/#86, deployed and live-verified on October 7, 2026 at desktop/mobile widths. Existing draft and published copy were converted separately and preserved; hosted editing controls and website/Studio checks passed.
- [x] Match About Troy body typography to the biography's shared font, responsive size, and line spacing. Commit `1d9c86e`, Actions run `37650783720` (#83), live-verified at 1440px and 390px on October 7, 2026 with no horizontal overflow; lint, type checking, and production build passed.
- [x] Add and connect the approved homepage testimonial section.
- [ ] Tune focus behavior, reduced motion, loading, and recovery states.
- [ ] Validate performance with realistic media.

**Milestone:** The homepage is visually approved and production-ready apart from final content.

## Phase 5: Content routes

- [x] Build and connect About to Sanity.
- [x] Build and connect the Book page to Sanity, including its published subheader.
- [x] Remove the Book foreword fields and public panel at the user’s request. Implementation `e14685c` passed website and Studio checks; the hosted Studio was updated and browser-confirmed editable in Draft view. Run `37648524559` (#80) succeeded, and the public removal and full-width remaining panel were verified at 1440px and 390px on October 7, 2026.
- [ ] Build Appearances.
- [x] Build and connect Media to Sanity.
- [x] Complete Media video poster rendering using a custom Sanity override when supplied, the current YouTube host poster otherwise, and a branded fallback when neither is available. Deployed in `d67a796` (Actions run `37501781317`) and live-verified at desktop and mobile widths on October 6, 2026, including loaded poster, alternative text, keyboard focus, outbound links, and the unchanged 17-photo library. Add Cloudflare Stream resolution only after its production URL or identifier format is selected.
- [x] Deliver the approved Testimonials content through the connected Homepage section; no separate Testimonials route is currently approved.
- [x] Build and connect Contact to Sanity while preserving the approved form stub.
- [ ] Verify navigation, shareable URLs, metadata, and empty states.

**Milestone:** All approved launch routes are responsive, accessible, and connected to the CMS.

## Phase 6: Content and integrations

### Required production publishing migration (D-011)

Approved October 7, 2026. Implement this as part of the production migration build, before client beta. Begin the Phase 8 managed-account, runtime-hosting, and secret-configuration prerequisites here; the final domain cutover remains in Phase 8. GitHub Pages remains the temporary static review site until the replacement passes verification.

- [x] Establish a Cloudflare Workers review deployment and verify compatibility with the installed Next.js version using the supported adapter selected at implementation time. October 12: vinext 1.1.0 native Workers output, real test URL, no domain cutover; see `CLOUDFLARE_RUNTIME.md`.
- [x] Prove secure runtime fetching of published Book content, page-specific cache refresh on an authenticated Sanity publish notification, and automatic time-based recovery when a notification is missed. Keep private credentials on the server and preserve intentional local fallback content.
- [x] Extend the proven publishing path to Homepage, About, Contact, Media, and shared Site settings, including all affected pages for shared content. Preserve Media poster precedence, the photo library, and existing content and visual behavior.
- [x] Separate content publishing from code deployment: Sanity publishes refresh content without triggering a full build; code/design changes still deploy through source control. Browser, CDN, and application caches were verified together. October 12: Cloudflare code deployment from main passed Actions `38314286687`; normal content refresh does not rebuild this Worker. The legacy Pages rebuild path is deliberately retained until release acceptance.
- [x] Define and measure the freshness targets before beta: revision-only publishes measured 1.28–3.90 seconds, missed-notification request recovery 20.81 seconds, background recovery 59.98 seconds. Active-content recovery operating target 70 seconds under healthy CMS/network conditions; last-good content and failure reporting tested. Repeat visible approved editorial changes and managed-production acceptance before beta/cutover.

### Other content and integrations

- [x] Replace all hero clips/posters with the complete October 16 delivery and swap the supplied shared header SVG. `be59ead`; Pages `38909241985` and Cloudflare `38909241416` succeeded. Website/Worker checks passed; live desktop/mobile geometry, representative playback/switching, pause/keyboard/Escape, all media URLs, and exact header copies verified. No CMS or hosting configuration changed.

- [x] Add clip 04 with its supplied square animated poster and refresh clip 08’s vertical poster/loop while retaining its existing full video. `2890bfa`, Actions `37953816452`, live-verified October 9 at 1440px/390px: four real clips, two placeholders, zero gutters, source proportions, full playback, switching, pause/resume, keyboard/Escape/focus return, and no overflow or browser errors. Lint/type/build passed; reduced-motion browser emulation remains open.

- [ ] Load and review the agreed initial content set.
- [ ] Prepare approved preview clips and connect clean hosted-video delivery. Preserve the Media-card poster precedence established in Phase 5: custom Sanity override, then recognized host poster, then branded fallback.
- [x] Publish the three-clip homepage review proof with source-proportioned stills and muted previews, native playback, switching, Close/Escape, and authored rearrangements. Commit `89ca3f8`, Actions run `37537815252` (#73), deployed and browser-verified at 1440px desktop and 390px mobile on October 6, 2026. This is the historical first proof: its approximately 6 MB media and 2.7-second vertical clip 08 were replaced by `74a33f3` below. At the October 7 replacement, prepared assets totaled about 8.8 MB and three tiles remained placeholders. The October 9 addition above brings the current total to about 10.7 MB with two placeholders. Clip 08 retains its 53-second 16:9 full video and vertical preview. Captions, editorial titles, CMS clip controls, production delivery/ownership, and reduced-motion browser emulation remain unfinished; the broader hosted-video item above remains open.
- [x] Replace all three hero clips/GIF previews and enable simultaneous looping without visible per-tile play icons (D-012). `74a33f3`, run `37676230220`, live-verified October 7, 2026 on desktop and at 390px with source proportions, pause/resume, full playback, switching, Escape/focus return, and no overflow or browser errors. Clip 08 is now a 53-second widescreen full video. Lint/type/build passed; reduced-motion suppression remains implemented but not browser-emulated.
- [x] Remove collage gutters and empty cells while preserving preview proportions. Commit `525c29d`, Actions run `37539965894` (#75), live-verified in both desktop arrangements at 1440px and on mobile at 390px on October 6, 2026. Native opening/closing remains functional; lint, type checking, and production build passed.
- [x] Prove Cloudflare test Contact delivery to Grey’s verified test inbox with provider-side validation, spam filtering and browser success/error states. October 12: browser-direct Formspree delivery confirmed by the user; see `CONTACT_DELIVERY.md`.
- [ ] Complete contact production acceptance: approved client recipient, capacity/billing, retention/privacy policy, bot-control and failure/quota QA, and final-hostname delivery.
- [ ] Configure analytics and search metadata only if approved, preferring a privacy-preserving approach with no unnecessary identifiers or browser storage.
- [ ] Recheck every third-party request, embed, cookie, and browser-storage use after forms, media, and analytics are selected.
- [ ] Decide whether consent controls are required from the actual tracker inventory; do not add a cookie banner when the site has no non-essential storage or tracking.
- [ ] Draft, legally review as appropriate, and publish an accurate privacy notice before real form submissions or analytics collection begin.
- [ ] Confirm the existing email service and DNS records will remain intact.
- [ ] Complete an editorial review with Andrew.

**Milestone:** Real content, forms, media, and approved integrations work end to end in staging.

## Phase 7: QA and client beta

- [ ] Run browser and device testing.
- [ ] Verify keyboard navigation, focus management, contrast, and reduced motion.
- [ ] Check performance, visual stability, media loading, and error states.
- [ ] Validate redirects, metadata, forms, and unpublished content behavior.
- [ ] Verify production publishing with several pages published in quick succession, repeated edits to one page, and duplicate or out-of-order notifications. Confirm the latest published values appear at normal URLs without full builds, missing updates, or stale content replacing newer content.
- [ ] Verify missed/failed publish notifications, temporary CMS failures, shared-setting updates, draft exclusion, and browser/CDN cache behavior on desktop and mobile. Measure the Phase 6 freshness and recovery targets; resolve failures before client beta.
- [ ] Run a front-end security review covering repository history, deployed artifacts, environment-variable exposure, dependency findings, third-party scripts, and browser security headers.
- [ ] Confirm no private credential or privileged operation reaches browser code, and verify production Sanity, webhook, analytics, and form credentials use least privilege.
- [ ] Test form validation, spam protection, rate limiting, logging, and failure behavior without retaining unnecessary personal data.
- [ ] Verify the privacy notice and any consent controls match the site’s actual production behavior.
- [ ] Resolve release-blocking defects.
- [ ] Obtain stakeholder approval for the release candidate.

**Milestone:** The release candidate is approved and no known launch blockers remain.

## Phase 8: Migration, launch, and handoff

Account and hosting prerequisites begin during Phase 6 so the runtime publishing path can be verified before Phase 7 client beta. Complete the production-account verification below before DNS cutover.

- [ ] Agree managed-service billing, support, backups, and exit terms with Troy (D-006).
- [ ] Confirm dedicated Troy resources in Grey's existing business accounts and client editing access; retain the existing repository and CMS project.
- [ ] Create and verify the production Cloudflare Workers deployment in Grey's managed business account with the runtime content-refresh approach from D-011; a static Pages migration alone does not meet this requirement.
- [ ] Implement D-013 only after the user's instruction: Growth with Grey as Administrator and one named client Editor; budget USD 30/month before tax/overages when both are active. Publisher identity/email/invitation is deferred.
- [ ] Review published fields/assets for confidential material and agree dataset visibility separately; current `production` is public, and Growth/private visibility has not been implemented. Verify intended Editor publishing access before handoff.
- [ ] Configure production secrets and verify actual recurring service costs.
- [ ] Connect the authenticated Sanity publish notifications to the verified production refresh endpoint and reconfirm rapid-publish and missed-notification recovery with managed production credentials. Retire the Sanity-to-GitHub rebuild trigger after the replacement is verified; retain code deployment independently.
- [ ] Rotate temporary credentials, record expiration and ownership outside the repository, and enable available secret scanning or push protection.
- [ ] Assign an owner for privacy-notice updates and consent configuration when services change.
- [ ] Validate DNS changes without disturbing existing email records.
- [ ] Launch and complete smoke testing.
- [ ] Train the client team and deliver operating documentation.
- [ ] Document expected publish-to-visible timing, automatic recovery, and the support escalation path; routine editing must not require GitHub access, manual rebuilds, cache-busting links, or hard refreshes.
- [ ] Retain Grey's operational access; remove or downgrade other access as agreed and supply the client recovery copy.
- [ ] Archive temporary infrastructure after the retention period.

**Milestone:** The managed production site is operational. The client controls the domain, owns code/content, and can publish successive content updates without developer assistance or full-site rebuilds. The D-011 publishing checks must pass before launch.

## Later ideas

Ideas outside the approved build belong here until separately prioritized:

- Additional campaign landing pages
- Direct long-form video hosting
- Advanced search or media filtering
- New homepage composition families
- Expanded analytics or marketing automation
