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
- Give the client ownership of code/content and independent content editing, with Grey managing infrastructure.

## Homepage experience

The homepage is a full-width editorial composition rather than a gallery with a sidebar.

- Fourteen short muted loops fill a viewport-contained grid with intentional `cover` cropping anchored center/top. Selected full videos retain their proportions with `contain` (October 16 correction; see current handoff).
- Typography, book promotion, appearances, quotes, and similar blocks may share the same visual field.
- All available hero previews loop together without hover, per the October 7 creative direction (D-012); the grid itself only moves on selection/close.
- Selecting a clip expands it into the primary viewing position.
- GSAP Flip moves the surrounding composition into another approved arrangement.
- Closing a clip may settle the page into a different authored layout.
- The content is the interface: no persistent clip labels, metadata cards, or explanatory panel.

Jonathan should define a small set of strong destination layouts. The implementation animates between those layouts; it does not generate random compositions.

## Mobile experience

Mobile should use its own editorial sequence. It may alternate full-width and paired clips with typography and promotional blocks between them. Tap-to-play behavior must be clear, and reduced-motion preferences must be respected.

## Content model

The implemented CMS types are `homepage`, `book`, `about`, `contact`, `siteSettings`, `mediaPage`, and `press`. Homepage includes Meet Troy and testimonials. Media features YouTube links and podcast appearances. The restored photo downloads live on an unlinked, noindex Press page; that page is not access-controlled. Hero clips and the homepage book promotion remain code-managed.

Clip CMS controls and Appearances require approved requirements before modeling; a separate Testimonials route/type is not approved. Editors control structured content and supported ordering, images, and links. Layout, typography, responsive rules, and motion remain in code.

## Technical direction

| Area | Direction |
| --- | --- |
| Front end | Next.js with TypeScript |
| Layout | CSS Grid |
| Motion | GSAP with Flip |
| Preview media | Optimized native MP4/WebM loops |
| Primary site video | Clean playback from an approved managed video host; Cloudflare Stream is the leading candidate |
| External media | YouTube remains a social-channel destination, not the primary embedded video source |
| CMS | Sanity |
| Hosting | Temporary static GitHub Pages; production Cloudflare Workers runtime refresh required by D-011, not implemented |
| Source control | GitHub |
| Email | Existing provider remains unchanged |

## Definition of success

The project is successful when:

- The homepage feels intentional, distinctive, and responsive.
- Clip interactions are smooth without dominating the content.
- Core pages have stable, shareable URLs.
- Andrew can complete common content updates without developer help.
- Performance, keyboard access, reduced motion, and basic SEO are verified.
- The client owns code/content and controls the domain; Grey manages production with a documented recovery and transition path.
- Jonathan can finish creative delivery; Grey provides ongoing managed operation and an orderly transition if service ends.

## Explicit non-goals

- A general-purpose page builder
- A custom-built CMS
- Random or constantly moving grid behavior
- Clip cards with persistent titles and metadata
- Replacing the client's email provider
- Large-scale video production or editing
- Unapproved new features added during implementation
- Ongoing content entry or post-launch design work unless separately agreed
