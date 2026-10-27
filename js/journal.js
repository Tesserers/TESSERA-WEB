/* ══════════════════════════════════════════════════
   JOURNAL · newsletter y entradas
   Fuente de datos:
     1. Supabase (si js/journal-config.js define supabaseUrl y anonKey)
     2. content/journal.json (por defecto)
   ══════════════════════════════════════════════════ */
(function () {
  const cfg = window.TESSERA_JOURNAL || {};
  const section = document.getElementById('journal');
  if (!section) return;

  const UI = {
    es: {
      label: 'Journal',
      title: 'Ideas para decidir <strong>con criterio.</strong>',
      intro: 'Finanzas, capital humano y operaciones corporativas contadas sin rodeos. Una vez al mes, en tu correo.',
      all: 'Todo', read: 'Leer', featured: 'Destacado', empty: 'Todavía no hay entradas publicadas.',
      subTitle: 'Suscríbete al Journal',
      subText: 'Un resumen al mes. Sin spam y puedes darte de baja cuando quieras.',
      subPlaceholder: 'tu@empresa.com', subButton: 'Suscribirme',
      subOk: 'Hecho. Te escribiremos pronto.', subBad: 'Revisa el correo, no parece válido.',
      subErr: 'No hemos podido suscribirte ahora mismo. Inténtalo más tarde.',
      subOff: 'Las suscripciones se activarán muy pronto.'
    },
    en: {
      label: 'Journal',
      title: 'Ideas to decide <strong>with judgement.</strong>',
      intro: 'Finance, human capital and corporate deals, no fluff. Once a month, in your inbox.',
      all: 'All', read: 'Read', featured: 'Featured', empty: 'No posts published yet.',
      subTitle: 'Subscribe to the Journal',
      subText: 'One digest a month. No spam, unsubscribe any time.',
      subPlaceholder: 'you@company.com', subButton: 'Subscribe',
      subOk: 'Done. We will be in touch soon.', subBad: 'Please check the email address.',
      subErr: 'We could not subscribe you right now. Please try again later.',
      subOff: 'Subscriptions will open very soon.'
    }
  };

  const $ = (id) => document.getElementById(id);
  const filtersEl = $('journalFilters');
  const featureEl = $('journalFeature');
  const gridEl = $('journalGrid');
  const emptyEl = $('journalEmpty');
  const reader = $('journalReader');
  let posts = [];
  let activeCat = null;
  let lang = document.documentElement.lang === 'en' ? 'en' : 'es';

  const t = (k) => UI[lang][k];

  /* Texto de una entrada: acepta "title" o "title_en" para la versión inglesa */
  const field = (p, k) => (lang === 'en' && p[k + '_en']) ? p[k + '_en'] : p[k];

  function fmtDate(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return '';
    return d.toLocaleDateString(lang === 'en' ? 'en-GB' : 'es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  /* Saneado mínimo del cuerpo (lo escribe el equipo, pero no se fía) */
  const ALLOWED = new Set(['P', 'BR', 'STRONG', 'EM', 'B', 'I', 'A', 'UL', 'OL', 'LI', 'H2', 'H3', 'H4', 'BLOCKQUOTE', 'IMG']);
  function sanitize(html) {
    const doc = new DOMParser().parseFromString(html || '', 'text/html');
    (function walk(node) {
      [...node.children].forEach((el) => {
        if (!ALLOWED.has(el.tagName)) { el.replaceWith(...el.childNodes); return; }
        [...el.attributes].forEach((a) => {
          const keep = (el.tagName === 'A' && a.name === 'href') || (el.tagName === 'IMG' && (a.name === 'src' || a.name === 'alt'));
          const v = a.value.trim().toLowerCase();
          if (!keep || v.startsWith('javascript:') || v.startsWith('data:')) el.removeAttribute(a.name);
        });
        if (el.tagName === 'A') { el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener noreferrer'); }
        walk(el);
      });
    })(doc.body);
    return doc.body.innerHTML;
  }

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function card(p, big) {
    const a = el('a', 'journal-card' + (big ? ' journal-card--big' : ''));
    a.href = '#journal/' + p.slug;
    a.dataset.slug = p.slug;
    const fig = el('div', 'journal-card-img');
    if (p.image) { const img = el('img'); img.src = p.image; img.alt = ''; img.loading = 'lazy'; fig.appendChild(img); }
    const body = el('div', 'journal-card-body');
    const meta = el('p', 'journal-card-meta');
    meta.append(el('span', 'journal-cat', p.category || ''), el('time', null, fmtDate(p.date)));
    body.append(meta, el('h3', null, field(p, 'title')), el('p', 'journal-card-ex', field(p, 'excerpt')), el('span', 'journal-card-more', t('read') + ' →'));
    a.append(fig, body);
    return a;
  }

  function render() {
    const cats = [...new Set(posts.map((p) => p.category).filter(Boolean))];
    filtersEl.replaceChildren();
    [null, ...cats].forEach((c) => {
      const b = el('button', 'journal-filter' + (c === activeCat ? ' active' : ''), c === null ? t('all') : c);
      b.type = 'button';
      b.addEventListener('click', () => { activeCat = c; render(); });
      filtersEl.appendChild(b);
    });
    filtersEl.hidden = cats.length < 2;

    const list = posts.filter((p) => !activeCat || p.category === activeCat);
    const feat = !activeCat ? (list.find((p) => p.featured) || null) : null;
    featureEl.replaceChildren();
    gridEl.replaceChildren();
    if (feat) featureEl.appendChild(card(feat, true));
    list.filter((p) => p !== feat).forEach((p) => gridEl.appendChild(card(p)));
    emptyEl.hidden = list.length > 0;
  }

  function applyStatic() {
    section.querySelectorAll('[data-journal]').forEach((n) => { n.innerHTML = t(n.dataset.journal); });
    section.querySelectorAll('[data-journal-placeholder]').forEach((n) => { n.placeholder = t(n.dataset.journalPlaceholder); });
  }

  /* ── Lector de entradas ── */
  function open(slug, pushHash) {
    const p = posts.find((x) => x.slug === slug);
    if (!p) return;
    $('journalReaderMeta').replaceChildren(el('span', 'journal-cat', p.category || ''), el('time', null, fmtDate(p.date)));
    $('journalReaderTitle').textContent = field(p, 'title');
    const img = $('journalReaderImg');
    img.hidden = !p.image;
    if (p.image) img.src = p.image;
    $('journalReaderBody').innerHTML = sanitize(field(p, 'body'));
    reader.classList.add('open');
    reader.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (pushHash) history.pushState(null, '', '#journal/' + slug);
  }
  function close(fromPop) {
    reader.classList.remove('open');
    reader.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (!fromPop && location.hash.startsWith('#journal/')) history.pushState(null, '', '#journal');
  }
  section.addEventListener('click', (e) => {
    const a = e.target.closest('.journal-card');
    if (!a) return;
    e.preventDefault();
    open(a.dataset.slug, true);
  });
  $('journalReaderClose').addEventListener('click', () => close());
  reader.addEventListener('click', (e) => { if (e.target === reader) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && reader.classList.contains('open')) close(); });
  window.addEventListener('popstate', () => {
    const m = location.hash.match(/^#journal\/(.+)$/);
    if (m) open(decodeURIComponent(m[1])); else close(true);
  });

  /* ── Suscripción ── */
  const form = $('journalSubscribe');
  const msg = $('journalSubMsg');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    msg.className = 'journal-sub-msg';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { msg.textContent = t('subBad'); msg.classList.add('is-bad'); return; }
    if (!cfg.supabaseUrl || !cfg.anonKey) { msg.textContent = t('subOff'); return; }
    const btn = form.querySelector('button');
    btn.disabled = true;
    try {
      const res = await fetch(cfg.supabaseUrl + '/rest/v1/newsletter_subscribers', {
        method: 'POST',
        headers: {
          apikey: cfg.anonKey,
          Authorization: 'Bearer ' + cfg.anonKey,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify({ email, lang })
      });
      /* 409: ya estaba suscrito; para quien escribe es igual de correcto */
      if (!res.ok && res.status !== 409) throw new Error(res.status);
      form.reset();
      msg.textContent = t('subOk');
      msg.classList.add('is-ok');
    } catch (err) {
      msg.textContent = t('subErr');
      msg.classList.add('is-bad');
    } finally {
      btn.disabled = false;
    }
  });

  /* ── Carga de datos ── */
  async function load() {
    if (cfg.supabaseUrl && cfg.anonKey) {
      const url = cfg.supabaseUrl + '/rest/v1/journal_posts?select=*&published=eq.true&order=date.desc';
      const res = await fetch(url, { headers: { apikey: cfg.anonKey, Authorization: 'Bearer ' + cfg.anonKey } });
      if (!res.ok) throw new Error(res.status);
      return res.json();
    }
    const res = await fetch('content/journal.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error(res.status);
    return (await res.json()).posts.filter((p) => p.published !== false);
  }

  new MutationObserver(() => {
    lang = document.documentElement.lang === 'en' ? 'en' : 'es';
    applyStatic();
    render();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  applyStatic();
  load()
    .then((data) => {
      posts = data.sort((a, b) => String(b.date).localeCompare(String(a.date)));
      render();
      const m = location.hash.match(/^#journal\/(.+)$/);
      if (m) open(decodeURIComponent(m[1]));
    })
    .catch(() => { emptyEl.hidden = false; });
})();
