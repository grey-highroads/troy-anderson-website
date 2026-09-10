# Theme Context

## Compact token summary

### Current implementation

- Ink: `#151515`
- Paper: `#f2efe7`
- Accent: `#ec5e3d`
- Blue: `#73c7d5`
- Green: `#306f61`
- Sand: `#d9c59c`
- UI type: Arial/Helvetica
- Display type: Impact/Haettenschweiler/Arial Narrow Bold
- Corners: square
- Shadows: none except focus indication
- Desktop grid: 12 columns, 7 rows, `0.7rem` gap
- Breakpoints: `900px`, `640px`
- Motion: GSAP Flip, `0.9s`, `expo.inOut`, `0.025s` stagger

### Proposed reference-derived palette

- Pure black: `#000000`
- Blue-black: `#0e1217`
- Oxblood red: `#97231d`
- Warm red: `#aa3624`
- Vermilion: `#ba271a`
- Warm cream: `#fef8c2`
- Pale yellow: `#fcf3ae`
- Muted teal: `#285b66`
- Electric cyan: `#4dabe8`
- Soft cyan: `#55bacf`

## Raw source

### `app/globals.css`

```css
:root {
  --ink: #151515;
  --paper: #f2efe7;
  --line: rgba(21, 21, 21, 0.2);
  --accent: #ec5e3d;
  --blue: #73c7d5;
  --green: #306f61;
  --sand: #d9c59c;
}

* {
  box-sizing: border-box;
}

html {
  background: var(--paper);
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: Arial, Helvetica, sans-serif;
}

button,
a {
  color: inherit;
}

button {
  font: inherit;
}

.site-header {
  display: grid;
  grid-template-columns: 1.5fr 1fr auto;
  gap: 2rem;
  align-items: start;
  min-height: 13rem;
  padding: 1.25rem 1.5rem 2rem;
  border-top: 0.55rem solid var(--ink);
  border-bottom: 1px solid var(--line);
}

.wordmark {
  width: fit-content;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: clamp(3.9rem, 8.5vw, 9rem);
  font-weight: 900;
  letter-spacing: -0.055em;
  line-height: 0.73;
  text-decoration: none;
  text-transform: uppercase;
}

.site-header__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.3rem;
  padding-top: 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.prototype-label {
  margin: 0;
  padding: 0.45rem 0.65rem;
  border: 1px solid currentColor;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero {
  padding: 1.5rem;
}

.hero__intro {
  display: grid;
  grid-template-columns: 1fr 4fr 1.3fr;
  gap: 1.5rem;
  align-items: end;
  margin-bottom: 1.5rem;
}

.hero__intro p {
  margin: 0;
}

.eyebrow,
.hero__note {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.35;
  text-transform: uppercase;
}

.hero h1 {
  max-width: 13ch;
  margin: 0;
  font-size: clamp(2.7rem, 6vw, 6.8rem);
  letter-spacing: -0.065em;
  line-height: 0.86;
}

.hero__note {
  max-width: 28ch;
  font-weight: 400;
  letter-spacing: 0.02em;
  text-transform: none;
}

.editorial-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: repeat(7, minmax(3.4rem, 5.6vw));
  gap: 0.7rem;
  min-height: 42rem;
}

.media-tile {
  position: relative;
  overflow: hidden;
  min-width: 0;
  padding: 0;
  border: 0;
  background: var(--ink);
  color: white;
  cursor: pointer;
  isolation: isolate;
  text-align: left;
}

.media-tile::after {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.42), transparent 64%);
  content: "";
}

.media-tile:focus-visible {
  z-index: 3;
  outline: 0.28rem solid white;
  outline-offset: -0.52rem;
  box-shadow: 0 0 0 0.25rem var(--ink);
}

.media-tile__texture {
  position: absolute;
  inset: -12%;
  z-index: -2;
  background:
    radial-gradient(circle at 72% 20%, rgba(255, 255, 255, 0.33), transparent 23%),
    repeating-linear-gradient(112deg, transparent 0 1.1rem, rgba(255, 255, 255, 0.08) 1.1rem 1.18rem);
  transform: scale(1.08);
  transition: transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.media-tile:hover .media-tile__texture,
.media-tile:focus-visible .media-tile__texture,
.media-tile.is-selected .media-tile__texture {
  transform: scale(1);
}

.media-tile__copy {
  position: absolute;
  right: 1rem;
  bottom: 0.9rem;
  left: 1rem;
  display: grid;
  gap: 0.25rem;
}

.media-tile__eyebrow,
.media-tile__action,
.media-tile__index {
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.media-tile__title {
  max-width: 10ch;
  font-size: clamp(1.1rem, 2.15vw, 2.4rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.95;
}

.media-tile__index,
.media-tile__action {
  position: absolute;
  top: 0.8rem;
}

.media-tile__index {
  left: 0.9rem;
}

.media-tile__action {
  right: 0.9rem;
  padding-bottom: 0.15rem;
  border-bottom: 1px solid currentColor;
}

.tone-cream,
.tone-sand {
  color: var(--ink);
}

.tone-cream {
  background: #e9e2d2;
}

.tone-blue {
  background: var(--blue);
  color: var(--ink);
}

.tone-orange {
  background: var(--accent);
}

.tone-sand {
  background: var(--sand);
}

.tone-green {
  background: var(--green);
}

.tone-ink {
  background: var(--ink);
}

.layout-a .media-tile--1 { grid-area: 1 / 1 / 5 / 5; }
.layout-a .media-tile--2 { grid-area: 1 / 5 / 3 / 9; }
.layout-a .media-tile--3 { grid-area: 1 / 9 / 4 / 13; }
.layout-a .media-tile--4 { grid-area: 5 / 1 / 8 / 4; }
.layout-a .media-tile--5 { grid-area: 3 / 5 / 8 / 9; }
.layout-a .media-tile--6 { grid-area: 4 / 9 / 8 / 13; }
.layout-b .media-tile--1 { grid-area: 1 / 1 / 4 / 6; }
.layout-b .media-tile--2 { grid-area: 4 / 1 / 8 / 4; }
.layout-b .media-tile--3 { grid-area: 1 / 6 / 5 / 10; }
.layout-b .media-tile--4 { grid-area: 1 / 10 / 4 / 13; }
.layout-b .media-tile--5 { grid-area: 4 / 4 / 8 / 8; }
.layout-b .media-tile--6 { grid-area: 5 / 8 / 8 / 13; }

.editorial-grid.is-expanded .media-tile.is-selected { grid-area: 1 / 1 / 7 / 10; }
.editorial-grid.is-expanded .media-tile.is-dimmed { grid-column: 10 / 13; }
.editorial-grid.is-expanded .media-tile.is-dimmed:nth-of-type(2n) { grid-row: span 1; }
.editorial-grid.is-expanded .media-tile.is-dimmed:nth-of-type(2n + 1) { grid-row: span 2; }
.editorial-grid.is-expanded .media-tile__title { font-size: clamp(1rem, 1.7vw, 2rem); }
.editorial-grid.is-expanded .media-tile.is-selected .media-tile__title {
  max-width: 9ch;
  font-size: clamp(3rem, 7vw, 8rem);
}

.site-footer {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.1rem 1.5rem 1.4rem;
  border-top: 1px solid var(--line);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.site-footer p { margin: 0; }

@media (max-width: 900px) {
  .site-header { grid-template-columns: 1fr auto; min-height: 10rem; }
  .site-header__meta { display: none; }
  .hero__intro { grid-template-columns: 1fr 3fr; }
  .hero__note { grid-column: 2; }
  .editorial-grid {
    grid-template-rows: repeat(7, minmax(4rem, 8vw));
    min-height: 39rem;
  }
}

@media (max-width: 640px) {
  .site-header,
  .hero { padding-right: 0.85rem; padding-left: 0.85rem; }
  .site-header { min-height: 8rem; border-top-width: 0.4rem; }
  .wordmark { font-size: clamp(3.25rem, 18vw, 5.25rem); }
  .prototype-label { font-size: 0.58rem; }
  .hero__intro { grid-template-columns: 1fr; gap: 0.8rem; }
  .hero__note { grid-column: auto; }
  .editorial-grid,
  .editorial-grid.is-expanded {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: none;
    grid-auto-rows: 9rem;
    min-height: 0;
  }
  .editorial-grid .media-tile,
  .editorial-grid.is-expanded .media-tile.is-dimmed {
    grid-column: auto;
    grid-row: span 1;
  }
  .editorial-grid .media-tile:nth-child(3n + 1) {
    grid-column: 1 / -1;
    grid-row: span 2;
  }
  .editorial-grid.is-expanded .media-tile.is-selected {
    grid-column: 1 / -1;
    grid-row: span 3;
    order: -1;
  }
  .editorial-grid.is-expanded .media-tile.is-selected .media-tile__title {
    font-size: clamp(2.5rem, 14vw, 5rem);
  }
  .site-footer { padding-right: 0.85rem; padding-left: 0.85rem; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```
