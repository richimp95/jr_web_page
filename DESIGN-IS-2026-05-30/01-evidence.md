# Evidence — NRGY Landing Page Design Audit

## Structural Evidence

**Interactive elements: 27 total** (nav logo + 3 nav links + 4 lang-pill buttons + nav CTA + burger + 4 mobile-nav links + 2 hero CTAs + why CTA + 5 form fields + submit + footer logo + 3 footer links = 27)
- CTAs doing the same action (scroll to form): "Seamos socios" (index.html:44,54) + "Conviértete en distribuidor" (index.html:67, index.html:202) — 3 CTAs with 2 different labels for 1 action
- Secondary CTA "Ver productos" (index.html:68) adds choice paralysis at decision moment in hero

**Nesting depth: 6 levels** — index.html:151–160: `body > main > section.features > div.features__block--dark > div.container > div.features__block-inner > div.features__visual`

**Sections: 5** — `#inicio` (hero), `#producto` (products), `#por-que` (why), `#socios` (form), unnamed strip (no ID, index.html:81)

**Repeated affordances:**
- Same form-scroll action: 3 CTAs, 2 labels (index.html:44, 67, 202)
- Navigation links: 3 locations (desktop nav, mobile nav, footer)
- Lang-pill: 2 instances (header, footer)

**Data-reveal animated elements: 22** (index.html:63, 83–101, 111, 116, 126, 141, 146, 153, 158, 165, 170, 179, 185, 190, 195, 201, 210, 220)

**No dead code detected.** All IDs referenced in main.js are present in HTML.

---

## Visual / CSS Evidence

**Spacing scale: 25+ distinct values** (style.css:40–804) — no clean modular base; ranges from 0.2rem to 6rem with irregular steps. A modular 8px-base scale would have ~8 steps.

**Type scale: 14 distinct sizes** (style.css — 0.72rem through clamp(2.25rem, 5vw, 3.75rem)) — a landing page of this scope needs 5–6 semantic levels (display, h2, h3, body, small, label).

**Color tokens: 13 in :root** — used cleanly. However, 26 distinct color expressions actually rendered (rgba derivatives of base tokens at varying opacities). Well-founded as a system but execution produces fragmentation.

**Interactive states checklist:**
| Element | Hover | Active | Focus | Disabled | Error |
|---------|-------|--------|-------|----------|-------|
| Buttons (.btn) | ✓ css:85 | ✓ css:86 | ✗ MISSING | ✗ MISSING | — |
| Form inputs | — | — | ✓ css:665 | — | ✗ MISSING |
| Nav links | ✓ css:185 | ✓ css:186 | ✗ MISSING | — | — |
| Product cards | ✓ css:361 | — | ✗ MISSING | — | — |
| Why cards | ✓ css:537 | — | ✗ MISSING | — | — |
| Form submit (loading) | — | — | — | ✓ css:676 | — |

**Missing: :focus on all interactive elements, form error state, button :disabled state.**

**Responsive breakpoints: 2** (960px, 640px) — no intermediate 768px breakpoint for tablets.

**Idle animations: 2** — `float` 4.5s infinite (style.css:281) + `bounce-down` 0.9s infinite (style.css:307). Both run on initial load without user interaction.

**`prefers-reduced-motion`: NOT implemented** — neither in style.css nor main.js.

---

## Copy & Honesty Evidence

**Inflated claims (4 flagged):**
| Claim | Location | Issue |
|-------|----------|-------|
| "Innovador" | index.html:93 | Assertion without explanation — the fold-out connector IS the differentiator but the strip doesn't name it |
| "Confiable" | index.html:97 | No specs backing it (capacity, speed, failure rate) |
| "Salva el día" | index.html:89 | Emotional claim without context |
| "Mercado sin competencia" | index.html:197 | Factual but unhedged — if one competitor appears in Centroamérica, this becomes false |

**Dark patterns: NONE detected.** No fake scarcity, no confirmshaming, no hidden costs.

**Label→behavior: ALL match.** Every CTA, nav link, and form label matches its action (index.html:35–258).

**Bilingual coverage: COMPLETE.** Every `data-es` string has a `data-en` pair. No gaps found.

**CLAUDE.md compliance:**
- ✓ No "RECICLABLE" or recycle symbol
- ✓ No lightning bolt / battery icons
- ✓ Fonts: Varela Round + Hanken Grotesk (index.html:22)
- ✓ "DESECHABLE" used correctly (index.html:65, 182, 193, 198)
- ⚠ 3 phrases violate brand voice "never hype": Innovador (index.html:93), Confiable (index.html:97), Mercado sin competencia (index.html:197)

**CTA consistency issue:** "Seamos socios" (nav, index.html:44) and "Conviértete en distribuidor" (hero+why, index.html:67,202) point to the same action (#socios) with different labels — creates mild inconsistency in perceived primary action.

---

## Weight & Friction Evidence

| Metric | Value | File:line |
|--------|-------|-----------|
| main.js | 4.2 KB | main.js:1–109 |
| style.css | 20.1 KB | style.css:1–805 |
| index.html | 18.9 KB | index.html:1–294 |
| Hero image (eager) | 969 KB PNG | index.html:75 |
| Lightning image (lazy) | 996 KB PNG | index.html:128,159 |
| USB-C images (lazy) | 969 KB × 3 | index.html:118,147,171 |
| Logo SVGs | 2 KB | index.html:31,272 |
| Google Fonts | ~65 KB est. | index.html:20–22 |

**Critical path (initial load): ~1,075 KB** (HTML+CSS+JS+hero image+logos+fonts)
**Total page with lazy images: ~5 MB**

**Hero image (969 KB PNG) has no `loading="lazy"`** — index.html:75. This PNG is the LCP element; uncompressed PNG is 3–5× larger than equivalent WebP.

**Idle animations: 2** — float (hero product) + bounce-down (scroll chevron). Both run continuously without motion preference check.

**`prefers-reduced-motion`: NOT implemented.** Absent from style.css and main.js.

**Cookie/modal/popup notices: 0.** Clean initial load.

**Font strategy: Google Fonts + display=swap** — preconnect present (index.html:20–21). Swap prevents invisible text but causes layout shift on slow connections.

**No `width`/`height` on product images** — causes cumulative layout shift (CLS) on load.
