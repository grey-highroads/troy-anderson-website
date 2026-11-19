# November 18 client review and November 19 approved release

User approved Media still replacements, an uncropped About portrait, and the supplied replacement backstory with two independently expandable sections, closed by default. Correct “So one he stopped” to “So one day he stopped” and add the missing period after “empowering”. **Do not push to main or publish CMS content until the user gives release approval.**

## Implementation

- Media-only posters extracted at approximately 44.042s from full clip 6 (near requested frame 1055; nearby frame 1057 selected after visual and face-detail comparison) and 19.6s from full clip 9; original full video, dimensions, native controls/audio, CMS override precedence and hero posters/previews unchanged.
- About portrait uses its intrinsic aspect ratio, retaining the full supplied image and credit.
- Native details/summary sections are delimited by the exact CMS subheading paragraphs LESSONS IN PAIN and THE CRITICAL QUESTION. They support independent opening, keyboard/touch and visible focus; no script or animation is needed. Existing story content without those headings remains fully visible.
- Approved replacement Portable Text is staged in `docs/about-story-20261118.json`. `TROY_STORY_REVIEW=true` applies it **only in Next development**; normal production continues reading the published CMS field. No CMS write or draft publish has occurred.

## Local preview

Use existing read-only CMS access and set `TROY_STORY_REVIEW=true HOMEPAGE_VIDEO_POC=true` when starting the local Next development server. Current review is port 3020. Credentials must never be printed or committed. Task-local launcher/check scripts and screenshot evidence are ignored under `tmp/client-review-20261118` and `outputs/client-review-20261118`.

## Release dependency

After explicit approval, release scoped application changes from a clean origin/main checkout, never this local main wholesale. Coordinate the code release with a backed-up, revision-guarded, field-only update of About `storyBody` using the staged JSON. Inspect any existing About draft first; preserve all unrelated fields and do not publish the draft to apply this change. Reconcile only the approved story field in draft/published versions as appropriate. Remove the temporary development-only story override after the approved CMS update. No schema/Studio deployment is required.

## Verification

Passed targeted ESLint, website TypeScript the Next.js webpack static production build, GitHub Pages repository-prefixed production build, and Worker build/package/type checks. Chrome checked all six routes at 1440, 1280, 1024, 901, 768, 390 and 320px: 42 HTTP200/no-overflow checks; no page errors. Both sections were closed after navigation, opened independently, worked with Enter/Space and emulated touch, and retained corrected copy. Full portrait aspect ratio passed at every width. Reduced-motion opening and full-video pause-on-switch passed. Desktop and phone screenshots were visually inspected. Pre-existing hero LCP loading advisories remain outside this pass. Duplicate generated `.next/types/* 2.ts` files prevented the initial typecheck; those files were preserved as ignored `.backup` files under the task-local tmp folder, then the check passed. Browser phone emulation is not physical iPhone/WebKit acceptance. Existing contact replay limitation and launch gates remain unchanged.

November 18 follow-up: user supplied the preferred close-up around 44 seconds/frame 1055. Compared nearby full-video frames; the 44.042s still retained that expression with the strongest measured facial edge detail among the sampled 1053–1059 neighborhood. Replaced only the local clip-6 Media poster. No push or CMS write.

## November 19 release approval

The user approved pushing the reviewed pass to main. The story-only CMS transaction was applied with a private backup and revision guard, then verified byte-for-byte; all other document fields were unchanged. There was no About draft. The temporary local story override was removed; the normal published CMS read now supplies the approved story. The earlier hold and local-only instructions above are historical and superseded by this approval. Scoped release uses the isolated origin/main checkout, preserving original local history and unrelated files. Deployment/browser results will be recorded after verification.
