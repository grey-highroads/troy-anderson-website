# Decision Log

This file records decisions that affect architecture, scope, ownership, or the client workflow. Update a decision rather than relying on chat history.

## D-001: Custom front end with a structured CMS

**Status:** Accepted

Use a custom Next.js front end with Sanity rather than a general-purpose visual site builder.

**Reason:** The homepage requires precise editorial motion, while the long-term editor primarily needs safe content updates rather than layout control.

## D-002: Real public routes

**Status:** Accepted

Use stable routes for About, Books, Appearances, Media, Testimonials, and Contact, even if transitions make the site feel continuous.

**Reason:** Permanent URLs support publicity, sharing, search, campaigns, and future expansion.

## D-003: Authored homepage compositions

**Status:** Accepted

Use CSS Grid for a small set of layouts designed by Jonathan. Use GSAP Flip and GSAP choreography to move between those states.

**Reason:** Deliberate destination layouts preserve the visual direction better than random shuffling or a generic masonry system.

## D-004: Content without explanatory interface

**Status:** Accepted

The homepage will be full width with no persistent sidebar, clip cards, metadata panel, or labeling layer.

**Reason:** The clips and composition are the experience. Additional interface would compete with that idea.

## D-005: Structured editing rather than page building

**Status:** Accepted

CMS users manage known content types, ordering, visibility, links, and media. They do not edit layout or motion.

**Reason:** This provides a simple handoff while protecting the approved design.

## D-006: Temporary development infrastructure

**Status:** Accepted

2520 Consulting may use existing GitHub, Cloudflare, and Sanity access for development and staging. The client will own production infrastructure before launch.

**Reason:** Work can begin without waiting for account setup, while the handoff remains clean and the client avoids long-term dependency on 2520.

## D-007: Scope restraint

**Status:** Accepted

Default to the simplest solution that meets the approved requirement. New features and infrastructure require an explicit decision.

**Reason:** The project should avoid overengineering, scope creep, and feature creep.

## D-008: Authenticated build-time CMS publishing

**Status:** Accepted

Fetch the private Sanity production dataset during the static site build using a Viewer-only deployment secret. Keep intentional fallback content for local builds without the token. Trigger the temporary GitHub Pages build with a narrowly filtered Sanity webhook after published content changes.

**Reason:** The browser never receives the private credential, local development remains unblocked, and an editor can publish content without asking a developer to redeploy. The pattern remains portable when the production deployment moves to the client's Cloudflare account.

## New decision template

### D-XXX: Short title

**Status:** Proposed / Accepted / Replaced

State the decision.

**Reason:** Explain the relevant tradeoff in a few sentences.
