# Current Project Handoff

**Project:** Troy Anderson website  
**Prepared:** September 11, 2026  
**Prepared by:** 2520 Consulting  
**Handoff point:** Book and About CMS vertical slices and automated preview deployment are proven end to end

## Why this is the right handoff point

This is a stable chapter boundary. The repository, visual foundation, core public routes, local Sanity Studio, Book and About schemas, authenticated build-time content queries, and automatic publish-to-deploy path all work. A future builder can now repeat a known pattern for the remaining content types without reconstructing the earlier conversation.

Do not wait until the entire Sanity model is complete to hand off this conversation. That would make the context larger while adding several similar implementation loops. Start a fresh conversation from this document, and update it again when the CMS layer is complete or before another major architecture change.

## Sources of truth

- Repository: <https://github.com/grey-highroads/troy-anderson-website>
- Temporary public preview: <https://grey-highroads.github.io/troy-anderson-website/>
- Live Book route: <https://grey-highroads.github.io/troy-anderson-website/book/>
- Default branch: `main`
- About implementation baseline before this documentation update: `cf1ffa7` (`Connect About page to Sanity content`). Use the latest `main` revision as authoritative.
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
- Current schema registry contains two document types: `book` and `about`.
- The Book model supports title, introduction, cover plus alt text, overview heading and Portable Text, foreword excerpt and byline, inspiration heading and Portable Text, sample URL, retailers, and endorsements.
- The intended editor populated every field and successfully published the document.
- The Book page fetches the newest published Book document during the static build.
- The page renders Sanity image metadata, Portable Text, retailer links, endorsement attribution, and optional sample link.
- The About model supports its page heading and introduction, portrait plus alt text, biography heading and Portable Text, story heading and Portable Text, and a pull quote.
- The intended editor populated and published every About field successfully.
- The About page fetches the newest published About document during the static build and renders its portrait and Portable Text without changing the established page composition.
- Local builds without the private Sanity credential render intentional fallback content on both connected pages.

### Deployment and automation

- GitHub repository secret: `SANITY_API_READ_TOKEN`.
- The secret is a Sanity Viewer token; its value must never be committed or documented.
- GitHub Actions exposes the secret only to the build step.
- A Sanity GROQ-powered webhook named `Rebuild website when Book or About content is published` is enabled.
- Webhook dataset: `production`.
- Webhook filter: `_type in ["book", "about"]`.
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

## Important implementation files

| Area | File |
| --- | --- |
| Global app and fonts | `app/layout.tsx` |
| Homepage | `app/page.tsx` |
| Book page integration | `app/book/page.tsx` |
| About page integration | `app/about/page.tsx` |
| Shared styling and design tokens | `app/globals.css` |
| Header and navigation | `components/site-header.tsx` |
| Footer | `components/site-footer.tsx` |
| Subpage structure | `components/subpage-shell.tsx` |
| Book query and content types | `lib/sanity/book.ts` |
| About query and content types | `lib/sanity/about.ts` |
| Sanity configuration | `studio/sanity.config.ts` |
| Book schema | `studio/schemaTypes/book.ts` |
| About schema | `studio/schemaTypes/about.ts` |
| Schema registry | `studio/schemaTypes/index.ts` |
| Static export and image rules | `next.config.ts` |
| Preview deployment | `.github/workflows/pages.yml` |
| Environment template | `.env.example` |

## Local working state at handoff

- Local `main` and `origin/main` both point to `cf1ffa7` before this documentation update.
- All implementation and automation work is pushed.
- Two pre-existing Superdesign files remain modified locally and were deliberately not committed:
  - `.superdesign/design-system.md`
  - `.superdesign/resume.json`
- Treat those files as user-owned work. Do not discard, overwrite, or include them in an unrelated commit.
- The temporary webhook probe script was removed after the successful test.

## Known temporary content and limitations

- The current Sanity Book and About documents contain test copy entered to validate every field. They are not final client copy.
- The homepage still uses representative imagery and an interaction prototype rather than approved video media.
- Contact remains a visual/content stub and is not connected to Sanity.
- Media is not currently a public route, consistent with the supplied launch-content guide indicating it may be added later.
- Contact form behavior is not connected to a delivery service.
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

`pnpm check` passed after the Book integration. The static build produces the public site in `out/`.

## Recommended next slice

Continue the CMS build one content type at a time. The recommended next vertical slice is **Contact/site settings**, keeping form-delivery behavior separate until the client-approved service and recipient are known.

Suggested sequence:

1. Confirm the minimum editable Contact and shared site-information fields from the existing page and client guide.
2. Keep contact content separate from form-delivery configuration unless the approved model clearly benefits from one focused document.
3. Add only the narrow schema needed by the existing public route and shared footer.
4. Ask the user to populate and publish every field in the local Studio.
5. Add a typed authenticated build-time query with intentional local fallback content.
6. Extend the Sanity webhook only after the public content type is connected.
7. Deploy and verify the actual published values in a browser.

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

Before December 10, 2026:

1. Create a replacement fine-grained GitHub token.
2. Limit it to `grey-highroads/troy-anderson-website`.
3. Grant repository Actions read/write permission only.
4. Replace the `Authorization` webhook header value in Sanity using `Bearer <new token>`.
5. Publish a no-visible-change Book revision or a real approved content update.
6. Confirm a new GitHub workflow run succeeds.
7. Revoke the old token.

Never record either token value in this document.

## Suggested opening prompt for the next chat

> Continue the Troy Anderson website from `docs/CURRENT_HANDOFF.md`. Read that file plus `AGENTS.md`, `docs/ROADMAP.md`, `docs/DECISIONS.md`, and the relevant Next.js documentation before editing. Preserve the two uncommitted `.superdesign` files. Start the next one-at-a-time Sanity vertical slice for Contact/site settings, using the established Book and About schema/query/fallback/deploy pattern and avoiding scope creep.

## Next handoff milestone

Refresh this document when either of these occurs first:

- the approved CMS types and public pages are fully connected; or
- a material decision changes hosting, routing, content architecture, motion, or account ownership.
