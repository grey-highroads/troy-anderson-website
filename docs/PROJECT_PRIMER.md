# Project Primer

## What we are building

The Troy Anderson website is a custom editorial site supporting Troy's work as an author, speaker, and podcaster. It should present his media presence with energy while giving the client team a calm, structured way to manage content after launch.

This is not a generic video gallery or a flexible page-builder project. The public experience should feel designed; the administrative experience should feel predictable.

## Primary goals

- Make Troy's video and media content the focus of the homepage.
- Translate Jonathan's visual direction into deliberate motion rather than generic card animation.
- Give Andrew and the client team straightforward content-editing workflows.
- Support books, appearances, media, testimonials, biography, and contact information.
- Establish durable routes that can support publicity and future campaigns.
- Hand off a site that the client owns and can operate without routine developer assistance.

## Homepage experience

The homepage is a full-width editorial composition rather than a gallery with a sidebar.

- Short, muted video loops appear inside deliberately sized and cropped tiles.
- Typography, book promotion, appearances, quotes, and similar blocks may share the same visual field.
- Hover or focus can activate a preview without making the whole page move constantly.
- Selecting a clip expands it into the primary viewing position.
- GSAP Flip moves the surrounding composition into another approved arrangement.
- Closing a clip may settle the page into a different authored layout.
- The content is the interface: no persistent clip labels, metadata cards, or explanatory panel.

Jonathan should define a small set of strong destination layouts. The implementation animates between those layouts; it does not generate random compositions.

## Mobile experience

Mobile should use its own editorial sequence. It may alternate full-width and paired clips with typography and promotional blocks between them. Tap-to-play behavior must be clear, and reduced-motion preferences must be respected.

## Content model

The CMS should expose known content types instead of unrestricted page editing:

- Site settings
- Homepage content
- Clips
- Books
- Appearances
- Media items
- Testimonials
- About content
- Contact information

Editors should control content, ordering, visibility, links, images, and media. Layout, typography, responsive behavior, and motion remain in the codebase.

## Technical direction

| Area | Direction |
| --- | --- |
| Front end | Next.js with TypeScript |
| Layout | CSS Grid |
| Motion | GSAP with Flip |
| Preview media | Optimized native MP4/WebM loops |
| Full media | Existing YouTube, Vimeo, podcast, or approved native sources |
| CMS | Sanity |
| Hosting | Cloudflare |
| Source control | GitHub |
| Email | Existing provider remains unchanged |

## Definition of success

The project is successful when:

- The homepage feels intentional, distinctive, and responsive.
- Clip interactions are smooth without dominating the content.
- Core pages have stable, shareable URLs.
- Andrew can complete common content updates without developer help.
- Performance, keyboard access, reduced motion, and basic SEO are verified.
- The client owns the production accounts, code, deployment, and documentation.
- 2520 Consulting and Jonathan can leave the project cleanly after handoff.

## Explicit non-goals

- A general-purpose page builder
- A custom-built CMS
- Random or constantly moving grid behavior
- Clip cards with persistent titles and metadata
- Replacing the client's email provider
- Large-scale video production or editing
- Unapproved new features added during implementation
- Ongoing content entry or post-launch design work unless separately agreed

