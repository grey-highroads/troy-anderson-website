# Troy Anderson Website

Custom website build for author, speaker, and podcaster Troy Anderson.

The project centers on a full-width editorial homepage made from short video clips, bold typography, and selected promotional content. The site pairs a custom Next.js front end with a structured Sanity CMS so the client team can update content without changing the design.

## Project status

**Current state (October 25, 2026):** Six routes and seven Sanity types are implemented, including an unlinked Press photography page. The 14-tile hero, October 22 layout/CMS refinements, and October 25 replacement loops are live. Cloudflare runtime content publishing is implemented on the review host; client-domain launch remains unfinished. Start with [the current handoff](docs/CURRENT_HANDOFF.md), then use [the next-session prompt](docs/NEW_BUILDER_PROMPT.md).

The build has been approved at a fixed price of $9,500. The October 12 launch plan uses Grey's existing business accounts for managed production hosting. Troy retains domain control and ownership of code/content; his team uses Sanity. See [the short launch plan](docs/CLIENT_ACCOUNT_SETUP.md) and D-006 for support and recovery responsibilities.

## Core direction

- Next.js and TypeScript for the website
- CSS Grid for authored editorial layouts
- GSAP and Flip for grid transitions and clip expansion
- Sanity for structured content editing
- Cloudflare for production hosting
- GitHub for source control
- Existing client email remains with its current provider

The hero has 14 real tiles with simultaneous silent previews and selected full-video playback, contained in the first viewport. Posters/previews fill tiles with intentional cropping; full playback uses `contain`. The homepage book promotion sits immediately above the footer. Workers refreshes published Sanity content without rebuilding; GitHub Pages remains a secondary static preview.

## Documentation

- [Project primer](docs/PROJECT_PRIMER.md)
- [Working guidelines](docs/WORKING_GUIDELINES.md)
- [Roadmap](docs/ROADMAP.md)
- [Infrastructure and handoff](docs/INFRASTRUCTURE_AND_HANDOFF.md)
- [Decision log](docs/DECISIONS.md)
- [2520 site build delivery playbook](docs/SITE_BUILD_DELIVERY_PLAYBOOK.md)
- [Current project handoff — read first](docs/CURRENT_HANDOFF.md)
- [Homepage video proof and source preparation](docs/HOMEPAGE_VIDEO_POC.md)
- [Studio editing and deployment](studio/README.md)

## Working principles

1. Build the simplest thing that fully solves the need.
2. Keep content editable and the visual system protected.
3. Prove risky interactions before expanding the build.
4. Treat mobile as an authored experience, not a compressed desktop layout.
5. Keep client domain control and code/content ownership; provide managed operation and a recovery copy.
6. Avoid scope creep, feature creep, and infrastructure that does not earn its complexity.

## Current site areas

Routes are `/`, `/about`, `/book`, `/media`, `/contact`, and unlinked `/press` (noindex, publicly reachable by URL; no authentication). Testimonials is a connected Homepage section, not a separate route. Appearances has no route/schema and requires confirmed launch scope before implementation. Homepage hero files and the book promotion remain code-managed; Homepage CMS fields cover Meet Troy and testimonials.

## Getting started

Requirements:

- Node.js 24
- pnpm 11

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Plain development uses the placeholder hero prototype. To review the current real clips locally, use:

```bash
HOMEPAGE_VIDEO_POC=true pnpm dev
```

Local builds without `SANITY_API_READ_TOKEN` intentionally show fallback content. Copy `.env.example` to `.env.local` if authenticated CMS reads are needed; never commit or print the token. Read `AGENTS.md` and the relevant installed Next.js documentation before modifying framework code.

The latest version pushed to `main` is also published as a browser preview at [grey-highroads.github.io/troy-anderson-website](https://grey-highroads.github.io/troy-anderson-website/). GitHub Pages is a secondary static review surface. The primary runtime review site is [Cloudflare Workers](https://troy-anderson-website.grey-4fe.workers.dev/); client-domain cutover has not occurred.

Run the complete local verification:

```bash
pnpm check
```

`GITHUB_PAGES=true pnpm check` exercises the static review configuration, repository-prefixed URLs, and real hero media. `pnpm cloudflare:build` checks the Worker build; `pnpm cloudflare:dev` runs the runtime locally. Read [runtime operations](docs/CLOUDFLARE_RUNTIME.md) before changing hosting, secrets, refresh, or caches. Production acceptance/domain cutover remain open; runtime refresh itself is already implemented.

## Content editing

Open [Troy Anderson Sanity Studio](https://troy-anderson.sanity.studio/) and sign in with an account authorized for the existing Sanity project. Select Homepage, Book, About, Contact, Media page, Press page, or Site settings. Use the Draft perspective to edit; Published is read-only. Rich-text fields use Enter for paragraphs and Shift+Enter for soft line breaks. Click Publish when ready. Publishing refreshes the Workers review site without rebuilding and also triggers the retained legacy GitHub Pages build. See [runtime operations](docs/CLOUDFLARE_RUNTIME.md) for freshness/recovery behavior. Do not remove the legacy webhook until retirement is approved.

The hosted Studio and local Studio use the same content, not separate copies. A local server is no longer needed for routine editing. Schema or Studio-code changes still require a separate Studio deployment:

```bash
pnpm --filter troy-anderson-website-1 deploy
```

This hosted Studio remains in the current development infrastructure. Retain the existing project and confirm editor access and the hosted address before launch.

## Ownership

- **Troy Anderson / client team:** domain registration, content ownership, editor/recipient designation, and final approval
- **Jonathan:** creative direction and approved visual compositions
- **Andrew:** content direction and primary CMS workflow feedback
- **2520 Consulting:** technical planning, implementation, managed hosting/billing, backups, support, and transition assistance
