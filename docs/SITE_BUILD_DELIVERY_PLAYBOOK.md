# 2520 Site Build Delivery Playbook

## Purpose

This is the internal operating system for turning a custom marketing or editorial website into a repeatable 2520 Consulting service. It records the sequence that worked on the Troy Anderson website, the friction we encountered, and the gates that should govern future builds.

Copy this document into a new project, replace the project-specific examples, and keep it current as the delivery system improves.

The objective is not to make every website identical. The objective is to make discovery, implementation, review, CMS setup, deployment, and handoff predictable while preserving room for a distinctive design.

## Default operating rules

1. Build the simplest system that fully solves the approved need.
2. Separate content control from design control: editors manage content; code protects layout, typography, motion, and responsive behavior.
3. Prove the riskiest assumption early. For this project, those risks were the editorial homepage interaction and the CMS publishing path.
4. Work in vertical slices. One complete page connected end to end is more valuable than many partially configured schemas.
5. Keep the default branch deployable and make every milestone produce visible evidence.
6. Let temporary 2520 infrastructure unblock development, but design every dependency for transfer to client-owned accounts.
7. Never put credentials in source control, screenshots, chat, or documentation.
8. Record decisions and current state in the repository instead of relying on conversation history.

## Productized service shape

The service can be sold and managed as eight chapters. Each chapter has a concrete output and an exit test.

| Chapter | Client-visible outcome | Internal exit test |
| --- | --- | --- |
| 1. Foundation | Project plan, routes, responsibilities, and review URL | A new builder can run the repo and understand the scope without a meeting |
| 2. Visual proof | A recognizable first viewport and one representative interaction | The creative direction works in a real browser at desktop and mobile sizes |
| 3. Application shell | Shared navigation, footer, routes, tokens, and responsive rules | Every approved route exists and the default branch deploys |
| 4. CMS proof | One real content type, editor form, published page, and image path | A non-developer can edit, publish, and see the change on the public preview |
| 5. Content system | Remaining approved schemas and page integrations | Every launch content area has a deliberate model and safe empty state |
| 6. Experience build | Final layouts, motion, media, and real content | Feature-complete review build passes responsive and accessibility checks |
| 7. Client beta | Release candidate, editorial review, forms, metadata, and analytics | Stakeholders approve content and no launch blockers remain |
| 8. Migration and launch | Client-owned production system and operating guide | Client controls every account and can perform routine updates independently |

## Standard build sequence

### 1. Convert the agreement into a delivery system

- Record the fixed scope, price, payment milestones, owners, and explicit non-goals.
- Create a project primer, roadmap, working guidelines, infrastructure policy, and decision log before implementation expands.
- Name the primary reviewer for visual decisions and the primary CMS user.
- Put later ideas in a backlog rather than quietly adding them to the current build.

**Reusable artifact set**

- `README.md`
- `docs/PROJECT_PRIMER.md`
- `docs/WORKING_GUIDELINES.md`
- `docs/ROADMAP.md`
- `docs/DECISIONS.md`
- `docs/INFRASTRUCTURE_AND_HANDOFF.md`
- `docs/SITE_BUILD_DELIVERY_PLAYBOOK.md`
- `docs/CURRENT_HANDOFF.md`

### 2. Establish a portable repository

- Create the repository immediately so work, decisions, and review history have one source of truth.
- Pin the runtime and package manager versions.
- Add one command that runs linting, type checks, and the production build.
- Commit a safe environment-variable example containing names and non-secret defaults only.
- Keep account-specific settings outside page components whenever practical.
- Add a temporary public or private review deployment early.

**Gate:** A clean clone can be installed, verified, built, and previewed from the documented commands.

### 3. Translate the reference into a small visual system

- Extract the dominant palette, typography roles, spacing rhythm, and composition rules from the approved reference.
- Establish global tokens before polishing individual sections.
- Recreate proportion and hierarchy first; refine small details afterward.
- Use the named or licensed fonts when available and document fallbacks.
- Preserve the reference's logic rather than copying accidental screenshot dimensions.

**Finding from Troy Anderson:** Header band height, baseline alignment, letter spacing, line width, and font role mattered more than adding decorative features. Iterating directly in the repository was faster and less ambiguous than maintaining a separate design-tool version.

### 4. Build the smallest coherent front-end slice

- Start with the header and first recognizable homepage composition.
- Use representative assets only when real assets are unavailable, and label them as temporary in project documentation rather than in the interface.
- Add shared navigation and footer once the shell is stable.
- Stub only the approved core routes; do not invent pages because they are common.
- Give subpages a shared structure without forcing every page into the same layout.

**Gate:** The client can navigate the deployed site and recognize the intended visual direction.

### 5. Prove one risky interaction before broad implementation

- Isolate the interaction with the highest technical or creative uncertainty.
- Test pointer, keyboard, touch, responsive behavior, and reduced motion before multiplying it across content.
- Keep content retrieval separate from motion choreography.
- Prefer a few authored destination states over randomized or overly configurable behavior.

**Finding from Troy Anderson:** CSS Grid plus GSAP Flip supports the desired authored editorial rearrangement. The proof should still be revisited with real video assets before declaring the motion system complete.

### 6. Add the CMS one vertical slice at a time

For each content type:

1. Confirm what the editor needs to control.
2. Create the narrow schema with plain-language field labels and useful descriptions.
3. Ask the intended editor to populate every field.
4. Publish the document.
5. Add the typed query and page integration.
6. Keep a sensible local fallback when a build credential is unavailable.
7. Deploy and verify the actual published values, links, and images in the browser.
8. Only then reuse the pattern for the next content type.

**Gate:** The editor can complete the workflow without developer coaching, and the public page reflects the published document.

**Finding from Troy Anderson:** Starting with the Book page exposed the full content path—plain text, Portable Text, images, repeatable retailer objects, repeatable endorsements, optional links, private dataset access, static rendering, and editor publishing—without requiring the full CMS to be modeled first.

### 7. Connect private CMS content safely

- Fetch private CMS content during the server-side or static build, never from public browser code.
- Keep the read credential in the deployment platform's encrypted secrets.
- Do not prefix private values with public environment-variable conventions.
- Fail the hosted build clearly if authenticated content cannot be fetched.
- Allow local development to render intentional fallback content when the credential is absent.
- Restrict remote image hosts and preserve intrinsic dimensions to avoid layout shifts.

**Reusable pattern from Troy Anderson**

- Public configuration: project ID, dataset, and API version.
- Private configuration: a Viewer-only Sanity token stored as `SANITY_API_READ_TOKEN` in repository Actions secrets.
- Build behavior: authenticated GROQ query during the Next.js static export.
- Local behavior: existing placeholder content when the private token is absent.

### 8. Automate publishing only after the manual path works

- First prove that a repository push produces a successful deployment with real CMS content.
- Then add a publish webhook with the narrowest document filter.
- Exclude drafts and content-release versions unless preview requirements explicitly need them.
- Give the webhook credential access to one repository and only the action required to start a build.
- Set and record an expiration date, then schedule rotation before it expires.
- Test with a revision that does not change visible content.
- Verify both the webhook delivery and the completed deployment.

**Reusable GitHub Pages pattern**

- Destination: GitHub's workflow-dispatch endpoint for the selected workflow.
- Method: `POST`.
- Body: `{"ref": "main"}`.
- Authorization header: `Bearer <fine-grained token>`.
- Token access: one repository, Actions read/write only.
- Sanity filter: the specific published document type.
- Events: create and update; drafts disabled.

### 9. Expand only after the proof is accepted

- Reuse the proven CMS/query/render/deploy pattern for each remaining approved content type.
- Add preview mode only if the client needs to review drafts on the site.
- Replace representative media before performance tuning.
- Add forms, analytics, SEO refinements, redirects, and social metadata only when their requirements are known.
- Keep launch-only infrastructure work out of early creative iterations.

### 10. Add privacy and security at the integration boundaries

- Inventory every form, analytics tool, embedded player, social widget, third-party request, cookie, and browser-storage use before adding consent UI.
- Do not add a cookie banner by default. Add consent controls only when the approved production behavior includes non-essential storage or tracking, and prevent those tools from loading before consent when required.
- Publish an accurate privacy notice before collecting real form submissions or analytics data. Describe the actual information, purposes, processors, retention, and contact path; obtain legal review when the audience or jurisdiction warrants it.
- Prefer privacy-preserving analytics, click-to-load third-party media, minimal form fields, and short documented retention over collecting data speculatively.
- Before client beta, scan repository history and deployed assets for secrets; review dependencies, third-party scripts, content-security and related response headers, form abuse controls, and least-privilege credentials.
- Treat public project identifiers differently from credentials, but verify that no private token or privileged operation appears in browser code or static output.

**Gate:** Production data flows are documented, privacy and consent behavior matches the deployed site, and the front-end security review has no unresolved release blocker.

### 11. Migrate before launch pressure begins

- Start client account creation after the technical proof is approved.
- Move the repository, CMS, hosting, analytics, and form credentials before client beta.
- Test a full deployment from the client-owned environment before DNS changes.
- Inventory DNS records before touching the domain, especially mail-related records.
- Rotate temporary credentials and reduce 2520 access after handoff.

## Quality gates for every increment

Before calling an increment complete:

- The requested behavior exists on the intended route.
- The result has been viewed in a real browser.
- Desktop and mobile layouts remain usable.
- Keyboard and reduced-motion behavior are checked when interaction is involved.
- Links and images use real values or intentional fallbacks.
- Lint, type checking, and the production build pass.
- The deployed result is verified, not merely the workflow status.
- The commit contains only related files.
- Roadmap, decisions, and handoff notes are updated when the project state changed materially.

## Efficiency practices

- Work from outcome-sized commits such as “connect Book page to Sanity,” not broad implementation batches.
- Read the existing project instructions and framework version documentation before editing.
- Inspect the smallest relevant set of files.
- Preserve unrelated working-tree changes.
- Use one representative content type to validate a pattern before creating the rest.
- Let client review happen against a URL, not screenshots alone.
- Keep questions at decision boundaries; make reversible implementation assumptions elsewhere.
- End long work sessions at a milestone with a current handoff document.

## Common failure modes and responses

| Failure mode | Response |
| --- | --- |
| Designing a large CMS before testing an editor | Build one vertical slice and conduct a real publish test first |
| Local development blocked by client account setup | Use explicitly temporary 2520 infrastructure designed for later transfer |
| Secrets accidentally treated as public configuration | Separate public identifiers from private build credentials and audit prefixes |
| Static site does not update after CMS publish | Add a filtered publish webhook only after manual deployment is proven |
| Command-line GitHub credential cannot modify workflows | Make the smallest workflow edit through an authenticated GitHub interface, then sync locally |
| Browser-controlled credential tab closes during verification | Open authentication pages as normal persistent browser tabs and require the user to paste secrets directly |
| A test risks changing visible content | Use a no-visible-change document revision and verify the public page afterward |
| A design tool and repository drift apart | Choose one implementation source of truth; for this service, prefer repo-first iteration once direction is approved |
| Roadmap says “not started” after work is live | Update milestone documents at the same boundary as the implementation |

## Credential handling checklist

- [ ] Credential has the narrowest role and resource scope available.
- [ ] Credential is pasted directly by the account owner, never sent through chat.
- [ ] Credential is stored only in an encrypted deployment secret or protected webhook configuration.
- [ ] No credential value appears in repository files, documentation, screenshots, logs, or issue text.
- [ ] Expiration date and rotation owner are documented without recording the value.
- [ ] Revocation path is known.
- [ ] A replacement can be installed without code changes.

## Metrics to capture on future builds

Track enough data to improve the service without creating administrative drag:

- Time from kickoff to first deployed visual proof.
- Time from CMS setup to first successful editor publish.
- Number of design revision rounds by section.
- Number of new dependencies and external services introduced.
- Build and deployment duration.
- Defects found after each milestone gate.
- Hours spent on account access and credential coordination.
- Time required to migrate into client-owned infrastructure.

Review these at project close and update this playbook with only the lessons that generalize.

## Engagement closeout

At launch, preserve a clean project record:

- Final scope and accepted later-items list.
- Production architecture and ownership matrix.
- Current environment-variable names and rotation dates.
- CMS operating guide for the client.
- Launch and rollback checks.
- Final deployed revision.
- Access-removal confirmation.
- A short retrospective that updates this playbook.
