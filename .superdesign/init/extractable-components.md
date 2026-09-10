# Extractable Components

The current prototype has no shared layout component that warrants extraction into a reusable Superdesign component. The site header and footer are page-local, and `EditorialGrid` is a page-specific interaction rather than a general UI primitive.

## EditorialGrid

- Source: `components/editorial-grid.tsx`
- Category: basic
- Description: Homepage-specific GSAP Flip media composition.
- Extractable props: None in the current prototype.
- Hardcoded: Representative tile data, layout class names, action labels, and tile markup.

Skip component extraction for the current color-system design pass.
