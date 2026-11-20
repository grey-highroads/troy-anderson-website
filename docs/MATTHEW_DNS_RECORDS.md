# Troy Anderson — DNS records

Updated November 20, 2026. **All four records can be added together.** Grey confirmed there is no existing website to preserve and the team is ready to go live. The earlier verification-first sequence and scheduled cutover are superseded.

Domain: lifecoachtroy.com. Main website: https://www.lifecoachtroy.com. Bare address redirects permanently to www, preserving paths and queries. Our hosting route and contact permissions are configured.

| Purpose | Type | Namecheap Host | Value |
| --- | --- | --- | --- |
| Domain verification | TXT | `_cf-custom-hostname.www` | `7a19064a-e38d-4179-8a29-c8f2e09d146c` |
| Certificate validation and renewals | CNAME | `_acme-challenge.www` | `www.lifecoachtroy.com.410cf7fe4f2cd5f1.dcv.cloudflare.com` |
| Main website | CNAME | `www` | `sites.hr-host.com` |
| Bare-address redirect | A | `@` | `89.106.200.1` |

TTL: Automatic. Host entries above are relative to lifecoachtroy.com. The full verification names are `_cf-custom-hostname.www.lifecoachtroy.com` and `_acme-challenge.www.lifecoachtroy.com`. Keep the certificate CNAME for automatic renewals; no manual certificate TXT records are needed.

Matthew handles existing conflicting website/Namecheap forwarding entries and leaves existing email records and nameservers unchanged. No ALIAS, apex CNAME, new AAAA, email forwarding or DNS migration is requested. Last public check showed bare A 162.255.119.223 and no www; the public snapshot is not a complete zone inventory.

There may be a short wait for DNS and HTTPS activation after the records are added. The bare-address service requests its certificate after detecting the new A record; neither certificate activation nor DNS propagation has a guaranteed duration. This is an initial launch, so no staged switch or agreed observation window is required. Matthew lets Grey know when the records are saved; Grey then verifies the actual addresses, certificates, six pages, redirects and contact delivery/reply-to.

If activation fails, Grey checks the actual provider errors and coordinates only the affected website record with Matthew. There is no former website to restore. Preserve the prior web/forwarding settings as a reference; never alter email records as a troubleshooting step. The working review addresses remain available.
