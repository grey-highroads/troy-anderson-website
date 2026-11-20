# Production launch status — November 20, 2026

**Our hosting setup is complete. Matthew can add all four DNS records together.** Grey clarified that Troy has no existing website or traffic to protect, and the team has approved going live. This supersedes the previous verification-first hold, staged launch and coordinated cutover requirements. There is no requirement for Matthew to wait for an intermediate confirmation.

## Completed on our side

- Registered www.lifecoachtroy.com in Cloudflare SaaS with Cloudflare-provided certificate, TXT/delegated validation, TLS minimum 1.2 and default origin. Exact ownership TXT and delegated certificate CNAME are in [Matthew’s record sheet](MATTHEW_DNS_RECORDS.md).
- Deployed the www hostname mapping in hr-host-router, then confirmed the saved value. `cloudflare/hosting-router/host-routes.json` matches live HOST_ROUTES; the pending duplicate was removed. Existing provider/test entries, TROY service binding, guarded zone route, direct sites route and observability remain. No bare-domain SaaS entry or router mapping is needed.
- Earlier automatic approval review blocked deployment under the prior verification-first instructions. Grey subsequently clarified there is no existing website and explicitly requested completing our setup for a single DNS change. The deployment is now completed under that revised authorization; the earlier block is no longer outstanding.
- SaaS fallback sites.hr-host.com remains active. Website application release remains dfded0db8b569429d66b01877008ef64bd839ee9 / version prefix 714482cc. No website rebuild or unrelated application changes were published.
- redirect.pizza Free rule 1662239914 / hostname 885204409: lifecoachtroy.com → https://www.lifecoachtroy.com, permanent 301, path/query forwarding on, tracking off. Account-confirmed A: 89.106.200.1. Client certificate is issued after DNS detection.
- Formspree Troy project restricts to www.lifecoachtroy.com. Enabled recipient admin@lifecoachtroy.com freshly confirmed verified; Reply-to uses visitor email; CAPTCHA/Formshield retained. Free usage was 6/50 shared monthly submissions at inspection. No upgrade or Higher Roads form change. Review-origin inquiries go to Spam under the single-domain restriction; the review website remains available.
- Existing Managed Turnstile widget permits www plus its original review/local hosts; no pre-clearance or private-key change.
- All six pages passed HTTPS checks on provider/test/review addresses. Router tests and configured-host checks passed. After the mapping deployment, provider/test/review, redirect and unknown-host checks were repeated; see [evidence](hosting-evidence/2026-11-20/README.md). These are preparation checks, not actual-domain acceptance.

Clean checkout: `/private/tmp/troy-launch-20261120`, branch `codex/troy-launch-20261120`. Original dirty checkout/worktrees are preserved. Initial preparation was published as 1a21571; this follow-up records the live mapping and simpler launch. Provider setup, account usage and deployment details from the original pass remain in that commit and saved evidence. Pages and its Sanity webhook remain available; recent Pages webhook runs at ae6da9e succeeded. No client DNS, email DNS, CMS content or inquiry submissions changed, and no messages were sent.

## Matthew’s action

Use [the four-record sheet](MATTHEW_DNS_RECORDS.md) or [the concise unsent email](MATTHEW_LAUNCH_EMAIL.txt). All four may be added in one visit. Matthew handles website-record conflicts and leaves existing email and nameservers in place. No former website requires a protected switch or a staged verification exchange.

Adding the website records brings the site online. DNS and certificates may take time to activate; the bare-address certificate is requested after its new A is detected. No fixed activation time is promised. Matthew simply lets Grey know when done.

## Checks after the records are added

1. Confirm the actual public DNS, Cloudflare hostname and certificate Active, and redirect.pizza verified/SSL active. Investigate actual errors if pending. Do not disable certificate validation or claim a test-host certificate proves the client certificate.
2. Check actual www and bare addresses over HTTP/HTTPS; bare must permanently redirect to www with paths/queries preserved. Check all six routes (`/`, `/about/`, `/book/`, `/media/`, `/contact/`, `/press/`), navigation, assets/fonts, hero/media playback, About disclosures, Book PDF/retailers, phone layout and press noindex. Keep physical iPhone/WebKit acceptance and privacy/retention/client-editor handoff limitations explicit; they are not reasons for an artificial staged DNS process.
3. Confirm runtime Sanity content and no-store behavior on the real hostname; retain existing content freshness/recovery behavior and drafts. D-011 records previous refresh measurements. Do not rerun destructive secret-failure drills for launch.
4. With Grey and the mailbox owner, submit one labelled **Troy website launch delivery test** through the actual www contact page. Visitor name Grey Garner, email **grey@higher-roads.com**, inquiry Other; ask the admin mailbox owner to reply. Confirm normal Formspree Inbox, actual admin mailbox receipt, Reply-to and reply arrival at Grey’s address. No test has yet been sent. Use a fresh challenge and user completion if interactive CAPTCHA is required; do not replay accepted requests. Free’s known duplicate-entry limitation remains accepted.
5. Confirm ordinary existing email still sends and receives with Matthew/mailbox owner. Compare public mail records to the saved snapshot; unchanged MX alone is not mailbox acceptance.

## Recovery

There is no previous website to restore. If activation fails, diagnose the affected hostname/provider and coordinate only the needed web-record correction with Matthew. Retain prior web/forwarding settings as reference; never change email records to troubleshoot the website. Working workers.dev and Pages reviews stay available.

Router rollback removes only the new www mapping by restoring host-routes.json from commit 1a21571; that intentionally makes www unavailable, so use it only when addressing a routing problem. Preserve provider/test mappings, TROY, direct sites route, website Worker and ContentCache. Contact recovery can restore the review-domain restriction deliberately, then return it to www for production; keep recipient and spam controls. No key rotation, paid plan, resource retirement or account transfer is part of recovery.

## Official references checked during preparation

- [Cloudflare Workers as SaaS origin](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/advanced-settings/worker-as-origin/)
- [Delegated certificate validation](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/security/certificate-management/issue-and-validate/validate-certificates/delegated-dcv/)
- [Formspree domain restriction](https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain/)
- [redirect.pizza automatic HTTPS](https://redirect.pizza/support/automatic-https)
