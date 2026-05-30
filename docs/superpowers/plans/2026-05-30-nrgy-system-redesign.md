# NRGY System Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the four principles that scored 1/3 in the Dieter Rams audit (thoroughness, honesty, environmental, aesthetic tokens) plus unify the primary CTA label.

**Architecture:** Pure HTML/CSS/JS static site on GitHub Pages. All changes are in `index.html`, `style.css`, and `main.js`. No build step. Verification is done by opening `http://localhost:7821/` and inspecting in DevTools. The dev server is Python's `http.server` on port 7821.

**Tech Stack:** HTML5, CSS custom properties, vanilla JS, GitHub Pages, Formspree for form submission.

---

## File Map

| File | Changes |
|------|---------|
| `index.html` | CTA label unification (Task 1), strip copy replacement (Task 2), img width/height attrs + hero lazy (Task 4), form error markup (Task 3) |
| `style.css` | :focus-visible states + form error styles + :disabled state (Task 3), prefers-reduced-motion (Task 4), token consolidation: type scale + spacing scale + opacity tiers (Task 5) |
| `main.js` | Client-side form validation with error display (Task 3) |
| `assets/products/` | WebP conversions of both transparent-bg PNGs (Task 4) |

---

## Task 1: Unify Primary CTA Label

**Goal:** "Seamos socios" (nav) and "Conviértete en distribuidor" (hero+why) both scroll to the same form. Standardize to the specific, role-naming label everywhere.

**Files:**
- Modify: `index.html:44` (desktop nav CTA)
- Modify: `index.html:54` (mobile nav CTA)

- [ ] **Step 1: Update desktop nav CTA**

In `index.html:44`, change:
```html
<a href="#socios" class="btn btn--copper nav__cta" data-es="Seamos socios" data-en="Become a partner">Seamos socios</a>
```
To:
```html
<a href="#socios" class="btn btn--copper nav__cta" data-es="Conviértete en distribuidor" data-en="Become a distributor">Conviértete en distribuidor</a>
```

- [ ] **Step 2: Update mobile nav CTA**

In `index.html:54`, change:
```html
<a href="#socios" class="btn btn--copper" data-es="Seamos socios" data-en="Become a partner">Seamos socios</a>
```
To:
```html
<a href="#socios" class="btn btn--copper" data-es="Conviértete en distribuidor" data-en="Become a distributor">Conviértete en distribuidor</a>
```

- [ ] **Step 3: Verify in browser**

Open `http://localhost:7821/`. Confirm:
- Nav CTA reads "Conviértete en distribuidor"
- Toggle to EN → reads "Become a distributor"
- Mobile: resize to 600px, open burger → CTA reads "Conviértete en distribuidor"
- All three CTA instances (nav, hero, why-section) now read identically

- [ ] **Step 4: Commit**
```bash
git add index.html
git commit -m "fix(copy): unify primary CTA to 'Conviértete en distribuidor' everywhere"
```

---

## Task 2: Replace Abstract Strip Copy + Hedge Competitive Claim

**Goal:** The 5 strip labels ("Conveniente", "Salva el día", "Innovador", "Confiable", "Accesible") are unsubstantiated. Replace with product-specific, verifiable facts. Hedge the unprotected competitive claim in the why section.

**Files:**
- Modify: `index.html:83–101` (strip section)
- Modify: `index.html:197–198` (why card 03)

- [ ] **Step 1: Replace the 5 strip items**

Replace the entire `.strip__inner` content in `index.html:83–101`:
```html
      <div class="strip__inner container">
        <div class="strip__item" data-reveal data-delay="0">
          <span class="strip__icon" aria-hidden="true">◈</span>
          <span class="strip__label" data-es="USB-C + Lightning" data-en="USB-C + Lightning">USB-C + Lightning</span>
        </div>
        <div class="strip__item" data-reveal data-delay="1">
          <span class="strip__icon" aria-hidden="true">◈</span>
          <span class="strip__label" data-es="Sin cables ni adaptadores" data-en="No cables, no adapters">Sin cables ni adaptadores</span>
        </div>
        <div class="strip__item" data-reveal data-delay="2">
          <span class="strip__icon" aria-hidden="true">◈</span>
          <span class="strip__label" data-es="DESECHABLE" data-en="DISPOSABLE">DESECHABLE</span>
        </div>
        <div class="strip__item" data-reveal data-delay="3">
          <span class="strip__icon" aria-hidden="true">◈</span>
          <span class="strip__label" data-es="Una carga completa" data-en="One full charge">Una carga completa</span>
        </div>
        <div class="strip__item" data-reveal data-delay="4">
          <span class="strip__icon" aria-hidden="true">◈</span>
          <span class="strip__label" data-es="Para Centroamérica" data-en="For Central America">Para Centroamérica</span>
        </div>
      </div>
```

- [ ] **Step 2: Hedge the competitive claim**

In `index.html` why card 03, change `data-es` and `data-en` on the `<p>` (around line 198):
```html
<p data-es="A la fecha, el conector desechable no existe en Centroamérica. NRGY llega primero — y tus clientes lo van a notar." data-en="As of today, disposable connectors don't exist in Central America. NRGY gets there first — and your customers will notice.">A la fecha, el conector desechable no existe en Centroamérica. NRGY llega primero — y tus clientes lo van a notar.</p>
```

- [ ] **Step 3: Verify in browser**

Open `http://localhost:7821/`. Confirm:
- Strip shows: "USB-C + Lightning · Sin cables ni adaptadores · DESECHABLE · Una carga completa · Para Centroamérica"
- Toggle to EN → strip updates correctly to EN labels
- Why card 03 paragraph reads "A la fecha, el conector desechable..."
- Toggle to EN → reads "As of today, disposable connectors..."

- [ ] **Step 4: Commit**
```bash
git add index.html
git commit -m "fix(copy): replace abstract strip labels with backed claims, hedge competitive copy"
```

---

## Task 3: Add All Missing Interactive States

**Goal:** Add `:focus-visible` rings, form error states, and `:disabled` button state. Currently style.css has zero `:focus` rules — this is an accessibility and thoroughness failure.

**Files:**
- Modify: `style.css` (focus rules, error styles, disabled state)
- Modify: `main.js` (client-side validation before Formspree submit)
- Modify: `index.html` (add error `<span>` elements below required fields)

### 3a — CSS: Focus-visible rings

- [ ] **Step 1: Add focus-visible system to style.css**

Add this block immediately after the `.btn:active` rule (after `style.css:86`):

```css
/* ─── Focus visible (accessibility) ───────────────────────── */
:focus-visible {
  outline: 2px solid var(--copper);
  outline-offset: 3px;
  border-radius: 4px;
}

/* Override for elements that have their own focus treatment */
.form-group input:focus-visible,
.form-group select:focus-visible,
.form-group textarea:focus-visible {
  outline: none; /* handled by border-color + box-shadow in form rules */
}
```

- [ ] **Step 2: Add :disabled state on .btn**

Add after `.btn--lg` rule in style.css:
```css
.btn:disabled,
.btn--loading {
  opacity: .5;
  pointer-events: none;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
```

(Remove the existing `.btn--loading` block at the bottom of the form section — it will be replaced by this unified rule. Search for `.btn--loading` and delete the old standalone block.)

### 3b — CSS: Form error state

- [ ] **Step 3: Add form error styles to style.css**

Add after the `.form-group textarea` rule:
```css
/* Form validation error state */
.form-group input.error,
.form-group select.error,
.form-group textarea.error {
  border-color: #C0392B;
  box-shadow: 0 0 0 3px rgba(192,57,43,.15);
}
.form-group__error {
  display: none;
  font-size: .8125rem;
  font-weight: 600;
  color: #C0392B;
  margin-top: .25rem;
}
.form-group input.error ~ .form-group__error,
.form-group select.error ~ .form-group__error,
.form-group textarea.error ~ .form-group__error {
  display: block;
}
```

### 3c — HTML: Add error span elements

- [ ] **Step 4: Add ONE error span below each required field in index.html**

After each `<input>` / `<select>` / `<textarea>`, add one span (JS will set textContent dynamically for empty vs format errors):

After `nombre` input: `<span class="form-group__error" id="err-nombre"></span>`
After `empresa` input: `<span class="form-group__error" id="err-empresa"></span>`
After `pais` select: `<span class="form-group__error" id="err-pais"></span>`
After `email` input: `<span class="form-group__error" id="err-email"></span>`
After `mensaje` textarea: `<span class="form-group__error" id="err-mensaje"></span>`

Each span goes immediately after its field, inside the same `.form-group` div.

### 3d — JS: Client-side validation

- [ ] **Step 5: Add form validation to main.js**

Replace the existing form submit handler at the bottom of `main.js` (the `document.querySelector('.partner-form')?.addEventListener` block) with:

```js
  // ── Form validation ────────────────────────────────────────
  const MSGS = {
    required: { es: 'Este campo es requerido', en: 'This field is required' },
    email:    { es: 'Ingresa un email válido',  en: 'Enter a valid email' },
  };

  const form = document.querySelector('.partner-form');
  form?.addEventListener('submit', e => {
    let valid = true;

    // Clear previous errors
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.form-group__error').forEach(el => { el.textContent = ''; });

    const setError = (field, type) => {
      field.classList.add('error');
      const span = document.getElementById('err-' + field.id);
      if (span) span.textContent = MSGS[type][lang];
      valid = false;
    };

    // Required fields
    ['nombre', 'empresa', 'pais', 'email', 'mensaje'].forEach(id => {
      const field = form.querySelector('#' + id);
      if (field && !field.value.trim()) setError(field, 'required');
    });

    // Email format (only if not already empty-errored)
    const emailField = form.querySelector('#email');
    if (emailField && emailField.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      setError(emailField, 'email');
    }

    if (!valid) {
      e.preventDefault();
      form.querySelector('.error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Loading state on valid submit
    const btn = document.getElementById('formSubmit');
    if (btn) {
      btn.disabled = true;
      btn.classList.add('btn--loading');
      btn.textContent = lang === 'en' ? 'Sending…' : 'Enviando…';
    }
  });
```

- [ ] **Step 6: Verify focus states in browser**

Open `http://localhost:7821/`. Tab through the page:
- Every button, link, card, and form field should show a 2px copper outline when focused via keyboard
- Form inputs show their existing border+shadow focus (not the global outline)
- Submit button with Tab+Enter → loading state applied

- [ ] **Step 7: Verify form error states**

Click "Enviar solicitud" without filling any fields:
- All required fields show red border + error message below
- Page scrolls to first error
- Fill a field → error clears when value is present
- Enter invalid email → format error message shown

- [ ] **Step 8: Commit**
```bash
git add index.html style.css main.js
git commit -m "feat(a11y): add focus-visible rings, form error states, and disabled button state"
```

---

## Task 4: Image Optimization + Motion Accessibility

**Goal:** Convert 969 KB PNGs to WebP (target ≤200 KB), add `loading="lazy"` to hero, add `width`/`height` to all `<img>` tags to prevent CLS, and gate all idle animations behind `prefers-reduced-motion`.

**Files:**
- Create: `assets/products/powerbank-usbc.webp` and `assets/products/powerbank-lightning.webp`
- Modify: `index.html` (src references, add loading/width/height attrs)
- Modify: `style.css` (prefers-reduced-motion block)

### 4a — WebP conversion

- [ ] **Step 1: Install cwebp (WebP conversion tool)**

```bash
sudo apt-get install -y webp 2>/dev/null || npm install -g cwebp-bin 2>/dev/null || echo "need manual install"
```

If neither works, use Node.js with the `sharp` package:
```bash
cd /home/richi/projects/jr_web_page && npm init -y && npm install sharp --save-dev
```

- [ ] **Step 2: Convert USB-C product image**

With cwebp:
```bash
cwebp -q 90 "assets/products/powerbank type c transparent bg.png" -o "assets/products/powerbank-usbc.webp"
ls -lh assets/products/powerbank-usbc.webp
```

With sharp (if cwebp unavailable):
```bash
node -e "
const sharp = require('sharp');
sharp('assets/products/powerbank type c transparent bg.png')
  .webp({ quality: 90, lossless: false })
  .toFile('assets/products/powerbank-usbc.webp')
  .then(i => console.log('USB-C WebP:', Math.round(i.size/1024), 'KB'));
"
```

Expected output: file size ≤200 KB. If still >200 KB, lower quality to 80.

- [ ] **Step 3: Convert Lightning product image**

With cwebp:
```bash
cwebp -q 90 "assets/products/powerbank  lightning transparent bg.png" -o "assets/products/powerbank-lightning.webp"
ls -lh assets/products/powerbank-lightning.webp
```

With sharp:
```bash
node -e "
const sharp = require('sharp');
sharp('assets/products/powerbank  lightning transparent bg.png')
  .webp({ quality: 90, lossless: false })
  .toFile('assets/products/powerbank-lightning.webp')
  .then(i => console.log('Lightning WebP:', Math.round(i.size/1024), 'KB'));
"
```

### 4b — Update HTML image references

- [ ] **Step 4: Update all product image references in index.html**

All product `<img>` tags currently reference `powerbank%20type%20c%20transparent%20bg.png` or `powerbank%20%20lightning%20transparent%20bg.png`. Replace with WebP versions AND add `width`/`height` AND `loading` attributes.

Both product images are 1080×1080px source (confirmed from PNG header).

**Hero image** (index.html ~line 75) — keep eager load (it's the LCP), add dimensions:
```html
<img src="assets/products/powerbank-usbc.webp" alt="NRGY — batería desechable con conector integrado" class="hero__product-img" width="1080" height="1080" />
```

**Product lineup USB-C card** (index.html ~line 118):
```html
<img src="assets/products/powerbank-usbc.webp" alt="NRGY USB-C" loading="lazy" width="1080" height="1080" />
```

**Product lineup Lightning card** (index.html ~line 128):
```html
<img src="assets/products/powerbank-lightning.webp" alt="NRGY Lightning" loading="lazy" width="1080" height="1080" />
```

**Feature block USB-C** (index.html ~line 147):
```html
<img src="assets/products/powerbank-usbc.webp" alt="NRGY USB-C — conector integrado" loading="lazy" width="1080" height="1080" />
```

**Feature block Lightning** (index.html ~line 159):
```html
<img src="assets/products/powerbank-lightning.webp" alt="NRGY Lightning — para iPhone y iPad" loading="lazy" width="1080" height="1080" />
```

**Feature block use-case** (index.html ~line 171):
```html
<img src="assets/products/powerbank-usbc.webp" alt="NRGY — energía de emergencia" loading="lazy" width="1080" height="1080" />
```

**Nav logo** (index.html ~line 31) — add dimensions:
```html
<img src="assets/logo/mark-copper-transparent.svg" alt="NRGY" width="28" height="28" />
```

**Footer logo** (index.html ~line 272) — add dimensions:
```html
<img src="assets/logo/mark-white-transparent.svg" alt="" aria-hidden="true" width="22" height="22" />
```

### 4c — Prefers-reduced-motion

- [ ] **Step 5: Add reduced-motion block to style.css**

Add at the very end of `style.css`, after the last `@media` block:
```css
/* ─── Accessibility: reduced motion ────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .hero__product-img {
    animation: none;
  }
  .hero__scroll-chevron {
    animation: none;
  }
  [data-reveal] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 6: Verify images load correctly**

Open `http://localhost:7821/`. Confirm:
- Hero product image loads (WebP, no lazy)
- Products and features images load on scroll
- No broken images
- Open DevTools → Network tab → confirm hero WebP size is ≤200 KB (vs previous 969 KB PNG)

- [ ] **Step 7: Verify reduced-motion (DevTools)**

Open DevTools → Rendering tab → "Emulate CSS media feature prefers-reduced-motion: reduce".
Confirm: hero product stops floating, scroll chevron stops bouncing, reveal animations don't apply.

- [ ] **Step 8: Commit**
```bash
git add assets/products/powerbank-usbc.webp assets/products/powerbank-lightning.webp index.html style.css
git commit -m "perf: convert product PNGs to WebP, add lazy/dimensions to imgs, gate animations with prefers-reduced-motion"
```

---

## Task 5: Consolidate Design Token System

**Goal:** Replace 14 ad-hoc font sizes with 6 semantic tokens, 25+ spacing values with an 8-step scale, and normalize rgba opacity expressions to 4 named tiers. This is a CSS refactor — no visual change should be perceptible.

**Files:**
- Modify: `style.css` — add tokens to `:root`, replace values throughout

### 5a — Define new tokens in :root

- [ ] **Step 1: Add 6 type-scale tokens, 8 spacing tokens, and 4 opacity tiers to :root**

In `style.css`, add to the `:root` block after `--t: 200ms ease;`:
```css
  /* ── Type scale (6 semantic levels) */
  --text-display: clamp(2.25rem, 5vw, 3.75rem);  /* hero h1 */
  --text-h2:      clamp(1.75rem, 3.5vw, 2.5rem); /* section headings */
  --text-h3:      clamp(1.6rem, 3vw, 2.2rem);    /* product lineup h2 */
  --text-body:    1rem;                           /* paragraphs */
  --text-small:   0.9375rem;                      /* secondary copy */
  --text-label:   0.75rem;                        /* eyebrows, tags, caps */

  /* ── Spacing scale (8px base, 8 steps) */
  --sp-1: 0.5rem;    /* 8px  — tight gaps */
  --sp-2: 1rem;      /* 16px — element spacing */
  --sp-3: 1.5rem;    /* 24px — container padding */
  --sp-4: 2rem;      /* 32px — component gaps */
  --sp-5: 3rem;      /* 48px — section sub-spacing */
  --sp-6: 4rem;      /* 64px — medium section padding */
  --sp-7: 5rem;      /* 80px — large section padding */
  --sp-8: 6rem;      /* 96px — hero/section padding */

  /* ── Opacity tiers (4 fixed steps) */
  --alpha-faint:  0.07;
  --alpha-subtle: 0.15;
  --alpha-mid:    0.40;
  --alpha-strong: 0.65;
```

### 5b — Apply type tokens

- [ ] **Step 2: Replace hero headline font-size**

In `style.css`, find `.hero__headline` and change:
```css
  font-size: clamp(2.25rem, 5vw, 3.75rem);
```
To:
```css
  font-size: var(--text-display);
```

- [ ] **Step 3: Replace section h2 font-sizes**

Find `.why__header h2` and `.form-section__left h2` (both use `clamp(1.75rem, 3.5vw, 2.5rem)`), change to:
```css
  font-size: var(--text-h2);
```

Find `.products-lineup__header h2` (uses `clamp(1.6rem, 3vw, 2.2rem)`), change to:
```css
  font-size: var(--text-h3);
```

Find `.features__text h2` (uses `clamp(1.6rem, 3vw, 2.25rem)`), change to:
```css
  font-size: var(--text-h3);
```

- [ ] **Step 4: Replace body and small text sizes**

Find every `font-size: 1rem` on paragraph text (`.hero__sub`, `.features__text p`, `.why__header p`, `.form-section__left > p`) — these are already `1rem`, confirm they don't need explicit override (they inherit from `body { font-size: 1rem }`). Where explicitly set, replace with `var(--text-body)`.

Find `font-size: .9375rem` across: `.btn`, `.form-group input/select/textarea`, `.why__card p`, `.strip__label` equivalents. Replace with `var(--text-small)`.

Find `font-size: .75rem` and `.72rem` on eyebrows (`.section-eyebrow`, `.features__tag`, `.products__card-tag`) — replace with `var(--text-label)`.

### 5c — Apply spacing tokens (priority replacements)

- [ ] **Step 5: Replace section padding values**

Find `.hero { padding: 6rem 0 4.5rem; }` → `padding: var(--sp-8) 0 var(--sp-6);`
Find `.why { padding: 6rem 0; }` → `padding: var(--sp-8) 0;`
Find `.form-section { padding: 6rem 0; }` → `padding: var(--sp-8) 0;`
Find `.features__block { padding: 5rem 0; }` → `padding: var(--sp-7) 0;`
Find `.products-lineup { padding: 5rem 0 3rem; }` → `padding: var(--sp-7) 0 var(--sp-5);`
Find `@media (max-width: 640px)` section paddings: `padding: 3rem 0` → `var(--sp-5) 0`, `padding: 4rem 0` → `var(--sp-6) 0`

- [ ] **Step 6: Replace gap and margin values**

Find `.why__cards { gap: 1.5rem; }` → `gap: var(--sp-3);`
Find `.features__block--light { gap: 4rem; }` → `gap: var(--sp-6);`
Find `.features__block-inner { gap: 4rem; }` → `gap: var(--sp-6);`
Find `.form-section__inner { gap: 5rem; }` → `gap: var(--sp-7);`
Find `.why__header { margin-bottom: 3.5rem; }` → `margin-bottom: calc(var(--sp-5) + var(--sp-1));` — or keep as `3.5rem` (acceptable deviation for one-off value).
Find `.container { padding-inline: 1.5rem; }` → `padding-inline: var(--sp-3);`

### 5d — Normalize opacity expressions

- [ ] **Step 7: Replace ad-hoc rgba opacities in style.css**

The most common patterns to fix (use Find & Replace in the file):

- `rgba(255,255,255,.07)` → `rgba(255,255,255,var(--alpha-faint))`
- `rgba(255,255,255,.09)` → `rgba(255,255,255,var(--alpha-faint))`  
- `rgba(255,255,255,.5)` or `.55` → `rgba(255,255,255,var(--alpha-mid))`
- `rgba(255,255,255,.65)` or `.6` or `.62` or `.58` → `rgba(255,255,255,var(--alpha-strong))`
- `rgba(198,134,98,.07)` or `.08` → `rgba(198,134,98,var(--alpha-faint))`
- `rgba(198,134,98,.12)` or `.15)` → `rgba(198,134,98,var(--alpha-subtle))`
- `rgba(0,0,0,.18)` → `rgba(0,0,0,var(--alpha-subtle))`
- `rgba(0,0,0,.4)` or `.35` → `rgba(0,0,0,var(--alpha-mid))`

Note: Do not replace rgba values on `drop-shadow` filters, `box-shadow`, or anywhere the specific visual calibration matters (e.g. `rgba(0,0,0,.65)` on hero drop-shadow). Those are tuned values, not system tokens.

- [ ] **Step 8: Verify no visual regression**

Open `http://localhost:7821/`. Scroll through the entire page.
- Hero, strip, products, features, why, form, footer should all look identical to before this task
- Open DevTools → Elements → inspect a `[data-reveal]` element to confirm opacity tokens are resolved correctly
- No console errors

- [ ] **Step 9: Commit**
```bash
git add style.css
git commit -m "refactor(tokens): consolidate type scale (14→6), spacing (25+→8-step), opacity (ad-hoc→4 tiers)"
```

---

## Task 6: Final QA + Deploy

- [ ] **Step 1: Full page review at 3 viewport widths**

Open `http://localhost:7821/` and check at:
- 1440px (desktop)
- 768px (tablet — new breakpoint gap, existing 960px should handle)
- 390px (mobile)

Check: spacing feels consistent, no broken layouts, images load, animations work (and stop with reduced-motion emulation).

- [ ] **Step 2: Keyboard navigation test**

Tab through the entire page from top. Confirm every interactive element receives a visible copper focus ring. Order should be: nav logo → Producto → Por qué NRGY → Socios → lang pill (ES/EN) → CTA → burger (mobile) → hero CTAs → product cards → why cards → form fields → submit.

- [ ] **Step 3: Form validation test**

- Submit empty form → all 5 fields show red border + error message
- Fill all fields correctly → submit → loading state on button, no errors
- Toggle to EN → error messages appear in English

- [ ] **Step 4: Push and verify on GitHub Pages**

```bash
git push origin main
```

Wait ~2 minutes, then open `https://richimp95.github.io/jr_web_page/` and repeat the 3-viewport check. Confirm WebP images serve correctly (not 404).

- [ ] **Step 5: Final commit if any fixes needed**
```bash
git add -A
git commit -m "fix(qa): final adjustments from production review"
git push origin main
```
