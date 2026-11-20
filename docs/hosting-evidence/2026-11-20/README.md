# Launch preparation evidence — November 20, 2026

No client DNS changed and no inquiries were submitted. Actual domain verification/certificate/routing and final live acceptance remain pending Matthew's records. Read ../../LAUNCH_STATUS.md.

- client-dns-before-launch.json: public DNS snapshot, not complete zone inventory or email-service acceptance.
- provider-http.json: successful curl HTTPS page/redirect/guard checks using ordinary DNS and normal certificate validation. Tests are provider/review/test hosts, not Troy's real addresses.
- provider-python-probe.json: initial Python probes got 403; retained as unsuccessful diagnostic evidence, superseded for page availability by curl and Chrome checks.
- screenshots/formspree-production.jpg: saved project restriction after reload.
- screenshots/turnstile-production.jpg: reopened widget shows production www plus preserved three hosts, Managed, no pre-clearance; private key stays concealed.
- screenshots/cloudflare-www-pending.jpg: actual registered www and pending ownership/certificate state, not Active.
- screenshots/media-review.jpg: current Media page on test hostname.
- github-runs.json: compact public deployment history.

All screenshot contents were inspected before publication. These contain public/domain configuration and concealed private-key controls, not secret values. Current ownership verification value is intentionally included in the Matthew record sheet because it must be placed in public DNS.
