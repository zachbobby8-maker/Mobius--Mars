// === MOBIUS BRAID CONSOLIDATED CORE SYSTEM ===
// All services, views, state management, and creative consoles in one robust script.

// AI Model Constants
const TEXT_MODEL_ID = 'dc2db118-7888-466a-a8d1-bf9d96bab4b6'; // DeepSeek V4 Flash Instant
const IMAGE_MODEL_ID = 'b44969fb-941d-48e8-9c91-22793ad080ca'; // fal-ai/flux-2/flash
const CREATOR_PASSKEY = 'weave';

// Standard baseline articles
const HARDCODED_PLACEHOLDERS = [
  {
    id: 'article-1',
    title: 'Mass Emerges from a Woven Fabric of Flows',
    subtitle: 'Exploring the TOE — a Theory of Everything grounded in fluid dynamics, Martian atmospheric braids, and fluid logic.',
    tag: 'Physics',
    tagColor: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
    date: 'Jan 2025',
    readTime: '8 min read',
    isPremium: false,
    url: 'https://zachbobby8.medium.com',
  },
  {
    id: 'article-2',
    title: 'Flux: A Creative Alternative to Coding',
    subtitle: 'Introducing Fluid Logic Language — where computation flows like Martian dust storms, not mechanical switches.',
    tag: 'Language',
    tagColor: 'bg-red-500/10 text-red-400 border border-red-500/20',
    date: 'Feb 2025',
    readTime: '12 min read',
    isPremium: true,
    url: '#subscribe',
  },
  {
    id: 'article-3',
    title: 'Architecting the 5th Industrial Revolution',
    subtitle: 'Why the settlement of Mars and human survival demands organic, continuous fluid models, not faster Silicon.',
    tag: 'Vision',
    tagColor: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    date: 'Mar 2025',
    readTime: '10 min read',
    isPremium: true,
    url: '#subscribe',
  },
  {
    id: 'article-4',
    title: 'The Mobius Strip as Metaphor',
    subtitle: 'On non-orientable surfaces, planetary orbits, and why the simplest topology holds the deepest truths.',
    tag: 'Topology',
    tagColor: 'bg-zinc-500/10 text-zinc-300 border border-zinc-500/20',
    date: 'Apr 2025',
    readTime: '6 min read',
    isPremium: false,
    url: 'https://zachbobby8.medium.com',
  },
];

// Master state holder for active CMS tab
let activeCmsTab = 'editor';

// Safe translation helper mapping directly onto i18n
const t = (key, values) => window.miniappI18n?.t(key, values) ?? key;

// === ROBUST STORAGE WRAPPER ===
const safeStorage = {
  async getItem(key) {
    try {
      if (window.miniappsAI?.storage) {
        return await window.miniappsAI.storage.getItem(key);
      }
    } catch (e) {
      console.warn('SDK storage getItem fallback:', e);
    }
    try {
      return localStorage.getItem('mobius_' + key);
    } catch (err) {
      return null;
    }
  },

  async setItem(key, value) {
    try {
      if (window.miniappsAI?.storage) {
        return await window.miniappsAI.storage.setItem(key, value);
      }
    } catch (e) {
      console.warn('SDK storage setItem fallback:', e);
    }
    try {
      localStorage.setItem('mobius_' + key, value);
    } catch (err) {
      console.error('localStorage setItem failed:', err);
    }
  },

  async removeItem(key) {
    try {
      if (window.miniappsAI?.storage) {
        return await window.miniappsAI.storage.removeItem(key);
      }
    } catch (e) {
      console.warn('SDK storage removeItem fallback:', e);
    }
    try {
      localStorage.removeItem('mobius_' + key);
    } catch (err) {
      console.error('localStorage removeItem failed:', err);
    }
  }
};

// === GLOBAL TOAST NOTIFICATION SERVICE ===
let toastTimeout = null;
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.setAttribute('role', 'alert');
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// === PREMIUM GATEWAYS & SUBSCRIPTIONS ===
async function isUserSubscribed() {
  try {
    const localSub = await safeStorage.getItem('user_subscribed_email');
    return !!localSub;
  } catch (err) {
    return false;
  }
}

async function subscribeUserEmail(email) {
  if (!email || !email.includes('@')) {
    throw new Error('Please enter a valid email address.');
  }

  let currentSubs = [];
  try {
    const raw = await safeStorage.getItem('waitlist_subscribers');
    currentSubs = raw ? JSON.parse(raw) : [];
  } catch (e) {
    currentSubs = [];
  }

  if (!currentSubs.some(s => s.email.toLowerCase() === email.toLowerCase())) {
    currentSubs.unshift({
      email: email.toLowerCase(),
      date: new Date().toISOString(),
      referrer: window.location.href
    });
    await safeStorage.setItem('waitlist_subscribers', JSON.stringify(currentSubs));
  }

  await safeStorage.setItem('user_subscribed_email', email.toLowerCase());

  // Dispatch secure webhook payload if connected
  try {
    const webhookUrl = await safeStorage.getItem('waitlist_webhook_url');
    if (webhookUrl && webhookUrl.startsWith('http')) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          timestamp: new Date().toISOString(),
          source: 'Mobius Braid Mars Waitlist',
          message: 'A new settler has subscribed to the 5th Industrial Revolution waitlist.'
        }),
        mode: 'no-cors'
      });
    }
  } catch (err) {
    console.warn('Webhook delivery offline:', err);
  }

  window.dispatchEvent(new Event('mobius-premium-change'));
}

// === BOOTSTRAP INITIALIZATION ON LOAD ===
document.addEventListener('DOMContentLoaded', async () => {
  renderHeroView();
  renderPhilosophyView();
  renderLinksView();
  await renderArticlesView();
  await renderSubscribeView();
  initNavbar();
  initCmsPortal();

  window.addEventListener('mobius-premium-change', async () => {
    await renderArticlesView();
    await renderSubscribeView();
  });
});

// === NAVBAR STICKY & MOBILE LOGIC ===
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  mobileMenuBtn?.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    mobileMenuBtn.innerHTML = isOpen
      ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>'
      : '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>';
  });

  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-label', 'Open menu');
      mobileMenuBtn.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>';
    });
  });

  // Fade-in Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  setTimeout(() => {
    document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
  }, 1200);
}

// === VIEW: HERO VIEW ===
async function renderHeroView() {
  const el = document.getElementById('hero');
  if (!el) return;

  let customAvatar = null;
  try {
    customAvatar = await safeStorage.getItem('custom_avatar');
  } catch (err) {
    customAvatar = null;
  }

  const avatarMarkup = customAvatar
    ? `<img id="heroAvatarImg" src="${customAvatar}" alt="Mobius Braid avatar" class="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105" loading="lazy" onerror="handleAvatarError(this)">`
    : `<div id="avatarFallback" class="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black to-zinc-900 p-4 text-center select-none">
        <svg class="w-20 h-20 text-orange-400 drop-shadow-[0_0_15px_rgba(249,115,22,0.4)] animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100" fill="none">
          <path d="M 50,15 C 75,15 85,35 85,50 C 85,65 65,85 50,85 C 35,85 15,65 15,50 C 15,35 25,15 50,15 Z" stroke="url(#fluxBraidGrad)" stroke-width="5" stroke-linecap="round" stroke-dasharray="160" stroke-dashoffset="0">
            <animate attributeName="stroke-dashoffset" values="320;0" dur="8s" repeatCount="indefinite" />
          </path>
          <path d="M 30,50 C 30,60 70,40 70,50 C 70,60 30,40 30,50 Z" stroke="url(#fluxBraidGrad2)" stroke-width="3" stroke-linecap="round" stroke-dasharray="80" stroke-dashoffset="0">
            <animate attributeName="stroke-dashoffset" values="0;160" dur="6s" repeatCount="indefinite" />
          </path>
          <defs>
            <linearGradient id="fluxBraidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f97316" />
              <stop offset="50%" stop-color="#ef4444" />
              <stop offset="100%" stop-color="#f97316" />
            </linearGradient>
            <linearGradient id="fluxBraidGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#fca5a5" />
              <stop offset="100%" stop-color="#fb923c" />
            </linearGradient>
          </defs>
        </svg>
        <span class="text-[10px] uppercase tracking-widest text-slate-400 mt-2 font-mono font-semibold">MÖBIUS MARS</span>
      </div>`;

  el.innerHTML = `
    <div class="mx-auto max-w-5xl px-5 pt-28 pb-20 md:pt-36 md:pb-28">
      <div class="flex flex-col items-center text-center">
        <div class="relative w-40 h-40 mb-8 group flex items-center justify-center">
          <div class="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-red-500 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
          <div class="relative w-40 h-40 rounded-full overflow-hidden border-2 border-orange-500/30 shadow-2xl transition-all duration-500 hover:scale-105 hover:border-red-400/50 flex items-center justify-center bg-zinc-950">
            ${avatarMarkup}
          </div>
        </div>

        <span class="section-label mb-6">
          <span class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          ${t('hero.label')}
        </span>
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight">
          <span class="tagline-gradient">${t('hero.title')}</span>
        </h1>
        <p class="mt-6 max-w-2xl text-lg md:text-xl text-slate-300 leading-relaxed">
          ${t('hero.subtitle')}
        </p>
        <div class="mt-10 flex flex-wrap justify-center gap-4">
          <a href="#articles" class="cta-btn">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
            ${t('hero.cta_primary')}
          </a>
          <a href="#links" class="cta-btn !bg-white/10 !shadow-none hover:!bg-white/15">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
            ${t('hero.cta_secondary')}
          </a>
        </div>
      </div>
    </div>
  `;

  window.handleAvatarError = function(img) {
    img.style.display = 'none';
    const parent = img.parentElement;
    if (parent) {
      parent.innerHTML = `<div id="avatarFallback" class="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black to-zinc-900 p-4 text-center select-none">
        <svg class="w-20 h-20 text-orange-400 drop-shadow-[0_0_15px_rgba(249,115,22,0.4)] animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100" fill="none">
          <path d="M 50,15 C 75,15 85,35 85,50 C 85,65 65,85 50,85 C 35,85 15,65 15,50 C 15,35 25,15 50,15 Z" stroke="url(#fluxBraidGrad)" stroke-width="5" stroke-linecap="round" stroke-dasharray="160" stroke-dashoffset="0"></path>
        </svg>
        <span class="text-[10px] uppercase tracking-widest text-slate-400 mt-2 font-mono font-semibold">MÖBIUS MARS</span>
      </div>`;
    }
  };
}

// === VIEW: PHILOSOPHY VIEW ===
function renderPhilosophyView() {
  const el = document.getElementById('philosophy');
  if (!el) return;
  el.innerHTML = `
    <div class="mx-auto max-w-5xl px-5 py-20 md:py-28">
      <div class="fade-in max-w-3xl mx-auto">
        <span class="section-label mb-6 inline-flex">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
          ${t('philosophy.label')}
        </span>
        <h2 class="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">${t('philosophy.title')}</h2>
        <p class="text-lg text-slate-300 leading-relaxed mb-8">${t('philosophy.body')}</p>

        <div class="grid md:grid-cols-3 gap-5 mt-10">
          <div class="card p-6">
            <div class="w-10 h-10 rounded-xl bg-flux-500/10 border border-flux-500/20 flex items-center justify-center mb-4 text-flux-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            </div>
            <h3 class="font-semibold text-white mb-2">${t('philosophy.card1_title')}</h3>
            <p class="text-sm text-slate-400 leading-relaxed">${t('philosophy.card1_body')}</p>
          </div>
          <div class="card p-6">
            <div class="w-10 h-10 rounded-xl bg-braid-500/10 border border-braid-500/20 flex items-center justify-center mb-4 text-braid-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"/></svg>
            </div>
            <h3 class="font-semibold text-white mb-2">${t('philosophy.card2_title')}</h3>
            <p class="text-sm text-slate-400 leading-relaxed">${t('philosophy.card2_body')}</p>
          </div>
          <div class="card p-6">
            <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 text-amber-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3 class="font-semibold text-white mb-2">${t('philosophy.card3_title')}</h3>
            <p class="text-sm text-slate-400 leading-relaxed">${t('philosophy.card3_body')}</p>
          </div>
        </div>

        <div class="divider my-16"></div>
      </div>
    </div>
  `;
}

// === VIEW: LINKS VIEW ===
function renderLinksView() {
  const el = document.getElementById('links');
  if (!el) return;

  const LINKS = [
    {
      icon: `<svg class="w-5 h-5 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>`,
      label: 'SuperMe',
      sublabel: 'superme.ai/bzachs',
      url: 'https://superme.ai/bzachs',
      color: 'bg-orange-500/10 border border-orange-500/20',
    },
    {
      icon: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
      label: 'X / Twitter',
      sublabel: '@toplogyflux',
      url: 'https://x.com/toplogyflux',
      color: 'bg-white/10',
    },
    {
      icon: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>`,
      label: 'Medium',
      sublabel: 'zachbobby8.medium.com',
      url: 'https://zachbobby8.medium.com',
      color: 'bg-white/10',
    },
    {
      icon: `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>`,
      label: '5ir.dev',
      sublabel: 'Main Website',
      url: 'https://5ir.dev',
      color: 'bg-white/10',
    },
  ];

  el.innerHTML = `
    <div class="mx-auto max-w-5xl px-5 py-16 md:py-24">
      <div class="fade-in max-w-xl mx-auto">
        <span class="section-label mb-6 inline-flex">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
          ${t('links.label')}
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-10">${t('links.title')}</h2>

        <div class="flex flex-col gap-4" id="linksList">
          ${LINKS.map(link => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="link-btn" aria-label="${link.label}">
              <span class="link-icon ${link.color} text-slate-300">${link.icon}</span>
              <span class="flex-1">
                <span class="block text-white font-semibold">${link.label}</span>
                <span class="block text-xs text-slate-500 mt-0.5">${link.sublabel}</span>
              </span>
              <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// === VIEW: ARTICLES GRID VIEW ===
let cachedMergedArticles = [];
async function renderArticlesView() {
  const el = document.getElementById('articles');
  if (!el) return;

  let customArticles = [];
  try {
    const raw = await safeStorage.getItem('custom_articles');
    customArticles = raw ? JSON.parse(raw) : [];
  } catch (err) {
    customArticles = [];
  }

  cachedMergedArticles = [...customArticles, ...HARDCODED_PLACEHOLDERS];

  el.innerHTML = `
    <div class="mx-auto max-w-5xl px-5 py-16 md:py-24">
      <div class="fade-in">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span class="section-label mb-4 inline-flex">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
              ${t('articles.label')}
            </span>
            <h2 class="text-3xl md:text-4xl font-bold text-white">${t('articles.title')}</h2>
          </div>
          <a href="https://zachbobby8.medium.com" target="_blank" rel="noopener noreferrer"
            class="text-sm text-orange-400 hover:text-orange-300 font-medium flex items-center gap-1.5 transition-colors">
            ${t('articles.view_all')}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>

        <div class="grid md:grid-cols-2 gap-6" id="articleGrid">
          ${cachedMergedArticles.map(article => renderArticleCardHtml(article)).join('')}
        </div>
      </div>
    </div>
  `;

  el.querySelectorAll('.article-card-trigger').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const articleId = card.getAttribute('data-id');
      const found = cachedMergedArticles.find(a => a.id === articleId);
      if (found) {
        openArticleReaderModal(found);
      }
    });
  });
}

function renderArticleCardHtml(article) {
  const lockSvg = `<svg class="w-3.5 h-3.5 text-orange-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>`;
  const bannerMini = article.bannerUrl 
    ? `<div class="h-44 w-full overflow-hidden bg-black border-b border-white/5 relative">
        <img src="${article.bannerUrl}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
       </div>`
    : '';

  return `
    <div data-id="${article.id}" class="article-card-trigger article-card block group overflow-hidden" role="button" aria-label="${article.title}">
      ${bannerMini}
      <div class="p-6">
        <div class="flex items-center justify-between mb-4">
          <span class="article-badge ${article.tagColor || 'bg-white/5 text-slate-300 border border-white/10'}">${article.tag}</span>
          ${article.isPremium ? `
            <span class="article-badge bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center gap-1.5">
              ${lockSvg}
              ${t('articles.premium')}
            </span>
          ` : `
            <span class="article-badge bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              OPEN LOG
            </span>
          `}
        </div>
        <h3 class="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors leading-snug">
          ${article.title}
        </h3>
        <p class="text-sm text-slate-300 leading-relaxed mb-4 line-clamp-2">
          ${article.subtitle}
        </p>
        <div class="flex items-center gap-4 text-xs text-slate-400">
          <span>${article.date}</span>
          <span class="w-1 h-1 rounded-full bg-zinc-700"></span>
          <span>${article.readTime}</span>
        </div>
      </div>
    </div>
  `;
}

// === VIEW: ARTICLE READER MODAL ===
async function openArticleReaderModal(article) {
  const subscribed = await isUserSubscribed();
  const locked = article.isPremium && !subscribed;

  const modal = document.createElement('div');
  modal.id = 'articleReaderModal';
  modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-void/90 backdrop-blur-xl transition-all duration-300 opacity-0';
  
  const bannerStyle = article.bannerUrl 
    ? `background-image: url('${article.bannerUrl}')`
    : `background: radial-gradient(circle at 70% 30%, rgba(249,115,22,0.18), transparent 60%), radial-gradient(circle at 10% 80%, rgba(239,68,68,0.18), transparent 50%)`;

  const fullContentHtml = renderArticleBodyText(article);
  let visibleContentHtml = fullContentHtml;

  if (locked) {
    const paragraphs = fullContentHtml.split('</p>');
    if (paragraphs.length > 2) {
      visibleContentHtml = paragraphs.slice(0, 2).join('</p>') + '</p>';
    } else {
      visibleContentHtml = paragraphs[0] + '</p>';
    }
  }

  modal.innerHTML = `
    <div class="relative w-full max-w-3xl max-h-[85vh] md:max-h-[80vh] flex flex-col bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl transform scale-95 transition-all duration-300">
      <div class="h-32 md:h-44 w-full bg-cover bg-center relative flex-shrink-0" style="${bannerStyle}">
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
        <button id="closeReaderBtn" class="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 border border-white/10 text-slate-400 hover:text-white hover:bg-black/80 transition-all" aria-label="Close reader">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto px-6 pb-8 md:px-10 md:pb-12 custom-scrollbar">
        <div class="flex items-center gap-3 mb-4 -mt-2 relative z-10">
          <span class="article-badge bg-white/5 text-slate-300 border border-white/10 uppercase">${article.tag}</span>
          ${article.isPremium ? `
            <span class="article-badge bg-orange-500/10 text-orange-400 border border-orange-500/25 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 animate-pulse" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              DEEP LOG
            </span>
          ` : ''}
          <span class="text-xs text-slate-400">${article.date}</span>
          <span class="w-1 h-1 rounded-full bg-zinc-700"></span>
          <span class="text-xs text-slate-400">${article.readTime}</span>
        </div>

        <h1 class="text-2xl md:text-4xl font-black text-white leading-tight mb-4">${article.title}</h1>
        <p class="text-base md:text-lg text-slate-300 italic mb-8 border-l-2 border-orange-500 pl-4 leading-relaxed">${article.subtitle}</p>

        <div class="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-6 text-base ${locked ? 'relative select-none max-h-80 overflow-hidden' : ''}" id="articleBody">
          ${visibleContentHtml}
          ${locked ? `<div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-900 to-transparent pointer-events-none"></div>` : ''}
        </div>

        ${locked ? `
          <div class="mt-8 p-6 md:p-8 rounded-xl bg-gradient-to-br from-black to-zinc-900 border border-orange-500/30 text-center relative z-20 shadow-xl">
            <div class="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mx-auto mb-4 pulse-glow">
              <svg class="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            </div>
            <h3 class="text-lg md:text-xl font-bold text-white mb-2">Continue Reading on Mars</h3>
            <p class="text-xs md:text-sm text-slate-400 max-w-md mx-auto mb-6">
              This concept belongs to the deep archives of the 5th Industrial Revolution. Enter your email to join the waitlist, instantly unlock full access, and notify the author!
            </p>
            <form id="readerWaitlistForm" class="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                id="readerWaitlistEmail" 
                placeholder="Enter your email address" 
                required
                class="w-full bg-black/90 border border-white/10 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all placeholder-slate-600"
              >
              <button type="submit" class="cta-btn !py-3 w-full sm:w-auto font-semibold text-sm shadow-orange-500/20 hover:shadow-orange-500/40 whitespace-nowrap">
                Unlock Full Paper
              </button>
            </form>
          </div>
        ` : ''}

        ${!locked && article.url && article.url.startsWith('http') ? `
          <div class="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span class="text-xs text-slate-500">Originally published on Medium</span>
            <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1">
              Read on Medium
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  setTimeout(() => {
    modal.classList.remove('opacity-0');
    modal.querySelector('.transform').classList.remove('scale-95');
  }, 10);

  const closeModal = () => {
    modal.classList.add('opacity-0');
    modal.querySelector('.transform').classList.add('scale-95');
    setTimeout(() => {
      modal.remove();
      renderArticlesView();
    }, 300);
  };

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  modal.querySelector('#closeReaderBtn')?.addEventListener('click', closeModal);

  modal.querySelector('#readerWaitlistForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = modal.querySelector('#readerWaitlistEmail');
    const emailValue = emailInput.value.trim();

    try {
      await subscribeUserEmail(emailValue);
      showToast('Waitlist Joined! Full article unlocked successfully.', 'success');
      closeModal();
      setTimeout(() => {
        openArticleReaderModal(article);
      }, 350);
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}

function renderArticleBodyText(article) {
  if (article.content) {
    return article.content
      .split('\n\n')
      .map(p => {
        if (p.startsWith('# ')) return `<h2 class="text-xl md:text-2xl font-bold text-white mt-8 mb-4">${p.replace('# ', '')}</h2>`;
        if (p.startsWith('## ')) return `<h3 class="text-lg md:text-xl font-bold text-slate-200 mt-6 mb-3">${p.replace('## ', '')}</h3>`;
        if (p.startsWith('> ')) return `<blockquote class="border-l-4 border-orange-500 pl-4 py-1 italic text-slate-300 bg-white/5 rounded-r-lg my-6 pr-4">${p.replace('> ', '')}</blockquote>`;
        return `<p class="leading-relaxed text-slate-300">${p}</p>`;
      })
      .join('');
  }

  return `
    <p>We live in an era where computation is modeled on logical gating, binary switches, and synchronous silicon pipelines. But nature does not calculate with silicon on the surfaces of Mars. Nature computes in flows. Winds blowing through a chasm, plasma looping through magnetic fields, mass woven in topological knots—these are physical computers operating on continuous fluid equations.</p>
    <p>This is the core insight of the <strong>Theory of Woven Topology</strong>. In this worldview, particles are not hard marbles placed in a vacuum; they are localized structures, continuous with the medium itself, woven out of flows. When these flows wrap around themselves, they build closed configurations. That which we perceive as inert 'mass' is actually the self-stabilizing boundary of a topological braid.</p>
    <blockquote>"Mass emerges not as an intrinsic property of a point, but as the mathematical resonance of a boundary."</blockquote>
    <h2>The Failure of Classical Coding on Mars</h2>
    <p>Today's software engineering paradigms treat memory and instructions as completely disjoint containers. We write instructions to fetch data, move it across bus lines, transform it, and write it back. This causes a massive cognitive split—creating rigid, brittle code bases that cannot self-repair or adapt to non-linear planetary changes.</p>
    <p><strong>Flux (Fluid Logic Language)</strong> is our creative alternative. In Flux, program state is treated as a continuous fluid field. Functions are not static lists of instructions; they are geometric boundaries and topological channels that redirect the flows of logic. By weaving these channels, we build software that adapts organically, scales without centralized bottle-necks, and maps natively onto topological quantum computing layouts.</p>
    <h2>Architecting the 5th Industrial Revolution</h2>
    <p>The first four industrial revolutions built on muscles, machines, assembly lines, and digital registers. The 5th Industrial Revolution will not be about faster computation, but about a fundamentally unified model of human thought and material reality.</p>
    <p>By shifting our core framework from "discrete machines" to "continuous braids of flows", we unlock novel physical architectures, truly non-von Neumann hardware, and topological frameworks for understanding complexity itself. We are weaving the future. One loop at a time.</p>
  `;
}

// === VIEW: SUBSCRIBE WAITLIST VIEW ===
async function renderSubscribeView() {
  const el = document.getElementById('subscribe');
  if (!el) return;

  const isSubscribed = await isUserSubscribed();

  el.innerHTML = `
    <div class="mx-auto max-w-5xl px-5 py-16 md:py-28">
      <div class="fade-in max-w-lg mx-auto text-center">
        <span class="section-label mb-6 inline-flex">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          ${t('subscribe.label')}
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">${t('subscribe.title')}</h2>
        <p class="text-slate-400 mb-10 leading-relaxed">${t('subscribe.subtitle')}</p>

        <div class="pricing-card text-center">
          <div class="mb-6">
            <div class="flex items-baseline justify-center gap-1">
              <span class="text-5xl font-black text-white">$2</span>
              <span class="text-slate-400 text-lg">${t('subscribe.per_month')}</span>
            </div>
          </div>

          <ul class="text-left space-y-3 mb-8 max-w-xs mx-auto">
            ${[
              t('subscribe.feature_1'),
              t('subscribe.feature_2'),
              t('subscribe.feature_3'),
              t('subscribe.feature_4'),
            ].map(f => `
              <li class="flex items-start gap-3 text-sm text-slate-300">
                <svg class="w-5 h-5 text-flux-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                ${f}
              </li>
            `).join('')}
          </ul>

          ${isSubscribed ? `
            <div class="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center">
              <span class="text-sm font-semibold text-orange-400 flex items-center justify-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                You are on the Deep Archive Waitlist
              </span>
              <p class="text-[10px] text-slate-500 mt-1">Full access granted to all locked pieces on-site.</p>
            </div>
          ` : `
            <form id="subscribeWaitlistForm" class="space-y-3 max-w-xs mx-auto">
              <input 
                type="email" 
                id="subscribeEmailInput" 
                placeholder="Enter your email to join" 
                required
                class="w-full bg-void/90 border border-white/10 focus:border-flux-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all text-center placeholder-slate-600"
              >
              <button type="submit" class="cta-btn w-full">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                Weave Into Waitlist
              </button>
            </form>
          `}

          <p class="mt-4 text-[10px] text-slate-500">Payments integrated coming soon. Join the waitlist for notifications!</p>
        </div>
      </div>
    </div>
  `;

  document.getElementById('subscribeWaitlistForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('subscribeEmailInput');
    const emailVal = emailInput.value.trim();

    try {
      await subscribeUserEmail(emailVal);
      showToast("You're on the waitlist! Premium access unlocked.", 'success');
      await renderSubscribeView();
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}

// === CREATOR PORTAL CMS CORE ===
function initCmsPortal() {
  if (document.getElementById('cmsPortalTrigger')) return;

  const trigger = document.createElement('div');
  trigger.className = 'fixed bottom-6 right-6 z-40';
  trigger.innerHTML = `
    <button id="cmsPortalTrigger" class="flex items-center gap-2 p-3.5 rounded-full bg-black/90 border border-white/10 hover:border-orange-500/40 text-slate-400 hover:text-orange-500 backdrop-blur-md shadow-2xl transition-all hover:scale-105 active:scale-95 group" title="Access Creator Console">
      <svg class="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
      <span class="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-xs font-semibold tracking-wider uppercase whitespace-nowrap">Creator Console</span>
    </button>
  `;
  document.body.appendChild(trigger);

  document.getElementById('cmsPortalTrigger')?.addEventListener('click', () => {
    openAuthModal();
  });
}

function openAuthModal() {
  if (document.getElementById('cmsAuthModal')) return;

  const modal = document.createElement('div');
  modal.id = 'cmsAuthModal';
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-all duration-300 opacity-0';
  modal.innerHTML = `
    <div class="relative w-full max-w-sm bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-2xl transform scale-95 transition-all duration-300 text-center">
      <button id="closeAuthBtn" class="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors" aria-label="Close auth panel">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>

      <div class="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-4 text-orange-500">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
      </div>

      <h3 class="text-xl font-bold text-white mb-1">Creator Console</h3>
      <p class="text-xs text-slate-400 mb-6">Enter credentials to publish or edit articles.</p>

      <form id="cmsAuthForm" class="space-y-4">
        <div>
          <label class="block text-left text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Aether Passkey</label>
          <input 
            type="password" 
            id="cmsPasskeyInput" 
            placeholder="Default key: weave" 
            required 
            class="w-full bg-black border border-white/10 focus:border-orange-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all text-center"
          >
        </div>
        <button type="submit" class="cta-btn w-full !py-3 font-semibold text-sm">
          Access Archive
        </button>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  setTimeout(() => {
    modal.classList.remove('opacity-0');
    modal.querySelector('.transform').classList.remove('scale-95');
    document.getElementById('cmsPasskeyInput')?.focus();
  }, 10);

  const closeModal = () => {
    modal.classList.add('opacity-0');
    modal.querySelector('.transform').classList.add('scale-95');
    setTimeout(() => modal.remove(), 300);
  };

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  modal.querySelector('#closeAuthBtn')?.addEventListener('click', closeModal);

  modal.querySelector('#cmsAuthForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputVal = document.getElementById('cmsPasskeyInput').value;
    if (inputVal.trim().toLowerCase() === CREATOR_PASSKEY) {
      closeModal();
      setTimeout(() => openCMSDashboard(), 350);
    } else {
      showToast('Decryption keys mismatched. Access denied.', 'error');
    }
  });
}

function openCMSDashboard() {
  if (document.getElementById('cmsDashboardModal')) return;

  const modal = document.createElement('div');
  modal.id = 'cmsDashboardModal';
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl transition-all duration-300 opacity-0';
  
  modal.innerHTML = `
    <div class="relative w-full max-w-5xl h-[90vh] flex flex-col bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl transform scale-95 transition-all duration-300">
      
      <!-- Dashboard Header -->
      <div class="px-6 py-4 border-b border-white/10 bg-black flex items-center justify-between flex-shrink-0">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-red-500 flex items-center justify-center text-white">
            <span class="font-bold text-sm">☄</span>
          </div>
          <div>
            <h3 class="font-bold text-white text-base">Möbius Mars Weaver CMS</h3>
            <span class="text-[10px] text-slate-500 tracking-wider uppercase">Planetary Publication & Subscriber Hub</span>
          </div>
        </div>
        <button id="closeDashboardBtn" class="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors" aria-label="Close portal">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Tab Navigation -->
      <div class="flex border-b border-white/10 bg-black px-6 py-2 gap-4 text-xs font-semibold tracking-wider text-slate-400 flex-shrink-0">
        <button id="tabEditorBtn" class="py-2 px-3 border-b-2 border-orange-500 text-white transition-all flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          Compose Articles
        </button>
        <button id="tabSubsBtn" class="py-2 px-3 border-b-2 border-transparent hover:text-white transition-all flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          Subscribers & Webhooks
        </button>
        <button id="tabDeployBtn" class="py-2 px-3 border-b-2 border-transparent hover:text-white transition-all flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
          Vercel / GitHub Deploy
        </button>
      </div>

      <div class="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        <!-- Tab 1: Editor View -->
        <div id="cmsEditorView" class="flex-1 flex flex-col md:flex-row overflow-hidden w-full">
          <div class="w-full md:w-80 border-r border-white/10 bg-black/40 overflow-y-auto p-4 flex flex-col gap-4 flex-shrink-0">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Dynamic Articles</h4>
              <span id="articleCountBadge" class="text-[10px] bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-full font-bold">0</span>
            </div>

            <div id="cmsArticleList" class="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-1 max-h-[220px] md:max-h-none"></div>

            <div class="pt-4 border-t border-white/10 space-y-2 flex-shrink-0">
              <button id="exportJsonBtn" class="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-xs font-semibold text-slate-300 flex items-center justify-center gap-2 transition-all">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16a2 2 0 012-2h4a2 2 0 012 2m-6 0a2 2 0 002 2h4a2 2 0 002-2m-6 0V4m0 0L4 8m4-4l4 4"/></svg>
                Export Article Catalog
              </button>
              <button id="resetDatabaseBtn" class="w-full py-2.5 px-4 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-xs font-semibold text-red-400 flex items-center justify-center gap-2 transition-all">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                Wipe Custom Archives
              </button>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
            <div class="p-5 rounded-2xl bg-black/40 border border-orange-500/20 relative overflow-hidden shadow-inner">
              <div class="absolute top-0 right-0 w-64 h-64 bg-radial-gradient from-orange-500/5 to-transparent pointer-events-none"></div>
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 21l3.594-3.594m5.213-9.582a8.25 8.25 0 11-11.666 11.666L15.904 9.813a8.25 8.25 0 0111.666-11.666z"/></svg>
                <h4 class="text-xs font-bold text-white uppercase tracking-wider">Mars AI Creative Partner</h4>
              </div>
              <p class="text-xs text-slate-400 mb-4">Generate futuristic outlines or fully-articulated research documents directly on-demand.</p>
              
              <div class="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  id="aiPromptInput" 
                  placeholder="Topic, e.g., 'Martian atmospheric topology and the geometry of matter'" 
                  class="flex-1 bg-black/80 border border-white/10 focus:border-orange-500/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none"
                >
                <div class="flex gap-2">
                  <button id="aiDraftTextBtn" class="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all whitespace-nowrap shadow-lg shadow-orange-500/10">
                    Compose Article
                  </button>
                  <button id="aiDraftImgBtn" class="px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all whitespace-nowrap shadow-lg shadow-red-500/10">
                    Illustrate Banner
                  </button>
                </div>
              </div>
              <div id="aiOutputLog" class="hidden mt-4 p-3 bg-black/80 border border-white/10 rounded-xl text-[11px] font-mono text-slate-400 whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto"></div>
            </div>

            <form id="articleForm" class="space-y-5">
              <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Article Parameters</h4>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div class="md:col-span-2">
                  <label class="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Title</label>
                  <input 
                    type="text" 
                    id="formTitle" 
                    required
                    placeholder="e.g. Atmosphere Emergence as Woven Topology" 
                    class="w-full bg-black border border-white/10 focus:border-orange-500/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  >
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Niche / Tag</label>
                  <select 
                    id="formTag" 
                    class="w-full bg-black border border-white/10 focus:border-orange-500/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Language">Language</option>
                    <option value="Topology">Topology</option>
                    <option value="Vision">Vision</option>
                    <option value="General">General Philosophy</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Subtitle / Synopsis</label>
                <input 
                  type="text" 
                  id="formSubtitle" 
                  required 
                  placeholder="e.g. Exploring the TOE - a Theory of Everything grounded in fluid dynamics." 
                  class="w-full bg-black border border-white/10 focus:border-orange-500/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                >
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label class="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Read Time</label>
                  <input 
                    type="text" 
                    id="formReadTime" 
                    required 
                    placeholder="e.g. 8 min read" 
                    class="w-full bg-black border border-white/10 focus:border-orange-500/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  >
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Access Clearance</label>
                  <select 
                    id="formPremium" 
                    class="w-full bg-black border border-white/10 focus:border-orange-500/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  >
                    <option value="false">Free Access</option>
                    <option value="true">Members Only (Waitlist)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">External Link (Optional)</label>
                  <input 
                    type="text" 
                    id="formUrl" 
                    placeholder="e.g. https://medium.com/your-article" 
                    class="w-full bg-black border border-white/10 focus:border-orange-500/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  >
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Banner Illustration URL</label>
                <div class="flex gap-3">
                  <input 
                    type="text" 
                    id="formBannerUrl" 
                    placeholder="e.g. https://images.unsplash.com/... or generated illustration" 
                    class="flex-1 bg-black border border-white/10 focus:border-orange-500/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  >
                  <div id="bannerPreviewContainer" class="w-12 h-12 rounded-lg border border-white/10 overflow-hidden bg-black flex items-center justify-center text-slate-600 flex-shrink-0">
                    <span class="text-xs">No art</span>
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Full Content</label>
                <textarea 
                  id="formContent" 
                  rows="8" 
                  placeholder="Write your article. Use # Header or > Blockquote for rich formatting. Ensure multi-paragraph length so teaser splits beautifully!" 
                  class="w-full bg-black border border-white/10 focus:border-orange-500/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none font-sans leading-relaxed"
                ></textarea>
              </div>

              <div class="pt-4 flex justify-end gap-3">
                <button type="button" id="clearFormBtn" class="px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-slate-400 hover:text-white transition-all">
                  Clear
                </button>
                <button type="submit" class="cta-btn !py-3 !px-8 text-sm">
                  Publish to Archive
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Tab 2: Subscribers View -->
        <div id="cmsSubsView" class="hidden flex-1 overflow-y-auto p-6 md:p-8 space-y-6 w-full">
          <div class="grid md:grid-cols-2 gap-6">
            <div class="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
              <div class="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider">
                <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                Backend Webhook Pipeline
              </div>
              <p class="text-xs text-slate-400 leading-relaxed">
                Connect an external notification pipeline. Every email signup will automatically dispatch a secure JSON payload so you receive immediate emails or trigger automation.
              </p>
              <div class="space-y-3">
                <div>
                  <label class="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Webhook URL</label>
                  <input 
                    type="url" 
                    id="webhookUrlInput" 
                    placeholder="https://formspree.io/f/your_id_here" 
                    class="w-full bg-black border border-white/10 focus:border-orange-500/50 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  >
                </div>
                <div class="flex gap-2">
                  <button id="saveWebhookBtn" class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold transition-all">Save Webhook</button>
                  <button id="testWebhookBtn" class="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg text-xs font-semibold transition-all">Test Connection</button>
                </div>
              </div>
            </div>

            <div class="p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
              <div>
                <div class="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider mb-2">
                  <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                  Waitlist Statistics
                </div>
                <div class="grid grid-cols-2 gap-4 my-4">
                  <div class="p-4 rounded-xl bg-black border border-white/10">
                    <span class="block text-[10px] text-slate-500 uppercase font-bold">Total Settlers</span>
                    <span id="statSubTotal" class="text-3xl font-black text-white">0</span>
                  </div>
                  <div class="p-4 rounded-xl bg-black border border-white/10">
                    <span class="block text-[10px] text-slate-500 uppercase font-bold">Session Signups</span>
                    <span id="statSessionTotal" class="text-3xl font-black text-orange-400">0</span>
                  </div>
                </div>
              </div>
              <div class="flex gap-2 pt-4 border-t border-white/10">
                <button id="exportCsvBtn" class="flex-1 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg text-xs font-semibold transition-all">Copy as CSV</button>
                <button id="clearSubsBtn" class="py-2 px-4 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-xs font-semibold transition-all">Reset List</button>
              </div>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
            <h4 class="text-xs font-bold text-white uppercase tracking-wider">Registered Settler Registry</h4>
            <div class="overflow-x-auto max-h-[250px] overflow-y-auto custom-scrollbar">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-white/10 text-slate-500 uppercase text-[10px] tracking-wider">
                    <th class="py-2.5">Email Address</th>
                    <th class="py-2.5">Date Joined</th>
                    <th class="py-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody id="subscribersTableBody" class="divide-y divide-white/5 text-slate-300 font-mono"></tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Tab 3: Deploy View -->
        <div id="cmsDeployView" class="hidden flex-1 overflow-y-auto p-6 md:p-8 space-y-6 w-full max-w-3xl mx-auto">
          <div class="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
            <div class="flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider">
              <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              Weave Directly to Vercel or GitHub Pages
            </div>
            <p class="text-xs text-slate-400 leading-relaxed">
              This single-page miniapp is architected as clean, static HTML/CSS/JavaScript with relative path modular imports. This makes it <strong>instantly ready</strong> for deployment on static hosting providers like Vercel, Netlify, or GitHub Pages.
            </p>
            <div class="space-y-4 pt-2 text-xs text-slate-300">
              <div class="flex items-start gap-3">
                <span class="w-5 h-5 rounded-full bg-orange-500 text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <div>
                  <strong class="text-white font-semibold">Initialize a GitHub Repository</strong>
                  <p class="text-slate-400 mt-1">Create a new repository on GitHub. Push all static workspace files inside this root directory.</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <span class="w-5 h-5 rounded-full bg-orange-500 text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <div>
                  <strong class="text-white font-semibold">Deploy directly on Vercel</strong>
                  <p class="text-slate-400 mt-1">Log into Vercel, click "Add New Project", select your GitHub repository. Vercel automatically detects the HTML/JS shell and hosts it on custom domains in seconds.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const tabEditor = modal.querySelector('#tabEditorBtn');
  const tabSubs = modal.querySelector('#tabSubsBtn');
  const tabDeploy = modal.querySelector('#tabDeployBtn');

  const viewEditor = modal.querySelector('#cmsEditorView');
  const viewSubs = modal.querySelector('#cmsSubsView');
  const viewDeploy = modal.querySelector('#cmsDeployView');

  const switchTab = (target) => {
    activeCmsTab = target;
    [tabEditor, tabSubs, tabDeploy].forEach(btn => btn?.classList.remove('border-orange-500', 'text-white'));
    [tabEditor, tabSubs, tabDeploy].forEach(btn => btn?.classList.add('border-transparent'));
    
    [viewEditor, viewSubs, viewDeploy].forEach(view => view?.classList.add('hidden'));

    if (target === 'editor') {
      tabEditor?.classList.add('border-orange-500', 'text-white');
      viewEditor?.classList.remove('hidden');
    } else if (target === 'subscribers') {
      tabSubs?.classList.add('border-orange-500', 'text-white');
      viewSubs?.classList.remove('hidden');
      loadSubscribersGrid();
    } else if (target === 'deploy') {
      tabDeploy?.classList.add('border-orange-500', 'text-white');
      viewDeploy?.classList.remove('hidden');
    }
  };

  tabEditor?.addEventListener('click', () => switchTab('editor'));
  tabSubs?.addEventListener('click', () => switchTab('subscribers'));
  tabDeploy?.addEventListener('click', () => switchTab('deploy'));

  setTimeout(() => {
    modal.classList.remove('opacity-0');
    modal.querySelector('.transform').classList.remove('scale-95');
  }, 10);

  const closeModal = () => {
    modal.classList.add('opacity-0');
    modal.querySelector('.transform').classList.add('scale-95');
    setTimeout(() => modal.remove(), 300);
  };

  document.getElementById('closeDashboardBtn')?.addEventListener('click', closeModal);

  loadCmsArticles();
  loadWebhookSettings();

  document.getElementById('articleForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    await saveNewArticle();
  });

  document.getElementById('clearFormBtn')?.addEventListener('click', () => {
    resetCmsForm();
  });

  document.getElementById('formBannerUrl')?.addEventListener('input', (e) => {
    updateBannerPreview(e.target.value);
  });

  document.getElementById('aiDraftTextBtn')?.addEventListener('click', async () => {
    const prompt = document.getElementById('aiPromptInput').value.trim();
    if (!prompt) {
      showToast('Provide a core concept prompt for Mars AI.', 'error');
      return;
    }
    await composeArticleWithAI(prompt);
  });

  document.getElementById('aiDraftImgBtn')?.addEventListener('click', async () => {
    const prompt = document.getElementById('aiPromptInput').value.trim();
    if (!prompt) {
      showToast('Provide a descriptive prompt for banner art generation.', 'error');
      return;
    }
    await generateBannerWithAI(prompt);
  });

  document.getElementById('resetDatabaseBtn')?.addEventListener('click', async () => {
    if (confirm('Are you absolutely certain you want to wipe all user-generated archives? This cannot be undone.')) {
      await safeStorage.removeItem('custom_articles');
      showToast('Custom archives successfully dissolved back into flux.', 'success');
      loadCmsArticles();
      await renderArticlesView();
    }
  });

  document.getElementById('exportJsonBtn')?.addEventListener('click', async () => {
    const raw = await safeStorage.getItem('custom_articles');
    const articles = raw ? JSON.parse(raw) : [];
    const cleanJson = JSON.stringify(articles, null, 2);
    
    const copyModal = document.createElement('div');
    copyModal.className = 'fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md';
    copyModal.innerHTML = `
      <div class="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col h-[60vh]">
        <h4 class="font-bold text-white mb-2">Export Catalog Schema</h4>
        <p class="text-xs text-slate-400 mb-4">Share this catalog structure to embed your articles permanently.</p>
        <textarea readonly class="flex-1 bg-black border border-white/10 rounded-xl p-4 font-mono text-xs text-orange-400 outline-none leading-relaxed select-all">${cleanJson}</textarea>
        <div class="mt-4 flex justify-end gap-2">
          <button id="closeExportBtn" class="px-4 py-2 bg-white/5 text-slate-300 hover:text-white rounded-xl text-xs font-semibold">Close</button>
          <button id="copyExportBtn" class="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-semibold">Copy Code</button>
        </div>
      </div>
    `;
    document.body.appendChild(copyModal);

    copyModal.querySelector('#closeExportBtn')?.addEventListener('click', () => copyModal.remove());
    copyModal.querySelector('#copyExportBtn')?.addEventListener('click', () => {
      navigator.clipboard.writeText(cleanJson);
      showToast('Article schema copied to clipboard!', 'success');
      copyModal.remove();
    });
  });

  modal.querySelector('#saveWebhookBtn')?.addEventListener('click', async () => {
    const hookVal = document.getElementById('webhookUrlInput').value.trim();
    await safeStorage.setItem('waitlist_webhook_url', hookVal);
    showToast('Admin webhook connection saved!', 'success');
  });

  modal.querySelector('#testWebhookBtn')?.addEventListener('click', async () => {
    const hookVal = document.getElementById('webhookUrlInput').value.trim();
    if (!hookVal) {
      showToast('Please enter a webhook URL first.', 'error');
      return;
    }
    showToast('Sending test notification packet...', 'success');
    try {
      await fetch(hookVal, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          test: true,
          timestamp: new Date().toISOString(),
          message: 'Mars Connection Established successfully.'
        }),
        mode: 'no-cors'
      });
      showToast('Test packet launched! Verify your inbox.', 'success');
    } catch (err) {
      showToast('Webhook packet test failed.', 'error');
    }
  });

  modal.querySelector('#exportCsvBtn')?.addEventListener('click', async () => {
    const raw = await safeStorage.getItem('waitlist_subscribers');
    const list = raw ? JSON.parse(raw) : [];
    if (list.length === 0) {
      showToast('No waitlist emails available to export.', 'error');
      return;
    }

    let csvContent = 'Email,Date Joined,Referrer\n';
    list.forEach(sub => {
      csvContent += `${sub.email},${sub.date},${sub.referrer || ''}\n`;
    });

    navigator.clipboard.writeText(csvContent);
    showToast('Waitlist CSV copied to clipboard! Paste into Excel/Google Sheets.', 'success');
  });

  modal.querySelector('#clearSubsBtn')?.addEventListener('click', async () => {
    if (confirm('Clear the local Waitlist subscriber logs? This does not alter external webhook backups.')) {
      await safeStorage.removeItem('waitlist_subscribers');
      showToast('Waitlist local cache dissolved.', 'success');
      loadSubscribersGrid();
    }
  });
}

async function loadWebhookSettings() {
  const input = document.getElementById('webhookUrlInput');
  if (!input) return;
  try {
    const raw = await safeStorage.getItem('waitlist_webhook_url');
    input.value = raw || '';
  } catch (err) {
    input.value = '';
  }
}

async function loadSubscribersGrid() {
  const tbody = document.getElementById('subscribersTableBody');
  const totalLabel = document.getElementById('statSubTotal');
  if (!tbody) return;

  let list = [];
  try {
    const raw = await safeStorage.getItem('waitlist_subscribers');
    list = raw ? JSON.parse(raw) : [];
  } catch (err) {
    list = [];
  }

  totalLabel.textContent = list.length;

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="3" class="py-12 text-center text-slate-500 italic">
          No registered planetary settlers yet. Join the waitlist from reader modal to test!
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = list.map((sub, idx) => {
    const localDate = new Date(sub.date).toLocaleDateString(undefined, {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    return `
      <tr class="hover:bg-white/5 transition-all">
        <td class="py-3 font-medium text-white">${sub.email}</td>
        <td class="py-3 text-slate-400 text-xs">${localDate}</td>
        <td class="py-3 text-right">
          <button data-delete-sub-email="${sub.email}" class="text-slate-600 hover:text-red-400 p-1 rounded transition-colors" title="Remove subscriber">
            <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('[data-delete-sub-email]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-delete-sub-email');
      if (confirm(`Remove ${email} from local subscriber listings?`)) {
        let current = [];
        try {
          const raw = await safeStorage.getItem('waitlist_subscribers');
          current = raw ? JSON.parse(raw) : [];
        } catch (err) { current = []; }
        
        current = current.filter(item => item.email !== email);
        await safeStorage.setItem('waitlist_subscribers', JSON.stringify(current));
        showToast('Settler email listings pruned.', 'success');
        loadSubscribersGrid();
      }
    });
  });
}

async function loadCmsArticles() {
  const listEl = document.getElementById('cmsArticleList');
  const countBadge = document.getElementById('articleCountBadge');
  if (!listEl) return;

  let customArticles = [];
  try {
    const raw = await safeStorage.getItem('custom_articles');
    customArticles = raw ? JSON.parse(raw) : [];
  } catch (err) {
    customArticles = [];
  }

  countBadge.textContent = customArticles.length;

  if (customArticles.length === 0) {
    listEl.innerHTML = `
      <div class="py-12 text-center text-xs text-slate-600">
        <p>No user-generated articles</p>
        <p class="text-[10px] mt-1">Use Mars AI above to weave your first.</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = customArticles.map(art => `
    <div class="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-all gap-2">
      <div class="min-w-0 flex-1">
        <h5 class="text-xs font-semibold text-white truncate">${art.title}</h5>
        <span class="text-[9px] uppercase font-bold tracking-wide text-slate-500">${art.tag} • ${art.readTime}</span>
      </div>
      <button data-delete-id="${art.id}" class="p-1.5 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete article">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
      </button>
    </div>
  `).join('');

  listEl.querySelectorAll('[data-delete-id]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-delete-id');
      if (confirm('Dissolve this article from archive permanent records?')) {
        let list = [];
        try {
          const raw = await safeStorage.getItem('custom_articles');
          list = raw ? JSON.parse(raw) : [];
        } catch (err) { list = []; }
        list = list.filter(item => item.id !== id);
        await safeStorage.setItem('custom_articles', JSON.stringify(list));
        showToast('Article dissolved successfully.', 'success');
        loadCmsArticles();
        await renderArticlesView();
      }
    });
  });
}

function resetCmsForm() {
  document.getElementById('formTitle').value = '';
  document.getElementById('formSubtitle').value = '';
  document.getElementById('formTag').value = 'Physics';
  document.getElementById('formReadTime').value = '8 min read';
  document.getElementById('formPremium').value = 'false';
  document.getElementById('formUrl').value = '';
  document.getElementById('formBannerUrl').value = '';
  document.getElementById('formContent').value = '';
  updateBannerPreview('');
}

function updateBannerPreview(url) {
  const container = document.getElementById('bannerPreviewContainer');
  if (!container) return;

  if (url && url.startsWith('http')) {
    container.innerHTML = `<img src="${url}" class="w-full h-full object-cover">`;
  } else {
    container.innerHTML = `<span class="text-[9px] text-slate-600 text-center px-1">No art</span>`;
  }
}

async function saveNewArticle() {
  const title = document.getElementById('formTitle').value.trim();
  const subtitle = document.getElementById('formSubtitle').value.trim();
  const tag = document.getElementById('formTag').value;
  const readTime = document.getElementById('formReadTime').value.trim();
  const isPremium = document.getElementById('formPremium').value === 'true';
  const url = document.getElementById('formUrl').value.trim() || '#';
  const bannerUrl = document.getElementById('formBannerUrl').value.trim();
  const content = document.getElementById('formContent').value.trim();

  const newArticle = {
    id: 'custom-' + Date.now(),
    title,
    subtitle,
    tag,
    tagColor: getTagColorString(tag),
    date: getFormattedCurrentDate(),
    readTime,
    isPremium,
    url,
    bannerUrl,
    content
  };

  try {
    let list = [];
    try {
      const raw = await safeStorage.getItem('custom_articles');
      list = raw ? JSON.parse(raw) : [];
    } catch (err) { list = []; }

    list.unshift(newArticle);
    await safeStorage.setItem('custom_articles', JSON.stringify(list));
    
    showToast('Article woven successfully into archives!', 'success');
    resetCmsForm();
    loadCmsArticles();
    await renderArticlesView();
  } catch (err) {
    showToast('Vault quota exceeded or storage failure.', 'error');
  }
}

function getTagColorString(tag) {
  switch (tag) {
    case 'Physics': return 'bg-orange-500/15 text-orange-400 border border-orange-500/20';
    case 'Language': return 'bg-red-500/15 text-red-400 border border-red-500/20';
    case 'Topology': return 'bg-zinc-500/15 text-zinc-300 border border-zinc-500/20';
    case 'Vision': return 'bg-amber-500/15 text-amber-400 border border-amber-500/20';
    default: return 'bg-white/10 text-slate-300 border border-white/10';
  }
}

function getFormattedCurrentDate() {
  const date = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

// === AI COMPILER SERVICES ===
async function composeArticleWithAI(prompt) {
  const logEl = document.getElementById('aiOutputLog');
  logEl.classList.remove('hidden');
  logEl.innerHTML = '⚡ Initiating AI synthesis beam... connecting with DeepSeek Mars servers...';

  try {
    const result = await window.miniappsAI.callModel({
      modelId: TEXT_MODEL_ID,
      messages: [
        {
          role: 'system',
          content: `You are the AI Creative Partner of "Mobius Braid", a visionary philosopher and topological architect of the 5th Industrial Revolution on Mars. Your worldview is built around "Flux" (Fluid Logic Language, computational flows), and "Woven Topology" (a TOE where matter emerges from braids of flows).
Write a high-end article outline and full drafted text. Return a strict JSON block wrapped in triple-backticks containing EXACTLY these keys (do not include other explanation outside JSON):
{
  "title": "A short, brilliant, deeply philosophical title",
  "subtitle": "An evocative and beautiful single-sentence tagline",
  "tag": "Physics" or "Language" or "Topology" or "Vision",
  "readTime": "e.g. 7 min read",
  "content": "Full detailed article content paragraphs. Use double newlines \\n\\n between paragraphs. Use # Headers or > Blockquotes as desired to fit our editorial style. Make it deeply smart, engaging, scientific, and poetic."
}`
        },
        {
          role: 'user',
          content: `Concept / Prompt: ${prompt}`
        }
      ]
    });

    const text = window.miniappsAI.extractText(result);
    logEl.innerHTML = '🧬 Extracting woven neural vectors...';

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not map structural response.");
    }

    const payload = JSON.parse(jsonMatch[0]);
    
    document.getElementById('formTitle').value = payload.title || '';
    document.getElementById('formSubtitle').value = payload.subtitle || '';
    document.getElementById('formTag').value = payload.tag || 'Physics';
    document.getElementById('formReadTime').value = payload.readTime || '8 min read';
    document.getElementById('formContent').value = payload.content || '';
    
    logEl.innerHTML = `✅ Structure synthesized successfully!

Title: ${payload.title}
Subtitle: ${payload.subtitle}`;
    showToast('Draft successfully woven into editor fields!', 'success');

  } catch (err) {
    logEl.innerHTML = `⚠️ Error during synthesis:\n${err.message}`;
    showToast('Failed to contact Aether AI neural framework.', 'error');
  }
}

async function generateBannerWithAI(prompt) {
  const logEl = document.getElementById('aiOutputLog');
  logEl.classList.remove('hidden');
  logEl.innerHTML = '🎨 Warming up FLUX image generators... synthesizing conceptual art...';

  try {
    const result = await window.miniappsAI.callStructured({
      modelId: IMAGE_MODEL_ID,
      input: {
        prompt: `futuristic topological illustration of ${prompt}, abstract cybernetic fibers, glowing vector fluid flows, 3d minimal sci-fi abstract wallpaper render, 4k, glowing orange and red accents, dark mars background`,
        width: 1024,
        height: 576,
        sync_mode: true
      }
    });

    const images = window.miniappsAI.extractImages(result);
    if (images && images.length > 0) {
      const imgUrl = images[0];
      document.getElementById('formBannerUrl').value = imgUrl;
      updateBannerPreview(imgUrl);
      logEl.innerHTML = `🎨 Art banner illustrated!
URL: ${imgUrl}`;
      showToast('Futuristic banner art illustrated and attached!', 'success');
    } else {
      throw new Error("No output visual arrays retrieved.");
    }

  } catch (err) {
    logEl.innerHTML = `⚠️ Art synthesis failed:\n${err.message}`;
    showToast('Visual generator failed. Try standard URLs.', 'error');
  }
}
