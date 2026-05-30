# Verdict — NRGY Landing Page Design Audit

## Verdict: REDESIGN (16/30)

The NRGY landing page has strong brand identity and a clear conversion funnel, but scores 16/30 due to four systematic gaps — fragmented design tokens (#3), unsubstantiated copy claims (#6), missing interactive states (#8), and oversized unoptimized images with no motion accessibility (#9) — that require deliberate system-level fixes, not surface tweaks.

**Why redesign and not refine:** Total 16/30 < 20 threshold. No load-bearing principle scored 0, but four principles scored 1: aesthetic system fragmentation (#3), copy honesty (#6), incomplete state coverage (#8), and environmental overhead (#9) compound to prevent a refine verdict.

---

## Top 5 Leverage Moves

### 1. #8 Thorough — Add all missing interactive states
Add `:focus-visible` ring to every interactive element (`.btn`, `.nav__links a`, `.products__card`, `.why__card`, lang-pill buttons). Add form error state (red border + error message below field). Add `:disabled` on submit button when form is submitting. Evidence: style.css — no `:focus` rule exists anywhere.

### 2. #6 Honest — Replace abstract strip attributes with backed claims
Replace "Conveniente / Salva el día / Innovador / Confiable / Accesible" (index.html:83–101) with specific, verifiable differentiators tied to real product facts (e.g. capacity, connector type, form factor). Hedge "Mercado sin competencia" → "a la fecha, sin equivalente en Centroamérica" (index.html:197). Evidence: 01-evidence.md — 4 unsubstantiated claims.

### 3. #9 Environmental — Convert images to WebP, lazy-load hero, add reduced-motion
Convert both product PNGs to WebP format (~80% reduction from 969 KB). Add `loading="lazy"` to hero image (index.html:75) or serve a smaller hero crop. Add `width`/`height` attributes to all `<img>` tags (CLS fix). Implement `@media (prefers-reduced-motion: reduce)` to pause `float` and `bounce-down` animations (style.css:281,307). Evidence: 01-evidence.md — critical path 1,075 KB, motion always on.

### 4. #3 Aesthetic — Consolidate token system
Reduce 14 font-size values to 6 semantic levels (--text-display, --text-h2, --text-h3, --text-body, --text-small, --text-label). Consolidate 25+ spacing values to an 8-step modular scale ($space-1 through $space-8 on 8px base). Normalize opacity tiers (4 fixed steps: .08, .15, .40, .65) instead of ad-hoc rgba throughout style.css. Evidence: 01-evidence.md — CSS token audit.

### 5. #2 Useful + #4 Understandable — Unify primary CTA label
Standardize to one primary CTA label across all 3 instances: "Conviértete en distribuidor" (most specific and role-naming). Update nav CTA (index.html:44) and mobile nav (index.html:54) from "Seamos socios" to match. Evidence: index.html:44 vs 67,202 — same action, two labels.

---

## Preserve
- Brand tokens: Navy, Copper, Paper palette (style.css:5–12) — strong and consistent
- Typographic pairing: Varela Round + Hanken Grotesk — well-chosen
- Page structure: nav → hero → strip → products → features → why → form → footer — correct funnel order
- Scroll-reveal system: data-reveal + IntersectionObserver (main.js:81–91) — well-architected
- Bilingual system: data-es/data-en + localStorage (main.js:1–38) — complete and functional
- Formspree integration with 5-field form — correct for the use case
- Product lineup two-card design — necessary for the dual-connector line
