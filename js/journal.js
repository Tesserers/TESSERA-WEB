/* ══════════════════════════════════════════════════
   JOURNAL · newsletter y entradas
   Las entradas salen de content/journal.json, que se edita desde /admin
   ══════════════════════════════════════════════════ */
(function () {
  const section = document.getElementById('journal');
  if (!section) return;

  const UI = {
    es: {
      label: 'Journal',
      title: 'Ideas para decidir <strong>con criterio.</strong>',
      intro: 'Finanzas, capital humano y operaciones corporativas contadas sin rodeos. Nuestra mirada sobre cómo decidir mejor.',
      all: 'Todo', read: 'Leer', featured: 'Destacado', empty: 'Todavía no hay entradas publicadas.'
    },
    en: {
      label: 'Journal',
      title: 'Ideas to decide <strong>with judgement.</strong>',
      intro: 'Finance, human capital and corporate deals, no fluff. Our view on how to decide better.',
      all: 'All', read: 'Read', featured: 'Featured', empty: 'No posts published yet.'
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

  /* El editor guarda el texto en Markdown; se pasa a HTML y luego se sanea */
  function md(src) {
    const esc = (x) => x.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const inline = (x) => esc(x)
      .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img alt="$1" src="$2">')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
    return String(src || '').split(/\n{2,}/).map((blk) => {
      const b = blk.trim();
      if (!b) return '';
      const h = b.match(/^(#{1,3})\s+(.*)$/);
      if (h) return '<h' + (h[1].length + 1) + '>' + inline(h[2]) + '</h' + (h[1].length + 1) + '>';
      if (/^[-*]\s/.test(b)) return '<ul>' + b.split('\n').map((l) => '<li>' + inline(l.replace(/^[-*]\s+/, '')) + '</li>').join('') + '</ul>';
      if (/^\d+\.\s/.test(b)) return '<ol>' + b.split('\n').map((l) => '<li>' + inline(l.replace(/^\d+\.\s+/, '')) + '</li>').join('') + '</ol>';
      if (/^>\s/.test(b)) return '<blockquote>' + inline(b.replace(/^>\s?/gm, '')) + '</blockquote>';
      return '<p>' + inline(b).replace(/\n/g, '<br>') + '</p>';
    }).join('');
  }

  const slugOf = (p) => p.slug || (String(p.title || 'entrada').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + String(p.date || '').slice(0, 10));

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
    $('journalReaderBody').innerHTML = sanitize(/^\s*</.test(field(p, 'body') || '') ? field(p, 'body') : md(field(p, 'body')));
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

  /* ── Carga de datos ── */
  async function load() {
    const res = await fetch('content/journal.json', { cache: 'no-cache' });
    if (!res.ok) throw new Error(res.status);
    return (await res.json()).posts.filter((p) => p.published !== false);
  }

  new MutationObserver(() => {
    lang = document.documentElement.lang === 'en' ? 'en' : 'es';
    applyStatic();
    render();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  /* Sin entradas publicadas la sección y sus enlaces no se muestran */
  function toggleJournal(show) {
    section.hidden = !show;
    document.querySelectorAll('a[href="#journal"]').forEach((a) => { (a.closest('li') || a).hidden = !show; });
  }

  applyStatic();
  toggleJournal(false);
  load()
    .then((data) => {
      posts = data.map((p) => Object.assign({}, p, { slug: slugOf(p) })).sort((a, b) => String(b.date).localeCompare(String(a.date)));
      toggleJournal(posts.length > 0);
      render();
      const m = location.hash.match(/^#journal\/(.+)$/);
      if (m) open(decodeURIComponent(m[1]));
    })
    .catch(() => toggleJournal(false));
})();
