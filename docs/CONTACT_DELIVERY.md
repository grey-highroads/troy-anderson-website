# Contact delivery and bot controls

This guide summarizes current source and the latest recorded configuration (November 20, 2026). Provider settings and mailbox delivery were not rechecked during housekeeping. [Launch status](LAUNCH_STATUS.md) owns the remaining production acceptance sequence.

## Recorded provider configuration

- Formspree project: Troy Anderson Website; form `xbgdabdr`, browser endpoint `https://formspree.io/f/xbgdabdr`.
- Enabled recipient: verified `admin@lifecoachtroy.com`. Reply-to uses the visitor email. Older Grey/test-alias destinations are historical.
- Project domain restriction: `www.lifecoachtroy.com`. Review-origin inquiries go to Spam under that restriction; don't weaken it to make a review test succeed.
- Managed Turnstile verification and Formshield are active. The widget permits www and the original review/local hosts. Its secret belongs in Formspree, never in browser output or Worker bindings.
- Grey retained Free after the November 9 replay test created a second normal Inbox entry from a successful token/request. Strict replay rejection is not established; don't describe this limitation as fixed.
- Account usage was 6/50 shared monthly submissions at the November 20 inspection. This is a dated observation, not a current quota promise. Confirm account terms/usage before capacity decisions.

## Request flow and behavior

The Worker serves no-store GET `/api/contact` with public form ID and Turnstile key/availability. The browser posts directly to Formspree's JSON endpoint; the Worker accepts no contact POST relay and stores no submissions. Missing/invalid configuration keeps sending disabled. Pages keeps delivery disabled.

`components/contact-form.tsx` provides required fields, length checks, send locking, honeypot, status/focus handling and challenge reset. Failed submissions retain entered fields. Formspree validates required name (1–100), email, inquiry (4–8), and message (1–5,000). Defaults are Speaking, Media, Book and Other; the coaching-availability note and form copy are CMS-editable.

Formspree stores submission records and sends email. Both provider records and mailbox copies need retention/deletion responsibilities. Client-side send locking prevents duplicate clicks, not replay or general server-side rate limiting. Do not restore the former relay without new end-to-end evidence; earlier relay requests were accepted but classified as spam.

## Acceptance and recovery

Provider acceptance does not prove delivery. The production labelled submission and reply test with Grey and the admin mailbox owner remains unrecorded; follow [launch status](LAUNCH_STATUS.md) for exact details. Verify normal provider Inbox, recipient receipt, Reply-to and actual reply arrival. Do not replay successful requests. Also cover invalid inputs, failures, keyboard/phone use and privacy/retention.

To pause frontend delivery, an explicitly scoped change can set `CONTACT_FORM_ID` empty and redeploy the website. Disabling the dedicated Formspree form stops provider acceptance. Neither changes the unrelated Higher Roads form. Provider configuration changes are separate from code deployment and must be recorded with evidence.

The [archived contact guide](archive/2026-11-20-before-housekeeping/docs/CONTACT_DELIVERY.md), [decision log](DECISIONS.md), and [launch evidence](hosting-evidence/2026-11-20/README.md) retain earlier setup, tests, failure diagnosis and provider references. Historical “not enabled” Turnstile and test-recipient sections are superseded by the configuration above.
