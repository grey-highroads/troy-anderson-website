# Troy Anderson Website Design System

## Product context

This is a motion-led editorial website for author, speaker, and podcaster Troy Anderson. The homepage is a full-width composition of media, typography, book promotion, and appearances. The public experience should feel like a bold magazine spread or title sequence, while the CMS remains structured and predictable.

The design reference supplied for this pass is a collage with hard rectangular crops, oversized condensed typography, flat color fields, and no decorative interface chrome. Its palette is the authority for this color-system exploration.

## Color palette

### Structural colors

- `--color-black: #000000` - primary high-contrast field and type
- `--color-blue-black: #0e1217` - softer dark field for media panels
- `--color-cream: #fef8c2` - primary warm light field and reversed type
- `--color-yellow: #fcf3ae` - secondary warm light field

### Editorial fields

- `--color-oxblood: #97231d` - primary red field, taken from the header and book panel
- `--color-warm-red: #aa3624` - secondary red field with a warmer, more human cast
- `--color-vermilion: #ba271a` - high-energy red reserved for large display moments

### Friendly accents

- `--color-teal: #285b66` - calm interactive counterpoint to red and cream
- `--color-cyan: #4dabe8` - primary link, focus, and directional accent
- `--color-soft-cyan: #55bacf` - cyan variant for larger type or fields

### Functional aliases

- Homepage background: oxblood, extending through the hero and surrounding editorial grid
- Primary text on light: black or blue-black
- Primary text on dark/red: cream
- Focus outline: cyan with a black offset edge on light fields, cream with a black offset edge on dark fields
- Dividers: current foreground at approximately 24% opacity

Do not introduce purple, pink, gradients, muted beige UI cards, or soft drop shadows. The palette should feel printed and direct rather than digital-product polished.

## Color usage

- Oxblood is the homepage's dominant visual ground, not an isolated accent panel.
- Black anchors the header and selected media fields; cream provides primary type and high-contrast panels.
- Cyan and teal carry interactive emphasis so calls to action do not default to red.
- Teal provides a quieter media field and should appear less often than black or red.
- Red is a large-scale editorial field, not the default link, button, or focus color.
- Preserve flat, vivid complementary fields; do not mute cream, yellow, teal, or cyan with a global dark overlay.
- Pale yellow can support portrait/video fields and oversized type.
- Avoid equal distribution of every color. Compositions should have one dominant field and one or two accents.
- Contrast must remain strong; decorative text may overlap imagery only when legibility is preserved.

## Typography

- Display typography: extremely condensed, uppercase, heavy sans serif.
- Supporting italic typography: condensed or narrow sans italic, used at large scale.
- Utility typography: spaced uppercase sans serif.
- Body copy: neutral sans serif, compact and direct.
- Large text can crop at panel edges as part of the editorial composition.
- Avoid serif, script, rounded geometric, and friendly-SaaS typography.

The current prototype uses Impact/Haettenschweiler for display and Arial/Helvetica for body text. These are temporary system fallbacks until Jonathan supplies final typefaces or licenses.

## Layout and composition

- Full-width, hard-edged CSS Grid compositions.
- Square corners and little or no gap where the design calls for poster-like continuity.
- Media, type, book covers, and promotional blocks occupy the same visual system.
- Layouts are authored, not randomly generated.
- The homepage has no persistent sidebar, card metadata, or explanatory panel.
- Mobile uses its own vertical editorial sequence rather than shrinking the desktop collage.

## Motion

- GSAP Flip transitions between authored layout states.
- Selected media grows first; neighboring fields settle with a short stagger.
- Preferred easing: `expo.inOut` around 0.8-1.0 seconds.
- Internal image crops may settle slightly after their containers.
- Avoid springy UI motion, continuous shuffling, and simultaneous autoplay everywhere.
- Respect reduced-motion preferences with immediate, stable state changes.

## Components

### Site header

- Black field or cream field with strong black type.
- Spaced uppercase name treatment.
- Supporting role line may sit in an oxblood band using cream italic type.
- Menu icon may use three cyan horizontal bars on a cream square.

### Media tiles

- Flat rectangular fields with edge-to-edge imagery or video.
- Oversized display text can live behind or over imagery.
- No border radius, badges, drop shadows, or persistent metadata cards.
- Play/close affordances remain small, high-contrast, and typographic.

### Book promotion

- Oxblood or warm-red field.
- Book cover as the primary object.
- Oversized cream italic title and cyan directional accent.

## Current design-pass objective

Keep the existing prototype structure and interaction. Redesign its color system to reflect the supplied reference: black, oxblood, cream, pale yellow, teal, and cyan. Demonstrate disciplined color proportions and accessible contrast without adding new site features.
