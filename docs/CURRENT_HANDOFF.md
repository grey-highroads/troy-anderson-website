# Current Project Handoff

**Project:** Troy Anderson website  
**Prepared:** September 11, 2026  
**Prepared by:** 2520 Consulting  
**Handoff point:** Book, About, and Contact CMS vertical slices and automated preview deployment are proven end to end

## Why this is the right handoff point

This is a stable chapter boundary. The repository, visual foundation, core public routes, local Sanity Studio, Book, About, and Contact schemas, authenticated build-time content queries, and the automatic publish-to-deploy path all work. All three connected routes have been deployed and browser-verified with their published CMS content.

Do not wait until the entire Sanity model is complete to hand off this conversation. That would make the context larger while adding several similar implementation loops. Start a fresh conversation from this document, and update it again when the CMS layer is complete or before another major architecture change.

## Sources of truth

- Repository: <https://github.com/grey-highroads/troy-anderson-website>
- Temporary public preview: <https://grey-highroads.github.io/troy-anderson-website/>
- Live Book route: <https://grey-highroads.github.io/troy-anderson-website/book/>
- Live About route: <https://grey-highroads.github.io/troy-anderson-website/about/>
- Live Contact route: <https://grey-highroads.github.io/troy-anderson-website/contact/>
- Default branch: `main`
- Contact implementation baseline before this documentation update: `1328ea3` (`Connect Contact page to Sanity content`). Use the latest `main` revision as authoritative.
- Sanity project: `Troy Anderson Website 1`
- Sanity project ID: `gknd24m7`
- Sanity dataset: `production` (private)
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
- Public routes currently present: `/`, `/about`, `/book`, and `/contact`.
- Homepage editorial grid interaction prototype uses GSAP and Flip.
- GitHub Pages publishes the `main` branch as the temporary browser review environment.
- `pnpm check` runs linting, TypeScript validation, and the production build.

### Sanity content slices

- Local Studio lives in `studio/` and is part of the pnpm workspace.
- Root commands include `pnpm studio:dev` and `pnpm studio:build`.
- Current schema registry contains three document types: `book`, `about`, and `contact`.
- The Book model supports title, introduction, cover plus alt text, overview heading and Portable Text, foreword excerpt and byline, inspiration heading and Portable Text, sample URL, retailers, and endorsements.
- The intended editor populated every field and successfully published the document.
- The Book page fetches the newest published Book document during the static build.
- The page renders Sanity image metadata, Portable Text, retailer links, endorsement attribution, and optional sample link.
- The About model supports its page heading and introduction, portrait plus alt text, biography heading and Portable Text, story heading and Portable Text, and a pull quote.
- The intended editor populated and published every About field successfully.
- The About page fetches the newest published About document during the static build and renders its portrait and Portable Text without changing the established page composition.
- The Contact model supports its page heading and introduction, portrait plus alt text, and form heading.
- The intended editor populated and published every Contact field successfully.
- The Contact page fetches the newest published Contact document during the static build while preserving the existing form fields, disabled delivery state, and page composition.
- Local builds without the private Sanity credential render intentional fallback content on all three connected pages.

### Deployment and automation

- GitHub repository secret: `SANITY_API_READ_TOKEN`.
- The secret is a Sanity Viewer token; its value must never be committed or documented.
- GitHub Actions exposes the secret only to the build step.
- A Sanity GROQ-powered webhook named `Rebuild website when Book, About, or Contact content is published` is enabled.
- Webhook dataset: `production`.
- Webhook filter: `_type in ["book", "about", "contact"]`.
- Webhook events: create and update.
- Draft and version triggers are disabled.
- Destination: the GitHub workflow-dispatch endpoint for `.github/workflows/pages.yml`.
- Payload: `{"ref": "main"}`.
- Webhook authorization uses a fine-grained GitHub token limited to this repository with Actions read/write permission.
- GitHub token expiration: December 10, 2026. Rotate it before that date and update only the Sanity webhook header.
- Automated test deployment: GitHub Actions run `34625761031` / run number 17, completed successfully.
- The live Book page was checked after the test and retained the published CMS content.
- About integration deployment: GitHub Actions run `34629651918` / run number 20, completed successfully.
- About webhook delivery returned HTTP 204 and GitHub Actions run `34629920336` / run number 21 completed successfully.
- The live About page was checked in a browser and rendered every published CMS value and the uploaded portrait.
- Contact integration deployment: GitHub Actions run `34638437331` / run number 24, completed successfully.
- The live Contact page was checked in a browser and rendered every published CMS value and the uploaded portrait.
- A no-visible-change Contact update produced a successful webhook delivery with HTTP 204, and GitHub Actions run `34639151595` / run number 26 completed successfully.
- The live Contact page was checked again after the webhook-triggered deployment and retained every published CMS value and the uploaded portrait.

## Important implementation files

| Area | File |
| --- | --- |
| Global app and fonts | `app/layout.tsx` |
| Homepage | `app/page.tsx` |
| Book page integration | `app/book/page.tsx` |
| About page integration | `app/about/page.tsx` |
| Contact page integration | `app/contact/page.tsx` |
| Shared styling and design tokens | `app/globals.css` |
| Header and navigation | `components/site-header.tsx` |
| Footer | `components/site-footer.tsx` |
| Subpage structure | `components/subpage-shell.tsx` |
| Book query and content types | `lib/sanity/book.ts` |
| About query and content types | `lib/sanity/about.ts` |
| Contact query and content types | `lib/sanity/contact.ts` |
| Sanity configuration | `studio/sanity.config.ts` |
| Book schema | `studio/schemaTypes/book.ts` |
| About schema | `studio/schemaTypes/about.ts` |
| Contact schema | `studio/schemaTypes/contact.ts` |
| Schema registry | `studio/schemaTypes/index.ts` |
| Static export and image rules | `next.config.ts` |
| Preview deployment | `.github/workflows/pages.yml` |
| Environment template | `.env.example` |

## Local working state at handoff

- Local `main` and `origin/main` both point to `7cde43d` before this documentation update.
- All implementation and automation work is pushed.
- Two pre-existing Superdesign files remain modified locally and were deliberately not committed:
  - `.superdesign/design-system.md`
  - `.superdesign/resume.json`
- Treat those files as user-owned work. Do not discard, overwrite, or include them in an unrelated commit.
- The temporary webhook probe script was removed after the successful test.

## Known temporary content and limitations

- The current Sanity Book, About, and Contact documents contain test copy entered to validate every field. They are not final client copy.
- The homepage still uses representative imagery and an interaction prototype rather than approved video media.
- Contact content and publish-triggered deployment are connected and verified.
- Media is not currently a public route, consistent with the supplied launch-content guide indicating it may be added later.
- Contact form behavior is not connected to a delivery service.
- No analytics, advertising pixels, consent manager, or cookie banner is currently installed.
- Add a privacy notice before enabling real form submissions or analytics. Decide on a cookie banner only after inventorying the actual cookies, embeds, and browser storage introduced by approved integrations.
- GitHub Pages is a temporary review surface; Cloudflare remains the intended production host.
- No client-owned production migration has occurred.
- Draft preview is not implemented and should not be added unless the client workflow requires it.

## Verified commands

```bash
pnpm install
pnpm dev
pnpm studio:dev
pnpm check
```

`pnpm check` passed after the Contact integration. The static build produces the public site in `out/`.

## Recommended next slice

Continue the CMS build one content type at a time. The next candidate is a narrow shared site-settings slice, but only if the existing header/footer content guidance identifies useful editor-controlled fields. Keep form-delivery behavior separate until the client-approved service and recipient are known.

Privacy and security are later integration gates, not reasons to interrupt the next editorial slice. When forms, analytics, or third-party media are selected, follow the Phase 6 privacy inventory and notice work; complete the formal front-end security review during Phase 7 before client beta.

Suggested sequence:

1. Review the existing header/footer content and the project guidance.
2. Define only the smallest useful shared settings document; do not create a general-purpose page builder.
3. Ask the user to populate and publish every field before connecting it.
4. Add a typed authenticated build-time query with intentional local fallback content.
5. Extend the webhook only to the exact connected type, then deploy and browser-verify the published values.

After Contact/site settings, proceed to homepage content and clips. Do not model Appearances, Testimonials, or Media until their launch status and content requirements are confirmed.

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

> Continue the Troy Anderson website from `docs/CURRENT_HANDOFF.md`. Read that file plus `AGENTS.md`, `docs/ROADMAP.md`, `docs/DECISIONS.md`, and the relevant Next.js documentation before editing. Preserve the two uncommitted `.superdesign` files. Evaluate the smallest useful shared site-settings slice from the existing header/footer and content guidance, then follow the proven one-at-a-time schema, editor input, typed query, fallback, webhook, deployment, and browser-verification workflow without adding speculative fields.

## Next handoff milestone

Refresh this document when either of these occurs first:

- the approved CMS types and public pages are fully connected; or
- a material decision changes hosting, routing, content architecture, motion, or account ownership.
