# Homepage video review proof

The current hero uses all 14 supplied full-video/animated-poster pairs with no placeholder tiles. It is enabled on both Cloudflare Workers and GitHub Pages review sites. Hero assets remain code-managed; CMS clip controls and production video delivery remain separate release work.

Run `HOMEPAGE_VIDEO_POC=true pnpm dev` to enable it locally. It is also enabled when the existing deployment sets `GITHUB_PAGES=true`; builds with neither flag keep the placeholder prototype. Current prepared media files are committed in `public/videos/hero-20261016/` (84.9 MB total, including 2.14 MB of silent previews); older unreferenced files remain in `public/videos/collage-poc/` and served with the static website, using its deployment base path. Originals are not committed. No third-party player, streaming service, analytics, or browser storage is introduced.

## October 16 complete replacement

Implementation `be59ead`; Pages run `38909241985`, Cloudflare run `38909241416`, both successful. Source: `/Users/greygarner/Desktop/Higher Roads/Clients/Troy Anderson/Assets/Clips/New clips/TA_BB_delivery/`. The shared header is an unchanged copy of `/Users/greygarner/Desktop/TA_siteheader.svg`.

| Clips | Preview dimensions | Full dimensions |
| --- | --- | --- |
| 02, 06, 10, 13, 14 | 700 × 350 | 960 × 540 |
| 04, 07, 09, 11, 15, 17 | 350 × 350 | 960 × 540 |
| 05, 08, 12 | 350 × 700 | 960 × 540 |

`TA_BB_10b.mp4` pairs with `TA_BB_10_gif.mp4`; all other full and preview names match by number. Each `_gif.mp4` is converted into a 12 fps silent H.264 loop with original dimensions and a JPEG first-frame fallback. Full videos retain all supplied footage/audio, H.264 CRF 24, AAC 96 kbps, and fast-start metadata. Each output stem has `.mp4`, `-preview.mp4`, and `-poster.jpg` files. No old clip/poster or placeholder tile is referenced by the current hero.

The two desktop arrangements use four columns and seven proportional rows, with selected square previews enlarged within their original ratio; the second arrangement mirrors the first. Mobile has two columns and eleven proportional rows. Tile metadata supplies explicit positions so all rectangles cover the grid without gaps/overlap. Selection supports 13 remaining sidebar tiles and widescreen playback. Existing keyboard/touch selection, switching, pause, reduced-motion logic, and Escape/focus return are preserved.

Website lint/type/static export and Cloudflare build/type checks passed. All 14 selections were exercised locally; live Workers checks at 1440px/390px confirmed all preview sources/dimensions, ratios and coverage, no overflow, representative full playback/switching, pause/resume, keyboard/Escape/focus behavior, and no recorded browser errors. All 42 media URLs on each host returned 200; both public header files match the supplied SVG exactly. GitHub Pages was browser-checked as well. Offscreen browser policies may pause previews. Reduced-motion logic was preserved; no new OS emulation/device acceptance was performed. Originals, CMS data, runtime publishing, Contact, and user-owned/unrelated files were preserved. Captions/titles, production hosting and performance/device acceptance remain open.

Earlier sections below record historical deliveries, not current asset counts or filenames.

Original proof source folder: `/Users/greygarner/Desktop/Higher Roads/Clients/Troy Anderson/Assets/Clips/TA_BB_output`. The original MP4 and GIF files are unchanged.

The idle tiles and looping previews keep the supplied GIF proportions: `TA_BB_02` is 700 × 350 (2:1) and `TA_BB_09` is 350 × 350 (1:1). Tile height follows those dimensions in both authored arrangements, including the sidebar while another clip plays. The whole image is visible without cropping. Other preview proportions, including vertical, can be supplied through the same dimension metadata. Clips 02 and 09 expand at their own 16:9 ratio.

October 7 replacement source: `/Users/greygarner/Desktop/Higher Roads/Clients/Troy Anderson/Assets/Clips/TA_BB_output 2.zip`. All three MP4s and GIFs were replaced. Originals remain unchanged outside the repository. Prepared filenames include `-v2` so cached files from the first proof cannot mask the replacements.

Clip 08 keeps its 350 × 700 vertical preview, but now opens the supplied 960 × 540 full video (53.14 seconds), replacing the previous short vertical MOV. All three full videos are 16:9; preview shapes remain 2:1, 1:2, and 1:1.

Prepared assets for all three replacements:

- Full `.mp4`: H.264 at 960 × 540, CRF 24, AAC audio at 96 kbps, fast-start metadata. Clips 02/08/09 are 25.44/53.14/83.17 seconds and approximately 1.37/2.64/4.28 MB.
- `-preview.mp4`: supplied GIF converted to a silent H.264 loop at 12 fps, original even pixel dimensions, CRF 24, fast-start metadata. Approximately 116/114/87 KB (317 KB combined).
- `-poster.jpg`: first frame of each supplied replacement GIF, JPEG quality 85.

All available previews autoplay muted and loop together, including unselected tiles while a full video plays. Browser autoplay or power policies may defer playback; still posters remain underneath. The visible per-tile play icons are removed; the whole tile remains a named keyboard/touch-accessible playback button. One section-level Pause animation / Resume animation control stops or restarts previews. Reduced-motion preferences suppress automatic previews and layout animation; preference changes are observed live. Opening a tile starts the full video with sound and native controls. Opening another replaces the player. Close or Escape stops it, returns focus, and changes to the next authored arrangement. Mobile retains the two-column layout.

Replacement verification on October 7, 2026: `74a33f3`, Actions run `37676230220` succeeded. Live Chrome checks confirmed all three desktop previews playing together, no visible per-tile play icons, pause/resume, all three replacement full videos, switching, keyboard activation, Escape, and focus return. At 390px the previews retain their source dimensions/proportions and playback works. No horizontal overflow or browser warnings/errors were observed. Lint, TypeScript, and production build passed. Browser policies can pause offscreen previews on mobile. Reduced-motion handling is implemented but has not been browser-emulated. Captions, descriptive editorial titles, production hosting, and CMS wiring remain launch work.

## October 9 hero additions

Implementation `2890bfa`, Actions run `37953816452` succeeded. Source folder: `/Users/greygarner/Desktop/Higher Roads/Clients/Troy Anderson/Assets/Clips/TA_BB_output/10-9/`. Originals remain unchanged.

- Added `TA_BB_04.mp4` (27.82-second source, 960 × 540) to one existing placeholder tile. `TA_BB_04_gif.mp4` supplies its 350 × 350 silent loop and first-frame poster. Prepared `TA_BB_04-v1` full/preview/poster assets total about 1.75 MB; preview is 64 KB.
- Updated clip 08's loop and first-frame poster from `TA_BB_08_gif.gif` (350 × 700) using `TA_BB_08-v3-preview.mp4` and `TA_BB_08-v3-poster.jpg`. The MOV is another short preview export, not a replacement full video. No new full clip 08 video was supplied; playback retains the existing 53.14-second `TA_BB_08-v2.mp4`. The tile's optional `previewClip` selects a separately versioned poster/loop without duplicating or changing full playback.
- Both desktop arrangements now use 16 columns to fit the added square preview without cropping or gaps. Mobile places the two square previews together and the vertical preview beside the two remaining placeholder tiles. Six tiles remain in total; all four full videos retain 16:9 playback.

`GITHUB_PAGES=true pnpm check` passed. The actual public homepage was verified at 1440px and 390px: four loaded posters/source-shaped loops, simultaneous desktop playback, both gap-free desktop arrangements, gap-free mobile layout, no horizontal overflow, clip 04 full playback, clip 08's retained long video/new poster pairing, switching, section pause/resume, keyboard activation, Escape, and focus return. No browser errors were recorded. Reduced-motion browser emulation, real-device QA, captions, editorial titles, CMS controls, and production delivery remain open. Live checks used `?hero=37953816452` to avoid the known temporary Pages cache; no publishing/cache configuration was changed. User-owned Superdesign files remain untouched and unstaged.

## Repeating the replacement process

1. Inspect the supplied ZIP/folder before extraction; match all MP4/GIF pairs by source stem. Extract only the needed media to a temporary folder and leave originals unchanged. Inspect each delivery independently; the October 7 ZIP contains three pairs, while the October 9 folder contains one new full/preview pair and clip 08 preview exports.
2. Inspect GIF dimensions and full-video dimensions/duration independently. Generate the preview from the GIF and the still from its first frame. Do not infer full-playback shape from the GIF: clip 08's preview is vertical while its full video is widescreen.
3. Using a local FFmpeg tool, encode full videos with `libx264`, CRF 24, `yuv420p`, 960 × 540 for these widescreen sources, AAC 96 kbps, and `+faststart`. Encode GIF previews at their original even dimensions, 12 fps, `libx264`, CRF 24, `yuv420p`, `-an`, and `+faststart`. Save first-frame JPEGs at quality 85. A future portrait full source needs its own proportional encoding; do not force it to 960 × 540. Compression is adjustable; these settings are the current proof, not an immutable requirement.
4. Commit prepared outputs only, under `public/videos/collage-poc/`. The current delivery uses `public/videos/hero-20261016/TA_BB_<number>` triplets; older v1/v2/v3 assets are historical. Use fresh versioned filenames for subsequent replacements to avoid old cached media.
5. Update `tiles` in `components/editorial-grid.tsx` with the matching stems and independent preview/playback dimensions. Preserve the authored grid, whole-tile playback, simultaneous loops, pause/reduced-motion behavior, and clean look unless the user changes that direction.
6. Run `GITHUB_PAGES=true pnpm check`, then verify real desktop/mobile playback, simultaneous previews, source proportions, pause/resume, keyboard activation, switching, Escape/focus return, loading/error fallback, and no overflow. Reduced-motion browser verification remains a pending gate and must be explicitly checked rather than inferred.
7. Push only related files, wait for the implementation deployment, verify actual live assets, and update the handoff/roadmap with measured evidence. No Studio deployment or Sanity mutation is needed for this local-file proof.

The last conversion used temporary Python-installed FFmpeg/Pillow tools in `/private/tmp/`; none were added to project dependencies. Those temporary paths are disposable. A future builder should use an available trusted local encoder rather than adding a runtime dependency to the website.
