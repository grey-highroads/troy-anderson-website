# Decision Log

This file records decisions that affect architecture, scope, ownership, or the client workflow. Update a decision rather than relying on chat history.

## D-001: Custom front end with a structured CMS

**Status:** Accepted

Use a custom Next.js front end with Sanity rather than a general-purpose visual site builder.

**Reason:** The homepage requires precise editorial motion, while the long-term editor primarily needs safe content updates rather than layout control.

## D-002: Real public routes

**Status:** Accepted

Use stable routes for approved standalone pages, even if transitions make the site feel continuous. Current routes are `/`, `/about`, `/book`, `/media`, and `/contact`. The earlier list of possible areas is not approval to create every route: Testimonials is delivered through the Homepage, and Appearances requires confirmed launch scope/content before implementation.

**Reason:** Permanent URLs support publicity, sharing, search, campaigns, and future expansion.

## D-003: Authored homepage compositions

**Status:** Accepted

Use CSS Grid for a small set of layouts designed by Jonathan. Use GSAP Flip and GSAP choreography to move between those states.

**Reason:** Deliberate destination layouts preserve the visual direction better than random shuffling or a generic masonry system.

## D-004: Content without explanatory interface

**Status:** Accepted

The homepage will be full width with no persistent sidebar, clip cards, metadata panel, or labeling layer.

**Reason:** The clips and composition are the experience. Additional interface would compete with that idea.

## D-005: Structured editing rather than page building

**Status:** Accepted

CMS users manage known content types, ordering, visibility, links, and media. They do not edit layout or motion.

**Reason:** This provides a simple handoff while protecting the approved design.

## D-006: Managed production service

**Status:** Plan revised October 12, 2026; agree managed-service terms with Troy before launch

Grey manages Troy's production site through existing business GitHub, Cloudflare, Sanity, and Formspree accounts, with separate Troy resources inside them. Keep the existing repository and CMS project. Troy controls domain registration and owns the code, content, and supplied media; editors use Sanity and inquiries reach the approved inbox. No separate client infrastructure accounts or ownership transfers are required for launch.

Grey handles billing, infrastructure support, backups, and recovery. Agree one recurring charge and support/exit terms with Troy. Maintain a secure client-accessible recovery copy and provide transfer or recreation assistance if management changes.

**Reason:** The nontechnical client needs content editing and reliable operation. Independent administration of every service adds onboarding and migration work without helping routine editing. The deliberate tradeoff is dependence on Grey for ongoing infrastructure operation. This supersedes the previous client-owned production-account requirement; D-011 runtime publishing remains required.

## D-007: Scope restraint

**Status:** Accepted

Default to the simplest solution that meets the approved requirement. New features and infrastructure require an explicit decision.

**Reason:** The project should avoid overengineering, scope creep, and feature creep.

## D-008: Authenticated build-time CMS publishing

**Status:** Accepted for the temporary GitHub Pages review site; replaced for production by D-011

Fetch published Sanity production content during the static site build using a Viewer-only deployment secret. Keep intentional fallback content for local builds without the token. Trigger the temporary GitHub Pages build with a narrowly filtered Sanity webhook after published content changes.

**Reason:** The browser never receives the private credential, local development remains unblocked, and an editor can publish content without asking a developer to redeploy. Production retains these credential safeguards while replacing rebuild-based content publishing through D-011.

## D-009: Privacy and front-end security gates

**Status:** Accepted

Do not add a cookie banner before approved integrations establish a real need for consent. Inventory forms, analytics, embeds, cookies, browser storage, and other third-party data flows during scope definition; publish an accurate privacy notice before real form submissions or analytics begin; and complete a focused front-end security review before client beta.

**Reason:** Consent UI must reflect actual site behavior, privacy promises must match real data handling, and credentials or privileged operations must never reach the browser. Scheduling the work at integration and beta boundaries avoids premature controls without deferring launch-critical privacy and security checks.

## D-010: Clean hosted video playback

**Status:** Accepted

Use a clean, brand-neutral playback source for the site's primary video experience rather than YouTube embeds. Keep the CMS video source provider-neutral until the delivery implementation is finalized. Cloudflare Stream is the leading candidate; Cloudflare R2 remains an object-storage option if the team deliberately chooses to own the additional encoding and playback work. Outbound links on the Media page may point to an approved YouTube video or channel when the intended experience is to leave the site, and Troy's YouTube channel may remain an external social link. For controlled hosted videos, use the poster generated by the delivery provider by default. A Sanity image is an optional editorial override; use the site's branded fallback when neither source supplies a usable poster.

**Reason:** The site should not inherit third-party player logos, recommendations, or interface baggage. A provider-neutral content field preserves the editorial workflow while Jonathan and 2520 finalize the video experience in parallel.

## D-011: Production content refresh without full-site rebuilds

**Status:** Accepted October 7, 2026; implemented and measured on the October 12 Cloudflare test deployment; managed-production release/cutover acceptance remains open

Run the production site on Cloudflare Workers with secure server-side reads of published Sanity content. Publish notifications refresh the affected cached content directly; a short time-based refresh provides recovery for missed notifications. Full builds remain for code and design changes. Configure application, CDN, and browser caching together. Preserve draft exclusion, least-privilege credentials, local fallback content, and the existing CMS and visual behavior.

Prove the Book page first during Phase 6, then cover all connected content and shared settings. Select and verify the framework adapter against the installed Next.js version at implementation time. Complete rapid-publish, latest-value, missed-notification, and cache checks before client beta and repeat them with the managed production configuration before DNS cutover. The initial normal-condition freshness target is 30 seconds; measure it and define a tested recovery bound before handoff. A static migration to Cloudflare Pages alone does not satisfy this decision.

**Reason:** Editors must be able to publish successive changes without deployment queues, manual rebuilds, or stale-page troubleshooting. Observed GitHub dispatch failures, Pages deployment delays, and ten-minute cache lifetimes make the temporary review publishing path unsuitable for the required production workflow.

**Implementation evidence:** [Runtime operations](CLOUDFLARE_RUNTIME.md). Book was proved first with vinext 1.1.0, followed by all connected types. Persistent per-type SQLite Durable Objects serialize current published reads and preserve last-good content. Notifications measured 1.28–3.90 seconds; request recovery 20.81 seconds; background recovery 59.98 seconds. GitHub Pages remains enabled. The Sanity dataset's current public visibility differs from the prior private-plan assumption; D-013 governs the plan/access decision and pending visibility review.

## D-012: Simultaneous homepage preview animation

**Status:** Accepted October 7, 2026

Use the supplied GIFs as optimized, silent MP4 loops that autoplay together in the homepage hero. Preserve their individual aspect ratios and remove visible per-tile play icons. Keep whole-tile explicit full-video playback, keyboard focus, Close/Escape, reduced-motion stills, and a single section-level pause control. This supersedes the previous hover-only preview and no-simultaneous-autoplay guidance. Browser autoplay/power policies still apply.

**Reason:** The artist requested an animated, energetic collage. Compact previews deliver that direction without downloading every full video automatically or adding a provider framework.

## D-013: Sanity plan and client publishing access

**Status:** Working plan agreed October 12, 2026; implementation deferred; dataset visibility undecided

Troy's team will publish after handoff. Plan for Sanity Growth with Grey as Administrator and one named client publisher as Editor, using their own login. A shared team login was discussed and replaced by the named-publisher plan. The user's subsequent instruction deferred identifying/inviting that person. Do not request those details again until onboarding is resumed.

Budget USD 30/month (USD 360/year) for two non-Viewer members before tax and usage overages, at the October 12 USD 15/member/month price. Grey alone would cost USD 15/month on Growth until the Editor is added. Reviewers with Viewer access are free. No subscription purchase, invitation, role change, or visibility change has occurred or is authorized merely by this planning decision.

**Reason:** Growth permits client publishing without granting full project administration. Free permits publishing only with the broader Administrator role. Private content queries are not inherently necessary for Troy's intended public material; visibility is a separate decision after a read-only review of published fields and assets. Growth includes private datasets without an additional seat charge, but upgrading must not be treated as automatic private visibility.

**Confirmed current state:** Free, active project `gknd24m7`; public `production`; Grey is the only listed project member and is Administrator. An anonymous query returned published content types and the Book document, with no drafts visible. Sanity documents automatic Free/public reversion after trial expiry. Authenticated website reads do not restrict other callers' anonymous access. Public readers cannot write; ordinary asset URLs can remain accessible even with a private dataset. Historical private-dataset references are not evidence of current privacy.

[The launch plan](CLIENT_ACCOUNT_SETUP.md) holds the plain-language explanation, sources, cost assumptions, and deferred actions. Retain the repository, Sanity project/Studio, GitHub Pages and both user-owned Superdesign files. Cloudflare runtime testing is complete; domain/DNS cutover still requires explicit approval.

## D-014: One first-viewport homepage hero

**Status:** Accepted and implemented October 16, 2026

Keep all 14 supplied clips in one hero area occupying the first stable viewport beneath the shared header, with authored desktop, tablet, phone, and short landscape compositions. Book promotion and the remaining content start below that first screen. Selecting a clip keeps playback and the other thumbnails inside the same hero rather than lengthening the page.

Client review rejected letterboxing: previews and still posters must fill every frame edge to edge with `cover`, anchored center/top, with no spacing between clips. Responsive cropping is allowed without stretching. Full selected videos retain `contain` and show the complete video. This supersedes the initial viewport implementation’s uncropped-poster requirement, the old source-ratio tile heights, and the scroll-through grid, while retaining D-012's silent loops, whole-tile activation, no per-tile play icons/labels, section pause, reduced-motion stills, native playback, switching, Close/Escape, and focus return. Keep the pause control visible without covering thumbnails. Small phone tiles are an accepted consequence of showing every clip; full playback remains larger.

**Reason:** The client wants the complete media composition to read as a single homepage hero at each responsive size.

Implementation `fd54bd9`, initial still-poster treatment `ace47f1`, and client-directed no-spacing correction `688003b`; live responsive verification is recorded in `HOMEPAGE_VIDEO_POC.md` and `CURRENT_HANDOFF.md`. Device/performance and final editorial acceptance remain open.

## New decision template

### D-XXX: Short title

**Status:** Proposed / Accepted / Replaced

State the decision.

**Reason:** Explain the relevant tradeoff in a few sentences.
