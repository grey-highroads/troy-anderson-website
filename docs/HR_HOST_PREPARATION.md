# Hosting preparation: hr-host.com

## Published evidence

The current rationale, router source/configuration/tests and shareable HTTP/DNS/certificate results are committed with this hosting-only update. Raw results are in [hosting-evidence/2026-11-19](hosting-evidence/2026-11-19/). Screenshots and other work/ artifacts mentioned in historical notes remain local and are not required to understand the recorded results. No credentials, client certificate tokens or browser session data are included. Publication does not deploy or change hosting resources.

## Current plan and timing, November 19 follow-up

This section takes precedence over the historical ALIAS suggestions below. Grey explicitly took ALIAS testing off the plan. Keep registration, nameservers, DNS and email with Matthew. Use Cloudflare for SaaS for **www only**. Prepare a separate managed HTTPS redirect for **lifecoachtroy.com to https://www.lifecoachtroy.com**, preserving path and query. Do not register the bare client hostname in Cloudflare SaaS for this arrangement, and do not require a bare-host mapping in the ingress router.

### What the time window actually means

Cloudflare's manually shared certificate TXT tokens expire after 7 days for Let's Encrypt or 14 days for Google Trust Services/SSL.com; validation failures can invalidate them sooner. This is a reason to generate those values when Matthew can act, not a reason to defer our routing or forwarding tests. Prefer delegated DCV for www, using the exact value shown in the account, so future certificate renewals do not require fresh manual TXT exchanges. The delegation CNAME stays in DNS and does not expire on the manual token schedule. Ownership verification and certificate verification are separate checks.

DNS propagation after changing website records is a different timing concern. Agree a launch/observation period and preserve the prior web destination for rollback. There is no requirement to launch immediately after pre-validating www. Do not characterize every verification record as expiring, and do not promise a fixed propagation duration.

### Fixed preparation checklist

| Work | State |
| --- | --- |
| Provider endpoint and guarded website routing | Prepared; four local routing tests passed again on November 19 |
| Grey-owned HTTPS website and path/query redirect | Prepared; ordinary DNS/TLS checks now pass without the earlier resolver override |
| Managed bare-address HTTPS forwarding | Free account created/verified by Grey; isolated A-record/HTTPS test passed; actual client rule saved pending DNS; no paid plan selected |
| Actual www hostname registration and verification records | Intentionally deferred until Matthew can add verification records; actual values must come from Cloudflare |
| Actual www certificate/hostname acceptance | Requires Matthew's verification records; no traffic change needed for TXT/delegated validation |
| Actual bare-address certificate | Provider requests it after the address's DNS points to the forwarding service; cannot prove Troy's certificate using only our test address |
| Launch DNS switch | Matthew, only at an explicitly approved launch time; no nameserver change |

The free forwarding plan currently includes five source hostnames, 250,000 requests/month and automatic HTTPS; two source hostnames are now configured. Grey completed account creation and email verification, then signed in in the active work Chrome profile. No card or paid plan was selected. If the free traffic allowance is exceeded, the provider allows seven days to reduce usage or upgrade before stopping redirects; do not treat the free plan as unlimited. The provider reports certificates normally issue a few minutes after its DNS is detected. Consequently this route does **not** promise pre-issued HTTPS for Troy's bare address before its DNS change. Agree and disclose that activation step before treating the final instructions as launch-ready. Do not silently return to ALIAS experimentation to avoid it.

### Isolated forwarding acceptance test

Completed using the previously nonexistent forward-test.hr-host.com, after public A/AAAA/CNAME checks returned NXDOMAIN and the Cloudflare zone inventory showed no existing use. Created permanent 301 to https://troy-test.hr-host.com with path/query forwarding on and tracking off. Added only A forward-test to 89.106.200.1, DNS-only, automatic TTL, in Grey's hr-host.com zone. The forwarding account's A-record display confirmed this value. Using an A record tests the same record type proposed for the client's bare address. Existing troy-root-test, sites, router and website resources were not modified. Email forwarding is not enabled and no provider MX/SPF records were added. No Entri/automatic DNS connection was authorized or used.

The test hostname reached Verified in redirect.pizza, with its automatic SSL-installed confirmation. Initial requests at 18:48:39 UTC got HTTP 404 and an HTTPS handshake failure during provisioning; by 18:49:58 UTC both HTTP and certificate-verified HTTPS returned the intended 301. The DNS record was saved roughly two minutes before the successful check; this is observed activation, not a guaranteed duration. The issued certificate covers forward-test.hr-host.com, issuer Let's Encrypt YE2, expiry January 3, 2027. Renewal is managed by the provider; no manual uploaded certificate was used.

All 13 acceptance checks passed with ordinary DNS and normal TLS validation, including all six pages after redirects, HTTP and HTTPS, encoded path preservation, repeated query values, and safe handling of a //other.test path. The service normalizes a double leading slash through a relative 307 before the intended 301; it never chooses other.test as the destination. Spaces in query values are normalized from %20 to + while retaining their decoded meaning. A browser visit to https://forward-test.hr-host.com/book/?x=1&x=2 arrived at the correct test Book page with both query values. No forms were submitted. Evidence: docs/hosting-evidence/2026-11-19/forwarding-test-initial-20261119.json, docs/hosting-evidence/2026-11-19/forwarding-test-20261119.json and docs/hosting-evidence/2026-11-19/forwarding-test-acceptance-20261119.json. Screenshots: output/forwarding-test-active.jpg, output/forwarding-test-dns.jpg.

The real rule is also prepared in Grey's account: lifecoachtroy.com to https://www.lifecoachtroy.com, permanent 301, path/query forwarding on, tracking off. Redirect ID 1662239914; hostname ID 885204409. It is pending DNS, with the provider detecting the unchanged Namecheap root A 162.255.119.223. Its displayed required A is 89.106.200.1. No client DNS was changed and no client certificate is active in this service. Test redirect ID 1532744543; test hostname ID 1927557212. Screenshot: output/troy-forwarding-prepared.jpg. This proves the provider on our address, not Troy's unissued certificate or Namecheap acceptance.

### Matthew record sheet structure, not yet sendable

| Stage | Type | Host | Value / status |
| --- | --- | --- | --- |
| Verification only | TXT | Exact Cloudflare-generated ownership name for www | Not generated yet; copy fresh from custom-hostname record |
| Verification only | CNAME, preferably delegated DCV | _acme-challenge.www | Copy exact account-displayed delegation value after registering www; review existing record conflicts with Matthew |
| Launch only | CNAME | www | sites.hr-host.com |
| Launch only | A | @ | 89.106.200.1, confirmed in the actual prepared forwarding rule and passed on our test address |

No new AAAA is proposed for the minimal launch plan. IPv6-only visitors are not covered by this A-only forwarding test. Matthew must identify any existing @ AAAA that would send some visitors to the former web service; review it as part of the web cutover rather than leaving conflicting routing. Adding the provider's optional IPv6 record would need separate IPv6 acceptance, not an assumed pass.

The final sheet should include only actual required verification records, not both manual certificate TXT and delegated CNAME alternatives. No @ CNAME, ALIAS, nameserver, MX or SPF changes are part of this plan. Matthew reviews existing website A/AAAA/forwarding conflicts while retaining every email-related record, including DKIM, DMARC, autodiscover and SRV. Public observations do not replace his complete zone inventory. No provider Email Routing/forwarding service is wanted.

Allow www in HOST_ROUTES before its traffic switch, after approved registration/verification. Do not add the bare domain to the website router when the separate redirect service handles it. Contact production hostname/recipient and delivery acceptance remain separate website release checks, not reasons to delay an initial DNS coordination email.

Follow-up read-only checks: sites.hr-host.com, troy-test.hr-host.com and the original website workers.dev returned HTTPS 200 with ordinary DNS and certificate verification. The root-test /book/?x=1&x=2 request reached the correct test website with both query values intact. The router's unapproved workers.dev address returned the intended 404. Evidence: docs/hosting-evidence/2026-11-19/hosting-preparation-recheck-20261119.json. No network settings, client records, contact settings or deployed code changed in this follow-up.

References checked November 19: [Cloudflare token validity](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/reference/token-validity-periods/), [delegated DCV](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/), [forwarding pricing](https://redirect.pizza/pricing), [automatic HTTPS timing](https://redirect.pizza/support/automatic-https), [DNS records](https://redirect.pizza/support/dns-type), [path/query settings](https://redirect.pizza/support/redirect-settings).

## November 19: guarded routing prepared and tested

This section supersedes the November 10 exact-route blocker below. After a plain-language explanation of a zone-wide entrance with an explicit approved-host list, Grey authorized setup and testing on Grey's side only. No client DNS/email changes or contact with Matthew were authorized or performed.

Created the separate **hr-host-router** Worker in the existing account. It uses a TROY service binding to the existing troy-anderson-website production Worker, an environment variable HOST_ROUTES holding the exact provider/test host list, and compatibility date 2026-11-19. Logs and 1%-sampled traces are enabled. Code, test configuration and operations instructions are retained under cloudflare/hosting-router/.

Added **\*/\*** in the **hr-host.com zone only** to hr-host-router. It is not an account-wide route and is not attached to the client's DNS zone. The older, more-specific sites.hr-host.com/* direct website route and SaaS fallback remain unchanged. The guarded route successfully handles troy-test.hr-host.com and troy-root-test.hr-host.com. Unknown addresses are rejected instead of receiving Troy's website. The production client hostnames are deliberately absent from HOST_ROUTES until their approved verification/launch stage.

### Grey-owned test resources

| Resource | State |
| --- | --- |
| troy-test.hr-host.com | Proxied CNAME to sites.hr-host.com; approved website test address |
| troy-root-test.hr-host.com | Proxied A to originless 192.0.2.0; approved redirect test address |
| _acme-challenge.troy-test.hr-host.com | DNS-only CNAME to troy-test.hr-host.com.410cf7fe4f2cd5f1.dcv.cloudflare.com |
| SaaS custom hostname troy-test.hr-host.com | ID e4d112be-9197-4019-a090-02f00ccd388f; hostname Active and certificate Active in dashboard |
| Certificate settings | TLS minimum 1.2, Cloudflare-provided, TXT validation with DCV delegation; default origin |

The initial test CNAME was DNS-only. For this same-zone test, it flattened to the raw originless 100:: address and had no IPv4 answer. Switching this Grey-owned test record to proxied corrected its public DNS. Do not generalize this same-zone workaround into instructions to change the client's DNS provider. Initial HTTP certificate validation was replaced with TXT/delegated validation on this test hostname; both final status fields were independently observed Active. No certificate tokens or delegated records were created for the client's domain.

### Verification and limits

- Four local tests passed: strict hostname rejection including suffix/header spoofing; preservation of original requests and backend responses; redirect path/query preservation including a // path; fail-closed missing/invalid configuration and bindings.
- Actual Chrome navigation through the new test hostname verified all six pages: homepage, About, Book, Media, Contact and Press. The root-test browser navigation arrived at https://troy-test.hr-host.com/book/?x=1&x=2, preserving both query values.
- Current public DNS returned Cloudflare IPv4 addresses for troy-test.hr-host.com and the correct delegation CNAME. This computer's command-line resolver retained stale negative answers. Explicit resolution to the current public Cloudflare IP, with HTTPS certificate checks still enabled, returned 200 on all six test pages with runtime revision/no-store headers. This override was for testing only; no IP pinning or local/system DNS changes were made. Browser navigation used ordinary DNS without that override.
- The same HTTPS checks returned 404 for unapproved hr-host.com via the guarded zone route, and the router workers.dev address returned 404 through ordinary DNS. The original sites.hr-host.com and original website workers.dev homepages returned 200 and matching current Homepage revision PlOGOGpub00zK9JBXskDa9. No existing website deployment was initiated.
- Read-only client DNS recheck still showed Namecheap nameservers, root A 162.255.119.223, both Private Email MX destinations at priority 10, unchanged SPF, and no www CNAME. No client records were written.
- This verifies the guard, service binding, pages, redirects and a Cloudflare-managed test hostname/certificate. The test hostname belongs to our own Cloudflare zone; it is not an end-to-end acceptance test of a Namecheap-hosted external customer domain. Actual external hostname verification, certificate status, routing and HTTPS still need final acceptance with Matthew's approved records. Root Namecheap ALIAS compatibility remains unverified. Do not give Matthew an @ ALIAS as a proven launch record.
- Contact rendering was inspected only. Turnstile/Formspree allowlists, recipients and delivery settings were unchanged; no inquiry was sent. The test hostname is not an approved production Contact-delivery surface. No CMS publish, content changes, website code build, GitHub push or website redeployment was performed.

Private/local HTTP/DNS results are retained under work/hosting-router-*-20261119.json. Browser proof is saved in the current chat's original outputs directory as hosting-connection-test-20261119.jpg and hosting-certificate-test-20261119.jpg.

### Next stage and rollback

When Matthew is ready, generate the actual client hostname/certificate verification records, validate both status fields, and resolve the root HTTPS connection. Add the approved real hostnames to the router variable/source, with root-to-www redirect only once the root's connection is confirmed. Coordinate production Contact hostname/recipient acceptance separately. Only then prepare and approve the launch DNS changes. This work does not authorize domain cutover.

To roll back this preparation, remove the hr-host.com */* route to hr-host-router. The pre-existing, more-specific sites.hr-host.com/* direct route and workers.dev website review will continue to work. Remove only the Grey-owned test DNS/custom-hostname resources if abandoning testing. Do not delete the existing website Worker, content-cache Durable Object, secrets, client records, or SaaS subscription as part of router rollback. The router can remain deployed without a route and safely rejects its unapproved workers.dev address.

## November 10 historical preparation snapshot

The following record is historical and is superseded by the November 19 findings above.

Verified November 10, 2026. Preparation only, not a launch-ready DNS instruction sheet. User authorized Grey-side preparation without involving Matthew or changing existing client traffic. No client DNS changes or messages were sent.

## Resources prepared

| Item | Verified value |
| --- | --- |
| Account | 4fe56b3b11951a260d67361df9b864a0 |
| Zone | hr-host.com, active, Free Website |
| Zone ID | df30d6478f6b70c1c3638392c0f6626a |
| SaaS activation | Grey completed the dashboard checkout personally; confirmation said subscription active |
| Checkout | USD 0/month base fee; usage beyond allowance billed monthly; current published plans include 100 hostnames |
| Hosting endpoint | sites.hr-host.com |
| DNS record | AAAA, sites.hr-host.com, 100::, proxied, automatic TTL |
| DNS record ID | 6651d885b4eb1c21f2d5aaef1f69a92f |
| Worker route | sites.hr-host.com/* to troy-anderson-website |
| Route ID | cdaf45e71fed420fb02ce35d345e53c8 |
| SaaS fallback origin | sites.hr-host.com, active |
| Customer custom hostnames | None created |

The IPv6 value 100:: is an originless placeholder behind Cloudflare's proxy, not a server to give Matthew. The connection target is the hostname sites.hr-host.com, never a copied Cloudflare anycast IP or the workers.dev review hostname.

## What was verified

Ordinary HTTPS requests with certificate verification enabled returned 200 for /, /about/, /book/, /media/, /contact/, /press/ on sites.hr-host.com. HTML responses had private, no-store, max-age=0 and runtime Sanity revision headers. The original workers.dev homepage returned 200 with the same Homepage revision. GET /api/contact returned the existing public test form configuration; no form submission was attempted.

This is HTTP/runtime verification, not a browser, mobile, CAPTCHA, new-host delivery, or external SaaS routing acceptance test. Turnstile and Formspree remain restricted to the existing review setup, so the new endpoint is not a contact-form acceptance surface. No code was built, pushed or deployed, and no Sanity publish/failure drill was run.

## Routing discrepancy that must be resolved

The proposed exact customer routes www.lifecoachtroy.com/* and lifecoachtroy.com/* were submitted to the hr-host.com zone after SaaS activation. Both were rejected with HTTP 400, code 10022, Route pattern must include zone name: hr-host.com. Readback confirmed only the sites.hr-host.com/* route exists. No wildcard route was created as a substitute.

The current Cloudflare Worker-as-origin documentation describes both wildcard routing and exact customer-hostname routing. The exact-route instructions were not accepted by the actual API in this pre-registration state. It is not established whether registering/validating the customer hostname changes this restriction. Do not claim the future external CNAME will work solely because the provider endpoint and fallback status are healthy.

Before customer cutover, establish a supported routing arrangement and verify it end to end using an approved non-production hostname. If a zone-wide wildcard plus hostname allowlist is proposed, explain that revision and obtain authorization before broadening the originally scoped route plan. Preserve the existing Worker and review destination.

## Deferred verification and launch sheet

Do not generate expiring client certificate tokens until Matthew is available to add them. Once routing is resolved, create the approved custom hostname(s), use TXT ownership pre-validation and certificate validation/delegation as supported, and record exact generated names and values. Hostname status and ssl.status must both be active before a traffic switch.

The eventual sheet must separate:

- Verification only: generated ownership TXT and certificate TXT or delegated DCV CNAME records. Review conflicts before replacing any _acme-challenge records.
- Launch only: www CNAME to sites.hr-host.com after complete routing/certificate acceptance. No nameserver change.
- Root domain: unresolved. Namecheap supports ALIAS records, but this particular SaaS root arrangement has not been verified. Do not mark an @ ALIAS as ready or change @ for a test. If ALIAS is not supported, Matthew needs an HTTPS-capable redirect from lifecoachtroy.com to https://www.lifecoachtroy.com, preserving path and query. Namecheap basic URL forwarding alone is not proof of HTTPS-source support.

Existing publicly observed client email records are MX @ to mx1.privateemail.com and mx2.privateemail.com, priority 10 each; SPF TXT @ v=spf1 include:spf.privateemail.com ~all; mail/autodiscover/autoconfig CNAMEs to privateemail.com; and _autodiscover._tcp SRV 0 0 443 privateemail.com. These are observations, not a complete zone export. Matthew remains responsible for the full DNS inventory, DKIM selectors, mail records and account subscriptions. Do not add Cloudflare Email Routing.

## Before launch

- Confirm the exact client domain and canonical www hostname with Matthew/Troy.
- Resolve and test external SaaS routing and root HTTPS behavior.
- Prepare and validate a root-to-www redirect if the root is served by the Worker. No redirect code was added during preparation because the root connection is unresolved.
- Add production hostname(s) to Turnstile and Formspree only as an approved release step. Do not add sites.hr-host.com just to make a test form work.
- Confirm the final recipient, privacy/capacity and delivery acceptance. Preserve the documented Formspree replay limitation.
- Back up the client's website records and agree cutover, rollback and observation window. IT makes launch DNS changes only after explicit approval.
- Preserve the current code deployment, workers.dev review, GitHub Pages review and existing CMS webhook until retirement is separately approved.

## Rollback of preparation

No client rollback is needed because no client settings changed. If abandoning this provider setup, first verify no customer hostnames have subsequently been added, then remove the prepared route/DNS and clear the SaaS fallback origin through their supported controls. Coordinate SaaS subscription cancellation separately with Grey; deleting DNS does not cancel billing. Do not delete the Troy Worker, Durable Object, content, secrets or registration.

## Sources

- [SaaS setup](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/)
- [Workers as origin](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/worker-as-origin/)
- [Pre-validation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/domain-support/hostname-validation/pre-validation/)
- [Certificate token validity](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/reference/token-validity-periods/)
- [Delegated certificate validation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/)
- [SaaS plans](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/plans/)
- [Apex proxying](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/apex-proxying/)
- [Namecheap ALIAS](https://www.namecheap.com/support/knowledgebase/article.aspx/10128/2237/how-to-create-an-alias-record/)
- [Namecheap redirect limitations](https://www.namecheap.com/support/knowledgebase/article.aspx/385/2237/how-to-set-up-a-url-redirect-for-a-domain/)
