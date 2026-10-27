/* == NAV ADAPTABLE == */
const nav       = document.getElementById('mainNav');
const mobileNav = document.getElementById('mobileNav');
const hamburger = document.getElementById('hamburger');
const scrollBar = document.getElementById('scroll-bar');
const langSwitch = document.getElementById('langSwitch');

window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  scrollBar.style.width = (pct * 100) + '%';
}, { passive: true });

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* == NAV ADAPTABLE == */
const sectionThemes = {
  'top':         'dark',
  'about':       'light',
  'servicios':   'light',
  'metodologia': 'dark',
  'entregable':  'light',
  'casos':       'dark',
  'contacto':    'dark',
  'careers-hero':'dark',
  'careers-why': 'light',
};

function setNavTheme(theme) {
  if (theme === 'light') {
    nav.classList.add('nav-light');
    nav.classList.remove('nav-dark');
  } else {
    nav.classList.add('nav-dark');
    nav.classList.remove('nav-light');
  }
}

setNavTheme('dark');

const themeObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const theme = sectionThemes[entry.target.id];
    if (theme) setNavTheme(theme);
  });
}, { threshold: 0, rootMargin: '-50px 0px -85% 0px' });

Object.keys(sectionThemes).forEach(id => {
  const el = document.getElementById(id);
  if (el) themeObs.observe(el);
});

/* == CAMBIO DE IDIOMA == */
let currentLang = 'es';

const translations = {
  "es": {
    "meta": {
      "title": "TESSERA · Finanzas y Capital Humano para PYMES",
      "description": "Especialistas en M&A, CFO part-time, reestructuración y selección directiva para PYMES y startups en España."
    },
    "nav": {
      "about": "Nosotros",
      "finance": "Finanzas",
      "cases": "Casos",
      "cta": "Hablemos",
      "contact": "Contacto",
      "menuOpen": "Abrir menú"
    },
    "common": {
      "strategy": "Estrategia",
      "activeOutreach": "Outreach activo"
    },
    "hero": {
      "eyebrow": "Finanzas · Capital Humano · Estrategia",
      "title": "Las decisiones que<br><strong>definen tu empresa.</strong>",
      "sub": "La profundidad de una gran firma. La cercanía de un equipo que se sienta en tu mesa.",
      "ctaPrimary": "Hablemos de tu operación",
      "ctaGhost": "Ver servicios",
      "proof": {
        "advised": "asesorados",
        "deals": "operaciones",
        "years": " años",
        "experience": "de experiencia"
      }
    },
    "about": {
      "label": "Quiénes somos",
      "title": "Especialistas en finanzas y <strong>capital humano.</strong>",
      "lead": "Acompañamos a PYMES y startups en las decisiones que marcan su rumbo. Nos integramos dentro de tu compañía, en finanzas y en capital humano, para profesionalizar, ordenar y llevar el negocio al siguiente nivel.",
      "stat1num": "Senior",
      "stat1": "Equipo directivo con experiencia en banca de inversión, consultoría y operaciones reales",
      "stat2num": "3 áreas",
      "stat2desc": "Finanzas corporativas y capital humano bajo el mismo techo, sin silos"
    },
    "pillar": {
      "finance": {
        "desc": "M&amp;A, dirección financiera part-time, reestructuración y financiación."
      },
      "hc": {
        "desc": "Head hunting y selección de perfiles directivos y estratégicos."
      },
      "strategy": {
        "desc": "Consultoría, control de gestión y crecimiento con criterio y datos."
      }
    },
    "services": {
      "label": "Servicios · Finanzas",
      "title": "Capacidades financieras de <strong>principio a fin.</strong>",
      "lead": "No vendemos informes. Nos sentamos en tu mesa, entendemos tu negocio por dentro y tomamos las decisiones difíciles contigo.",
      "ebitda": "Y sí, lo decimos en voz alta: <strong>We love EBITDA.</strong>"
    },
    "svc": {
      "ma": {
        "title": "M&amp;A · Compraventa de Empresas",
        "desc": "Te acompañamos en todo el proceso de compraventa: valoración, preparación de la compañía, due diligence, negociación y cierre. Buscamos y filtramos contrapartes, estructuramos la operación y defendemos tus intereses en cada mesa. El objetivo es uno: maximizar el valor de salida y que firmes en las mejores condiciones, sin sorpresas de última hora."
      },
      "cfo": {
        "desc": "Incorporamos una dirección financiera senior a tu equipo sin el coste de un CFO a tiempo completo. Nos hacemos cargo del reporting, la tesorería, el control de gestión y la relación con bancos e inversores. Te damos visibilidad real sobre tus números y un cuadro de mando con el que decidir con criterio, mes a mes."
      },
      "restructuring": {
        "title": "Reestructuración",
        "desc": "Cuando el negocio aprieta, ponemos orden y un plan encima de la mesa. Renegociamos la deuda con bancos y acreedores, diseñamos planes de viabilidad realistas y tomamos contigo las decisiones difíciles para reflotar la compañía. Priorizamos la caja, frenamos la sangría y devolvemos el control de la situación a tus manos."
      },
      "bp": {
        "title": "Business Plan",
        "desc": "Construimos planes de negocio que resisten el escrutinio de un comité de inversión o de cualquier banco. Modelizamos escenarios, proyecciones financieras y necesidades de financiación con hipótesis defendibles, no con humo. El resultado es un documento que convence a terceros y, sobre todo, una hoja de ruta que respalda tus decisiones de crecimiento."
      },
      "financing": {
        "title": "Financiación",
        "desc": "Diseñamos la estructura de financiación que tu compañía necesita y salimos a buscarla: deuda bancaria, equity, deuda alternativa y subvenciones. Preparamos el material, abrimos las puertas de nuestra red de inversores y entidades y negociamos las condiciones contigo. Conseguimos los recursos para crecer sin que pierdas el control de tu empresa."
      },
      "consulting": {
        "title": "Consultoría estratégica",
        "desc": "Convertimos tus datos en decisiones que generan valor. Analizamos márgenes, EBITDA, costes y unidades de negocio para entender de dónde sale, y por dónde se escapa, tu rentabilidad. Montamos el control de gestión y los KPIs que de verdad importan, y nos sentamos contigo a definir la estrategia y a ejecutarla, no solo a recomendarla."
      },
      "erp": {
        "title": "Implementación de ERP",
        "desc": "Te ayudamos a elegir, implementar y migrar el ERP que encaja con tu operativa, no el que más comisión deja. Somos partners de varias plataformas líderes del mercado, como Odoo, Holded y otras, y nos encargamos de la configuración, la migración de datos y la formación de tu equipo. Dejamos tus procesos integrados, tu información ordenada y a tu gente trabajando con la herramienta desde el primer día."
      }
    },
    "meth": {
      "label": "Human Capital · Selección",
      "title": "Encontramos el talento que <em>tu empresa necesita.</em>",
      "sub": "Identificamos, atraemos y seleccionamos perfiles directivos y estratégicos para PYMES y startups. No usamos bases de datos genéricas, hacemos búsqueda activa, directa y confidencial. Y nos comprometemos con plazos reales.",
      "numbersTitle": "Dos números. <strong>Un compromiso.</strong>"
    },
    "hc": {
      "item1": {
        "title": "Head hunting directivo",
        "desc": "Selección de C-level, directores de área y mandos intermedios clave. Perfiles que marcan la diferencia."
      },
      "item2": {
        "desc": "Gestión externa del talento para que tu equipo se centre en lo que importa. Flexible, eficiente y sin fricciones."
      },
      "item3": {
        "title": "Shortlist validado",
        "desc": "Solo llegan candidatos que encajan de verdad. Cada perfil viene con informe individual y disponibilidad confirmada."
      },
      "item4": {
        "title": "Plazos comprometidos",
        "desc": "Primer shortlist en 72 horas. Informe de mercado en 7 días. Sin excusas, sin dilaciones."
      }
    },
    "salary": {
      "label": "Transparencia salarial",
      "title": "Estudio y consultoría de <strong>transparencia salarial.</strong>",
      "desc": "Te ayudamos a anticiparte a la nueva normativa europea de transparencia salarial: análisis y diseño de bandas retributivas, auditoría de equidad y brecha salarial, y planes de acción para tu plantilla."
    },
    "meto": {
      "num1": {
        "label": "Primer shortlist",
        "desc": "Candidatos reales encima de tu mesa. Validados, disponibles y alineados con el rol."
      },
      "num2": {
        "label": "Informe de mercado",
        "desc": "Benchmarking salarial, mapa de talento, competidores y realidades que nadie te cuenta."
      }
    },
    "tessa": {
      "tag": "IA propia de selección",
      "desc": "Nuestra inteligencia artificial rastrea, identifica y prioriza al mejor talento del mercado en cada búsqueda. Tu shortlist no depende del azar, <strong>depende de datos</strong>."
    },
    "progress": {
      "title": "Lo que incluye cada proceso",
      "item1": "Identificación de talento",
      "item2": "Benchmarking salarial",
      "item3": "Análisis de mercado",
      "item4": "Shortlist en 72h",
      "item5": "Tasa de cierre"
    },
    "timeline": {
      "title": "Lo que pasa desde que firmamos hasta tu <strong>primer shortlist.</strong>",
      "step1": {
        "desc": "Briefing profundo con el hiring manager. Nada de formularios genéricos."
      },
      "step2": {
        "desc": "Mapa de empresas objetivo, boolean strings y canales activos y pasivos."
      },
      "step3": {
        "desc": "Contacto directo con talento pasivo. Mensajes personalizados, no plantillas."
      },
      "step4": {
        "desc": "Entrevistas estructuradas. Solo avanzan candidatos que encajan de verdad."
      },
      "step5": {
        "desc": "Perfiles validados, con informe individual y disponibilidad confirmada."
      }
    },
    "cases": {
      "label": "Lo que dicen de nosotros",
      "title": "Empresarios que <strong>ya tomaron la decisión.</strong>"
    },
    "t1": {
      "result": "Financiación conseguida",
      "quote": "Para nosotros fue determinante su involucración en profundizar en el entendimiento del negocio. Mejoraron la contabilidad, optimizaron la fiscalidad y nos consiguieron la financiación que necesitábamos.",
      "role": "CEO · Sector tecnología"
    },
    "t2": {
      "result": "2 adquisiciones cerradas",
      "quote": "Les estoy muy agradecido porque me ayudaron, con un éxito mayor del que imaginaba, a negociar y comprar dos compañías que me permitieron expandir mi negocio.",
      "role": "CEO · Expansión internacional"
    },
    "t3": {
      "result": "Reestructuración en plazo",
      "quote": "Entendieron perfectamente la problemática financiera de la compañía y se adentraron hasta el fondo, incluso en fin de semana, para ayudarnos en el plazo que requería.",
      "role": "CEO · Reestructuración financiera"
    },
    "carousel": {
      "prev": "Anterior",
      "next": "Siguiente"
    },
    "contact": {
      "title": "¿Tu operación merece<br><em>una conversación seria?</em>",
      "sub": "Cuéntanos el reto. En <span class=\"num\">24</span> horas tienes respuesta y en <span class=\"num\">72</span> una propuesta sobre la mesa.",
      "ctaPrimary": "Contactar ahora",
      "g1": "Respuesta en <span class=\"num\">24h</span>",
      "g2": "Sin compromiso",
      "g3": "Confidencial"
    },
    "footer": {
      "about": "Especialistas en finanzas y capital humano para PYMES y startups en España.",
      "servicesHeading": "Servicios",
      "selection72": "Selección 72h",
      "companyHeading": "Empresa",
      "legalNotice": "Aviso legal",
      "privacy": "Privacidad"
    },
    "modal": {
      "close": "Cerrar",
      "sub": "Cuéntanos el reto. En <span class=\"num\">24h</span> tienes respuesta.",
      "name": "Nombre *",
      "namePh": "Tu nombre",
      "company": "Empresa *",
      "companyPh": "Nombre de tu empresa",
      "emailPh": "correo@empresa.com",
      "phone": "Teléfono",
      "submit": "Enviar mensaje",
      "legal": "Al enviar aceptas nuestra <a href=\"https://jobs.tesseraservices.com/privacy-policy\" target=\"_blank\">política de privacidad</a>.",
      "sending": "Enviando…",
      "sent": "✓ Mensaje enviado",
      "error": "Error. Inténtalo de nuevo"
    }
  },
  "en": {
    "meta": {
      "title": "TESSERA · Finance and Human Capital for SMEs",
      "description": "Specialists in M&A, part-time CFO, restructuring and executive search for SMEs and startups in Spain."
    },
    "nav": {
      "about": "About",
      "finance": "Finance",
      "cases": "Cases",
      "cta": "Let's talk",
      "contact": "Contact",
      "menuOpen": "Open menu"
    },
    "common": {
      "strategy": "Strategy",
      "activeOutreach": "Active outreach"
    },
    "hero": {
      "eyebrow": "Finance · Human Capital · Strategy",
      "title": "The decisions that<br><strong>define your company.</strong>",
      "sub": "The depth of a major firm. The closeness of a team that sits at your table.",
      "ctaPrimary": "Let's talk about your deal",
      "ctaGhost": "View services",
      "proof": {
        "advised": "advised",
        "deals": "deals",
        "years": " years",
        "experience": "of experience"
      }
    },
    "about": {
      "label": "Who we are",
      "title": "Specialists in finance and <strong>human capital.</strong>",
      "lead": "We support SMEs and startups through the decisions that shape their direction. We embed within your company — in finance and human capital — to professionalize, organize and take the business to the next level.",
      "stat1num": "We are seniors",
      "stat1": "Leadership team with experience in investment banking, consulting and real-world deals",
      "stat2num": "3 areas",
      "stat2desc": "Corporate finance and human capital under one roof, no silos"
    },
    "pillar": {
      "finance": {
        "desc": "M&amp;A, part-time financial leadership, restructuring and financing."
      },
      "hc": {
        "desc": "Head hunting and search for executive and strategic profiles."
      },
      "strategy": {
        "desc": "Consulting, management control and growth driven by judgment and data."
      }
    },
    "services": {
      "label": "Services · Finance",
      "title": "Financial capabilities from the <strong>beginning to the end.</strong>",
      "lead": "We don't sell reports. We sit at your table, understand your business from the inside, and make the hard decisions with you.",
      "ebitda": "And yes, we say it out loud: <strong>We love EBITDA.</strong>"
    },
    "svc": {
      "ma": {
        "title": "M&amp;A · Buy-Side &amp; Sell-Side",
        "desc": "We guide you through the entire buy-side or sell-side process: valuation, preparing the company, due diligence, negotiation and closing. We source and screen counterparties, structure the deal and defend your interests at every table. The goal is one: to maximize your exit value and get you signing on the best possible terms, with no last-minute surprises."
      },
      "cfo": {
        "desc": "We bring senior financial leadership into your team without the cost of a full-time CFO. We take charge of reporting, treasury, management control and your relationship with banks and investors. You get real visibility over your numbers and a dashboard to make sound decisions, month after month."
      },
      "restructuring": {
        "title": "Restructuring",
        "desc": "When the business gets tight, we bring order and a plan to the table. We renegotiate debt with banks and creditors, design realistic viability plans and make the hard decisions with you to turn the company around. We prioritize cash, stop the bleeding and put control of the situation back in your hands."
      },
      "bp": {
        "title": "Business Plan",
        "desc": "We build business plans that withstand the scrutiny of an investment committee or any bank. We model scenarios, financial projections and funding needs with defensible assumptions, not smoke. The result is a document that convinces third parties and, above all, a roadmap that backs your growth decisions."
      },
      "financing": {
        "title": "Financing",
        "desc": "We design the financing structure your company needs and go out to secure it: bank debt, equity, alternative debt and grants. We prepare the materials, open the doors of our network of investors and institutions and negotiate the terms with you. We get the resources to grow without you losing control of your company."
      },
      "consulting": {
        "title": "Strategic Consulting",
        "desc": "We turn your data into decisions that create value. We analyze margins, EBITDA, costs and business units to understand where your profitability comes from —and where it leaks away. We set up the management control and the KPIs that truly matter, and we sit down with you to define the strategy and execute it, not just recommend it."
      },
      "erp": {
        "title": "ERP Implementation",
        "desc": "We help you choose, implement and migrate the ERP that fits your operations, not the one that pays the biggest commission. We are partners of several leading platforms —Odoo, Holded and others— and we handle the configuration, data migration and training of your team. We leave your processes integrated, your information organized and your people working with the tool from day one."
      }
    },
    "meth": {
      "label": "Human Capital · Search",
      "title": "We find the talent <em>your company needs.</em>",
      "sub": "We identify, attract and select executive and strategic profiles for SMEs and startups. We don't rely on generic databases — we run active, direct and confidential search. And we commit to real deadlines.",
      "numbersTitle": "Two numbers. <strong>One commitment.</strong>"
    },
    "hc": {
      "item1": {
        "title": "Executive head hunting",
        "desc": "Search for C-level executives, department heads and key middle management. Profiles that make the difference."
      },
      "item2": {
        "desc": "Outsourced talent management so your team can focus on what matters. Flexible, efficient and frictionless."
      },
      "item3": {
        "title": "Validated shortlist",
        "desc": "Only candidates who genuinely fit make it through. Every profile comes with an individual report and confirmed availability."
      },
      "item4": {
        "title": "Committed deadlines",
        "desc": "First shortlist in 72 hours. Market report in 7 days. No excuses, no delays."
      }
    },
    "salary": {
      "label": "Pay transparency",
      "title": "Pay transparency <strong>study &amp; consulting.</strong>",
      "desc": "We help you get ahead of the new European pay transparency regulations: analysis and design of salary bands, pay equity and gender pay gap audits, and action plans for your workforce."
    },
    "meto": {
      "num1": {
        "label": "First shortlist",
        "desc": "Real candidates on your desk. Validated, available and aligned with the role."
      },
      "num2": {
        "label": "Market report",
        "desc": "Salary benchmarking, talent mapping, competitors and realities no one tells you about."
      }
    },
    "tessa": {
      "tag": "Proprietary search AI",
      "desc": "Our artificial intelligence tracks, identifies and prioritizes the best talent in the market for every search. Your shortlist doesn't depend on luck, <strong>it depends on data</strong>."
    },
    "progress": {
      "title": "What every process includes",
      "item1": "Talent identification",
      "item2": "Salary benchmarking",
      "item3": "Market analysis",
      "item4": "Shortlist in 72h",
      "item5": "Closing rate"
    },
    "timeline": {
      "title": "What happens from signing to your <strong>first shortlist.</strong>",
      "step1": {
        "desc": "In-depth briefing with the hiring manager. No generic forms."
      },
      "step2": {
        "desc": "Map of target companies, boolean strings, and active and passive channels."
      },
      "step3": {
        "desc": "Direct contact with passive talent. Personalized messages, not templates."
      },
      "step4": {
        "desc": "Structured interviews. Only candidates who truly fit move forward."
      },
      "step5": {
        "desc": "Validated profiles, with an individual report and confirmed availability."
      }
    },
    "cases": {
      "label": "What people say about us",
      "title": "Business owners who <strong>already made the decision.</strong>"
    },
    "t1": {
      "result": "Financing secured",
      "quote": "Their commitment to truly understanding our business was decisive for us. They improved our accounting, optimized our tax position and secured the financing we needed.",
      "role": "CEO · Technology sector"
    },
    "t2": {
      "result": "2 acquisitions closed",
      "quote": "I'm very grateful to them — they helped me, with greater success than I imagined, negotiate and acquire two companies that allowed me to expand my business.",
      "role": "CEO · International expansion"
    },
    "t3": {
      "result": "Restructuring on schedule",
      "quote": "They fully understood the company's financial challenges and got deeply involved, even on weekends, to help us meet the deadline it required.",
      "role": "CEO · Financial restructuring"
    },
    "carousel": {
      "prev": "Previous",
      "next": "Next"
    },
    "contact": {
      "title": "Does your deal deserve<br><em>a serious conversation?</em>",
      "sub": "Tell us the challenge. You'll have an answer in <span class=\"num\">24</span> hours and a proposal on the table in <span class=\"num\">72</span>.",
      "ctaPrimary": "Contact us now",
      "g1": "Response in <span class=\"num\">24h</span>",
      "g2": "No obligation",
      "g3": "Confidential"
    },
    "footer": {
      "about": "Specialists in finance and human capital for SMEs and startups in Spain.",
      "servicesHeading": "Services",
      "selection72": "72h Search",
      "companyHeading": "Company",
      "legalNotice": "Legal notice",
      "privacy": "Privacy"
    },
    "modal": {
      "close": "Close",
      "sub": "Tell us the challenge. You'll have an answer in <span class=\"num\">24h</span>.",
      "name": "Name *",
      "namePh": "Your name",
      "company": "Company *",
      "companyPh": "Your company name",
      "emailPh": "email@company.com",
      "phone": "Phone",
      "submit": "Send message",
      "legal": "By submitting, you accept our <a href=\"https://jobs.tesseraservices.com/privacy-policy\" target=\"_blank\">privacy policy</a>.",
      "sending": "Sending…",
      "sent": "✓ Message sent",
      "error": "Error — please try again"
    }
  }
};

/* Traducciones de la página de Careers (careers.html) */
translations.es.careers = {
  "eyebrow": "Carreras · Talento",
  "title": "Construye tu carrera<br><strong>con nosotros.</strong>",
  "sub": "Buscamos personas que quieran sentarse en la mesa donde se toman las decisiones. Si te mueve la exigencia y el impacto real, este es tu sitio.",
  "ctaJobs": "Ver vacantes",
  "ctaTalk": "Hablemos",
  "whyLabel": "Por qué Tessera",
  "whyTitle": "Un sitio donde <strong>se decide de verdad.</strong>",
  "c1t": "Decisiones reales",
  "c1d": "Desde el primer día te sientas en operaciones de verdad: M&amp;A, financiación, reestructuración. Nada de tareas de relleno.",
  "c2t": "Aprendizaje acelerado",
  "c2d": "Finanzas, estrategia y capital humano en proyectos reales con PYMES y startups. Aprendes haciendo, junto a un equipo senior.",
  "c3t": "Equipo cercano",
  "c3d": "Sin burocracia ni capas infinitas. Un equipo que se sienta a tu lado, te acompaña y te deja crecer.",
  "ctaBottom": "Ver vacantes abiertas"
};
translations.en.careers = {
  "eyebrow": "Careers · Talent",
  "title": "Build your career<br><strong>with us.</strong>",
  "sub": "We look for people who want a seat at the table where decisions get made. If you're driven by high standards and real impact, this is your place.",
  "ctaJobs": "View openings",
  "ctaTalk": "Let's talk",
  "whyLabel": "Why Tessera",
  "whyTitle": "A place where <strong>real decisions happen.</strong>",
  "c1t": "Real decisions",
  "c1d": "From day one you sit in on real deals: M&amp;A, financing, restructuring. No filler tasks.",
  "c2t": "Accelerated learning",
  "c2d": "Finance, strategy and human capital on real projects with SMEs and startups. You learn by doing, alongside a senior team.",
  "c3t": "A close-knit team",
  "c3d": "No bureaucracy, no endless layers. A team that sits beside you, supports you and lets you grow.",
  "ctaBottom": "View open positions"
};

function i18nGet(lang, key) {
  return key.split('.').reduce((obj, k) => (obj && obj[k] !== undefined) ? obj[k] : null, translations[lang]);
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = i18nGet(lang, el.dataset.i18n);
    if (val !== null) el.innerHTML = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const val = i18nGet(lang, el.dataset.i18nPlaceholder);
    if (val !== null) el.placeholder = val;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const val = i18nGet(lang, el.dataset.i18nAria);
    if (val !== null) el.setAttribute('aria-label', val);
  });
  document.querySelectorAll('[data-i18n-label]').forEach(el => {
    const val = i18nGet(lang, el.dataset.i18nLabel);
    if (val !== null) el.setAttribute('data-label', val);
  });

  document.title = translations[lang].meta.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', translations[lang].meta.description);

  if (langSwitch) {
    if (lang === 'es') {
      langSwitch.textContent = 'ENG';
      langSwitch.setAttribute('aria-label', 'Cambiar idioma a inglés');
    } else {
      langSwitch.textContent = 'ESP';
      langSwitch.setAttribute('aria-label', 'Switch language to Spanish');
    }
  }

  currentLang = lang;
}

function toggleLanguage() {
  applyLanguage(currentLang === 'es' ? 'en' : 'es');
}

const heroVideo = document.querySelector('.hero-video');
let isTicking = false;

if (heroVideo) {
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight) heroVideo.style.transform = `translateY(${y * 0.4}px)`;
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });
}

/* ── Vídeo de fondo fijo: carga diferida y solo cuando conviene ──
   Evita descargar ~5 MB en la carga inicial. En móvil / movimiento
   reducido / ahorro de datos se queda el gradiente CSS de reserva. */
const bgVideo = document.querySelector('.home-bg-video');
if (bgVideo) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktop      = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const saveData     = navigator.connection && navigator.connection.saveData;

  if (desktop && !reduceMotion && !saveData) {
    const startBgVideo = () => {
      if (bgVideo.dataset.loaded) return;
      bgVideo.dataset.loaded = '1';
      bgVideo.load();
      bgVideo.play().catch(() => {});
    };
    const whenIdle = window.requestIdleCallback || (fn => setTimeout(fn, 400));
    window.addEventListener('load', () => whenIdle(startBgVideo), { once: true });

    document.addEventListener('visibilitychange', () => {
      if (!bgVideo.dataset.loaded) return;
      if (document.hidden) bgVideo.pause();
      else bgVideo.play().catch(() => {});
    });
  }
}

function toggleMobile() {
  const open = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
function closeMobile() {
  mobileNav.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobile(); });

const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ══ SERVICIOS: lista (maestro) + detalle ══ */
function selectService(btn) {
  const id = btn.dataset.svc;

  document.querySelectorAll('.svc-tab').forEach(t => {
    const on = (t === btn);
    t.classList.toggle('active', on);
    t.setAttribute('aria-selected', on);
  });

  document.querySelectorAll('.svc-detail').forEach(p => {
    p.classList.toggle('active', p.dataset.svc === id);
  });
}

const statObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.3 });
document.querySelectorAll('.stat-box').forEach(el => statObs.observe(el));

function countUp(el, target, duration) {
  requestAnimationFrame(t0 => {
    (function tick(now) {
      const p = Math.min((now - t0) / duration, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    })(t0);
  });
}

const animObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.done) {
      e.target.dataset.done = '1';
      countUp(e.target, +e.target.dataset.target, 1200);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.count-anim').forEach(el => animObs.observe(el));

const progObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.progress-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      progObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const ps = document.querySelector('.progress-section');
if (ps) progObs.observe(ps);

const htObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('animated');
    const dots  = e.target.querySelectorAll('.h-dot');
    const steps = e.target.querySelectorAll('.h-step');
    dots.forEach((dot, i) => {
      dot.addEventListener('mouseenter', () => {
        steps[i]?.querySelector('.h-step-name')?.style.setProperty('color', 'var(--yellow)');
      });
      dot.addEventListener('mouseleave', () => {
        steps[i]?.querySelector('.h-step-name')?.style.removeProperty('color');
      });
    });
    htObs.unobserve(e.target);
  });
}, { threshold: 0.25 });

const ht = document.getElementById('hTimeline');
if (ht) htObs.observe(ht);

const sectionVideos = document.querySelectorAll('.section-video');
if (sectionVideos.length) {
  const videoObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const video = e.target;
        if (!video.getAttribute('data-loaded')) {
          video.setAttribute('data-loaded', '1');
          video.load();
          video.play().catch(() => {});
        }
        videoObs.unobserve(video);
      }
    });
  }, { threshold: 0.1 });
  sectionVideos.forEach(v => videoObs.observe(v));
}

document.querySelectorAll('.proof-count').forEach((el, idx) => {
  const target = +el.dataset.target;
  setTimeout(() => countUp(el, target, 900), 1100 + idx * 300);
});

/* ══ CAROUSEL DE TESTIMONIOS ══ */
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn       = document.getElementById('carouselPrev');
const nextBtn       = document.getElementById('carouselNext');
const carouselDots  = document.querySelectorAll('.carousel-dot');

let currentIdx = 0;
const cards    = carouselTrack ? carouselTrack.querySelectorAll('.testimonial-card') : [];
const total    = cards.length;

function goTo(idx) {
  if (!carouselTrack || total === 0) return;
  currentIdx = ((idx % total) + total) % total;
  const cardWidth = carouselTrack.parentElement.offsetWidth;
  carouselTrack.style.transform = `translateX(-${currentIdx * cardWidth}px)`;
  carouselDots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
}

if (carouselTrack && prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => goTo(currentIdx - 1));
  nextBtn.addEventListener('click', () => goTo(currentIdx + 1));
  carouselDots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.idx)));

  let autoPlay = setInterval(() => goTo(currentIdx + 1), 5000);
  const wrap = carouselTrack.closest('.carousel-wrap');
  wrap.addEventListener('mouseenter', () => clearInterval(autoPlay));
  wrap.addEventListener('mouseleave', () => {
    clearInterval(autoPlay);
    autoPlay = setInterval(() => goTo(currentIdx + 1), 5000);
  });

  window.addEventListener('resize', () => goTo(currentIdx), { passive: true });

  let startX = 0;
  carouselTrack.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  carouselTrack.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(currentIdx + (diff > 0 ? 1 : -1));
  });
}

/* ══ MODAL DE CONTACTO ══ */
const contactModal = document.getElementById('contactModal');

function openModal() {
  contactModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  contactModal.classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOutside(e) {
  if (e.target === contactModal) closeModal();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

function submitModal(e) {
  e.preventDefault();
  const form    = document.getElementById('contactForm');
  const data    = new FormData(form);

  const btn = form.querySelector('.modal-submit');
  btn.textContent = translations[currentLang].modal.sending;
  btn.disabled = true;

  fetch('https://formspree.io/f/xpqebwbb', {
    method: 'POST',
    body: data,
    headers: { 'Accept': 'application/json' }
  })
  .then(res => {
    if (res.ok) {
      btn.textContent = translations[currentLang].modal.sent;
      form.reset();
      setTimeout(() => closeModal(), 1800);
    } else {
      btn.textContent = translations[currentLang].modal.error;
      btn.disabled = false;
    }
  })
  .catch(() => {
    btn.textContent = translations[currentLang].modal.error;
    btn.disabled = false;
  });
}