# Contact delivery — Cloudflare test site

Verified October 12, 2026. This is a test-recipient setup, not approval for client launch or domain cutover.

## November 2 visible-copy update

User-approved implementation `7bbcce0` replaces the original test-processing notice with “NOTE: I am not accepting new clients for coaching at the moment.” underneath/outside the form. It remains visible independently of sending/success/error messages. Coaching was removed from default inquiry choices; Speaking, Media, Book, and Other remain. Copy is still editable through existing Contact formCopy controls. No CMS document or draft, provider validation, recipient, or delivery configuration changed.

Both build pipelines passed (Workers `41536175202`, Pages `41536175142`). Desktop/390px phone browser checks verified the exact note, old notice removal, options/selection, and no overflow. Workers delivery remains enabled after configuration loads; Pages remains disabled. No message was submitted during this copy-only verification.

## Working setup

The Cloudflare Contact page retains its existing design and fields: name, email, inquiry type, and message. `components/contact-form.tsx` supplies required-field checks, length limits, sending/success/error states, duplicate-click prevention, and a hidden `_gotcha` honeypot. Success clears the form and focuses its status message; a sending failure preserves the entered fields. There is no message persistence in browser storage.

The Worker serves a no-store GET `/api/contact` configuration response containing only the public form ID and availability. It accepts no POST submissions. The browser posts directly to Formspree's supported JSON endpoint with `Accept: application/json`. Form IDs are public identifiers, not API credentials. Missing or invalid configuration keeps sending disabled. The GitHub Pages review retains disabled delivery and does not point at the Cloudflare API.

Formspree's server enforces these rules, independently of browser validation:

| Field | Provider rule |
| --- | --- |
| `name` | Required text, 1–100 characters |
| `email` | Required valid email; consumer email providers allowed |
| `inquiry` | Required text, 4–8 characters; the default website options are Speaking, Media, Book, Other |
| `message` | Required text, 1–5,000 characters |

The recipient is fixed in Formspree's workflow; visitors do not select a recipient. No submissions are written into Sanity, Cloudflare content-cache storage, or application logs. Formspree stores submission records and emails the recipient; both provider records and inbox copies must be included in the production retention/privacy policy. The original test-processing notice was replaced with the user-approved coaching-availability note on November 2; the complete production privacy review remains open.

## Dedicated Formspree resources and actual cost

- Account: Grey's existing `grey@higher-roads.com` account, verified **Free**, not the paid Business plan.
- Project: `Troy Anderson Website`, ID `3111214264094817404`.
- Form: `Troy Contact — Test`, ID `xbgdabdr`; endpoint `https://formspree.io/f/xbgdabdr`.
- Test recipient: `grey+troytest@higher-roads.com`, verified by the user.
- Workflow and rules: <https://formspree.io/forms/xbgdabdr/workflow>.
- Submissions: <https://formspree.io/forms/xbgdabdr/submissions>.
- Project domain restriction: `troy-anderson-website.grey-4fe.workers.dev`. Update deliberately for any approved future hostname; do not remove it as a delivery workaround.
- Formshield spam filtering enabled; CAPTCHA was disabled by default and was not turned off by this work. The honeypot adds another provider-side spam signal.
- Existing Higher Roads project/form was not edited.

No subscription was purchased. Current Free allowance is **50 monthly submissions shared across the account's forms**, with a 30-day archive access limit and two linked recipient emails. Both recipient slots are now occupied. A launch recipient, capacity, retention, additional inbox capacity, and any resulting paid plan must be agreed before production. Confirm current terms in the account before quoting a launch cost; this test does not establish Troy's final service charge.

## Verification and delivery limitation

A deployed browser submission labeled “Browser-direct contact form delivery check” appeared in Formspree's normal inbox and the user confirmed receipt at the test address. The website displayed success and cleared its fields. Direct invalid submissions returned HTTP 422 for missing required fields, malformed email, and a 5,001-character message, proving provider-side validation. Desktop and 390px mobile form layout had no horizontal overflow; native required-field feedback and status focus were checked. Lint, TypeScript, Cloudflare build, and GitHub Pages static build passed.

An initial Cloudflare-to-Formspree relay was tested and removed: provider-accepted relay requests were consistently held as spam. Browser-direct delivery succeeded with spam protection and the domain restriction retained. One known test was marked Not Spam during diagnosis; no global spam protection was disabled. The exact provider classification mechanism was not established. Do not reintroduce the relay or its temporary rate-limit binding without new end-to-end evidence.

Provider acceptance alone is not proof of inbox delivery. Formspree can accept a submission and hold it as spam, and downstream mail filtering can also intervene. Check the provider inbox/spam view and recipient inbox when verifying delivery. Client-side send locking prevents duplicate clicks, but provider throttling/spam behavior governs direct submissions; there is no separate application rate limiter. A stronger bot-control decision and rate-limit/failure acceptance remain part of release QA. Network/timeout failures preserve the form and do not report success; the initial failure path was observed live.

## Release and operation

1. Confirm Troy's approved inquiry recipient and complete any email verification. The test alias is not the client handoff destination.
2. Agree account capacity, retention/deletion responsibilities, support, and billing. Do not promise free capacity beyond the shared allowance.
3. Approve and publish the production privacy notice; review actual request/storage flows and any additional bot controls.
4. Retest valid delivery, reply-to behavior, invalid inputs, spam/quota failures, and mobile/keyboard use with the final recipient and hostname.
5. Only after explicit cutover approval, update Formspree's domain restriction for the approved production hostname and repeat inbox delivery verification.

To pause delivery without changing CMS content, set `CONTACT_FORM_ID` to an empty string in the Cloudflare configuration and deploy the scoped change. To stop provider acceptance, disable this dedicated test form in Formspree. Neither action changes the existing Higher Roads form. Code deployment remains the existing Cloudflare test workflow; provider validation/workflow settings are managed separately in Formspree and must be recorded here after changes.

Sources checked October 12: [Formspree AJAX](https://help.formspree.io/hc/en-us/articles/360013470814-Submit-forms-with-JavaScript-AJAX), [honeypot filtering](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering/), [domain restriction](https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain/), and [special fields](https://help.formspree.io/articles/building-your-form/special-fields/). Account plan and backend field-rule evidence came from the signed-in dashboard and real requests.

## Managed Turnstile — prepared branch, not enabled

The codex/contact-turnstile branch uses Formspree’s native server-side Turnstile verification; it adds no mail relay or custom verification backend. The website obtains the public CONTACT_TURNSTILE_SITE_KEY from GET /api/contact and submits cf-turnstile-response directly to the existing Formspree form. Missing key, token, script failure or expired challenge keeps submission disabled. Tokens reset after every completed submission attempt (success or failure); native form validation retains the token until a request is attempted. The secret belongs only in Formspree’s CAPTCHA settings, never source/browser/Worker bindings. Existing recipient, honeypot, domain restriction and delivery are preserved.

Do not deploy this branch until the public key is set. Do not enable Formspree CAPTCHA before the token-generating frontend is available. Activation must coordinate frontend + Formspree settings; missing/invalid/replayed token rejection and a fresh-token successful submission require verification before calling this protection active. Use official test keys only in a local isolated widget preview, never on the live form. No main push or service setting changed during preparation.
