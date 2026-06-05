// === MOBIUS BRAID CONSOLIDATED SYSTEM ===
// Clean Cosmic Space Themes, 100% Reliable and Glitch-Free.

const TEXT_MODEL_ID = 'dc2db118-7888-466a-a8d1-bf9d96bab4b6'; // DeepSeek V4 Flash Instant
const IMAGE_MODEL_ID = 'b44969fb-941d-48e8-9c91-22793ad080ca'; // fal-ai/flux-2/flash
const CREATOR_PASSKEY = 'weave';

const DEFAULT_ARTICLES = [
  {
    id: 'article-1',
    title: 'Mass Emerges from a Woven Fabric of Flows',
    subtitle: 'Exploring Woven Topology: matter co-existing as self-stabilizing boundaries of continuous flow patterns.',
    tag: 'Physics',
    tagColor: 'border-sky-500/20 text-sky-400 bg-sky-950/20',
    date: 'Jan 2025',
    readTime: '8 min read',
    isPremium: false,
    url: 'https://zachbobby8.medium.com',
  },
  {
    id: 'article-2',
    title: 'Flux: A Creative Alternative to Coding',
    subtitle: 'Computation described as flowing geometric patterns through topological logical channels.',
    tag: 'Language',
    tagColor: 'border-orange-500/20 text-orange-400 bg-orange-950/20',
    date: 'Feb 2025',
    readTime: '12 min read',
    isPremium: true,
    url: '#subscribe',
  },
  {
    id: 'article-3',
    title: 'Architecting the 5th Industrial Revolution',
    subtitle: 'The shift from discrete computer registers to continuous organic flow architectures.',
    tag: 'Vision',
    tagColor: 'border-indigo-500/20 text-indigo-400 bg-indigo-950/20',
    date: 'Mar 2025',
    readTime: '10 min read',
    isPremium: true,
    url: '#subscribe',
  },
  {
    id: 'article-4',
    title: 'The Mobius Strip as Metaphor',
    subtitle: 'Planetary orbits, non-orientable systems, and why simple topology describes absolute logical truth.',
    tag: 'Topology',
    tagColor: 'border-purple-500/20 text-purple-400 bg-purple-950/20',
    date: 'Apr 2025',
    readTime: '6 min read',
    isPremium: false,
    url: 'https://zachbobby8.medium.com',
  },
];

// Translate Helper
const t = (key, values) => window.miniappI18n?.t(key, values) ?? key;

// === STORAGE INTERFACE ===
const safeStorage = {
  async getItem(key) {
    try {
      if (window.miniappsAI?.storage) {
        return await window.miniappsAI.storage.getItem(key);
      }
    } catch (e) {
      console.warn('Storage getItem fallback:', e);
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
      console.warn('Storage setItem fallback:', e);
    }
    try {
      localStorage.setItem('mobius_' + key, value);
    } catch (err) {
      console.error(err);
    }
  },
  async removeItem(key) {
    try {
      if (window.miniappsAI?.storage) {
        return await window.miniappsAI.storage.removeItem(key);
      }
    } catch (e) {
      console.warn('Storage removeItem fallback:', e);
    }
    try {
      localStorage.removeItem('mobius_' + key);
    } catch (err) {
      console.error(err);
    }
  }
};

// === TOAST SYSTEM ===
let toastTimeout = null;
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// === SUBSCRIPTIONS ===
async function isUserSubscribed() {
  const email = await safeStorage.getItem('user_subscribed_email');
  return !!email;
}

async function subscribeUserEmail(email) {
  if (!email || !email.includes('@')) {
    throw new Error('Please enter a valid email address.');
  }

  let list = [];
  try {
    const raw = await safeStorage.getItem('waitlist_subscribers');
    list = raw ? JSON.parse(raw) : [];
  } catch (e) {
    list = [];
  }

  if (!list.some(s => s.email.toLowerCase() === email.toLowerCase())) {
    list.unshift({
      email: email.toLowerCase(),
      date: new Date().toISOString(),
      referrer: window.location.href
    });
    await safeStorage.setItem('waitlist_subscribers', JSON.stringify(list));
  }

  await safeStorage.setItem('user_subscribed_email', email.toLowerCase());

  // Webhook Delivery
  try {
    const webhookUrl = await safeStorage.getItem('waitlist_webhook_url');
    if (webhookUrl && webhookUrl.startsWith('http')) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          timestamp: new Date().toISOString(),
          source: 'Mobius Braid Cosmic Archive'
        }),
        mode: 'no-cors'
      });
    }
  } catch (err) {
    console.warn('Webhook offline:', err);
  }

  window.dispatchEvent(new Event('mobius-data-change'));
}

// === COSMIC BACKGROUND & THEME SWITCHER ===
function initCosmicThemeSwitcher() {
  const controller = document.getElementById('cosmicController');
  if (!controller) return;

  controller.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      applySpaceTheme(theme);
    });
  });

  // Apply default or cached theme
  safeStorage.getItem('active_space_theme').then(saved => {
    applySpaceTheme(saved || 'aether');
  });
}

function applySpaceTheme(theme) {
  const body = document.body;
  body.classList.remove('theme-aether', 'theme-solaris', 'theme-andromeda');
  body.classList.add('theme-' + theme);

  safeStorage.setItem('active_space_theme', theme);

  // Update active state inside switcher buttons
  const controller = document.getElementById('cosmicController');
  if (controller) {
    controller.querySelectorAll('button').forEach(btn => {
      const btnTheme = btn.getAttribute('data-theme');
      if (btnTheme === theme) {
        btn.className = getThemeButtonActiveStyle(theme);
      } else {
        btn.className = 'flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all text-slate-400 hover:text-white hover:bg-white/5 border border-transparent';
      }
    });
  }

  // Live element variable overrides
  const dynamicColor = getThemePrimaryColor(theme);
  document.documentElement.style.setProperty('--theme-color-primary', dynamicColor);
}

function getThemeButtonActiveStyle(theme) {
  if (theme === 'solaris') {
    return 'flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all text-orange-400 bg-orange-950/40 border border-orange-500/40 shadow-sm';
  } else if (theme === 'andromeda') {
    return 'flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all text-purple-400 bg-purple-950/40 border border-purple-500/40 shadow-sm';
  }
  return 'flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all text-sky-400 bg-sky-950/40 border border-sky-500/40 shadow-sm';
}

function getThemePrimaryColor(theme) {
  if (theme === 'solaris') return '#f97316';
  if (theme === 'andromeda') return '#a855f7';
  return '#38bdf8';
}

// === BOOTSTRAP ===
document.addEventListener('DOMContentLoaded', async () => {
  initCosmicThemeSwitcher();
  renderHeaderView();
  await renderArticlesView();
  await renderSubscribeView();
  initCmsPortal();

  window.addEventListener('mobius-data-change', async () => {
    await renderArticlesView();
    await renderSubscribeView();
  });
});

// === VIEW: HEADER & INTRO VIEW ===
function renderHeaderView() {
  const el = document.getElementById('header');
  if (!el) return;

  const LINKS = [
    {
      label: 'SuperMe Profile',
      sublabel: 'superme.ai/bzachs',
      url: 'https://superme.ai/bzachs',
      isFeatured: true,
      icon: `<svg class='w-5 h-5 text-sky-400' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path stroke-linecap='round' stroke-linejoin='round' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'/></svg>`
    },
    {
      label: 'X / Twitter',
      sublabel: '@toplogyflux',
      url: 'https://x.com/toplogyflux',
      isFeatured: false,
      icon: `<svg class='w-5 h-5 text-slate-300' viewBox='0 0 24 24' fill='currentColor'><path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'/></svg>`
    },
    {
      label: 'Medium',
      sublabel: 'zachbobby8.medium.com',
      url: 'https://zachbobby8.medium.com',
      isFeatured: false,
      icon: `<svg class='w-5 h-5 text-slate-300' viewBox='0 0 24 24' fill='currentColor'><path d='M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z'/></svg>`
    },
    {
      label: '5ir.dev',
      sublabel: 'Main Website',
      url: 'https://5ir.dev',
      isFeatured: false,
      icon: `<svg class='w-5 h-5 text-slate-300' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path stroke-linecap='round' stroke-linejoin='round' d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'/></svg>`
    }
  ];

  el.innerHTML = `
    <div class='mx-auto max-w-4xl px-5 pt-12 pb-6 text-center fade-in'>
      
      <div class='inline-flex items-center justify-center p-1 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 mb-6 shadow-xl shadow-indigo-950/20'>
        <div class='w-24 h-24 rounded-full bg-slate-900 flex items-center justify-center border-2 border-white/10 overflow-hidden text-sky-400'>
          <svg class='w-12 h-12 text-sky-400' viewBox='0 0 100 100' fill='none'>
            <path d='M 50,15 C 75,15 85,35 85,50 C 85,65 65,85 50,85 C 35,85 15,65 15,50 C 15,35 25,15 50,15 Z' stroke='currentColor' stroke-width='6' stroke-linecap='round' stroke-dasharray='160'></path>
          </svg>
        </div>
      </div>

      <div class='block mb-4'>
        <span class='cosmic-label'>
          <span class='w-2 h-2 rounded-full bg-sky-400 animate-pulse'></span>
          Mobius Braid Cosmic Archive
        </span>
      </div>

      <h1 class='text-3xl md:text-5xl font-black tracking-tight text-white leading-tight'>
        Mobius Braid
      </h1>
      <p class='mt-4 max-w-2xl mx-auto text-sm md:text-base text-slate-300 leading-relaxed'>
        Mass emerges from a woven fabric of flows. Flux is a Fluid Logic Language — a creative alternative to coding. Explore the continuous systems, Woven Philosophy, and spatial computation.
      </p>

      <!-- Connection Directory -->
      <div class='mt-8 max-w-2xl mx-auto'>
        <div class='grid grid-cols-1 sm:grid-cols-2 gap-3.5'>
          ${LINKS.map(link => `
            <a href='${link.url}' target='_blank' rel='noopener noreferrer' 
               class="cosmic-btn ${link.isFeatured ? 'border-sky-500/30 bg-sky-950/30 hover:bg-sky-950/50 relative overflow-hidden group shadow-lg' : ''}">
              <span class="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 ${link.isFeatured ? 'bg-sky-950/80 border border-sky-500/30' : 'bg-white/5'}">
                ${link.icon}
              </span>
              <span class='flex-grow text-left'>
                <span class='block text-xs font-bold text-slate-100 flex items-center gap-1'>
                  ${link.label}
                  ${link.isFeatured ? "<span class='inline-flex w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping'></span>" : ''}
                </span>
                <span class='block text-[10px] text-slate-400 font-mono mt-0.5'>${link.sublabel}</span>
              </span>
              <svg class='w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'>
                <path stroke-linecap='round' stroke-linejoin='round' d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'/>
              </svg>
            </a>
          `).join('')}
        </div>
      </div>

      <div class='w-full h-px bg-white/5 my-10'></div>
    </div>
  `;
}

// === VIEW: ARTICLES LIST GRID ===
let cachedMergedArticles = [];
async function renderArticlesView() {
  const el = document.getElementById('articles');
  if (!el) return;

  let custom = [];
  try {
    const raw = await safeStorage.getItem('custom_articles');
    custom = raw ? JSON.parse(raw) : [];
  } catch (err) {
    custom = [];
  }

  cachedMergedArticles = [...custom, ...DEFAULT_ARTICLES];

  el.innerHTML = `
    <div class='mx-auto max-w-4xl px-5 py-4 fade-in'>
      <div class='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6'>
        <div>
          <span class='cosmic-label mb-2.5'>
            Woven Papers
          </span>
          <h2 class='text-xl md:text-2xl font-extrabold text-white tracking-tight'>Theory of Woven Systems</h2>
        </div>
        <a href='https://zachbobby8.medium.com' target='_blank' rel='noopener noreferrer'
          class='text-xs text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 transition-colors'>
          View all on Medium
          <svg class='w-3.5 h-3.5' fill='none' stroke='currentColor' stroke-width='2.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M17 8l4 4m0 0l-4 4m4-4H3'/></svg>
        </a>
      </div>

      <div class='grid md:grid-cols-2 gap-5' id='articleGrid'>
        ${cachedMergedArticles.map(art => {
          const banner = art.bannerUrl 
            ? `<div class='h-40 w-full overflow-hidden bg-slate-900 border-b border-white/5 relative'>
                <img src='${art.bannerUrl}' class='w-full h-full object-cover group-hover:scale-102 transition-transform duration-300' loading='lazy'>
               </div>`
            : '';

          return `
            <div data-id='${art.id}' class='article-card-trigger space-card cursor-pointer flex flex-col justify-between overflow-hidden group' role='button'>
              <div>
                ${banner}
                <div class='p-5'>
                  <div class='flex items-center justify-between mb-3.5'>
                    <span class='article-badge ${art.tagColor || 'border-white/10 text-slate-300'}'>${art.tag}</span>
                    ${art.isPremium ? `
                      <span class='article-badge border-purple-500/20 text-purple-400 bg-purple-950/20 flex items-center gap-1'>
                        <svg class='w-3 h-3' fill='none' stroke='currentColor' stroke-width='2.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'/></svg>
                        MEMBERS
                      </span>
                    ` : `
                      <span class='article-badge border-emerald-500/20 text-emerald-400 bg-emerald-950/20'>
                        OPEN ACCESS
                      </span>
                    `}
                  </div>
                  <h3 class='text-sm md:text-base font-bold text-slate-100 mb-1.5 group-hover:text-sky-300 transition-colors leading-snug'>
                    ${art.title}
                  </h3>
                  <p class='text-xs text-slate-400 leading-relaxed line-clamp-2'>
                    ${art.subtitle}
                  </p>
                </div>
              </div>
              <div class='px-5 pb-5 pt-1.5 flex items-center gap-3 text-[10px] text-slate-500 font-bold tracking-wider uppercase'>
                <span>${art.date}</span>
                <span class='w-1 h-1 rounded-full bg-slate-800'></span>
                <span>${art.readTime}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  el.querySelectorAll('.article-card-trigger').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const articleId = card.getAttribute('data-id');
      const found = cachedMergedArticles.find(a => a.id === articleId);
      if (found) openArticleReaderModal(found);
    });
  });
}

// === VIEW: ARTICLE READER MODAL ===
async function openArticleReaderModal(article) {
  const subscribed = await isUserSubscribed();
  const locked = article.isPremium && !subscribed;

  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-950/60 backdrop-blur-md transition-all duration-300 opacity-0';
  
  const bannerStyle = article.bannerUrl 
    ? `background-image: url('${article.bannerUrl}')`
    : `background: linear-gradient(135deg, #0f172a, #1e1b4b)`;

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
    <div class='relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-slate-900/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl transform scale-95 transition-all duration-300'>
      <div class='h-28 md:h-40 w-full bg-cover bg-center relative flex-shrink-0' style="${bannerStyle}">
        <div class='absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent'></div>
        <button id='closeReaderBtn' class='absolute top-3.5 right-3.5 p-1.5 rounded-full bg-slate-950/90 border border-white/10 text-slate-400 hover:text-white shadow-md transition-all' aria-label='Close Reader'>
          <svg class='w-4 h-4' fill='none' stroke='currentColor' stroke-width='2.5' viewBox='0 0 24 24'>
            <path stroke-linecap='round' stroke-linejoin='round' d='M6 18L18 6M6 6l12 12'/>
          </svg>
        </button>
      </div>

      <div class='flex-1 overflow-y-auto px-6 pb-6 md:px-8 md:pb-8 custom-scrollbar'>
        <div class='flex items-center gap-3.5 mb-3.5 -mt-1 relative z-10'>
          <span class='article-badge border-white/10 text-slate-300 uppercase'>${article.tag}</span>
          ${article.isPremium ? `
            <span class='article-badge border-purple-500/20 text-purple-400 bg-purple-950/20 flex items-center gap-1'>
              <svg class='w-3 h-3' fill='none' stroke='currentColor' stroke-width='2.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'/></svg>
              MEMBERS LOG
            </span>
          ` : ''}
          <span class='text-xs text-slate-400 font-semibold'>${article.date}</span>
        </div>

        <h1 class='text-lg md:text-2xl font-black text-white leading-snug mb-3'>${article.title}</h1>
        <p class='text-xs md:text-sm text-slate-300 italic mb-5 border-l-2 border-sky-500 pl-3.5 leading-relaxed'>${article.subtitle}</p>

        <div class='prose max-w-none text-slate-300 space-y-4 text-xs md:text-sm ${locked ? 'relative select-none max-h-56 overflow-hidden' : ''}' id='articleBody'>
          ${visibleContentHtml}
          ${locked ? `<div class='absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none'></div>` : ''}
        </div>

        ${locked ? `
          <div class='mt-6 p-5 rounded-xl bg-slate-950/80 border border-white/10 text-center relative z-20'>
            <div class='w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center mx-auto mb-2.5 pulse-glow text-sky-400'>
              <svg class='w-4 h-4' fill='none' stroke='currentColor' stroke-width='2.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'/></svg>
            </div>
            <h3 class='text-sm font-bold text-white mb-1'>Join waitlist to continue reading</h3>
            <p class='text-[11px] text-slate-400 max-w-md mx-auto mb-3.5'>
              This is a members-only thesis. Enter your email to instantly join the waitlist and unlock full reading access.
            </p>
            <form id='readerWaitlistForm' class='flex flex-col sm:flex-row items-center gap-2 max-w-sm mx-auto'>
              <input 
                type='email' 
                id='readerWaitlistEmail' 
                placeholder='Enter email' 
                required
                class='w-full bg-slate-900 border border-white/10 focus:border-sky-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none'
              >
              <button type='submit' class='cosmic-cta !py-1.5 !px-3.5 w-full sm:w-auto font-bold text-xs whitespace-nowrap'>
                Unlock paper
              </button>
            </form>
          </div>
        ` : ''}

        ${!locked && article.url && article.url.startsWith('http') ? `
          <div class='mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3'>
            <span class='text-[10px] text-slate-500 font-bold'>Published on Medium</span>
            <a href='${article.url}' target='_blank' rel='noopener noreferrer' class='text-[11px] font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1'>
              Read Original
              <svg class='w-3 h-3' fill='none' stroke='currentColor' stroke-width='2.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'/></svg>
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
    const val = modal.querySelector('#readerWaitlistEmail').value.trim();
    try {
      await subscribeUserEmail(val);
      showToast('Waitlist joined! Reading unlocked.', 'success');
      closeModal();
      setTimeout(() => openArticleReaderModal(article), 350);
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
        if (p.startsWith('# ')) return `<h2 class='text-base font-bold text-white mt-5 mb-2'>${p.replace('# ', '')}</h2>`;
        if (p.startsWith('## ')) return `<h3 class='text-sm font-bold text-slate-200 mt-3.5 mb-1.5'>${p.replace('## ', '')}</h3>`;
        if (p.startsWith('> ')) return `<blockquote class='border-l-4 border-sky-400 pl-3 py-1 italic text-slate-300 bg-white/5 my-3 pr-3'>${p.replace('> ', '')}</blockquote>`;
        return `<p class='leading-relaxed text-slate-300'>${p}</p>`;
      })
      .join('');
  }

  return `
    <p>Computation in the next industrial epoch is modelled on natural systems. We treat logical boundaries as continuous flowing patterns, not static discrete containers. Nature computes in topological orbits—plasma fields, atmospheric currents, and continuous molecular dynamics.</p>
    <p>This is Woven Topology: matter and logic co-existing as braids. When we define computation as continuous redirection of flows, we create self-repairing organic systems of logic.</p>
    <blockquote>"The 5th Industrial Revolution demands that Woven Logic replaces rigid instructions."</blockquote>
    <h2>Flux and the Geometry of Thought</h2>
    <p>Current models separating memory and instructions are brittle. Flux treats logical execution as a topological field. Program states flow naturally through custom geometric boundaries, bringing adaptivity to the core of complex systems.</p>
  `;
}

// === VIEW: FOOTER SUBSCRIBE ===
async function renderSubscribeView() {
  const el = document.getElementById('subscribe');
  if (!el) return;

  const isSubscribed = await isUserSubscribed();

  el.innerHTML = `
    <div class='mx-auto max-w-4xl px-5 py-4 fade-in'>
      <div class='max-w-xl mx-auto text-center'>
        <span class='cosmic-label mb-3.5'>
          Woven Community
        </span>
        <h2 class='text-xl md:text-2xl font-extrabold text-white tracking-tight mb-2'>Subscribe to the Waitlist</h2>
        <p class='text-xs text-slate-400 mb-6 leading-relaxed'>Get early access to Woven diagrams, Flux language frameworks, and deep-dives.</p>

        <div class='stellar-subscription-box max-w-sm mx-auto'>
          <div class='mb-4'>
            <div class='flex items-baseline justify-center gap-0.5'>
              <span class='text-3xl font-black text-white'>$2</span>
              <span class='text-slate-400 text-xs font-semibold'>/month</span>
            </div>
          </div>

          <ul class='text-left space-y-2 mb-6 max-w-[240px] mx-auto text-xs text-slate-300 font-semibold'>
            <li class='flex items-center gap-2'>
              <svg class='w-3.5 h-3.5 text-sky-400 flex-shrink-0' fill='none' stroke='currentColor' stroke-width='2.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M5 13l4 4L19 7'/></svg>
              Full-length members archives
            </li>
            <li class='flex items-center gap-2'>
              <svg class='w-3.5 h-3.5 text-sky-400 flex-shrink-0' fill='none' stroke='currentColor' stroke-width='2.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M5 13l4 4L19 7'/></svg>
              Woven Topology deep-dives
            </li>
            <li class='flex items-center gap-2'>
              <svg class='w-3.5 h-3.5 text-sky-400 flex-shrink-0' fill='none' stroke='currentColor' stroke-width='2.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M5 13l4 4L19 7'/></svg>
              Flux compiler tooling
            </li>
          </ul>

          ${isSubscribed ? `
            <div class='p-3.5 rounded-lg bg-slate-900 border border-white/10 text-center shadow-xs'>
              <span class='text-xs font-bold text-sky-400 flex items-center justify-center gap-1.5'>
                <svg class='w-4 h-4' fill='none' stroke='currentColor' stroke-width='2.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'/></svg>
                Waitlist Joined Successfully
              </span>
            </div>
          ` : `
            <form id='subscribeWaitlistForm' class='space-y-3 max-w-[240px] mx-auto'>
              <input 
                type='email' 
                id='subscribeEmailInput' 
                placeholder='Type your email address' 
                required
                class='w-full bg-slate-900 border border-white/10 focus:border-sky-500 rounded-lg px-3 py-2.5 text-xs text-white text-center focus:outline-none transition-all'
              >
              <button type='submit' class='cosmic-cta w-full py-2.5 text-xs font-bold'>
                Join Waitlist
              </button>
            </form>
          `}
        </div>
      </div>
    </div>
  `;

  document.getElementById('subscribeWaitlistForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const val = document.getElementById('subscribeEmailInput').value.trim();
    try {
      await subscribeUserEmail(val);
      showToast('Woven subscriber added to waitlist!', 'success');
      await renderSubscribeView();
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}

// === CREATOR PORTAL CMS ===
function initCmsPortal() {
  if (document.getElementById('cmsPortalTrigger')) return;

  const trigger = document.createElement('div');
  trigger.className = 'fixed bottom-6 right-6 z-40';
  trigger.innerHTML = `
    <button id='cmsPortalTrigger' class='flex items-center gap-1.5 p-2.5 rounded-full bg-slate-900 border border-white/10 hover:border-white/30 text-slate-400 hover:text-white shadow-md transition-all hover:scale-105 active:scale-95 group' title='Weaver Console'>
      <svg class='w-4 h-4 group-hover:rotate-45 transition-transform duration-300' fill='none' stroke='currentColor' stroke-width='2.2' viewBox='0 0 24 24'>
        <path stroke-linecap='round' stroke-linejoin='round' d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'/>
        <path stroke-linecap='round' stroke-linejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'/>
      </svg>
      <span class='max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-300 text-[10px] font-bold tracking-wider uppercase whitespace-nowrap'>Console</span>
    </button>
  `;
  document.body.appendChild(trigger);

  document.getElementById('cmsPortalTrigger')?.addEventListener('click', openAuthModal);
}

function openAuthModal() {
  if (document.getElementById('cmsAuthModal')) return;

  const modal = document.createElement('div');
  modal.id = 'cmsAuthModal';
  modal.className = 'fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md transition-all duration-300 opacity-0';
  modal.innerHTML = `
    <div class='relative w-full max-w-xs bg-slate-900 border border-white/10 rounded-2xl p-5 shadow-2xl transform scale-95 transition-all duration-300 text-center'>
      <button id='closeAuthBtn' class='absolute top-3 right-3 text-slate-400 hover:text-white transition-colors'>
        <svg class='w-3.5 h-3.5' fill='none' stroke='currentColor' stroke-width='2.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M6 18L18 6M6 6l12 12'/></svg>
      </button>

      <div class='w-10 h-10 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center mx-auto mb-3 text-sky-400'>
        <svg class='w-5 h-5' fill='none' stroke='currentColor' stroke-width='2.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'/></svg>
      </div>

      <h3 class='text-base font-bold text-white mb-1'>Weaver Console</h3>
      <p class='text-[11px] text-slate-400 mb-4'>Enter passkey to write or edit topological logs.</p>

      <form id='cmsAuthForm' class='space-y-3'>
        <input 
          type='password' 
          id='cmsPasskeyInput' 
          placeholder='Passkey: weave' 
          required 
          class='w-full bg-slate-950 border border-white/10 focus:border-sky-500 rounded-xl px-3 py-2 text-xs text-white focus:outline-none transition-all text-center'
        >
        <button type='submit' class='cosmic-cta w-full py-2 text-xs font-bold'>
          Unlock Console
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
    const key = document.getElementById('cmsPasskeyInput').value;
    if (key.trim().toLowerCase() === CREATOR_PASSKEY) {
      closeModal();
      setTimeout(openCMSDashboard, 350);
    } else {
      showToast('Incorrect passcode.', 'error');
    }
  });
}

function openCMSDashboard() {
  if (document.getElementById('cmsDashboardModal')) return;

  const modal = document.createElement('div');
  modal.id = 'cmsDashboardModal';
  modal.className = 'fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md transition-all duration-300 opacity-0';
  
  modal.innerHTML = `
    <div class='relative w-full max-w-4xl h-[85vh] flex flex-col bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl transform scale-95 transition-all duration-300'>
      
      <div class='px-5 py-3 border-b border-white/10 bg-slate-950/50 flex items-center justify-between flex-shrink-0'>
        <div class='flex items-center gap-3'>
          <div class='w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white'>
            <span class='font-bold text-xs'>☄</span>
          </div>
          <div>
            <h3 class='font-bold text-white text-xs'>Weaver Publishing Console</h3>
          </div>
        </div>
        <button id='closeDashboardBtn' class='p-1 text-slate-400 hover:text-white rounded transition-colors'>
          <svg class='w-4 h-4' fill='none' stroke='currentColor' stroke-width='2.5' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M6 18L18 6M6 6l12 12'/></svg>
        </button>
      </div>

      <div class='flex border-b border-white/5 bg-slate-900 px-5 py-1.5 gap-3 text-xs font-semibold text-slate-400 flex-shrink-0'>
        <button id='tabEditorBtn' class='py-1.5 px-2 border-b-2 border-sky-500 text-sky-400 transition-all'>
          Compose Logs
        </button>
        <button id='tabSubsBtn' class='py-1.5 px-2 border-b-2 border-transparent hover:text-white transition-all'>
          Waitlist Subscribers
        </button>
      </div>

      <div class='flex-grow flex flex-col md:flex-row overflow-hidden'>
        
        <!-- EDITOR TAB -->\n        <div id='cmsEditorView' class='flex-grow flex flex-col md:flex-row overflow-hidden w-full'>
          <div class='w-full md:w-56 border-r border-white/5 bg-slate-950/30 overflow-y-auto p-3.5 flex flex-col gap-3 flex-shrink-0'>
            <div class='flex items-center justify-between'>
              <h4 class='text-[9px] font-bold text-slate-400 uppercase tracking-widest'>Articles</h4>
              <span id='articleCountBadge' class='text-[9px] bg-slate-950 text-sky-400 border border-white/5 px-1.5 py-0.5 rounded-full font-bold'>0</span>
            </div>
            <div id='cmsArticleList' class='flex-grow space-y-1.5 overflow-y-auto custom-scrollbar max-h-[120px] md:max-h-none'></div>
            <button id='resetDatabaseBtn' class='w-full py-1.5 px-2.5 rounded-lg bg-red-950/20 hover:bg-red-900/30 border border-red-500/20 text-[9px] font-bold text-red-400 transition-all'>
              Reset Custom Articles
            </button>
          </div>

          <div class='flex-grow overflow-y-auto p-5 space-y-5 custom-scrollbar'>
            <div class='p-3.5 rounded-xl bg-slate-950/50 border border-white/10'>
              <div class='flex items-center gap-1 mb-1.5'>
                <h4 class='text-[10px] font-bold text-slate-300 uppercase tracking-wider'>Aether AI Creative Partner</h4>
              </div>
              <div class='flex flex-col sm:flex-row gap-2'>
                <input 
                  type='text' 
                  id='aiPromptInput' 
                  placeholder='Topic outline: atmospheric flow logic' 
                  class='flex-grow bg-slate-900 border border-white/10 focus:border-sky-500 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none'
                >
                <div class='flex gap-1.5'>
                  <button id='aiDraftTextBtn' class='px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs rounded-lg transition-all'>
                    Draft Text
                  </button>
                  <button id='aiDraftImgBtn' class='px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg transition-all'>
                    Design Art
                  </button>
                </div>
              </div>
              <div id='aiOutputLog' class='hidden mt-2.5 p-2 bg-slate-950 border border-white/5 rounded-lg text-[9px] font-mono text-slate-400 max-h-24 overflow-y-auto'></div>
            </div>

            <form id='articleForm' class='space-y-3.5'>
              <div class='grid grid-cols-1 sm:grid-cols-3 gap-3.5'>
                <div class='sm:col-span-2'>
                  <label class='block text-[9px] font-bold text-slate-400 uppercase mb-1'>Title</label>
                  <input type='text' id='formTitle' required class='w-full bg-slate-900 border border-white/10 focus:border-sky-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none'>
                </div>
                <div>
                  <label class='block text-[9px] font-bold text-slate-400 uppercase mb-1'>Tag</label>
                  <select id='formTag' class='w-full bg-slate-900 border border-white/10 focus:border-sky-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none'>
                    <option value='Physics'>Physics</option>
                    <option value='Language'>Language</option>
                    <option value='Topology'>Topology</option>
                    <option value='Vision'>Vision</option>
                  </select>
                </div>
              </div>

              <div>
                <label class='block text-[9px] font-bold text-slate-400 uppercase mb-1'>Synopsis</label>
                <input type='text' id='formSubtitle' required class='w-full bg-slate-900 border border-white/10 focus:border-sky-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none'>
              </div>

              <div class='grid grid-cols-1 sm:grid-cols-3 gap-3.5'>
                <div>
                  <label class='block text-[9px] font-bold text-slate-400 uppercase mb-1'>Read Time</label>
                  <input type='text' id='formReadTime' required placeholder='8 min read' class='w-full bg-slate-900 border border-white/10 focus:border-sky-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none'>
                </div>
                <div>
                  <label class='block text-[9px] font-bold text-slate-400 uppercase mb-1'>Access Clearance</label>
                  <select id='formPremium' class='w-full bg-slate-900 border border-white/10 focus:border-sky-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none'>
                    <option value='false'>Free</option>
                    <option value='true'>Members Only</option>
                  </select>
                </div>
                <div>
                  <label class='block text-[9px] font-bold text-slate-400 uppercase mb-1'>Art / Banner URL</label>
                  <input type='text' id='formBannerUrl' placeholder='Banner image address' class='w-full bg-slate-900 border border-white/10 focus:border-sky-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none'>
                </div>
              </div>

              <div>
                <label class='block text-[9px] font-bold text-slate-400 uppercase mb-1'>Content Narrative</label>
                <textarea id='formContent' rows='4' required class='w-full bg-slate-900 border border-white/10 focus:border-sky-500 rounded-lg p-3 text-xs text-white focus:outline-none font-sans leading-relaxed'></textarea>
              </div>

              <div class='flex justify-end gap-2 pt-2'>
                <button type='button' id='clearFormBtn' class='px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-slate-400 hover:text-white transition-all'>Clear</button>
                <button type='submit' class='cosmic-cta !py-1.5 !px-4 text-xs font-bold'>Publish Log</button>
              </div>
            </form>
          </div>
        </div>

        <!-- SUBSCRIBERS TAB -->
        <div id='cmsSubsView' class='hidden flex-grow overflow-y-auto p-5 space-y-5 w-full custom-scrollbar'>
          <div class='grid md:grid-cols-2 gap-4'>
            <div class='p-3.5 rounded-xl bg-slate-950/40 border border-white/10 space-y-2'>
              <h5 class='text-xs font-bold text-slate-200 uppercase'>Webhook Node</h5>
              <p class='text-[10px] text-slate-400 leading-relaxed'>Connect automation links. Triggers JSON subscriber info on waited members joins.</p>
              <div class='space-y-1.5'>
                <input type='url' id='webhookUrlInput' placeholder='https://formspree.io/...' class='w-full bg-slate-900 border border-white/10 focus:border-sky-500 rounded-lg p-2 text-xs text-white focus:outline-none'>
                <div class='flex gap-1.5'>
                  <button id='saveWebhookBtn' class='px-3 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded text-[10px] font-bold transition-all'>Save Pipeline</button>
                  <button id='testWebhookBtn' class='px-3 py-1 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 rounded text-[10px] font-bold transition-all'>Test Link</button>
                </div>
              </div>
            </div>

            <div class='p-3.5 rounded-xl bg-slate-950/40 border border-white/10 flex flex-col justify-between'>
              <div>
                <h5 class='text-xs font-bold text-slate-200 uppercase mb-2'>Waitlist Stats</h5>
                <div class='grid grid-cols-2 gap-2'>
                  <div class='p-2 bg-slate-900 border border-white/5 rounded-lg'>
                    <span class='block text-[9px] text-slate-400 font-bold uppercase'>Registered</span>
                    <span id='statSubTotal' class='text-xl font-black text-white'>0</span>
                  </div>
                  <div class='p-2 bg-slate-900 border border-white/5 rounded-lg'>
                    <span class='block text-[9px] text-slate-400 font-bold uppercase'>Added Now</span>
                    <span id='statSessionTotal' class='text-xl font-black text-sky-400'>0</span>
                  </div>
                </div>
              </div>
              <div class='flex gap-1.5 pt-2 border-t border-white/5 mt-2'>
                <button id='exportCsvBtn' class='flex-1 py-1 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 rounded text-[10px] font-bold transition-all'>Copy CSV</button>
                <button id='clearSubsBtn' class='py-1 px-2 bg-red-950/20 hover:bg-red-950/35 text-red-400 rounded text-[10px] font-bold transition-all'>Wipe Registry</button>
              </div>
            </div>
          </div>

          <div class='p-3.5 rounded-xl bg-slate-950/40 border border-white/10'>
            <h4 class='text-xs font-bold text-slate-200 uppercase mb-2'>Subscribed Settlers Registry</h4>
            <div class='overflow-x-auto max-h-[140px] overflow-y-auto custom-scrollbar'>
              <table class='w-full text-left text-xs'>
                <thead>
                  <tr class='border-b border-white/5 text-slate-400 uppercase text-[9px] font-bold'>
                    <th class='py-1.5'>Email</th>
                    <th class='py-1.5'>Joined</th>
                    <th class='py-1.5 text-right'>Action</th>
                  </tr>
                </thead>
                <tbody id='subscribersTableBody' class='divide-y divide-white/5 text-slate-300 font-mono'></tbody>\n              </table>\n            </div>\n          </div>\n        </div>\n\n      </div>\n    </div>\n  `;

  document.body.appendChild(modal);

  const tabEditor = modal.querySelector('#tabEditorBtn');
  const tabSubs = modal.querySelector('#tabSubsBtn');
  const viewEditor = modal.querySelector('#cmsEditorView');
  const viewSubs = modal.querySelector('#cmsSubsView');

  const switchTab = (target) => {
    if (target === 'editor') {
      tabEditor?.classList.add('border-sky-500', 'text-sky-400');
      tabEditor?.classList.remove('border-transparent');
      tabSubs?.classList.add('border-transparent');
      tabSubs?.classList.remove('border-sky-500', 'text-sky-400');
      viewEditor?.classList.remove('hidden');
      viewSubs?.classList.add('hidden');
    } else {
      tabSubs?.classList.add('border-sky-500', 'text-sky-400');
      tabSubs?.classList.remove('border-transparent');
      tabEditor?.classList.add('border-transparent');
      tabEditor?.classList.remove('border-sky-500', 'text-sky-400');
      viewSubs?.classList.remove('hidden');
      viewEditor?.classList.add('hidden');
      loadSubscribersGrid();
    }
  };

  tabEditor?.addEventListener('click', () => switchTab('editor'));
  tabSubs?.addEventListener('click', () => switchTab('subscribers'));

  setTimeout(() => {
    modal.classList.remove('opacity-0');
    modal.querySelector('.transform').classList.remove('scale-95');
  }, 10);

  const closeModal = () => {
    modal.classList.add('opacity-0');
    modal.querySelector('.transform').classList.add('scale-95');
    setTimeout(() => modal.remove(), 300);
  };

  modal.querySelector('#closeDashboardBtn')?.addEventListener('click', closeModal);

  loadCmsArticles();
  loadWebhookSettings();

  modal.querySelector('#articleForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    await saveNewArticle();
  });

  modal.querySelector('#clearFormBtn')?.addEventListener('click', resetCmsForm);

  modal.querySelector('#aiDraftTextBtn')?.addEventListener('click', async () => {
    const prompt = modal.querySelector('#aiPromptInput').value.trim();
    if (!prompt) {
      showToast('Enter a conceptual prompt first.', 'error');
      return;
    }
    await composeArticleWithAI(prompt);
  });

  modal.querySelector('#aiDraftImgBtn')?.addEventListener('click', async () => {
    const prompt = modal.querySelector('#aiPromptInput').value.trim();
    if (!prompt) {
      showToast('Enter an art prompt first.', 'error');
      return;
    }
    await generateBannerWithAI(prompt);
  });

  modal.querySelector('#resetDatabaseBtn')?.addEventListener('click', async () => {
    if (confirm('Wipe all user-generated archives?')) {
      await safeStorage.removeItem('custom_articles');
      showToast('Custom archives cleared.', 'success');
      loadCmsArticles();
      await renderArticlesView();
    }
  });

  modal.querySelector('#saveWebhookBtn')?.addEventListener('click', async () => {
    const val = modal.querySelector('#webhookUrlInput').value.trim();
    await safeStorage.setItem('waitlist_webhook_url', val);
    showToast('Webhook pipeline saved!', 'success');
  });

  modal.querySelector('#testWebhookBtn')?.addEventListener('click', async () => {
    const val = modal.querySelector('#webhookUrlInput').value.trim();
    if (!val) {
      showToast('Provide a webhook URL first.', 'error');
      return;
    }
    showToast('Sending test notification packet...', 'success');
    try {
      await fetch(val, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: true, timestamp: new Date().toISOString() }),
        mode: 'no-cors'
      });
      showToast('Test packet successfully fired!', 'success');
    } catch (err) {
      showToast('Failed to contact target server.', 'error');
    }
  });

  modal.querySelector('#exportCsvBtn')?.addEventListener('click', async () => {
    const raw = await safeStorage.getItem('waitlist_subscribers');
    const list = raw ? JSON.parse(raw) : [];
    if (list.length === 0) {
      showToast('Registry is empty.', 'error');
      return;
    }
    let csv = 'Email,Date Registered,Referrer\n';
    list.forEach(sub => csv += `${sub.email},${sub.date},${sub.referrer || ''}\n`);
    navigator.clipboard.writeText(csv);
    showToast('Subscriber CSV copied to clipboard!', 'success');
  });

  modal.querySelector('#clearSubsBtn')?.addEventListener('click', async () => {
    if (confirm('Wipe waitlist subscriber data?')) {
      await safeStorage.removeItem('waitlist_subscribers');
      showToast('Subscriber listings dissolved.', 'success');
      loadSubscribersGrid();
    }
  });
}

async function loadWebhookSettings() {
  const input = document.getElementById('webhookUrlInput');
  if (!input) return;
  const raw = await safeStorage.getItem('waitlist_webhook_url');
  input.value = raw || '';
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
        <td colspan='3' class='py-8 text-center text-slate-500 italic text-[11px]'>
          No subscribers registered yet.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = list.map(sub => {
    const date = new Date(sub.date).toLocaleDateString(undefined, {
      month: 'short', day: 'numeric', year: 'numeric'
    });
    return `
      <tr class='hover:bg-white/5 transition-all text-[11px]'>
        <td class='py-2.5 font-semibold text-slate-200'>${sub.email}</td>
        <td class='py-2.5 text-slate-500'>${date}</td>
        <td class='py-2.5 text-right'>
          <button data-delete-sub-email='${sub.email}' class='text-slate-400 hover:text-red-400 transition-colors p-1' title='Delete'>
            <svg class='w-4 h-4 inline' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'/></svg>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('[data-delete-sub-email]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-delete-sub-email');
      if (confirm(`Remove ${email}?`)) {
        let current = [];
        try {
          const raw = await safeStorage.getItem('waitlist_subscribers');
          current = raw ? JSON.parse(raw) : [];
        } catch (err) { current = []; }
        current = current.filter(item => item.email !== email);
        await safeStorage.setItem('waitlist_subscribers', JSON.stringify(current));
        showToast('Subscriber removed.', 'success');
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
      <div class='py-6 text-center text-[11px] text-slate-500'>
        <p>No custom articles yet</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = customArticles.map(art => `
    <div class='flex items-center justify-between p-2 rounded bg-slate-950 border border-white/5 gap-2'>
      <div class='min-w-0 flex-1'>
        <h5 class='text-[10px] font-bold text-slate-200 truncate'>${art.title}</h5>
        <span class='text-[8px] uppercase font-bold text-slate-500'>${art.tag}</span>
      </div>
      <button data-delete-id='${art.id}' class='p-1 text-slate-400 hover:text-red-400 rounded transition-colors'>
        <svg class='w-3.5 h-3.5' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'/></svg>
      </button>
    </div>
  `).join('');

  listEl.querySelectorAll('[data-delete-id]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-delete-id');
      if (confirm('Delete this article?')) {
        let list = [];
        try {
          const raw = await safeStorage.getItem('custom_articles');
          list = raw ? JSON.parse(raw) : [];
        } catch (err) { list = []; }
        list = list.filter(item => item.id !== id);
        await safeStorage.setItem('custom_articles', JSON.stringify(list));
        showToast('Article deleted.', 'success');
        loadCmsArticles();
        await renderArticlesView();
      }
    });
  });
}

function resetCmsForm() {
  const modal = document.getElementById('cmsDashboardModal');
  if (!modal) return;
  modal.querySelector('#formTitle').value = '';
  modal.querySelector('#formSubtitle').value = '';
  modal.querySelector('#formTag').value = 'Physics';
  modal.querySelector('#formReadTime').value = '8 min read';
  modal.querySelector('#formPremium').value = 'false';
  modal.querySelector('#formBannerUrl').value = '';
  modal.querySelector('#formContent').value = '';
}

async function saveNewArticle() {
  const modal = document.getElementById('cmsDashboardModal');
  if (!modal) return;

  const title = modal.querySelector('#formTitle').value.trim();
  const subtitle = modal.querySelector('#formSubtitle').value.trim();
  const tag = modal.querySelector('#formTag').value;
  const readTime = modal.querySelector('#formReadTime').value.trim();
  const isPremium = modal.querySelector('#formPremium').value === 'true';
  const bannerUrl = modal.querySelector('#formBannerUrl').value.trim();
  const content = modal.querySelector('#formContent').value.trim();

  let tagColor = 'border-sky-500/20 text-sky-400 bg-sky-950/20';
  if (tag === 'Language') tagColor = 'border-orange-500/20 text-orange-400 bg-orange-950/20';
  else if (tag === 'Topology') tagColor = 'border-purple-500/20 text-purple-400 bg-purple-950/20';

  const newArticle = {
    id: 'custom-' + Date.now(),
    title,
    subtitle,
    tag,
    tagColor,
    date: 'New Publication',
    readTime,
    isPremium,
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
    
    showToast('Article published successfully!', 'success');
    resetCmsForm();
    loadCmsArticles();
    await renderArticlesView();
  } catch (err) {
    showToast('Failed to save to local storage.', 'error');
  }
}

// === AI SERVICES ===
async function composeArticleWithAI(prompt) {
  const modal = document.getElementById('cmsDashboardModal');
  if (!modal) return;
  const logEl = modal.querySelector('#aiOutputLog');
  logEl.classList.remove('hidden');
  logEl.innerHTML = '⚡ Synthesis beam active... connecting with DeepSeek servers...';

  try {
    const result = await window.miniappsAI.callModel({
      modelId: TEXT_MODEL_ID,
      messages: [
        {
          role: 'system',
          content: `You are the AI Assistant for the writer "Mobius Braid". You compose philosophical and physical articles. Woven Topology means reality is made of continuous woven flows of logic.
Write an outline or full paper text. Return a strict raw JSON block wrapped in triple-backticks containing EXACTLY these keys and no extra explanations:
{
  "title": "A short, evocative title about continuous topology",
  "subtitle": "An inspiring summary of woven systems",
  "tag": "Physics" or "Language" or "Topology" or "Vision",
  "readTime": "e.g. 7 min read",
  "content": "Full paper body. Use double linebreaks \\n\\n between paragraphs. Keep it poetic, deep and scientific."
}`
        },
        {
          role: 'user',
          content: `Concept / Prompt: ${prompt}`
        }
      ]
    });

    const text = window.miniappsAI.extractText(result);
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Could not map structure.");

    const payload = JSON.parse(jsonMatch[0]);
    
    modal.querySelector('#formTitle').value = payload.title || '';
    modal.querySelector('#formSubtitle').value = payload.subtitle || '';
    modal.querySelector('#formTag').value = payload.tag || 'Physics';
    modal.querySelector('#formReadTime').value = payload.readTime || '8 min read';
    modal.querySelector('#formContent').value = payload.content || '';
    
    logEl.innerHTML = `✅ Successfully drafted!\n\nTitle: ${payload.title}\nSubtitle: ${payload.subtitle}`;
    showToast('AI draft integrated into editor!', 'success');
  } catch (err) {
    logEl.innerHTML = `⚠️ Synthesis error:\n${err.message}`;
    showToast('Aether AI offline or timed out.', 'error');
  }
}

async function generateBannerWithAI(prompt) {
  const modal = document.getElementById('cmsDashboardModal');
  if (!modal) return;
  const logEl = modal.querySelector('#aiOutputLog');
  logEl.classList.remove('hidden');
  logEl.innerHTML = '🎨 Warming up FLUX generators...';

  try {
    const result = await window.miniappsAI.callStructured({
      modelId: IMAGE_MODEL_ID,
      input: {
        prompt: `minimalist modern 3d abstract topological illustration of ${prompt}, clean cosmos dark blue background, vector wireframe flows, high-contrast crisp render`,
        width: 1024,
        height: 576,
        sync_mode: true
      }
    });

    const images = window.miniappsAI.extractImages(result);
    if (images && images.length > 0) {
      const url = images[0];
      modal.querySelector('#formBannerUrl').value = url;
      logEl.innerHTML = `🎨 Banner art designed!\nURL: ${url}`;
      showToast('Art illustrated successfully!', 'success');
    } else {
      throw new Error("No image retrieved.");
    }
  } catch (err) {
    logEl.innerHTML = `⚠️ Art error:\n${err.message}`;
    showToast('Image generator failed.', 'error');
  }
}
