# Troy Anderson website launch plan

Plan revised October 12, 2026.

Grey manages the website through his existing business accounts. Troy keeps control of his domain and owns the website code and content. His team uses Sanity to edit and publish; contact inquiries arrive in their existing email inbox.

## Sanity publishing plan — October 12 decision

Troy's team will publish content after handoff. The agreed working plan is Sanity Growth with Grey as Administrator and one named person on Troy's team as Editor. Use an individual login for that publisher, not a shared team login. Choosing the person, collecting their email, and sending the invitation are deferred until the user asks to proceed.

Growth currently costs USD 15 per non-Viewer member per month. With both planned accounts, budget **USD 30/month (USD 360/year)** before tax or usage overages. With only Grey on Growth, the base would be USD 15/month until the Editor is added. Viewers are free. This is Sanity's base cost, separate from Cloudflare, contact delivery, and Grey's eventual support charge; recheck pricing and billable membership before purchase.

**Current settings, not the future plan:** October 12 read-only checks confirmed an active Free project, public `production` dataset, one member (Grey, Administrator), and Viewer website tokens. No upgrade, purchase, invitation, role change, or visibility change has been performed. Agreement on the working plan does not authorize those actions; wait for the user's implementation instruction.

The expired Growth trial explains the older private-dataset expectation: Sanity automatically downgrades unconverted trials to Free and makes private datasets public. An anonymous API check returned published Book content and all six website content types; drafts were not visible to that request. The exact transition date and a complete content confidentiality audit have not been established.

Public means people can read published stored fields directly, including fields the website does not display. It does not grant editing, publishing, or deletion rights. Draft documents remain protected from anonymous reads. Website credentials identify the website but do not prevent anonymous reads of a public dataset. Ordinary uploaded asset URLs can remain accessible even with a private dataset.

Growth is planned primarily for the Editor role, so the client can publish without full project administration. Private visibility is a separate, undecided choice included in Growth at no extra seat charge. Troy's intended biography, book information, testimonials, social links, approved photos, and publicity downloads do not inherently require private queries. Before settling visibility, review published fields and uploaded assets for confidential or embargoed material. Do not store contact inquiries or private notes in public published content. Do not assume upgrading automatically makes the existing dataset private.

Sources checked October 12, 2026: [Sanity pricing](https://www.sanity.io/pricing), [trial expiry](https://www.sanity.io/docs/platform-management/growth-plan-trial), [authentication](https://www.sanity.io/docs/content-lake/http-auth), and [data/asset visibility](https://www.sanity.io/docs/content-lake/keeping-your-data-safe).

## Contact delivery test — October 12

A separate Troy test form now works on the Cloudflare test website and sends to verified `grey+troytest@higher-roads.com`; the user confirmed receipt of a real website submission. Grey's existing Formspree account is Free, with 50 monthly submissions shared across forms. No paid plan was purchased. Troy's final recipient, retention/privacy policy, service capacity and launch acceptance are still needed. See [contact operations](CONTACT_DELIVERY.md). The existing Higher Roads form is unchanged.

## Troy and his team

1. Confirm who controls the domain registration and who can authorize the launch changes.
2. When onboarding resumes, designate the one named publisher and give Grey their email address and the inbox that should receive contact inquiries.
3. Accept the Sanity invitation if access is not already working. Use the same sign-in method each time.
4. Review the finished site and approve launch.

## Grey

1. Keep the existing GitHub repository and Sanity project. Use a dedicated Troy Worker and contact form inside the existing Cloudflare and Formspree business accounts.
2. Configure and test hosting, content publishing, and contact delivery before changing the live domain. Preserve existing email service.
3. Confirm the actual recurring service costs and agree one hosting/support charge with Troy before launch. Define the included support and the process for ending service.
4. Maintain code, content, and media backups, plus the configuration notes needed by a replacement developer. Keep a current recovery copy in a secure location accessible to Troy or his designated person.
5. Coordinate the domain cutover, verify the live site, and show the team how to edit content.

Troy does not need to create or administer separate hosting, source-code, or form-service accounts. Routine use requires only the content-editor login.

The tradeoff is ongoing dependence on Grey for infrastructure and billing. If management changes, Grey supplies the code, content, media, and setup information and helps transfer or recreate the services. That handoff can take work; it is not a one-click ownership change.
