# Cloudflare runtime and publishing operations

Verified October 12, 2026. This is a tested Workers review deployment, not approval to switch the live domain.

## Resources and integration

- Account: Grey's existing business account, `4fe56b3b11951a260d67361df9b864a0`; login `grey@higher-roads.com`.
- Worker: `troy-anderson-website`; tag `772f45f1465049de82dd1b9d5a4aeeaf`.
- Test URL: <https://troy-anderson-website.grey-4fe.workers.dev/>. No live domain is attached or configured by this change.
- Repository and Sanity project/editor remain unchanged: `grey-highroads/troy-anderson-website`, project `gknd24m7`, dataset `production`, <https://troy-anderson.sanity.studio/>.
- Integration pins: vinext `1.1.0`, Vite `8.3.0`, Cloudflare Vite plugin `1.63.1`, RSC plugin `0.5.36`, cf CLI `1.0.0-beta.14`, Cloudflare build-output utilities `0.9.0`. Next.js `16.3.4` and React `19.2.8` remain installed.
- Compatibility scan: 96%, no blocking issues; images have partial optimization support. This site already uses unoptimized images. Fonts were self-hosted in the Workers output and real hero clips use root-relative URLs.
- The native App Router build uses RSC plus its SSR child environment. The cf beta's automatic build-output mode rejects child environments; simply dropping the child environment produces an incomplete Worker. `scripts/package-cloudflare.mjs` packages the native artifact with Cloudflare's pinned utilities and a complete module manifest. This exact package was deployed successfully. Recheck this bridge when upgrading the integration; both vinext and cf are beta.
- One SQLite-backed `ContentCache` Durable Object namespace, with one object per connected document type. No new R2/KV/D1/queue or video-hosting resource is introduced. The wrapper entry exports the cache class; server code accesses bindings through `cloudflare:workers`.

## Publishing behavior

Sanity's dedicated document webhook `I5eWUUQiZvkpHFFy` targets `/api/sanity/refresh`. It covers Homepage, About, Book, Contact, Media page, and shared Site settings; drafts and content-release versions are excluded. The webhook filter uses supported API version `v2025-02-19`; content queries retain `2026-09-11` with `perspective=published`.

The endpoint requires the private bearer publish secret, POST JSON, the expected project/dataset, a supported type, and a published document identity. Bodies are bounded to 8 KiB. Requests carry identity only: the server fetches current published content, so duplicate or out-of-order events cannot replay old field values. Refresh failures return 503 so Sanity can retry.

Each type has a persistent successful snapshot. Its refreshes are serialized within its Durable Object. A temporary CMS error retains that snapshot and produces a structured log; a cold cache fails clearly instead of pretending placeholder content is a successful hosted read. Successful deletion returns null and uses the existing intentional empty/fallback rendering.

Application cache TTL is 20 seconds. Normal page reads synchronously check stale snapshots. Active objects also refresh on a 60-second alarm, including with no page visits; alarms stop after five minutes without use and the next page visit performs its stale check. A visible browser refreshes server content every 20 seconds and on navigation/tab restoration, without a hard reload. HTML/RSC and refresh responses have browser and CDN `no-store` headers; static assets retain their asset caching.

Shared Site settings use their own snapshot and affect all five routes. The framework page cache is bypassed with `connection()` in runtime reads. Browser navigation/refresh must be retested whenever vinext is upgraded.

## Verified results

- Published code `707948a` has the identical Git tree `d8280e7879eaf919d11a5ea0aad290d5231b16b3` to tested local commit `2896077`. The terminal OAuth credential lacks workflow scope; the connected GitHub account successfully published the same tree using its supported Git API. Main is synchronized locally.
- Clean GitHub Cloudflare workflow [38314286687](https://github.com/grey-highroads/troy-anderson-website/actions/runs/38314286687) passed dependency installation, lint, website/Worker type checks, build, scoped deployment and deployed-behavior verification. Current Worker version `38b964c7-13db-4314-802e-e36da386160f` records that GitHub commit. A separate local deployed check again passed all five routes, authenticated notifications, shared settings, duplicate events and rejection checks.
- Retained GitHub Pages workflow [38314286625](https://github.com/grey-highroads/troy-anderson-website/actions/runs/38314286625) passed; all five actual public Pages routes returned 200 after deployment. Neither its workflow nor its Sanity rebuild webhook was retired.

- First milestone: authenticated Book content rendered on the real test URL, including cover, rich text, subheader, retailers, and shared settings. First version `8cf41d56-f8a7-4044-a268-50ed10c9e1cb`.
- All five normal URLs returned 200 and exposed runtime cache revision evidence with `no-store` headers.
- Three successive Book revision-only publishes: 1.83, 1.28, and 2.73 seconds. A quick multi-page batch: About 1.58, Contact 3.48, Media 3.67, Homepage 3.90 seconds. These tests created published revisions without changing any content field values or publishing existing drafts.
- Duplicate and old notifications retained the newest published revision. Invalid authentication, dataset, and type were rejected; draft identity was ignored. Shared settings reported all five affected routes.
- Missed notification, verified with only the new webhook disabled: 20.81 seconds with normal Book requests. Independent background probe made no Book visits for 65 seconds; the snapshot had recovered at 59.98 seconds before the next visit. The webhook was restored after both probes.
- Recovery operating target: within 70 seconds for active content under healthy CMS/network conditions; this accommodates the 60-second alarm and 8-second fetch timeout. Request-driven recovery was faster in the test. This is a tested operating target, not a guarantee during outages or arbitrary platform delays. Inactive content refreshes on its next ordinary request.
- Failure drill: deploy an invalid read key to the test Worker, wait beyond TTL, verify forced refresh returns 503 and all five pages retain last-good content across Worker/DO version changes. Restore the working key and confirm authenticated refresh returns 200. Secret changes take time to propagate; immediate post-deploy checks can still encounter the preceding version.
- Rollback drill: deploy prior D-011 version `a2d3f3fe-c507-4de3-88fd-042a68e2fc37`, verify real Book 200, restore version `4e14a718-2c94-45fe-9115-86cbd5192d09`. Never roll back to the failure-drill version `71f206bd-eec2-430f-a61e-3439eef6e45d`.
- Desktop 1440px and mobile 390px: all five routes, no horizontal overflow; 17 Media photo downloads and existing poster precedence preserved. Four silent hero loops loaded root-relative assets; section pause/resume, explicit 960×540 playback, keyboard activation, Escape/focus return passed. Reduced-motion emulation suppressed all autoplay previews while retaining four explicit playback buttons.
- Lint, website/Worker TypeScript checks, Workers build, and repository-prefixed GitHub Pages static export passed. Private secret values were absent from browser output in both builds.

Revision evidence headers describe the cache observed by the request; they are operational metadata, not a replacement for visual/editorial review. Future approved editorial changes should repeat the visible latest-value and browser timing checks before beta/cutover.

## Commands and credentials

```sh
pnpm cloudflare:check
pnpm cloudflare:build
pnpm cloudflare:preview --port 8787
pnpm cloudflare:deploy:test
node --env-file=.dev.vars scripts/configure-sanity-webhook.mjs
node --env-file=.dev.vars scripts/verify-cloudflare-publishing.mjs
# Explicit revision-only publishing/failure-to-notify drill:
node --env-file=.dev.vars scripts/verify-cloudflare-publishing.mjs --publish-revisions
```

`.dev.vars` is ignored and private. It holds only `SANITY_API_READ_TOKEN` (Viewer) and `SANITY_PUBLISH_SECRET`. Local preview explicitly loads it into the runtime. Build configuration contains secret declarations, never values. Do not put the Cloudflare management key in `.dev.vars` or upload it as a Worker binding.

GitHub code deployment: `.github/workflows/cloudflare-test.yml`, main code changes or manual dispatch, environment `cloudflare-test`, only the test Worker. Repository secrets are `CLOUDFLARE_TROY_DEPLOY_TOKEN`, `CLOUDFLARE_SANITY_READ_TOKEN`, and `SANITY_PUBLISH_SECRET`; the existing Pages secret remains unchanged. The account token has Individual Workers Editor on Troy's Worker, no DNS role. Real access checks returned 200 for Troy and 403 for an unrelated business Worker. The user explicitly approved encrypting these three repository secrets.

To roll back code, review the selected version's code, secret compatibility, and Durable Object exports, then deploy it at 100%:

```sh
pnpm exec cf workers deployments create --worker troy-anderson-website \
  --strategy percentage --versions @rollback-versions.json --dry-run
pnpm exec cf workers deployments create --worker troy-anderson-website \
  --strategy percentage --versions @rollback-versions.json
```

`rollback-versions.json` contains `[{"version_id":"<verified-version-id>","percentage":100}]`. Preserve the ContentCache export/storage configuration. Code rollback does not restore CMS edits or delete cached content. Repeat authenticated Book, shared settings, and refresh checks after rollback. Domain rollback remains a separate DNS plan.

## Costs and remaining release gates

Actual account subscription API: Workers Paid **USD 5/month**, state Paid; R2 Paid base USD 0/month is pre-existing and unused by this migration. This is Grey's shared subscription, not a new USD 5 subscription for Troy. Usage above included Workers/DO allowances can add charges; no recurring Troy usage invoice exists yet. Monitor request/CPU/DO duration and Sanity usage before allocating the managed-service charge. Active alarms and visible-browser polling contribute API traffic; no polling continues forever for idle objects. Current rates: <https://developers.cloudflare.com/workers/platform/pricing/>.

Sanity dashboard discrepancy: the Growth trial expired; the project is now Free and `production` is **public**, contrary to the handoff's private-dataset record. Authentication is still used for every server query. No plan/visibility change was made. D-013 records the agreed Growth plan with Grey plus one named Editor (USD 30/month before tax/overages when both are active), not an implemented upgrade. Publisher selection/invitation is deferred; visibility remains undecided. Authentication does not make this public dataset private. See [the launch plan](CLIENT_ACCOUNT_SETUP.md) before any billing, access, or visibility change.

GitHub Pages and its Sanity rebuild webhook remain enabled. Retire neither until managed production refresh and release acceptance pass. The live domain, registrar, canonical hostname, DNS/email backup, and cutover approval are still required; no domain or DNS was changed.

Migration does not complete final editorial review, placeholder replacement/captions, real-device performance QA, inquiry delivery/spam controls, privacy notice/security review, metadata/analytics scope, or managed-service/support/exit terms. The Contact form has verified test delivery; final recipient and production acceptance remain open. These remain release blockers; do not advertise this test site as launch-ready.

## Contact form test addition

The Worker now serves GET `/api/contact` with the public `CONTACT_FORM_ID` and a no-store availability response. Browser submissions go directly to Formspree with provider-side validation, Formshield, domain restriction and a honeypot. No contact POST endpoint or rate-limit binding remains in the Worker. Test recipient delivery was confirmed by the user; see [contact operations](CONTACT_DELIVERY.md) for resources, actual Free-plan limits, verification and remaining release gates. Sanity content refresh and secrets were preserved.
