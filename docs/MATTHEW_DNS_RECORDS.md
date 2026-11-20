# Troy Anderson — DNS record sheet

Prepared November 20, 2026. Grey confirmed lifecoachtroy.com and canonical https://www.lifecoachtroy.com in this launch session. Matthew is expected to be available within 24–48 hours. Matthew makes the DNS changes; Grey checks hosting and certificates. No message has been sent.

## 1. Verification first — add these now, leave website traffic unchanged

In Namecheap Advanced DNS for **lifecoachtroy.com**, use the short Host entries below. Full names are included to avoid accidentally appending the domain twice. TTL: Automatic (or 30 minutes if Automatic is unavailable).

| Purpose | Type | Namecheap Host | Exact value | Full record name |
| --- | --- | --- | --- | --- |
| Cloudflare hostname ownership | TXT | `_cf-custom-hostname.www` | `7a19064a-e38d-4179-8a29-c8f2e09d146c` | `_cf-custom-hostname.www.lifecoachtroy.com` |
| Certificate validation and automatic renewal | CNAME | `_acme-challenge.www` | `www.lifecoachtroy.com.410cf7fe4f2cd5f1.dcv.cloudflare.com` | `_acme-challenge.www.lifecoachtroy.com` |

These are the complete verification records for the selected delegated-validation method. The ownership value was generated on the actual www custom-hostname entry; the certificate destination uses Cloudflare's account-displayed delegation suffix and documented hostname format. Keep the delegation CNAME permanently for renewals. Keep the ownership TXT through launch and until Grey confirms any later cleanup. Do not add the alternative manual certificate TXT values shown by Cloudflare.

Before adding, check for any existing records at these exact names. A CNAME cannot coexist with TXT or another record at the same name. If an existing `_acme-challenge.www` record supports another active certificate service, coordinate replacement with Grey before editing it. Public checks found neither verification name on November 20; that is not a full zone inventory.

Reply when the records are saved. Grey must independently confirm **Hostname status Active** and **Certificate status Active** in Cloudflare, then finish routing and pre-switch acceptance. Verification records alone do not launch the website. Do not proceed directly to Stage 2.

## 2. Website switch — only at the agreed launch time after Grey clears Stage 1

**Changing these website DNS records is the launch. There is no separate launch button.**

First save/export the complete current web records and existing Namecheap URL redirect settings, including their destinations, types and TTLs. Send Grey that web-only inventory and agree the observation time before editing. Preserve the existing nameservers, registration and every email/service record.

| Purpose | Type | Namecheap Host | Exact value | TTL |
| --- | --- | --- | --- | --- |
| Main website | CNAME | `www` | `sites.hr-host.com` | Automatic / 30 minutes |
| Bare address, permanent redirect to www | A | `@` | `89.106.200.1` | Automatic / 30 minutes |

Replace conflicting **website-only** A/AAAA/CNAME or URL Redirect records at `www` and `@`; do not leave old website A/AAAA destinations alongside the new records. The bare-domain A must be used as shown; no apex CNAME or ALIAS is proposed. No new AAAA record is required. If a web-looking record also supports mail or another service, pause and coordinate rather than deleting it. Leave all MX, SPF/TXT, DKIM, DMARC, mail/autodiscover/autoconfig, SRV and unrelated records unchanged. Do not enable email forwarding or automatic DNS connection.

Observed November 20: nameservers dns1.registrar-servers.com and dns2.registrar-servers.com; bare A 162.255.119.223; no bare AAAA; www returned NXDOMAIN for A/AAAA/CNAME; no CAA observed. Matthew must check the full Namecheap inventory, including any URL Redirect entry behind the bare A. These observations do not establish the complete prior forwarding destination or email configuration.

The prepared redirect.pizza rule is permanent **301** to **https://www.lifecoachtroy.com**, preserving paths and query values, with tracking off. Its account currently confirms the A address above. Its certificate is requested **after** it detects the bare-domain DNS switch. There can be an activation interval when bare-domain HTTPS is unavailable; the provider says usually a few minutes, but no duration is guaranteed. Our own test took roughly two minutes. Agree this interval before the switch. Grey will watch activation and test both actual addresses; do not dismiss certificate warnings or treat our test hostname's certificate as Troy's certificate.

## 3. Launch acceptance and rollback

Grey checks both actual addresses over HTTP/HTTPS; the bare address must return a permanent redirect to www with paths/query values intact. Check `/`, `/about/`, `/book/`, `/media/`, `/contact/`, `/press/`, navigation, images/fonts, videos, phone layout, and the contact test described in LAUNCH_STATUS.md. The mailbox owner confirms notification receipt at admin@lifecoachtroy.com, replies to the test, and Grey confirms the reply at grey@higher-roads.com. Matthew/mailbox owner confirms normal existing email can still send and receive; unchanged public MX alone is not proof of mailbox service.

If www routing, HTTPS or required site behavior fails and cannot be corrected during the agreed observation period, Matthew restores the exact saved prior website and Namecheap forwarding entries. If only bare-domain certificate activation exceeds the agreed wait, restore only the bare web/forwarding entries while Grey investigates; avoid disturbing a healthy www connection. The last observed bare A was 162.255.119.223, but that value alone is not a complete rollback if Namecheap forwarding also needs restoration. Restore prior www absence only if Matthew's inventory confirms it. DNS caches and cached permanent redirects can delay rollback; test with fresh requests. Keep the new verification records, existing email records, Workers review, GitHub Pages and recovery resources. Provider/configuration rollback is separate and documented in LAUNCH_STATUS.md.
