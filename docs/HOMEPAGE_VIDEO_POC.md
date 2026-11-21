# Homepage media maintenance

The current hero selects nine visible clips from fourteen; two other clips change after selected playback closes. Preview speed is 1×, and the fourteen-tile alternative is intentionally retained. Source behavior lives in `components/editorial-grid.tsx`, `lib/hero-pool.ts` and `lib/hero-layout.ts`.

Use `HOMEPAGE_VIDEO_POC=true pnpm dev` for actual clips locally. Workers enables real hero media in its build; Pages enables it through `GITHUB_PAGES=true`. Plain Next.js development retains the placeholder mode.

## Files and preparation

Active media lives in `public/videos/hero-20261016/`; the date in the folder name is intentional. Preview/poster URLs currently use `v=20261106`. Preview/poster images fill frames with cover cropping; full selected videos use contain. Keep dimensions, native playback, pause/reduced-motion behavior and focus return when replacing files.

For an approved preview-only replacement, preserve full playback files. Existing preparation uses H.264 CRF 24, medium, yuv420p, no audio and faststart, with a poster extracted at 0.5 seconds. Adapt input/output paths deliberately and inspect the result; do not blindly apply historical commands to current assets. Originals are not committed.

The catalogue is also used by About/Media full-video fallbacks; their poster choices can differ from homepage previews. Inspect `lib/media-clips.ts`, page fallbacks and CMS overrides before changing any shared file.

## Validation and preservation

Check decode/playback, all fourteen catalogue entries, both desktop/phone layouts, pause/resume, reduced motion, explicit audio/controls, close/Escape/focus and absence of horizontal overflow. Run static Pages and Worker builds; browser-review the actual deployment for media changes.

`public/videos/collage-poc/` has no current application-source references and is described as historical. It is retained in this pass because published or draft CMS URLs have not been independently audited. Do not delete public assets based only on an import search. The preserved hero/announcement alternatives also remain until retirement is agreed.

The [original media guide](archive/2026-11-20-before-housekeeping/docs/HOMEPAGE_VIDEO_POC.md) retains preparation commands, old layouts and dated asset/playback tests. Its old counts, versions and “current” captions are historical.
