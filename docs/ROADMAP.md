# Roadmap

The roadmap is organized around evidence-producing milestones. Dates can be added once design inputs, content readiness, and stakeholder availability are confirmed.

## Progress overview

| Phase | Chapter | Status | Milestone |
| --- | --- | --- | --- |
| 0 | Documentation and setup | Complete | Repository is ready for implementation |
| 1 | Inputs and content model | In progress | Build requirements are agreed |
| 2 | Technical proof | In progress | Motion and CMS approaches are approved |
| 3 | Application foundation | Not started | Core site and CMS architecture work together |
| 4 | Homepage experience | Not started | Approved editorial compositions work responsively |
| 5 | Content routes | Not started | Core public site is feature-complete |
| 6 | Content and integrations | Not started | Real content and external services work end to end |
| 7 | QA and client beta | Not started | Release candidate is approved |
| 8 | Migration, launch, and handoff | Not started | Client owns and operates production |

## Phase 0: Documentation and setup

- [x] Establish project primer and working principles.
- [x] Record initial architecture and ownership decisions.
- [x] Define phased roadmap and milestone criteria.
- [x] Initialize the application and development tooling.
- [x] Add a safe environment-variable template with no secrets.
- [ ] Establish staging deployment in temporary 2520 infrastructure.

**Milestone:** A new contributor can understand the project, run the application once it exists, and find the current decisions without relying on chat history.

## Phase 1: Inputs and content model

- [ ] Collect Jonathan's approved compositions, type choices, breakpoints, and motion references.
- [ ] Inventory available clips, preview assets, books, appearances, testimonials, biography, and contact content.
- [ ] Confirm which routes ship at launch and which remain hidden.
- [ ] Define CMS fields, validation, ordering, and publishing behavior.
- [ ] Agree on representative content for prototype testing.

**Milestone:** Stakeholders approve the launch content model and the inputs needed for the technical proof are available.

## Phase 2: Technical proof

- [x] Build the header and first homepage composition with representative tiles.
- [x] Prototype tile expansion and layout changes with GSAP Flip.
- [ ] Replace representative tiles with approved sample clips.
- [ ] Test desktop, mobile, touch, keyboard, and reduced-motion behavior.
- [ ] Create a small Sanity Studio with Homepage, Clip, and Appearance schemas.
- [ ] Let Andrew perform common editing tasks without coaching.
- [ ] Record prototype decisions and unresolved risks.

**Milestone:** Jonathan approves the motion direction and Andrew confirms the CMS workflow is understandable.

## Phase 3: Application foundation

- [ ] Establish application structure, routes, shared layout, and environment configuration.
- [ ] Connect typed Sanity queries and preview behavior.
- [ ] Create shared typography, spacing, color, and media rules from the approved design.
- [ ] Add global navigation, metadata, error handling, and baseline accessibility.
- [ ] Establish staging checks and deployment documentation.

**Milestone:** The application, CMS, and staging deployment work together using representative content.

## Phase 4: Homepage experience

- [ ] Implement the approved desktop compositions.
- [ ] Implement authored tablet and mobile compositions.
- [ ] Complete preview playback and full-media expansion.
- [ ] Add book, appearance, quote, or promotional blocks approved for the homepage.
- [ ] Tune focus behavior, reduced motion, loading, and recovery states.
- [ ] Validate performance with realistic media.

**Milestone:** The homepage is visually approved and production-ready apart from final content.

## Phase 5: Content routes

- [ ] Build About.
- [ ] Build Books.
- [ ] Build Appearances.
- [ ] Build Media or keep it unpublished according to launch scope.
- [ ] Build Testimonials.
- [ ] Build Contact.
- [ ] Verify navigation, shareable URLs, metadata, and empty states.

**Milestone:** All approved launch routes are responsive, accessible, and connected to the CMS.

## Phase 6: Content and integrations

- [ ] Load and review the agreed initial content set.
- [ ] Prepare approved preview clips and poster images.
- [ ] Connect contact forms to the client-approved delivery service.
- [ ] Configure analytics and search metadata if approved.
- [ ] Confirm the existing email service and DNS records will remain intact.
- [ ] Complete an editorial review with Andrew.

**Milestone:** Real content, forms, media, and approved integrations work end to end in staging.

## Phase 7: QA and client beta

- [ ] Run browser and device testing.
- [ ] Verify keyboard navigation, focus management, contrast, and reduced motion.
- [ ] Check performance, visual stability, media loading, and error states.
- [ ] Validate redirects, metadata, forms, and unpublished content behavior.
- [ ] Resolve release-blocking defects.
- [ ] Obtain stakeholder approval for the release candidate.

**Milestone:** The release candidate is approved and no known launch blockers remain.

## Phase 8: Migration, launch, and handoff

- [ ] Establish client-owned GitHub, Cloudflare, Sanity, analytics, and form-service access.
- [ ] Transfer the repository or create the client-owned production source of truth.
- [ ] Create and verify the production deployment in the client's Cloudflare account.
- [ ] Transfer or migrate the approved Sanity configuration and production content.
- [ ] Configure production secrets and client billing.
- [ ] Validate DNS changes without disturbing existing email records.
- [ ] Launch and complete smoke testing.
- [ ] Train the client team and deliver operating documentation.
- [ ] Remove or downgrade 2520 and Jonathan access as agreed.
- [ ] Archive temporary infrastructure after the retention period.

**Milestone:** The client owns the functioning production system and can perform routine content updates without developer assistance.

## Later ideas

Ideas outside the approved build belong here until separately prioritized:

- Additional campaign landing pages
- Direct long-form video hosting
- Advanced search or media filtering
- New homepage composition families
- Expanded analytics or marketing automation
