# Scorecard — NRGY Landing Page Design Audit
**Date:** 2026-05-30 | **Max:** 30 | **Total:** 16

---

## 1. Good design is innovative — Score: 2/3
**Evidence:** The product (fold-out connector on a disposable battery) is genuinely novel. The site pattern (hero + features + form) is conventional, but the bilingual localStorage implementation for a CA market is a thoughtful adaptation of a standard pattern.
**Justification:** Refreshes an existing landing page pattern with market-specific improvements; does not wholesale copy a competitor but introduces no new interaction paradigm.

## 2. Good design is useful — Score: 2/3
**Evidence:** Primary task (become a distributor → fill form) completes in 2 clicks. However, 3 CTAs for 1 action with 2 different labels ("Seamos socios" index.html:44 vs "Conviértete en distribuidor" index.html:67,202) creates adjacent choice pressure; secondary "Ver productos" CTA competes at the moment of maximum conversion intent.
**Justification:** Primary task completes but adjacent surface (duplicate-label CTAs) adds unnecessary decision cost.

## 3. Good design is aesthetic — Score: 1/3
**Evidence:** 14 distinct font-size values (style.css:59–345) for a page needing 5–6 levels; 25+ spacing values with no modular base; 26 color expressions vs 8 brand tokens (style.css:1–26 vs actual usage). Visual system is recognizable but not tight.
**Justification:** 3–5 systematic inconsistencies in the design token layer (fragmented type scale, non-modular spacing, exploded color expressions) put this below the ≤2 inconsistencies threshold.

## 4. Good design is understandable — Score: 2/3
**Evidence:** Navigation labels are clear; form fields are self-labeling; product lineup explicitly names "NRGY USB-C" and "NRGY Lightning." One control needs interpretation: "Seamos socios" (index.html:44) as a nav CTA uses relational language that doesn't telegraph "click here to fill a form."
**Justification:** 1 control requires contextual inference; all other primary actions are correctly named.

## 5. Good design is unobtrusive — Score: 2/3
**Evidence:** Nav, sections, and chrome recede; the product is the visual figure. 2 idle animations (float 4.5s, bounce-down 0.9s, style.css:281,307) run perpetually; radial-gradient glows on hero and why section (style.css:248,493) are decorative. Chrome is quiet but present.
**Justification:** UI chrome is visible but not dominant; 2 decorative elements (idle animations + glow) slightly elevate noise above ground.

## 6. Good design is honest — Score: 1/3
**Evidence:** 4 unsubstantiated claims in the attributes strip and why section: "Innovador" (index.html:93), "Confiable" (index.html:97), "Salva el día" (index.html:89), "Mercado sin competencia" (index.html:197 — unhedged competitive claim). No dark patterns found. All UI behaviors match their labels.
**Justification:** 4 inflations exceeds the ≤1 threshold for score 2; none are deceptive (no score 0) but the brand voice rule "never hype" is systematically violated.

## 7. Good design is long-lasting — Score: 2/3
**Evidence:** Navy + copper + Varela Round + Hanken Grotesk is a durable, non-trend-driven palette. Radial glow / aura effects (style.css:248, 493) are characteristic of 2024–2026 UI trends and will date. No skeuomorphism, no heavy drop shadows, no glassmorphism panels.
**Justification:** 1 dated marker (radial glow trend); overall visual language is stable and non-fashion-dependent.

## 8. Good design is thorough down to the last detail — Score: 1/3
**Evidence:** Missing :focus styles on `.btn`, `.nav__links a`, `.products__card`, `.why__card` (no rule in style.css). Missing form error state (only HTML5 `required` attribute; no visual feedback on invalid submission). Missing `:disabled` on buttons. `prefers-reduced-motion` absent from both style.css and main.js.
**Justification:** 3 states missing (focus, error, disabled) = score 1 by the 2–3 states missing anchor.

## 9. Good design is environmentally friendly — Score: 1/3
**Evidence:** Hero PNG 969 KB eager-loaded without `loading="lazy"` (index.html:75); no `width`/`height` on images causes layout shift. Total critical path ~1,075 KB. 2 idle animations run continuously (style.css:281,307). `prefers-reduced-motion` not implemented. No dark mode support. Google Fonts external dependency.
**Justification:** Critical path 500 KB–2 MB range + motion always on = score 1 by rubric anchor.

## 10. Good design is as little design as possible — Score: 2/3
**Evidence:** Overall structure is lean for a 7-section marketing page. 2 removable decorative elements: (1) attributes strip ("Conveniente, Salva el día, Innovador, Confiable, Accesible" — all abstract, none task-serving) at index.html:81–104; (2) copper radial glows (style.css:248,493) — ambient decoration not earned by content.
**Justification:** ≤2 clearly removable elements; remaining structure earns its place in the conversion funnel.

---

## Summary

| # | Principle | Score |
|---|-----------|-------|
| 1 | Innovative | 2 |
| 2 | Useful | 2 |
| 3 | Aesthetic | 1 |
| 4 | Understandable | 2 |
| 5 | Unobtrusive | 2 |
| 6 | Honest | 1 |
| 7 | Long-lasting | 2 |
| 8 | Thorough | 1 |
| 9 | Environmental | 1 |
| 10 | As little design as possible | 2 |
| **TOTAL** | | **16 / 30** |
