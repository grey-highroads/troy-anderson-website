# Troy Anderson Sanity Studio

The hosted editor is <https://troy-anderson.sanity.studio/>. Project `gknd24m7`, dataset `production` (public, confirmed October 12); local and hosted Studio connect to the same content. The dataset name does not mean client-owned production migration is complete.

## Editing

Sign in with an authorized account and use **Draft** to edit; **Published** is read-only. The registered types are Homepage, Book, About, Contact, Site settings, Media page, and Press page.

- Homepage manages Meet Troy heading, rich-text introduction, portrait/alt text, and testimonials. Hero clips and the homepage book promotion are not CMS fields.
- Book overview/inspiration and About biography/story use Portable Text. The Book foreword fields and public panel were deliberately removed.
- Enter creates a paragraph; Shift+Enter adds a line break. Formatting survives through the site's Portable Text renderer.
- Media exposes its main subheadline, YouTube videos/thumbnail overrides, podcast heading/copy, and empty-state copy. Legacy photography/publicity fields remain hidden/read-only to preserve data.
- Press manages the restored 17-photo Approved Images grid on unlinked `/press/`. It is publicly accessible by URL and noindex; this is not authentication. Preserve legacy Media photos and the separate Press references.
- About includes editable backstory video/poster/caption and pull quote, biography credit, section headings, and body copy. Approved portrait credit: “Photo: Mark Laita”.
- Book includes editable section copy, retailer graphics overrides, and the expanded **Sample button** group. **Button copy** is the normal label; **Unavailable button copy** appears when the destination URL is absent. Keep the current sample link until the approved replacement URL is provided.
- Contact includes editable form labels/messages/inquiry options. Delivery settings remain separately managed. Homepage CMS expansion was deliberately excluded from this copy-alignment work.
- Publish only when the editor's draft is ready. Never publish a draft automatically or replace it with published content during troubleshooting.

The temporary publish webhook still starts a GitHub Pages build. A separate filtered webhook now refreshes the Cloudflare Workers test site without building: <https://troy-anderson-website.grey-4fe.workers.dev/>. Runtime publishing, timed recovery, and last-good content were verified October 12; see D-011 and [runtime operations](../docs/CLOUDFLARE_RUNTIME.md). Retain the preview webhook until production acceptance and retirement are approved. Inspection found the dataset public following the expired Growth trial. The working plan is Growth with Grey as Administrator plus one named client Editor. The upgrade has not been performed, publisher selection/invitation is deferred, and private visibility is undecided. See D-013 in [the decision log](../docs/DECISIONS.md) and [the launch plan](../docs/CLIENT_ACCOUNT_SETUP.md).

## Local checks and hosted deployment

From the repository root:

```bash
pnpm studio:dev
pnpm studio:build
pnpm --filter troy-anderson-website-1 exec tsc --noEmit
cd studio
pnpm exec sanity deploy --yes --schema-required
```

Local editing is normally at <http://127.0.0.1:3333/>. Website pushes do not deploy Studio/schema changes; deploy Studio separately after its checks. Existing hosting application ID is recorded in `sanity.cli.ts`, with automatic updates disabled. Do not create another Studio/project as a workaround for content or authentication problems.

## Completed introduction migration

`studio/scripts/migrate-homepage-introduction.ts` converted legacy Homepage `meetTroySummary` strings into Portable Text on October 7, 2026. Draft and published values were handled independently; other fields and wording were preserved, and the draft was not published. The website still accepts legacy strings during migration.

The script defaults to a dry run. Application requires `--apply`, writes a private local backup, and revision-guards a field-only transaction. Do not rerun it for routine editing or deployment diagnosis. Inspect it and obtain a deliberate migration scope before any future application; backups and credentials stay outside source control.

Read [the current handoff](../docs/CURRENT_HANDOFF.md) and [ownership/migration policy](../docs/INFRASTRUCTURE_AND_HANDOFF.md) before changing infrastructure.
