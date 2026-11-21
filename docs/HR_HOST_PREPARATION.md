# Hosting preparation and reference

Use [launch status](LAUNCH_STATUS.md) for the November 20 recorded setup, pending actual-domain/mailbox acceptance and recovery. [Matthew's four-record sheet](MATTHEW_DNS_RECORDS.md) is the DNS handoff. All four records can be added together; the older staged verification hold and ALIAS experiments are superseded.

## Active arrangement recorded November 20

- Cloudflare SaaS registers `www.lifecoachtroy.com`, using delegated certificate validation and the existing `sites.hr-host.com` fallback origin.
- `hr-host-router` maps www to the existing website Worker through TROY. Existing provider/test routes remain. Unknown hosts fail closed.
- redirect.pizza handles the bare address's permanent HTTPS redirect to www, preserving path/query. The bare hostname needs no SaaS entry or router mapping.
- Registrar/nameservers and existing mail remain with the client/Matthew. Do not change email records as part of website setup or recovery.

The [router README](../cloudflare/hosting-router/README.md), source, configuration and tests define the forwarding behavior and separate deployment procedure. The website workflow does not deploy this router. Check actual provider state before making operational changes; repository setup does not prove public DNS/certificate acceptance.

## Evidence and history

- [November 19 tests](hosting-evidence/2026-11-19/README.md): isolated routing/forwarding checks.
- [November 20 preparation](hosting-evidence/2026-11-20/README.md): recorded provider settings and repeated HTTP checks.
- [Full preparation history](archive/2026-11-20-before-housekeeping/docs/HR_HOST_PREPARATION.md): original rationale, certificate tests, diagnostics and abandoned approaches. Read as history, not a second launch checklist.

Test-host HTTPS is not evidence of actual client-host certificate activation. Verify actual www and bare HTTP/HTTPS, path/query forwarding and all six routes after DNS, then perform the delivery/reply and existing-email checks in launch status. No fixed DNS/certificate activation time is promised.
