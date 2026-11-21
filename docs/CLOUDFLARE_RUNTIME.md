# Cloudflare runtime and publishing operations

Use [the handoff](CURRENT_HANDOFF.md) for source behavior and [launch status](LAUNCH_STATUS.md) for dated external setup/acceptance. November 20 records the production www mapping as deployed; older verification-first holds and old “current version” IDs are historical. Confirm the deployed version in Actions/provider records rather than treating a code merge as proof.

## Architecture and deployment

The website Worker is `troy-anderson-website`, with SQLite-backed `ContentCache` Durable Objects. `vite.config.ts` substitutes `cloudflare/client.ts` for static Next.js CMS reads. The native vinext RSC/SSR build is packaged by `scripts/package-cloudflare.mjs`; preserve that bridge and the Durable Object export/storage configuration when upgrading tooling. Version pins live in `package.json` and the lockfile.

The separate `hr-host-router` forwards allowlisted hosts to the website through its `TROY` service binding. See [router operations](../cloudflare/hosting-router/README.md). Its dashboard deployment is separate from the website pipeline. The bare domain uses redirect.pizza, not a bare-host router mapping.

`.github/workflows/cloudflare-test.yml` builds and deploys the website Worker on matching main pushes or manual dispatch. Despite the test name, production routing uses this same Worker. `.github/workflows/pages.yml` builds the secondary static preview. Studio schema changes need a separate Studio deployment. Preserve Pages and its Sanity rebuild webhook until retirement is agreed.

## Publishing behavior

Sanity's dedicated document webhook `I5eWUUQiZvkpHFFy` targets `/api/sanity/refresh`. Its configured filter covers Homepage, About, Book, Contact, Media page, Press page, and shared Site settings; drafts and content-release versions are excluded. The webhook filter uses supported API version `v2025-02-19`; content queries retain `2026-09-11` with `perspective=published`.

The endpoint requires the private bearer publish secret, POST JSON, the expected project/dataset, a supported type, and a published document identity. Bodies are bounded to 8 KiB. Requests carry identity only: the server fetches current published content, so duplicate or out-of-order events cannot replay old field values. Refresh failures return 503 so Sanity can retry.

Each type has a persistent successful snapshot. Its refreshes are serialized within its Durable Object. A temporary CMS error retains that snapshot and produces a structured log; a cold cache fails clearly instead of pretending placeholder content is a successful hosted read. Successful deletion returns null and uses the existing intentional empty/fallback rendering.

Application cache TTL is 20 seconds. Normal page reads synchronously check stale snapshots. Active objects also refresh on a 60-second alarm, including with no page visits; alarms stop after five minutes without use and the next page visit performs its stale check. A visible browser refreshes server content every 20 seconds and on navigation/tab restoration, without a hard reload. HTML/RSC and refresh responses have browser and CDN `no-store` headers; static assets retain their asset caching.

Shared Site settings use their own snapshot and affect all connected routes. The framework page cache is bypassed with `connection()` in runtime reads. Browser navigation/refresh must be retested whenever vinext is upgraded.


## Local commands and secrets

```sh
pnpm cloudflare:check
pnpm cloudflare:build
pnpm cloudflare:dev
pnpm cloudflare:preview --port 8787
```

Local Worker runtime requires ignored `.dev.vars` containing `SANITY_API_READ_TOKEN` and `SANITY_PUBLISH_SECRET`. Never print or commit their values. Builds without these secrets can validate packaging but cannot prove authenticated runtime page rendering. Static Next.js fallback behavior is different from the Worker's cold-cache failure behavior.

The CI secrets are `CLOUDFLARE_TROY_DEPLOY_TOKEN`, `CLOUDFLARE_SANITY_READ_TOKEN` and `SANITY_PUBLISH_SECRET`. The Pages read token remains separate. Do not put a Cloudflare management credential in Worker bindings.

`scripts/verify-cloudflare-publishing.mjs` is the existing deployed verification tool. Read its options before use; `--publish-revisions` creates published revisions and exercises notification recovery. Do not run content-mutating or secret-failure drills as routine housekeeping. `scripts/configure-sanity-webhook.mjs` changes external webhook configuration and is not a normal setup requirement.

## Recovery and verification

Review the intended prior release, credential compatibility and Durable Object exports before any rollback. Preserve content snapshots and rerun relevant page/shared-settings/refresh checks. Code rollback does not undo CMS edits. Router/domain recovery is separate and documented in [launch status](LAUNCH_STATUS.md).

Earlier tests measured publish refresh in 1.28–3.90 seconds, request recovery at 20.81 seconds and background recovery at 59.98 seconds. These are dated evidence, not a fresh service guarantee. The [archived runtime guide](archive/2026-11-20-before-housekeeping/docs/CLOUDFLARE_RUNTIME.md) preserves detailed drills, resource IDs, old versions and measured results. Never choose a rollback version merely because it appears in that history; it includes an intentionally broken secret-test version.

Contact uses no-store GET `/api/contact` configuration and browser-direct Formspree submissions; see [contact operations](CONTACT_DELIVERY.md). External plans, usage and dataset visibility must be checked before billing/access decisions; historical subscription observations are in the archive and [service plan](CLIENT_ACCOUNT_SETUP.md).
