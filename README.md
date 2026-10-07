# Troy Anderson Website

Custom website build for author, speaker, and podcaster Troy Anderson.

The project centers on a full-width editorial homepage made from short video clips, bold typography, and selected promotional content. The site pairs a custom Next.js front end with a structured Sanity CMS so the client team can update content without changing the design.

## Project status

**Current state (October 7, 2026):** Core public routes and six CMS types are connected; creative review and the real-video homepage proof are in progress. Production migration and launch remain unfinished. Start with [the current handoff](docs/CURRENT_HANDOFF.md).

The build has been approved at a fixed price of $9,500. Development may begin in temporary 2520 Consulting accounts so prototyping is not blocked by client account setup. All production infrastructure will be moved to or created in client-owned accounts before launch.

## Core direction

- Next.js and TypeScript for the website
- CSS Grid for authored editorial layouts
- GSAP and Flip for grid transitions and clip expansion
- Sanity for structured content editing
- Cloudflare for production hosting
- GitHub for source control
- Existing client email remains with its current provider

The latest hero proof uses three real replacement clips with simultaneous silent previews, native expansion/playback, and source preview proportions. Three tiles remain placeholders. Production requires Cloudflare Workers runtime content refresh (D-011), not full-site rebuilds after each CMS publish; that migration is planned, not implemented.

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
5. Keep production ownership with the client.
6. Avoid scope creep, feature creep, and infrastructure that does not earn its complexity.

## Current site areas

Public routes are `/`, `/about`, `/book`, `/media`, and `/contact`. Testimonials is a connected Homepage section, not a separate route. Appearances has no route/schema and requires confirmed launch scope before implementation. Homepage hero files and the book promotion remain code-managed; Homepage CMS fields cover Meet Troy and testimonials.

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

The latest version pushed to `main` is also published as a browser preview at [grey-highroads.github.io/troy-anderson-website](https://grey-highroads.github.io/troy-anderson-website/). GitHub Pages is a temporary review surface; Cloudflare remains the intended production host.

Run the complete local verification:

```bash
pnpm check
```

The current review build is statically exported to `out/`. `GITHUB_PAGES=true pnpm check` exercises the deployed configuration, including repository-prefixed URLs and real hero media. GitHub Pages is temporary. Production is required to use a compatible Next.js runtime on Cloudflare Workers with secure published-content refresh, missed-notification recovery, and coordinated caching; see D-011 and the Phase 6 → Phase 7 → Phase 8 sequence in the roadmap. No Worker, runtime refresh endpoint, or production migration exists yet.

## Content editing

Open [Troy Anderson Sanity Studio](https://troy-anderson.sanity.studio/) and sign in with an account authorized for the existing Sanity project. Select Homepage, Book, About, Contact, Media page, or Site settings. Use the Draft perspective to edit; Published is read-only. Rich-text fields use Enter for paragraphs and Shift+Enter for soft line breaks. Click Publish when ready. Publishing triggers the temporary GitHub preview build. Dispatch/deployment failures and a ten-minute cache lifetime have been observed; this path has no reliable freshness guarantee. Production will replace CMS-triggered builds through D-011.

The hosted Studio and local Studio use the same content, not separate copies. A local server is no longer needed for routine editing. Schema or Studio-code changes still require a separate Studio deployment:

```bash
pnpm --filter troy-anderson-website-1 deploy
```

This hosted Studio remains in the current development infrastructure. Confirm ownership and the hosted address during the client transfer or migration before launch.

## Ownership

- **Troy Anderson / client team:** production accounts, domain, billing, and final content approval
- **Jonathan:** creative direction and approved visual compositions
- **Andrew:** content direction and primary CMS workflow feedback
- **2520 Consulting:** technical planning, implementation, deployment, migration, and handoff
