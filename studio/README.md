# Troy Anderson Sanity Studio

The hosted editor is <https://troy-anderson.sanity.studio/>. Project `gknd24m7`, private dataset `production`; local and hosted Studio connect to the same content. The dataset name does not mean client-owned production migration is complete.

## Editing

Sign in with an authorized account and use **Draft** to edit; **Published** is read-only. The registered types are Homepage, Book, About, Contact, Site settings, and Media page.

- Homepage manages Meet Troy heading, rich-text introduction, portrait/alt text, and testimonials. Hero clips and the homepage book promotion are not CMS fields.
- Book overview/inspiration and About biography/story use Portable Text. The Book foreword fields and public panel were deliberately removed.
- Enter creates a paragraph; Shift+Enter adds a line break. Formatting survives through the site's Portable Text renderer.
- Media has platform-neutral video links with optional thumbnail overrides, 17 approved structured photos, and publicity downloads. Preserve the existing draft and published photo arrays.
- Publish only when the editor's draft is ready. Never publish a draft automatically or replace it with published content during troubleshooting.

The temporary publish webhook starts a GitHub Pages build. Publishing and visible updates are separate stages, and dispatch/deployment/cache delays have occurred. Production runtime refresh is approved but not implemented; see D-011 and the roadmap.

## Local checks and hosted deployment

From the repository root:

```bash
pnpm studio:dev
pnpm studio:build
pnpm --filter troy-anderson-website-1 exec tsc --noEmit
pnpm --filter troy-anderson-website-1 deploy
```

Local editing is normally at <http://127.0.0.1:3333/>. Website pushes do not deploy Studio/schema changes; deploy Studio separately after its checks. Existing hosting application ID is recorded in `sanity.cli.ts`, with automatic updates disabled. Do not create another Studio/project as a workaround for content or authentication problems.

## Completed introduction migration

`studio/scripts/migrate-homepage-introduction.ts` converted legacy Homepage `meetTroySummary` strings into Portable Text on October 7, 2026. Draft and published values were handled independently; other fields and wording were preserved, and the draft was not published. The website still accepts legacy strings during migration.

The script defaults to a dry run. Application requires `--apply`, writes a private local backup, and revision-guards a field-only transaction. Do not rerun it for routine editing or deployment diagnosis. Inspect it and obtain a deliberate migration scope before any future application; backups and credentials stay outside source control.

Read [the current handoff](../docs/CURRENT_HANDOFF.md) and [ownership/migration policy](../docs/INFRASTRUCTURE_AND_HANDOFF.md) before changing infrastructure.
