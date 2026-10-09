/**
 * ARTICLES PAGE LOGIC & VIEWER
 * Gilkreatifin Portfolio
 */
import { getSiteData } from './store.js';

document.addEventListener('DOMContentLoaded', () => {
  const data = getSiteData();

  initBranding(data.profile);
  initTheme();
  initMobileDrawer();
  initArticlesFeed(data.articles, data.profile);
});

// Update Branding Elements
function initBranding(profile) {
  if (!profile) return;
  
  const navLogoSymbol = document.getElementById('navLogoSymbol');
  const navLogoText = document.getElementById('navLogoText');
  const footerLogoSymbol = document.getElementById('footerLogoSymbol');
  const footerLogoText = document.getElementById('footerLogoText');
  const mobileLogoText = document.getElementById('mobileLogoText');
  const bannerStatusText = document.getElementById('bannerStatusText');
  const copyrightName = document.getElementById('copyrightName');

  const symbol = profile.logoSymbol || 'GK';
  const name = profile.name || 'Gilkreatifin';

  if (navLogoSymbol) navLogoSymbol.textContent = symbol;
  if (footerLogoSymbol) footerLogoSymbol.textContent = symbol;
  if (navLogoText) navLogoText.innerHTML = `${name.slice(0, 3).toUpperCase()}<strong>${name.slice(3).toUpperCase()}</strong>`;
  if (footerLogoText) footerLogoText.innerHTML = `${name.slice(0, 3).toUpperCase()}<strong>${name.slice(3).toUpperCase()}</strong>`;
  if (mobileLogoText) mobileLogoText.innerHTML = `${name.slice(0, 3).toUpperCase()}<strong>${name.slice(3).toUpperCase()}</strong>`;
  if (bannerStatusText && profile.availableStatus) {
    bannerStatusText.innerHTML = profile.availableStatus;
  }
  if (copyrightName) copyrightName.textContent = name;
  
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// Theme Management
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('theme-preference');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', initialTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme-preference', newTheme);
    showToast(`Mode ${newTheme === 'dark' ? 'Gelap' : 'Terang'} diaktifkan`);
  });
}

// Mobile Drawer
function initMobileDrawer() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerOverlay = document.getElementById('drawerOverlay');

  if (!menuToggle || !mobileDrawer) return;

  const openDrawer = () => {
    mobileDrawer.classList.add('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  menuToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
}

// Articles Feed, Search & Filter
function initArticlesFeed(articles = [], profile = {}) {
  const grid = document.getElementById('articlesGrid');
  const searchInput = document.getElementById('articleSearchInput');
  const tagButtons = document.querySelectorAll('#articleCategoryTags .filter-btn');
  const noArticlesMsg = document.getElementById('noArticlesMessage');
  const resetBtn = document.getElementById('resetSearchBtn');

  // Reader Modal elements
  const readerModal = document.getElementById('articleReaderModal');
  const readerTitle = document.getElementById('readerArticleTitle');
  const readerCategory = document.getElementById('readerCategory');
  const readerDate = document.getElementById('readerDate');
  const readerTime = document.getElementById('readerTime');
  const readerCoverImg = document.getElementById('readerCoverImg');
  const readerContent = document.getElementById('readerContent');
  const authorAvatar = document.getElementById('authorAvatar');
  const authorName = document.getElementById('authorName');
  const readerCloseBtn = document.getElementById('readerCloseBtn');
  const readerDismissBtn = document.getElementById('readerDismissBtn');
  const readerShareBtn = document.getElementById('readerShareBtn');

  let activeCategory = 'all';
  let activeSearch = '';
  let currentOpenArticleId = null;

  function renderArticles() {
    grid.innerHTML = '';

    const filtered = articles.filter(art => {
      const matchCat = activeCategory === 'all' || art.category.toLowerCase().includes(activeCategory.toLowerCase());
      const query = activeSearch.toLowerCase();
      const matchSearch = !query || 
        art.title.toLowerCase().includes(query) || 
        art.excerpt.toLowerCase().includes(query) ||
        art.category.toLowerCase().includes(query);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      noArticlesMsg.style.display = 'flex';
      return;
    } else {
      noArticlesMsg.style.display = 'none';
    }

    filtered.forEach(art => {
      const card = document.createElement('article');
      card.className = 'article-card';
      card.innerHTML = `
        <div class="article-card__media">
          <img src="${art.image}" alt="${art.title}" class="article-card__img" loading="lazy" width="600" height="380" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80';">
          <span class="article-card__tag">${art.category}</span>
        </div>
        <div class="article-card__info">
          <div class="article-card__meta">
            <span>${art.date}</span>
            <span class="meta-dot">•</span>
            <span>${art.readTime}</span>
          </div>
          <h2 class="article-card__title">
            <a href="javascript:void(0)" class="read-article-link" data-id="${art.id}">${art.title}</a>
          </h2>
          <p class="article-card__excerpt">${art.excerpt}</p>
          <button type="button" class="article-card__cta read-article-btn" data-id="${art.id}">
            <span>Baca Selengkapnya</span> &rarr;
          </button>
        </div>
      `;
      grid.appendChild(card);
    });

    // Attach click triggers
    grid.querySelectorAll('.read-article-link, .read-article-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openReader(id);
      });
    });
  }

  function openReader(articleId) {
    const art = articles.find(a => a.id === articleId);
    if (!art || !readerModal) return;

    currentOpenArticleId = articleId;

    readerTitle.textContent = art.title;
    readerCategory.textContent = art.category;
    readerDate.textContent = art.date;
    readerTime.textContent = art.readTime;
    readerCoverImg.onerror = () => {
      readerCoverImg.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80';
    };
    readerCoverImg.src = art.image;
    readerCoverImg.alt = art.title;
    readerContent.innerHTML = art.content;

    if (authorAvatar) authorAvatar.textContent = profile.logoSymbol || 'GK';
    if (authorName) authorName.textContent = art.author || profile.name || 'Gilkreatifin';

    readerModal.showModal();
    document.body.style.overflow = 'hidden';

    // Update URL hash without reload
    history.replaceState(null, '', `#${articleId}`);
  }

  function closeReader() {
    if (readerModal && readerModal.open) {
      readerModal.close();
      document.body.style.overflow = '';
      history.replaceState(null, '', window.location.pathname);
    }
  }

  if (readerCloseBtn) readerCloseBtn.addEventListener('click', closeReader);
  if (readerDismissBtn) readerDismissBtn.addEventListener('click', closeReader);

  if (readerShareBtn) {
    readerShareBtn.addEventListener('click', async () => {
      const shareUrl = `${window.location.origin}${window.location.pathname}#${currentOpenArticleId}`;
      try {
        await navigator.clipboard.writeText(shareUrl);
        showToast('Tautan artikel tersalin ke clipboard!');
      } catch {
        showToast(`Bagikan: ${shareUrl}`);
      }
    });
  }

  // Fallback light-dismiss for browsers without closedby support
  if (readerModal && !('closedBy' in HTMLDialogElement.prototype)) {
    readerModal.addEventListener('click', (event) => {
      if (event.target !== readerModal) return;
      const rect = readerModal.getBoundingClientRect();
      const isInside = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInside) closeReader();
    });
  }

  if (readerModal) {
    readerModal.addEventListener('close', () => {
      document.body.style.overflow = '';
    });
  }

  // Category filtering
  tagButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tagButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      activeCategory = btn.getAttribute('data-category');
      renderArticles();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeSearch = e.target.value.trim();
      renderArticles();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      activeSearch = '';
      activeCategory = 'all';
      if (searchInput) searchInput.value = '';
      tagButtons.forEach(b => {
        const isAll = b.getAttribute('data-category') === 'all';
        b.classList.toggle('active', isAll);
        b.setAttribute('aria-selected', isAll ? 'true' : 'false');
      });
      renderArticles();
    });
  }

  // Initial render
  renderArticles();

  // If URL has hash matching an article, open it immediately
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && articles.some(a => a.id === initialHash)) {
    openReader(initialHash);
  }
}

// Toast helper
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  const msgEl = toast.querySelector('.toast__message');
  if (msgEl) msgEl.textContent = message;

  toast.classList.add('is-show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('is-show');
  }, 3500);
}

