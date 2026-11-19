# Hosting acceptance evidence, November 19, 2026

These are recorded observations, not a live launch certification. Client DNS was read only. No inquiries were submitted. HTTPS checks used normal certificate verification.

- `hosting-router-resolved-checks-20261119.json`: initial router checks using a current public Cloudflare IP to work around a stale local DNS answer; this override does not bypass TLS checks.
- `hosting-preparation-recheck-20261119.json`: later ordinary-DNS HTTPS checks of the hosting, redirect and review addresses; no override needed.
- `forwarding-test-initial-20261119.json`: initial HTTP 404 and HTTPS handshake failures during certificate provisioning. Retained to show the real activation delay.
- `forwarding-test-20261119.json`: successful HTTP/HTTPS redirects and public certificate metadata after activation.
- `forwarding-test-acceptance-20261119.json`: 13 successful forwarding acceptance checks, including six pages, paths, query semantics and safe handling of a double leading slash.
- `client-dns-post-forwarding-preparation-20261119.json`: final public DNS snapshot showing Namecheap nameservers and unchanged client website/MX/SPF records. This is not a complete zone inventory.

The forwarding test used a DNS-only A record under Grey's Cloudflare zone. It proves the tested forwarding behavior, not Namecheap acceptance or the client's unissued certificate. The website test was also in Grey's zone; actual external SaaS hostname acceptance remains to be checked with Matthew. Screenshots, secrets and browser sessions are excluded. See [the preparation record](../../HR_HOST_PREPARATION.md) for rationale, exact resources, limits, remaining steps and rollback; run the four local router tests as documented in [the router README](../../../cloudflare/hosting-router/README.md).
