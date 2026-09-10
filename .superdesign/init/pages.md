# Page Dependency Trees

## `/` (Home Page)

Entry: `app/page.tsx`

Dependencies:

- `app/page.tsx`
  - `components/editorial-grid.tsx`
  - `app/globals.css` (loaded by the root layout)
- `app/layout.tsx`
  - `app/globals.css`

External UI dependencies:

- `gsap`
- `gsap/Flip`
- `react-dom` (`flushSync`)
