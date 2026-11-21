> Historical planning/review reference. Start with [the current handoff](CURRENT_HANDOFF.md) for implemented behavior and remaining work. This document does not select new scope or authorize rerunning earlier tasks.

# November 17 typography review and approved release

User authorized a coordinated pass and explicitly held release until their go-ahead. Branch: codex/typography-balance-review. Based on published origin/main b84a45a, isolated from the original workspace's local-only history and user edits. The user subsequently approved pushing this scoped pass to main on November 17. CMS writes and client-domain cutover remain outside its scope.

## Scope

- All shared subpage h1 clamp values reduced another 20%. Desktop clamp 2.784rem/6.4vw/6.4rem; phone clamp 2.4rem/12.48vw/3.68rem.
- Homepage display headings (Meet Troy, testimonials, active book promotion) reduced 20% as display roles despite their h2 semantics. Semantic heading levels remain unchanged.
- Shared interior section headings use clamp 2.55rem/4.9vw/5.525rem, with a phone scale of 2rem/8.5vw/3rem. This is about 15% smaller for ordinary section headings and about 22% smaller for the former larger Media headings at 1280px. Media h3 item titles use a lower scale with a phone minimum 1.6rem.
- Desktop hero subheader text reduced 10%; compact phone intro/body/label text keeps its readable size. Book promotion availability reduced 10%, with heading-group padding/minheight adjusted to retain intentional overlap. The preserved inactive announcement alternative remains unchanged.
- Media and Contact receive explicit shell variants. At>900px their h1 max-width restriction is removed, allowing the published short titles to fit one line. No nowrap rule forces long CMS copy to overflow. Natural narrow-screen wrapping remains.
- Interior opening padding/gap are unified and shortened. Masthead SVG/artwork, body typography, CMS copy/data, video pool/geometry/rate/close swaps, carousel timing and Formspree configuration are unchanged.

## Actual local evidence

At 1280x800, Media and Contact titles are 81.92px (prior 102.4px), section headings 62.72px, item headings 40.96px. Both openings are 153.49px tall rather than 300.53px. The next section begins at 343.59px rather than 490.63px: about 147px earlier. The masthead remains 190.10px tall.

All six pages were checked at 1440, 1024, 901, 768, 390 and 320px widths (36 actual browser views), plus 1280px baseline/final comparisons. No horizontal page overflow or heading clipping was observed. Media/Contact are one line at all tested desktop widths and wrap naturally at 768/390/320. Media h1>h2>h3 size ordering held across widths. At 390px this is 48.672/33.15/25.6px; at 320px 39.936/32/25.6px. Book's longer heading remained readable. Active homepage book overlap stayed positive across all tested sizes (about7.74px at 1280 and 1.91px at 320). Homepage smoke check showed nine preview videos mounted after hydration. Browser checks are desktop Chrome at responsive viewport sizes, not physical-device testing.

Local preview uses published CMS reads without writing content. Contact delivery is intentionally unavailable in the ordinary Next.js local preview; this is not a change to the live contact integration. No test message was sent. The final screenshot captures used loaded images; early navigation screenshots were refreshed where needed.

Checks passed: targeted ESLint; website TypeScript; Next.js webpack production/static build; native Worker build/packaging and Worker TypeScript; diff whitespace. Initial website typecheck lacked the isolated checkout's Studio dependency link; after linking existing unchanged dependencies, the production build and final typecheck passed. Worker build reports absent runtime secrets during packaging only; no secret values were copied or deployed. After the Worker build, Next typegen refreshed generated route declarations before the final website typecheck passed. No dependencies were installed or changed.

Preview: <http://localhost:3020/media/> and <http://localhost:3020/contact/>. Local server is left running for review. Screenshot/measurement evidence is in the original workspace's ignored outputs/typography-review-20261117 directory. Review checkout: /Users/greygarner/Documents/Codex/worktrees/troy-typography-review. It was moved outside the main source tree to avoid its files being picked up by the original project's TypeScript glob. Browser viewport override was reset.

Release status: **Approved for main on November 17.** Publish this isolated branch's scoped diff and verify both review-site workflows; never push the original local main wholesale. Existing style guide is unchanged; its social type suggestions are not website vw specifications.
