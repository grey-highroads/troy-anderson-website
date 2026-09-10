# Troy Anderson Website

Custom website build for author, speaker, and podcaster Troy Anderson.

The project centers on a full-width editorial homepage made from short video clips, bold typography, and selected promotional content. The site will pair a custom Next.js front end with a structured Sanity CMS so the client team can update content without changing the design.

## Project status

**Current phase:** Technical proof

The build has been approved at a fixed price of $9,500. Development may begin in temporary 2520 Consulting accounts so prototyping is not blocked by client account setup. All production infrastructure will be moved to or created in client-owned accounts before launch.

## Core direction

- Next.js and TypeScript for the website
- CSS Grid for authored editorial layouts
- GSAP and Flip for grid transitions and clip expansion
- Sanity for structured content editing
- Cloudflare for production hosting
- GitHub for source control
- Existing client email remains with its current provider

The first technical milestone is intentionally narrow: prove the homepage interaction and the Sanity editing experience before building the complete site.

## Documentation

- [Project primer](docs/PROJECT_PRIMER.md)
- [Working guidelines](docs/WORKING_GUIDELINES.md)
- [Roadmap](docs/ROADMAP.md)
- [Infrastructure and handoff](docs/INFRASTRUCTURE_AND_HANDOFF.md)
- [Decision log](docs/DECISIONS.md)

## Working principles

1. Build the simplest thing that fully solves the need.
2. Keep content editable and the visual system protected.
3. Prove risky interactions before expanding the build.
4. Treat mobile as an authored experience, not a compressed desktop layout.
5. Keep production ownership with the client.
6. Avoid scope creep, feature creep, and infrastructure that does not earn its complexity.

## Intended site areas

- Home
- About
- Books
- Appearances
- Media
- Testimonials
- Contact

These should use real browser routes even if transitions make the experience feel continuous. Sections can remain unpublished until content is ready.

## Getting started

Requirements:

- Node.js 24
- pnpm 11

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The current homepage is an interaction study using representative content; no client media or CMS credentials are required.

Run the complete local verification:

```bash
pnpm check
```

The production build is statically exported to `out/`, which can be served directly by Cloudflare Pages. Copy `.env.example` to `.env.local` only when CMS development begins, and never commit secrets.

## Ownership

- **Troy Anderson / client team:** production accounts, domain, billing, and final content approval
- **Jonathan:** creative direction and approved visual compositions
- **Andrew:** content direction and primary CMS workflow feedback
- **2520 Consulting:** technical planning, implementation, deployment, migration, and handoff
