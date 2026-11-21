# Current builder handoff

Repository baseline: `57a69b3`, November 20, 2026, including merged indexing PR #1. This guide summarizes source and recorded operations; external DNS, account state and deployment must be verified when relevant. It does not claim a fresh live-site acceptance test.

## Begin here

Read [README](../README.md), [working guidelines](WORKING_GUIDELINES.md), and `AGENTS.md`. Check current main, local changes and recent commits. Read installed Next.js guides before editing framework code. Follow the user's requested scope; historical approvals and local-workspace notes are not new tasks.

## Implemented behavior

- Six routes: Home, About, Book, Media, Contact, and unlinked public/noindex Press. No standalone Testimonials or Appearances route.
- Homepage selects nine of fourteen clips, uses source-compatible gapless layouts and swaps two other clips after closing playback. Previews run at native speed. Pause/reduced-motion handling, explicit full playback and focus return remain implemented. The fourteen-tile alternative is intentionally retained.
- Testimonials use a six-second dissolve carousel with manual controls and an expandable full quote. Meet Troy, testimonials and book-promotion copy/image/alt are CMS-managed. Promotion arrow and hero catalogue/layout remain code-managed; the disabled announcement variant is retained intentionally.
- About preserves portrait proportions and renders independent, initially closed backstory disclosures. Body copy comes from Sanity. Media uses full website clips 6/9, separate posters and optional CMS overrides/share copy. Press has its separate photo collection; preserve legacy Media photo data.
- Book has CMS copy, retailer controls and an optional uploaded excerpt PDF ahead of an alternative URL. Keep existing content/drafts and destination choices unless asked to change them.
- Canonicals on five indexable pages, `/sitemap.xml` and `/robots.txt` default to `https://www.lifecoachtroy.com`. Press stays noindex and out of the sitemap.

## Hosting, publishing and contact

Cloudflare runs the website through vinext and `ContentCache`; published Sanity content refreshes without a code build. Pages remains the static preview, and its existing CMS rebuild webhook remains enabled. Main code pushes deploy the website Worker through `.github/workflows/cloudflare-test.yml`; its name does not imply production isolation. Studio and the ingress router have separate deployment paths.

The November 20 operational record says www SaaS registration, router mapping, bare-to-www forwarding preparation and production contact permissions are configured. All four DNS records may be added together; the former staged verification hold is superseded. Actual client-domain/certificate activation and mailbox/reply acceptance remain unrecorded. Use [launch status](LAUNCH_STATUS.md) and [Matthew's DNS sheet](MATTHEW_DNS_RECORDS.md); do not infer completion from repository setup.

Formspree recipient was recorded as verified `admin@lifecoachtroy.com`, restricted to www. Review-origin inquiries go to Spam under that restriction. Turnstile is active; the known successful-token replay/duplicate-entry limitation was accepted on Free. Do not claim strict replay rejection. See [contact operations](CONTACT_DELIVERY.md).

## Remaining work

See [the roadmap](ROADMAP.md) for acceptance and maintenance items. Principal outstanding evidence: actual www/bare HTTPS and redirects, production content/asset checks, labelled contact delivery and reply with the mailbox owner, ordinary email acceptance, physical iPhone/WebKit review, privacy/retention and editor/support handoff. Search Console/Bing registration is outside the indexing code change. No speculative feature work is selected.

## Guides by task

| Area | Guide |
| --- | --- |
| Build and local setup | [README](../README.md) |
| Runtime, cache and recovery | [Cloudflare operations](CLOUDFLARE_RUNTIME.md) |
| Contact | [Delivery and bot controls](CONTACT_DELIVERY.md) |
| Domain launch | [Launch status](LAUNCH_STATUS.md), [hosting preparation](HR_HOST_PREPARATION.md) |
| CMS | [Studio guide](../studio/README.md) |
| Hero media | [Media preparation](HOMEPAGE_VIDEO_POC.md) |
| Ownership/support | [Infrastructure handoff](INFRASTRUCTURE_AND_HANDOFF.md) |
| Rationale/evidence | [Decision log](DECISIONS.md), [archive index](archive/README.md) |

## History and preservation

The [pre-housekeeping snapshots](archive/2026-11-20-before-housekeeping/README.md) retain prior handoff details, commands, release evidence and historical limitations. They are reference, not current instructions. The November 18 [client review](CLIENT_REVIEW_2026-11-18.md) records the approved About/Media work.

No application code, media, dependencies, hosting settings or CMS data is changed by this housekeeping pass. Old `collage-poc` assets lack current source references but are retained because CMS references have not been independently ruled out. One-time Studio scripts remain at their existing paths for recovery/history; do not rerun them as setup. Local duplicate configs, unrelated projects and temporary outputs from earlier workspaces are not part of a fresh checkout and need no preservation instruction here.
