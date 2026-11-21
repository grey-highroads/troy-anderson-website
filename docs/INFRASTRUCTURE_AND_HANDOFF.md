# Infrastructure and ownership handoff

## Current map

| Purpose | Source or service |
| --- | --- |
| Website | Next.js/React source; vinext Worker `troy-anderson-website` |
| Published CMS content | Sanity project `gknd24m7`, dataset `production`; runtime ContentCache |
| Editor | [Hosted Sanity Studio](https://troy-anderson.sanity.studio/) |
| Production www routing | `hr-host-router` with TROY binding and allowlisted host routes |
| Bare-to-www HTTPS | redirect.pizza |
| Contact | Browser-direct Formspree with native Turnstile verification |
| Secondary preview | GitHub Pages static export and retained Sanity rebuild webhook |

Main code pushes can deploy the website Worker serving production. Router and Studio deploy separately. [Runtime operations](CLOUDFLARE_RUNTIME.md), [router guide](../cloudflare/hosting-router/README.md), [Studio guide](../studio/README.md) and [contact guide](CONTACT_DELIVERY.md) explain their boundaries.

## Responsibilities

- Grey manages hosting, deployment, credentials/renewals, support and recovery through existing business accounts. Agree charges, included service, backup frequency and retention explicitly.
- Troy owns code/content/media and domain registration, approves editorial/launch choices, and designates editors and recipients.
- Matthew handles client DNS/email. Website troubleshooting must preserve existing mail records and nameservers.
- Give editors access only to the intended CMS project. Keep administrative credentials private and provide an agreed secure recovery/transition package.

If service ends, provide code, content/media exports, configuration and transition assistance under the agreed terms. Do not assume public Git history is a complete CMS/media backup.

## Acceptance and maintenance

[Launch status](LAUNCH_STATUS.md) records completed preparation and outstanding actual-domain/mailbox checks. [Roadmap](ROADMAP.md) covers the remaining privacy, editor, real-device and support handoff evidence. Historical pricing and account observations require verification before decisions.

The retained GitHub Pages webhook credential was recorded as expiring December 10, 2026; check and renew or explicitly retire it before expiry. Keep Pages and its webhook until retirement is agreed. Do not rerun historical migration or failure drills as fresh setup.

The [archived infrastructure guide](archive/2026-11-20-before-housekeeping/docs/INFRASTRUCTURE_AND_HANDOFF.md) and [migration history](CLOUDFLARE_MIGRATION_HANDOFF.md) preserve earlier decisions and measurements.
