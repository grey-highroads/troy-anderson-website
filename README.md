# Troy Anderson Website

Custom editorial website for Troy Anderson, built with Next.js, TypeScript, React, GSAP and Sanity. Cloudflare Workers serves runtime content; GitHub Pages remains a secondary static preview.

## Start here

Read [the current handoff](docs/CURRENT_HANDOFF.md), [working guidelines](docs/WORKING_GUIDELINES.md), and `AGENTS.md` before making changes. The handoff describes implemented behavior, remaining work and the relevant operating guides. [Launch status](docs/LAUNCH_STATUS.md) records external setup and outstanding acceptance checks; a repository commit alone does not prove deployment or domain activation.

## Current site

- Six routes: `/`, `/about/`, `/book/`, `/media/`, `/contact/`, and unlinked `/press/`. Press is publicly reachable and noindex, not authenticated.
- Homepage shows nine clips selected from a fourteen-clip catalogue, with two other clips replaced when playback closes. Preview speed is 1×. The preserved fourteen-tile alternative remains in code.
- Sanity manages Homepage, About, Book, Contact, Media page, Press page, and Site settings. Homepage includes Meet Troy, testimonials and book-promotion copy/image controls; hero clips/layout remain code-managed.
- Five indexable pages have canonical URLs at `https://www.lifecoachtroy.com`; sitemap and robots use the same address. `NEXT_PUBLIC_SITE_URL` can override it.

## Local development and checks

Use Node.js 24 and the pnpm version pinned in `package.json`.

```sh
pnpm install --frozen-lockfile
HOMEPAGE_VIDEO_POC=true pnpm dev
```

Open [localhost:3000](http://localhost:3000). Plain `pnpm dev` retains the placeholder hero mode. Copy `.env.example` to `.env.local` for authenticated local CMS reads; without the read token, static/local Next.js uses fallback content. Never commit credentials.

```sh
pnpm exec next typegen
pnpm check
GITHUB_PAGES=true pnpm check
pnpm cloudflare:build
node --test cloudflare/hosting-router/worker.test.mjs
```

Generate Next.js route types before the first type check in a fresh checkout. The Pages check exercises repository-prefixed paths and real hero media. The Cloudflare build checks the runtime package and Worker types; it does not deploy. See [runtime operations](docs/CLOUDFLARE_RUNTIME.md) for local Worker credentials and commands.

## Editing and operations

- [Sanity Studio editing and deployment](studio/README.md)
- [Runtime publishing and recovery](docs/CLOUDFLARE_RUNTIME.md)
- [Contact delivery and limitations](docs/CONTACT_DELIVERY.md)
- [Hosting router](cloudflare/hosting-router/README.md)
- [Launch status](docs/LAUNCH_STATUS.md) and [DNS record sheet](docs/MATTHEW_DNS_RECORDS.md)
- [Media preparation](docs/HOMEPAGE_VIDEO_POC.md)
- [Ownership and service responsibilities](docs/INFRASTRUCTURE_AND_HANDOFF.md)
- [Remaining work](docs/ROADMAP.md), [decision log](docs/DECISIONS.md), and [documentation archive](docs/archive/README.md)

Primary runtime review: [Workers](https://troy-anderson-website.grey-4fe.workers.dev/). Secondary preview: [GitHub Pages](https://grey-highroads.github.io/troy-anderson-website/). Hosted editor: [Sanity Studio](https://troy-anderson.sanity.studio/).

Main pushes trigger the workflows in `.github/workflows/`; the workflow named `cloudflare-test` deploys the website Worker also used by the production routing setup. The separate ingress router is not deployed by that workflow. Keep Pages and its CMS webhook until retirement is explicitly agreed.
