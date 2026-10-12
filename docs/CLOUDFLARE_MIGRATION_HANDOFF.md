# Cloudflare migration handoff

Prepared October 12, 2026. Technical instructions for the next implementation chat.

**October 12 implementation record:** Authenticated Book proof and site-wide D-011 are now deployed and measured on <https://troy-anderson-website.grey-4fe.workers.dev/>. Read [runtime operations](CLOUDFLARE_RUNTIME.md) and the current handoff update before continuing. The original sequence below is retained for release/cutover requirements. GitHub Pages remains active, no domain/DNS changed, and launch gates remain open. Current Sanity production visibility is public after the Growth trial expired; D-013 and [the launch plan](CLIENT_ACCOUNT_SETUP.md) supersede the historical private-dataset assumption. Growth with Grey plus one named Editor is the working plan, not an implemented upgrade; invitation is deferred and visibility remains undecided.

Move Troy's website from the temporary GitHub Pages preview to permanent Cloudflare Workers hosting in Grey's existing business account. GitHub remains the code repository. Keep the existing Sanity project and editor address. Troy retains domain registration control; Grey manages hosting and service billing under D-006.

The original implementation sequence below is retained for reference. The Cloudflare test deployment is complete and verified; remaining release gates and any live domain switch still require acceptance and explicit cutover approval.

## Original starting point (historical; implementation record above takes precedence)

- Workspace: `/Users/greygarner/Documents/Codex/2026-09-10/referenced-chatgpt-conversation-this-is-an-2`.
- Repository: `grey-highroads/troy-anderson-website`, branch `main`. Inspect its latest revision rather than resetting to an earlier milestone.
- Preview: <https://grey-highroads.github.io/troy-anderson-website/>.
- Stack: Next.js 16.3.4, React 19.2.8, Node 24, pnpm 11.19.0.
- `next.config.ts` always uses `output: "export"`. `GITHUB_PAGES=true` adds `/troy-anderson-website` to URLs.
- `.github/workflows/pages.yml` builds `out/` and deploys GitHub Pages. Sanity publishes currently trigger this rebuild path.
- CMS: project `gknd24m7`, dataset `production` (originally assumed private; confirmed public October 12), API version `2026-09-11`. Studio: <https://troy-anderson.sanity.studio/>.
- No Worker, runtime refresh endpoint, or production domain cutover is implemented.

Read `AGENTS.md`, `CURRENT_HANDOFF.md`, D-006/D-011 in `DECISIONS.md`, and the installed Next.js deployment/cache guides before changes. Preserve the user-owned `.superdesign/design-system.md` and `.superdesign/resume.json`. Follow the October 12 documentation updates establishing the managed-service plan.

## Implementation sequence

### 1. Confirm the Cloudflare destination

Use Grey's existing account, accessed through his own login (`grey@higher-roads.com`). Confirm the intended account ID and billing before provisioning. Use a dedicated Worker named `troy-anderson-website` if available, initially on a `workers.dev` address. Confirm the needed Workers subscription and actual costs; don't create client accounts or buy unrelated services.

The live domain and registrar have not been confirmed in this handoff. They are needed for cutover, not for the first deployment. Do not guess them or change DNS during the proof.

### 2. Prove framework compatibility

Select the smallest supported Workers integration that runs this installed version and meets D-011. Cloudflare's current guide recommends **vinext**, which is beta; its OpenNext guide remains available. Verify compatibility and a real Workers build before adopting either. Avoid an automatic toolchain migration without checking its changes. Record the selected integration and pinned versions.

Sources: [Cloudflare Next.js guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/), [OpenNext guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/).

Make runtime output work for Workers while retaining static export for the existing GitHub Pages preview until replacement verification. Cloudflare URLs must work at `/`, without the GitHub repository prefix. Commit the selected runtime configuration and repeatable build/preview/deploy commands. Test in the Workers runtime, not only the local Next.js server.

**First milestone:** Book renders on a real Cloudflare test URL with authenticated published CMS content. Stop broad rollout until this works.

### 3. Configure content publishing

Use these public settings:

| Setting | Value |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `gknd24m7` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2026-09-11` |

Store `SANITY_API_READ_TOKEN` as a private Viewer-only runtime secret. Ensure the selected integration exposes it to server reads; a build secret alone is insufficient. Add a private publish-notification secret and authenticate/validate refresh requests. Never put secret values in documents or browser assets. Preserve local fallback behavior, but make missing hosted credentials fail clearly.

Prove Book runtime fetching, targeted cache refresh, and automatic time-based recovery for missed notifications. Read published content only. Preserve the last successful content during temporary CMS failures. Then extend to Homepage, About, Contact, Media, and shared Site settings. Shared changes must refresh all affected pages.

Sanity publishes must update normal page URLs without full builds. Code/design changes still deploy from GitHub. Configure application, Cloudflare, and browser caching together. Add only the cache resources the chosen integration needs.

### 4. Preserve the site and establish code deployment

Keep all five routes, approved styling, rich text, 17 Media photos, poster precedence, and hero behavior. Inspect `app/page.tsx`: real hero clips currently depend on `HOMEPAGE_VIDEO_POC=true` or `GITHUB_PAGES=true`. Ensure Cloudflare displays the real clips without enabling GitHub-prefixed URLs. Verify video playback, asset paths, downloads, and direct subpage visits.

Choose one repeatable code-deployment path from GitHub, scoped to Troy's resources. Keep preview and production destinations explicit. Preserve GitHub Pages until Cloudflare is verified. Do not transfer the repository or CMS for ownership alone.

### 5. Verify before cutover

- Lint, type checks, and the selected production build pass.
- All routes work at desktop and mobile sizes; navigation, keyboard playback, pause, and reduced motion work.
- Several quick publishes and repeated edits show the newest content, with drafts excluded and duplicate/out-of-order notifications handled.
- Published changes meet the proposed 30-second normal-condition target; record actual timing and the measured missed-notification recovery bound.
- No hard refreshes or special query URLs are needed. Private credentials stay server-side.
- Verify a code deployment and its rollback. Complete the existing launch gates, including form delivery, privacy/security, and editorial approval; account migration alone does not complete those features.

### 6. Attach the live domain and retire preview publishing

After approval, confirm the domain, registrar access, preferred root/`www` address, and existing DNS records. Back up DNS, especially email records. Agree a cutover and rollback plan with the domain owner. Keep registration with Troy; DNS hosting may move to Grey's Cloudflare account if needed.

Workers Custom Domains require an active Cloudflare zone. Once ready, open the Worker → **Settings → Domains & Routes → Add → Custom Domain**. Review conflicting web records before adding it. Configure the canonical address and redirects, verify HTTPS, then test the website and existing email. [Cloudflare domain instructions](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).

Retire the Sanity-to-GitHub rebuild webhook only after production refresh works. Keep the prior preview for an agreed recovery window, then disable its deployment path when safe. DNS rollback restores the previous live destination recorded before cutover; the GitHub preview is not automatically a live-domain rollback.

## Completion record

Record the Cloudflare account/Worker identifiers, test and live URLs, deployed commit, integration versions, deployment/rollback commands, measured publishing results, actual recurring costs, and remaining launch blockers. Store credentials separately. Update the roadmap and handoff only from verified results.

## Prompt for the next chat

> Implement the Cloudflare migration in `docs/CLOUDFLARE_MIGRATION_HANDOFF.md`. Use Grey's existing business account; keep the repository and Sanity project. Inspect current main and any uncommitted changes, preserve the two user-owned Superdesign files, and read AGENTS.md plus relevant installed Next.js guides. First prove the supported runtime and authenticated Book page on a Cloudflare test URL, then implement D-011 refresh/recovery across the site. Preserve GitHub Pages until the replacement is verified. Verify real deployed behavior. Do not change the live domain until the release is tested and cutover is approved. Report any missing account access while continuing work that does not require it.
