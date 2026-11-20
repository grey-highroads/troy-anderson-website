# Hosting ingress Worker

This separate Worker receives traffic entering the hr-host.com SaaS zone and forwards only explicitly approved hostnames to the existing Troy Worker through a service binding. It does not rebuild, redeploy or change the website. Unconfigured hosts fail closed with 404; missing configuration/bindings fail closed with 503.

Deployed through the signed-in Cloudflare dashboard November 19, 2026:

| Setting | Value |
| --- | --- |
| Worker | hr-host-router |
| Account | 4fe56b3b11951a260d67361df9b864a0 |
| Compatibility date | 2026-11-19 |
| Source | worker.mjs, pasted into the dashboard worker.js module |
| Service binding | TROY to troy-anderson-website, production, default entrypoint |
| Text variable | HOST_ROUTES, serialized contents of host-routes.json |
| Logs | Enabled, invocation logs enabled |
| Traces | Enabled, 1% sampling |
| Zone route | */* in hr-host.com only, to hr-host-router |

The more-specific sites.hr-host.com/* route still points directly to troy-anderson-website. Preserve it: it predates the router and keeps the provider endpoint unchanged. The SaaS fallback origin remains sites.hr-host.com.

Actual www.lifecoachtroy.com is registered in SaaS, pending ownership/certificate verification (November 20). `host-routes.production-pending.json` is the exact prepared future HOST_ROUTES value; it is **not deployed**. Automatic review required verification first. `host-routes.json` still matches live HOST_ROUTES and allows only Grey-owned provider/test hosts. After verification passes, deploy only the pending value, confirm readback, promote it to the active file and remove the pending duplicate. See [launch status](../../docs/LAUNCH_STATUS.md).

The current plan uses Cloudflare SaaS for www and redirect.pizza for managed bare-address HTTPS forwarding. The bare address needs no router mapping or SaaS registration. Preserve existing test/provider mappings and the TROY service binding. ALIAS testing is off the plan. The existing root-test mapping proves the router's redirect behavior; the separately tested forwarding service handles the actual bare address. See [hosting preparation](../../docs/HR_HOST_PREPARATION.md) and [Matthew's complete DNS sheet](../../docs/MATTHEW_DNS_RECORDS.md).

The router preserves the original Request and streams the backend Response. It does not buffer videos or submit inquiry messages. X-Forwarded-Host and similar visitor-controlled headers cannot override URL-hostname matching. Redirects replace the hostname on the parsed URL and clear any port, preserving path and query without treating a // pathname as an external destination.

Run the routing tests with:

```sh
node --test cloudflare/hosting-router/worker.test.mjs
```

This folder is independent of the existing website's cloudflare.config.ts and deployment workflow. Do not run the website deploy command to publish this router. Current CLI authentication is unavailable; dashboard deployment was used without adding credentials or modifying repository deployment permissions. A future CLI/CI setup needs an explicitly separate configuration preserving the bindings, host variable and observability above.

See docs/HR_HOST_PREPARATION.md for live evidence, DNS resources, the certificate test, limitations and rollback. The source/configuration/tests, hosting operations notes and shareable evidence under docs/hosting-evidence/2026-11-19 are published together in a separate hosting-only commit. This publication does not deploy the router or rebuild the website. Browser screenshots remain local.
