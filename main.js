(() => {
  // ── Language toggle ──────────────────────────────────────
  let lang = localStorage.getItem('nrgy-lang') || 'es';

  function applyLang() {
    const isEN = lang === 'en';
    document.documentElement.lang = isEN ? 'en' : 'es';

    document.querySelectorAll('[data-es]').forEach(el => {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return;
      el.textContent = isEN ? el.dataset.en : el.dataset.es;
    });

    document.querySelectorAll('[data-ph-es]').forEach(el => {
      el.placeholder = isEN ? el.dataset.phEn : el.dataset.phEs;
    });

    // select first option placeholder
    document.querySelectorAll('select option[data-es]').forEach(opt => {
      opt.textContent = isEN ? opt.dataset.en : opt.dataset.es;
    });

    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.textContent = isEN ? 'ES' : 'EN';
      btn.setAttribute('aria-label', isEN ? 'Switch to Spanish' : 'Cambiar a inglés');
    });
  }

  function toggleLang() {
    lang = lang === 'es' ? 'en' : 'es';
    localStorage.setItem('nrgy-lang', lang);
    applyLang();
  }

  document.getElementById('langToggle')?.addEventListener('click', toggleLang);
  document.getElementById('langToggleFooter')?.addEventListener('click', toggleLang);

  applyLang();

  // ── Mobile nav ───────────────────────────────────────────
  const burger = document.getElementById('navBurger');
  const mobile = document.getElementById('navMobile');

  burger?.addEventListener('click', () => {
    const open = mobile.getAttribute('aria-hidden') === 'false';
    mobile.setAttribute('aria-hidden', open ? 'true' : 'false');
    burger.setAttribute('aria-expanded', open ? 'false' : 'true');
  });

  // close mobile nav on link click
  mobile?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobile.setAttribute('aria-hidden', 'true');
      burger?.setAttribute('aria-expanded', 'false');
    });
  });

  // ── Nav scroll shadow ────────────────────────────────────
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav?.classList.toggle('nav--scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();
