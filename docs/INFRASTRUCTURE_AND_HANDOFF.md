# Infrastructure and Handoff

## Managed service plan

Plan revised October 12, 2026 to minimize client setup. See [the short launch plan](CLIENT_ACCOUNT_SETUP.md) and D-006. Agree the managed-service terms with Troy before launch; no account or infrastructure changes have been made by this documentation update.

2520 Consulting manages production through Grey's existing business accounts. Keep Troy's repository, CMS project, Worker, and contact form distinct from other client resources. Troy retains domain-registration control and ownership of the website code, content, and supplied media. Client editors receive access to Sanity; form notifications go to their approved existing inbox. Separate client infrastructure accounts and ownership transfers are no longer launch prerequisites.

## Current infrastructure

Use [the Cloudflare migration handoff](CLOUDFLARE_MIGRATION_HANDOFF.md) for the implementation sequence and next-chat prompt.

The original review site remains GitHub Pages from `grey-highroads/troy-anderson-website`, using static export and authenticated Sanity build-time reads. The Cloudflare runtime review is <https://troy-anderson-website.grey-4fe.workers.dev/>. The hosted Studio is <https://troy-anderson.sanity.studio/>, project `gknd24m7`, dataset `production`. October 12 inspection found the dataset public after the Growth trial expired; D-013 records the Growth working plan for Grey plus one named client Editor, with invitation deferred and private visibility undecided. No upgrade or access change has been performed. See [the launch plan](CLIENT_ACCOUNT_SETUP.md) for pricing and approval boundaries. Keep this project and content rather than migrating them for account ownership alone.

Cloudflare runtime content refresh is implemented and measured on the test hostname: authenticated Book first, then all connected pages/settings. Revision-only publishes measured 1.28–3.90 seconds, missed-notification request recovery 20.81 seconds, and background recovery 59.98 seconds. Last-good content during CMS failures and rollback were tested. See [runtime operations](CLOUDFLARE_RUNTIME.md). Contact test delivery is now verified to Grey’s test inbox; see [contact operations](CONTACT_DELIVERY.md). Managed-production acceptance, final inquiry recipient/retention, privacy/security/editorial gates, and domain cutover remain unfinished; full builds remain for code/design changes.

The temporary GitHub webhook credential expires December 10, 2026. Rotate it before expiry if still used. Retire CMS-triggered preview rebuilds only after the runtime replacement is verified.

## Operating responsibilities

- Grey handles service billing, deployment, credentials, renewals, backups, recovery, and infrastructure support. Agree the recurring charge and included support before launch; do not assume current subscriptions cover all usage.
- Troy controls domain registration, approves content and launch, and designates editors and contact recipients.
- Limit client editing access to Troy's project. Keep private credentials server-side, scope deployment access, and protect Grey's administrative logins with recovery methods.
- Maintain a reproducible deployment and regular code/content/media backups. Keep a current recovery copy and configuration notes securely accessible to the client; agree backup frequency and retention before launch.
- If service ends, supply the code, content, media, configuration, and transition assistance. Account transfers or recreation may be required. Record notice, charges, and support boundaries in the service agreement.

## Launch checks

1. Agree managed-service responsibilities and the recurring charge with Troy.
2. Verify the Cloudflare runtime, publish freshness/recovery, draft exclusion, forms, and approved integrations on a test hostname.
3. Verify the intended editor can publish and the approved inbox receives a test inquiry.
4. Complete the existing privacy, security, accessibility, and performance launch checks.
5. Record the current domain and email DNS settings and a rollback path.
6. Coordinate cutover with the domain owner and verify the live website and existing email.
7. Deliver the editing instructions and secure recovery copy.

Account setup simplicity does not remove the site's existing production publishing and launch requirements.
