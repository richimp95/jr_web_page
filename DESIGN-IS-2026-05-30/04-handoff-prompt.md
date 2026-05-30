# Handoff Prompt — /make-plan

```
/make-plan Redesign NRGY landing page system. Current design scored 16/30 audit with critical gaps in principles #3 (aesthetic), #6 (honest), #8 (thorough), #9 (environmental).

Verdict (from audit 2026-05-30):
> The NRGY landing page has strong brand identity and a clear conversion funnel, but scores 16/30 due to four systematic gaps — fragmented design tokens (#3), unsubstantiated copy claims (#6), missing interactive states (#8), and oversized unoptimized images with no motion accessibility (#9) — that require deliberate system-level fixes, not surface tweaks.

Why redesign and not refine: Total 16/30 < 20 threshold. No load-bearing principle scored 0, but four principles scored 1 compound to prevent a refine verdict.

Preserve from current design (DO NOT touch these in this pass):
- Brand tokens: --navy #1F3042, --copper #C68662, --paper #FAF7F4, and the 5 derived tokens in :root (style.css:5–12)
- Typographic pairing: Varela Round (display) + Hanken Grotesk (body) loaded from Google Fonts (index.html:22)
- Page structure order: nav → hero → strip → products → features → why-partner → form → footer (index.html:15–290 structure)
- Scroll-reveal system: data-reveal + IntersectionObserver in main.js:81–91 — well-architected, keep
- Bilingual system: data-es/data-en + localStorage (main.js:1–38) — complete, keep
- Formspree form with 5 fields: nombre, empresa, pais, email, mensaje (index.html:221–260)
- Product lineup two-card design (index.html:114–136) — necessary for USB-C/Lightning dual line

Discard from current design:
- Fragmented spacing scale (25+ ad-hoc rem values, style.css:40–804). Caused failure on #3 aesthetic. Replace with 8-step modular scale.
- Fragmented type scale (14 font-size values, style.css:59–345). Caused failure on #3. Replace with 6 semantic levels.
- Abstract attributes strip copy: "Conveniente / Salva el día / Innovador / Confiable / Accesible" (index.html:83–101). Caused failure on #6. Replace with backed claims.
- Unhedged competitive claim "Mercado sin competencia" (index.html:197). Caused failure on #6.
- Dual primary CTA labels ("Seamos socios" index.html:44,54 vs "Conviértete en distribuidor" index.html:67,202). Caused failure on #2+#4. Unify.

Top 5 moves — implement in this priority order:

1. #8 Thorough — Add all missing interactive states.
   Evidence: no :focus rule exists anywhere in style.css.
   - Add :focus-visible ring (2px copper offset ring) to .btn, .nav__links a, .products__card, .why__card, .lang-pill__opt
   - Add form error state: red border (#C0392B) + error message <span> below each required field on invalid submit
   - Add :disabled visual state to form submit button when .btn--loading is applied
   - Deliverable: every interactive element has all applicable states documented and tested

2. #6 Honest — Replace abstract strip + hedge competitive claim.
   Evidence: index.html:83–101 (strip), index.html:197 (competitive claim).
   - Replace 5 abstract strip labels with ≤5 specific, verifiable differentiators grounded in actual product specs (e.g. "1,800 mAh — una carga completa", "USB-C + Lightning — dos modelos", "DESECHABLE — sin devoluciones", "Centroamérica — distribución local"). Must have an EN translation in data-en.
   - Change "Mercado sin competencia" → "A la fecha, sin equivalente en Centroamérica"
   - Remove "Confiable" and "Innovador" from strip or replace with product-specific claims

3. #9 Environmental — Image optimization + motion accessibility.
   Evidence: index.html:75 (hero PNG 969 KB, no lazy, no dimensions), style.css:281,307 (idle animations).
   - Convert powerbank type c transparent bg.png and powerbank  lightning transparent bg.png to WebP at ≤200 KB each
   - Add loading="lazy" to hero image OR convert hero to use the smaller WebP
   - Add explicit width and height attributes to all <img> tags (prevents CLS)
   - Add @media (prefers-reduced-motion: reduce) { .hero__product-img, .hero__scroll-chevron { animation: none; } } to style.css

4. #3 Aesthetic — Consolidate design token system.
   Evidence: style.css — 14 font sizes, 25+ spacing values, fragmented rgba expressions.
   - Define 6 type tokens in :root: --text-display (clamp hero), --text-h2, --text-h3, --text-body, --text-small, --text-label
   - Define 8 spacing tokens: --space-1 (4px) through --space-8 (64px) on 4px base, plus --space-section (5rem) for section padding
   - Define 4 opacity tiers as CSS custom properties: --alpha-faint .08, --alpha-subtle .15, --alpha-mid .40, --alpha-strong .65
   - Replace all ad-hoc rem values and rgba expressions with tokens throughout style.css

5. #2 + #4 Useful + Understandable — Unify primary CTA label.
   Evidence: index.html:44 ("Seamos socios") vs index.html:67,202 ("Conviértete en distribuidor").
   - Update nav CTA (index.html:44) and mobile nav (index.html:54) to "Conviértete en distribuidor" / data-en="Become a distributor"
   - This is the most specific, role-naming label and appears on the highest-volume CTAs

Out of scope for this redesign pass:
- Structural layout changes (section order, grid changes)
- New sections or features
- Backend / form processing
- SEO, sitemap, robots.txt
- Font self-hosting (Google Fonts stays)

Deliverables for the plan:
- Per-fix: target files, exact change, verification step
- Token migration map: old value → new token for all replaced values in style.css
- States inventory: before/after table for all 5 interactive element types
- Image conversion checklist: original size → WebP size → file path update
- Regression checklist for preserved elements (bilingual, scroll-reveal, form, brand tokens)

Anti-patterns to guard against:
- Adding new sections or functionality — this is a system pass, not a feature pass
- Restyling preserved areas (brand tokens, page structure) — those scored 2–3
- Treating token consolidation as cosmetic — it must result in fewer actual CSS rules, not just renamed variables
- Skipping the states deliverable — #8 is the highest-leverage principle because it's completely absent today
```
