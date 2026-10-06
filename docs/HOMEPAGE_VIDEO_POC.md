# Homepage video review proof

This proof uses three real clips in the existing six-tile collage. Three tiles remain visual placeholders. It is enabled for the GitHub Pages review build; no CMS fields or client production hosting have been selected or changed.

Run `HOMEPAGE_VIDEO_POC=true pnpm dev` to enable it locally. It is also enabled when the existing deployment sets `GITHUB_PAGES=true`; builds with neither flag keep the placeholder prototype. Prepared media files are committed in `public/videos/collage-poc/` (approximately 6 MB total) and served with the static website, using its deployment base path. Originals are not committed. No third-party player, streaming service, analytics, or browser storage is introduced.

Original source folder: `/Users/greygarner/Desktop/Higher Roads/Clients/Troy Anderson/Assets/Clips/TA_BB_output`. The original MP4 and GIF files are unchanged.

The idle tiles and looping previews keep the supplied GIF proportions: `TA_BB_02` is 700 × 350 (2:1) and `TA_BB_09` is 350 × 350 (1:1). Tile height follows those dimensions in both authored arrangements, including the sidebar while another clip plays. The whole image is visible without cropping. Other preview proportions, including vertical, can be supplied through the same dimension metadata. Clips 02 and 09 expand at their own 16:9 ratio.

Clip 08 adds a 350 × 700 (1:2) vertical preview. The supplied `TA_BB_08_gif.mov` is also vertical and only 2.71 seconds long; it is used as the playback source until a longer video is supplied. It is converted to browser-compatible H.264/AAC MP4 (approximately 131 KB), with a 103 KB silent preview and a 19 KB poster. Expanded players retain their source proportions and fit within 80% of the viewport height.

Prepared assets for `TA_BB_02` and `TA_BB_09`:

- `.mp4`: full H.264 video at 960 × 540, CRF 24, AAC audio at 96 kbps, fast-start metadata. Approximately 1.3 MB and 4.1 MB respectively.
- `-preview.mp4`: supplied GIF converted to a silent H.264 loop at 12 fps, even pixel dimensions, CRF 24, fast-start metadata. Approximately 111 KB and 83 KB.
- `-poster.jpg`: first frame of each supplied GIF, JPEG quality 85.

Posters appear at rest. Mouse hover or keyboard focus starts a muted looping preview. Opening a tile starts the full video with sound and native controls. Opening another clip replaces the player. Close or Escape stops the full player, returns keyboard focus, and moves to the next authored arrangement. Mobile uses the existing two-column layout. Reduced-motion preferences suppress automatic previews and the layout animation; explicit playback remains available.

Verified in Chrome at 1440 px and 390 px: all three source preview proportions in both desktop arrangements and on mobile; muted vertical preview, vertical playback, close, Escape, focus return, and no horizontal overflow. Earlier checks also verified full playback and switching for clips 02 and 09. Lint, TypeScript, and the production build passed with the proof enabled. Reduced-motion handling is implemented but has not been browser-emulated. Captions, descriptive editorial titles, production hosting, and CMS wiring remain launch work.
