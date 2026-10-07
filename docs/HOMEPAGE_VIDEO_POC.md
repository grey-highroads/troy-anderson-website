# Homepage video review proof

This proof uses three real clips in the existing six-tile collage. Three tiles remain visual placeholders. It is enabled for the GitHub Pages review build; no CMS fields or client production hosting have been selected or changed.

Run `HOMEPAGE_VIDEO_POC=true pnpm dev` to enable it locally. It is also enabled when the existing deployment sets `GITHUB_PAGES=true`; builds with neither flag keep the placeholder prototype. Prepared media files are committed in `public/videos/collage-poc/` (approximately 8.8 MB total) and served with the static website, using its deployment base path. Originals are not committed. No third-party player, streaming service, analytics, or browser storage is introduced.

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

## Repeating the replacement process

1. Inspect the supplied ZIP/folder before extraction; match all MP4/GIF pairs by source stem. Extract only the needed media to a temporary folder and leave originals unchanged. The current source contains three pairs, not six clips.
2. Inspect GIF dimensions and full-video dimensions/duration independently. Generate the preview from the GIF and the still from its first frame. Do not infer full-playback shape from the GIF: clip 08's preview is vertical while its full video is widescreen.
3. Using a local FFmpeg tool, encode full videos with `libx264`, CRF 24, `yuv420p`, 960 × 540 for these widescreen sources, AAC 96 kbps, and `+faststart`. Encode GIF previews at their original even dimensions, 12 fps, `libx264`, CRF 24, `yuv420p`, `-an`, and `+faststart`. Save first-frame JPEGs at quality 85. A future portrait full source needs its own proportional encoding; do not force it to 960 × 540. Compression is adjustable; these settings are the current proof, not an immutable requirement.
4. Commit prepared outputs only, under `public/videos/collage-poc/`. Current triplets are `TA_BB_02-v2.mp4`, `TA_BB_02-v2-preview.mp4`, `TA_BB_02-v2-poster.jpg`, and equivalent `08`/`09` names. Use fresh versioned filenames for subsequent replacements to avoid old cached media.
5. Update `tiles` in `components/editorial-grid.tsx` with the matching stems and independent preview/playback dimensions. Preserve the authored grid, whole-tile playback, simultaneous loops, pause/reduced-motion behavior, and clean look unless the user changes that direction.
6. Run `GITHUB_PAGES=true pnpm check`, then verify real desktop/mobile playback, simultaneous previews, source proportions, pause/resume, keyboard activation, switching, Escape/focus return, loading/error fallback, and no overflow. Reduced-motion browser verification remains a pending gate and must be explicitly checked rather than inferred.
7. Push only related files, wait for the implementation deployment, verify actual live assets, and update the handoff/roadmap with measured evidence. No Studio deployment or Sanity mutation is needed for this local-file proof.

The last conversion used temporary Python-installed FFmpeg/Pillow tools in `/private/tmp/`; none were added to project dependencies. Those temporary paths are disposable. A future builder should use an available trusted local encoder rather than adding a runtime dependency to the website.
