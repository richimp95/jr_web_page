(() => {
  // ── Language toggle (pill) ───────────────────────────────────
  let lang = localStorage.getItem('nrgy-lang') || 'es';

  function applyLang() {
    const isEN = lang === 'en';
    document.documentElement.lang = isEN ? 'en' : 'es';

    document.querySelectorAll('[data-es]').forEach(el => {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return;
      if (el.tagName === 'BUTTON' && el.closest('.lang-pill')) return;
      el.textContent = isEN ? el.dataset.en : el.dataset.es;
    });

    document.querySelectorAll('[data-ph-es]').forEach(el => {
      el.placeholder = isEN ? el.dataset.phEn : el.dataset.phEs;
    });

    document.querySelectorAll('select option[data-es]').forEach(opt => {
      opt.textContent = isEN ? opt.dataset.en : opt.dataset.es;
    });

    // Sync all pill toggles
    document.querySelectorAll('.lang-pill').forEach(pill => {
      pill.querySelectorAll('.lang-pill__opt').forEach(btn => {
        btn.classList.toggle('lang-pill__opt--active', btn.dataset.lang === lang);
      });
    });
  }

  function setLang(newLang) {
    lang = newLang;
    localStorage.setItem('nrgy-lang', lang);
    applyLang();
  }

  document.querySelectorAll('.lang-pill__opt').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  applyLang();

  // ── Mobile nav ────────────────────────────────────────────────
  const burger = document.getElementById('navBurger');
  const mobile = document.getElementById('navMobile');

  burger?.addEventListener('click', () => {
    const open = mobile.getAttribute('aria-hidden') === 'false';
    mobile.setAttribute('aria-hidden', open ? 'true' : 'false');
    burger.setAttribute('aria-expanded', open ? 'false' : 'true');
    burger.classList.toggle('open', !open);
  });

  mobile?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobile.setAttribute('aria-hidden', 'true');
      burger?.setAttribute('aria-expanded', 'false');
      burger?.classList.remove('open');
    });
  });

  // ── Nav scroll shadow ─────────────────────────────────────────
  const nav = document.getElementById('nav');
  const scrollHint = document.querySelector('.hero__scroll-hint');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav?.classList.toggle('nav--scrolled', y > 8);
    scrollHint?.classList.toggle('hidden', y > 60);
  }, { passive: true });

  // ── Active nav section highlight ──────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  // ── Scroll reveal ─────────────────────────────────────────────
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-reveal]').forEach(el => {
    revealObserver.observe(el);
  });

  // ── Form validation ────────────────────────────────────────────
  const MSGS = {
    required: { es: 'Este campo es requerido', en: 'This field is required' },
    email:    { es: 'Ingresa un email válido',  en: 'Enter a valid email' },
  };

  const form = document.querySelector('.partner-form');
  form?.addEventListener('submit', e => {
    let valid = true;

    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.form-group__error').forEach(el => { el.textContent = ''; });

    const setError = (field, type) => {
      field.classList.add('error');
      const span = document.getElementById('err-' + field.id);
      if (span) span.textContent = MSGS[type][lang];
      valid = false;
    };

    ['nombre', 'empresa', 'pais', 'email', 'mensaje'].forEach(id => {
      const field = form.querySelector('#' + id);
      if (field && !field.value.trim()) setError(field, 'required');
    });

    const emailField = form.querySelector('#email');
    if (emailField && emailField.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      setError(emailField, 'email');
    }

    if (!valid) {
      e.preventDefault();
      form.querySelector('.error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const btn = document.getElementById('formSubmit');
    if (btn) {
      btn.disabled = true;
      btn.classList.add('btn--loading');
      btn.textContent = lang === 'en' ? 'Sending…' : 'Enviando…';
    }
  });
})();
