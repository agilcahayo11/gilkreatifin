/**
 * PORTFOLIO JAVASCRIPT ENGINE
 * Designer: Gilkreatifin
 * Modern Web Standard Compliant & CMS Synchronized
 */
import { getSiteData, addInboxMessage } from './store.js';

let currentSiteData = getSiteData();
let activeFilter = 'all';

// ==========================================================================
// DOM Ready Initializer
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileDrawer();
  initScrollspy();
  initContactForm();
  initClipboardCopy();
  initCopyrightYear();

  // Dynamic Content & CMS Binding
  renderDynamicContent();
  initPortfolioFilter();
  initCaseStudyModal();

  // Listen to CMS updates
  window.addEventListener('siteDataUpdated', (e) => {
    currentSiteData = e.detail;
    renderDynamicContent();
    initCaseStudyModal();
  });

  window.addEventListener('storage', (e) => {
    if (e.key === 'gilkreatifin_cms_data') {
      currentSiteData = getSiteData();
      renderDynamicContent();
      initCaseStudyModal();
    }
  });
});

// ==========================================================================
// Dynamic Content Rendering (Synced from store.js)
// ==========================================================================
function renderDynamicContent() {
  const { profile, projects, services } = currentSiteData;

  // 1. Branding & Header / Footer
  if (profile) {
    const symbols = document.querySelectorAll('.logo__symbol');
    symbols.forEach(el => el.textContent = profile.logoSymbol || 'GK');

    const names = document.querySelectorAll('.logo__text');
    const nameStr = profile.name || 'Gilkreatifin';
    names.forEach(el => {
      el.innerHTML = `${nameStr.slice(0, 3).toUpperCase()}<strong>${nameStr.slice(3).toUpperCase()}</strong>`;
    });

    // Top status banner
    const statusText = document.querySelector('.status-banner .status-indicator span:last-child');
    if (statusText && profile.availableStatus) {
      statusText.innerHTML = profile.availableStatus;
    }

    // Hero Section
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle && profile.headline) {
      heroTitle.innerHTML = profile.headline.replace('Ikonik', '<span class="text-highlight">Ikonik</span>');
    }

    const heroDesc = document.querySelector('.hero__description');
    if (heroDesc && profile.bio) {
      heroDesc.innerHTML = profile.bio;
    }

    const heroImg = document.querySelector('.hero__image');
    if (heroImg && profile.photo) {
      heroImg.src = profile.photo;
      heroImg.alt = `Portrait visual profil ${profile.name}`;
    }

    // Hero Metrics
    const metricNums = document.querySelectorAll('.hero__metrics .metric-number');
    if (metricNums.length >= 3) {
      if (profile.experienceYears) metricNums[0].textContent = profile.experienceYears;
      if (profile.completedProjects) metricNums[1].textContent = profile.completedProjects;
      if (profile.clientSatisfaction) metricNums[2].textContent = profile.clientSatisfaction;
    }

    // Contact Details
    const emailEls = document.querySelectorAll('a[href^="mailto:"]');
    emailEls.forEach(el => {
      el.href = `mailto:${profile.email}`;
      if (el.classList.contains('channel-card__value')) {
        el.textContent = profile.email;
      }
    });

    const waLinks = document.querySelectorAll('a[href*="wa.me"], a.channel-card--link');
    if (waLinks.length > 0 && profile.whatsapp) {
      const cleanWa = profile.whatsapp.replace(/[^0-9]/g, '');
      const waMsg = encodeURIComponent(profile.whatsappMessage || `Halo ${profile.name}, saya tertarik untuk diskusi proyek desain.`);
      waLinks.forEach(link => {
        link.href = `https://wa.me/${cleanWa}?text=${waMsg}`;
        const valEl = link.querySelector('.channel-card__value');
        if (valEl) valEl.textContent = profile.whatsapp;
      });
    }

    const copyBtn = document.getElementById('copyEmailBtn');
    if (copyBtn) {
      copyBtn.setAttribute('data-email', profile.email);
    }
  }

  // 2. Render Projects Grid
  renderProjectsGrid(projects || []);

  // 3. Render Services Grid
  renderServicesGrid(services || []);
}

function renderProjectsGrid(projects) {
  const grid = document.getElementById('portfolioGrid');
  if (!grid) return;

  grid.innerHTML = '';
  projects.forEach(proj => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('data-category', proj.category || 'branding');
    card.setAttribute('data-id', proj.id);

    // Apply active filter
    if (activeFilter !== 'all' && !proj.category.includes(activeFilter)) {
      card.style.display = 'none';
    } else {
      card.style.display = 'flex';
    }

    card.innerHTML = `
      <div class="project-card__media">
        <img 
          src="${proj.image}" 
          alt="${proj.title}" 
          class="project-card__img"
          loading="lazy"
          width="800"
          height="560"
          onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';"
        >
        <div class="project-card__overlay">
          <button type="button" class="btn btn--white btn--sm open-modal-btn" data-project="${proj.id}">
            Lihat Studi Kasus
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </button>
        </div>
        <span class="project-card__tag">${proj.categoryLabel || proj.category}</span>
      </div>
      <div class="project-card__info">
        <div class="project-card__meta">
          <span class="project-card__year">${proj.year || '2026'}</span>
          <span class="meta-dot">•</span>
          <span class="project-card__client">${proj.client || 'Client'}</span>
        </div>
        <h3 class="project-card__title">
          <a href="javascript:void(0)" class="open-modal-link" data-project="${proj.id}">${proj.title}</a>
        </h3>
        <p class="project-card__desc">${proj.desc}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderServicesGrid(services) {
  const container = document.querySelector('.services__grid');
  if (!container || !services.length) return;

  const icons = [
    `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path></svg>`,
    `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path></svg>`,
    `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>`
  ];

  container.innerHTML = '';
  services.forEach((srv, i) => {
    const isFeatured = srv.isFeatured || i === 1;
    const card = document.createElement('div');
    card.className = `service-card ${isFeatured ? 'service-card--featured' : ''}`;
    
    const delivsMarkup = (srv.deliverables || []).map(d => `<li>${d}</li>`).join('');

    card.innerHTML = `
      ${isFeatured ? '<div class="featured-badge">Paling Populer</div>' : ''}
      <div class="service-card__icon-wrap">
        ${icons[i % icons.length]}
      </div>
      <h3 class="service-card__title">${srv.title}</h3>
      <p class="service-card__desc">${srv.desc}</p>
      <ul class="service-card__deliverables" role="list">
        ${delivsMarkup}
      </ul>
    `;
    container.appendChild(card);
  });
}

// ==========================================================================
// Theme Management (Dark / Light Theme)
// ==========================================================================
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

// ==========================================================================
// Mobile Drawer Navigation
// ==========================================================================
function initMobileDrawer() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.mobile-drawer__link, .mobile-drawer__cta');

  if (!menuToggle || !mobileDrawer) return;

  function openDrawer() {
    mobileDrawer.classList.add('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

// ==========================================================================
// Modern Scrollspy (Modern Web Guidance Compliant)
// ==========================================================================
function initScrollspy() {
  const navLinks = document.querySelectorAll('.nav-menu__link[href^="#"]');
  const sections = document.querySelectorAll('main section[id]');

  if (CSS.supports('scroll-target-group: auto')) {
    const syncAriaCurrent = () => {
      const currentLink = document.querySelector('.nav-menu a:target-current');
      navLinks.forEach(link => {
        link.setAttribute('aria-current', link === currentLink ? 'true' : 'false');
      });
    };
    syncAriaCurrent();
    document.addEventListener('scrollend', syncAriaCurrent);
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const isTarget = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', isTarget);
            link.classList.toggle(':target-current', isTarget);
            link.setAttribute('aria-current', isTarget ? 'true' : 'false');
          });
        }
      });
    }, {
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    });

    sections.forEach(section => observer.observe(section));
  }
}

// ==========================================================================
// Portfolio Category Filter
// ==========================================================================
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      activeFilter = btn.getAttribute('data-filter');
      const projectCards = document.querySelectorAll('.project-card');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (activeFilter === 'all' || categories.includes(activeFilter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ==========================================================================
// Case Study Modal (<dialog closedby="any" with fallback)
// ==========================================================================
function initCaseStudyModal() {
  const modal = document.getElementById('caseStudyModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const dismissBtn = document.getElementById('modalDismissBtn');
  const contactBtn = document.getElementById('modalContactBtn');

  if (!modal) return;

  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalImage = document.getElementById('modalImage');
  const modalClient = document.getElementById('modalClient');
  const modalClientLink = document.getElementById('modalClientLink');
  const modalYear = document.getElementById('modalYear');
  const modalRole = document.getElementById('modalRole');
  const modalTools = document.getElementById('modalTools');
  const modalChallenge = document.getElementById('modalChallenge');
  const modalSolution = document.getElementById('modalSolution');
  const modalImpactList = document.getElementById('modalImpactList');
  const modalDesignShowcase = document.getElementById('modalDesignShowcase');
  const modalDesignImage = document.getElementById('modalDesignImage');

  let lastActiveElement = null;

  function openProjectModal(projectId) {
    const data = (currentSiteData.projects || []).find(p => p.id === projectId);
    if (!data) return;

    lastActiveElement = document.activeElement;

    modalTitle.textContent = data.title;
    modalCategory.textContent = data.categoryLabel || data.category;
    modalImage.onerror = () => {
      modalImage.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
    };
    modalImage.src = data.image;
    modalImage.alt = `${data.title} preview`;

    // 16:9 Design Preview Image (Use custom designImage if provided, else fallback to main project image)
    const showcaseImgUrl = data.designImage || data.image;
    if (modalDesignImage && modalDesignShowcase) {
      modalDesignImage.onerror = () => {
        modalDesignImage.src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
      };
      modalDesignImage.src = showcaseImgUrl;
      modalDesignImage.alt = `Hasil Desain ${data.title} Landscape 16:9`;
      modalDesignShowcase.style.display = 'block';
    }

    modalClient.textContent = data.client || '-';

    // Client Link (Website / Instagram)
    if (modalClientLink) {
      if (data.clientUrl && data.clientUrl.trim()) {
        let url = data.clientUrl.trim();
        if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
        modalClientLink.href = url;
        modalClientLink.style.display = 'inline-flex';
        // Label clean display
        const isIg = url.includes('instagram.com');
        modalClientLink.querySelector('span').textContent = isIg ? 'Instagram Klien ↗' : 'Kunjungi Klien ↗';
      } else {
        modalClientLink.style.display = 'none';
      }
    }

    modalYear.textContent = data.year || '-';
    modalRole.textContent = data.role || '-';
    modalTools.textContent = data.tools || '-';
    modalChallenge.textContent = data.challenge || '-';
    modalSolution.textContent = data.solution || '-';

    modalImpactList.innerHTML = '';
    (data.impacts || []).forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      modalImpactList.appendChild(li);
    });

    modal.showModal();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.close();
    document.body.style.overflow = '';
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  document.querySelectorAll('.open-modal-btn, .open-modal-link').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    };
  });

  if (closeBtn) closeBtn.onclick = closeModal;
  if (dismissBtn) dismissBtn.onclick = closeModal;
  if (contactBtn) contactBtn.onclick = closeModal;

  if (!('closedBy' in HTMLDialogElement.prototype)) {
    modal.onclick = (event) => {
      if (event.target !== modal) return;
      const rect = modal.getBoundingClientRect();
      const isContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isContent) closeModal();
    };
  }

  modal.onclose = () => {
    document.body.style.overflow = '';
  };
}

// ==========================================================================
// Contact Form Validation & Submission
// ==========================================================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const messageInput = document.getElementById('userMessage');
  const submitBtn = document.getElementById('submitBtn');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    if (!nameInput.value.trim()) {
      nameInput.classList.add('is-invalid');
      nameError.classList.add('is-visible');
      isValid = false;
    } else {
      nameInput.classList.remove('is-invalid');
      nameError.classList.remove('is-visible');
    }

    if (!validateEmail(emailInput.value.trim())) {
      emailInput.classList.add('is-invalid');
      emailError.classList.add('is-visible');
      isValid = false;
    } else {
      emailInput.classList.remove('is-invalid');
      emailError.classList.remove('is-visible');
    }

    if (messageInput.value.trim().length < 10) {
      messageInput.classList.add('is-invalid');
      messageError.classList.add('is-visible');
      isValid = false;
    } else {
      messageInput.classList.remove('is-invalid');
      messageError.classList.remove('is-visible');
    }

    if (!isValid) return;

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Menyiapkan WhatsApp...</span>`;

    // 1. Gather all form data
    const serviceSelect = document.getElementById('serviceSelect');
    const userBudget = document.getElementById('userBudget');

    const inquiry = {
      id: 'inquiry-' + Date.now(),
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      service: serviceSelect ? serviceSelect.value : 'Layanan Desain',
      budget: userBudget ? userBudget.value : '-',
      message: messageInput.value.trim(),
      date: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
      timestamp: Date.now()
    };

    // 2. Save inquiry into CMS Inbox (localStorage)
    addInboxMessage(inquiry);

    // 3. Format message cleanly for WhatsApp
    const profile = currentSiteData?.profile || {};
    const waNumber = (profile.whatsapp || '+6285156165296').replace(/[^0-9]/g, '');

    const waText = 
      `*Halo ${profile.name || 'Gilkreatifin Studio'}, Saya Mengirimkan Formulir Proyek:*\n\n` +
      `👤 *Nama:* ${inquiry.name}\n` +
      `✉️ *Email:* ${inquiry.email}\n` +
      `🎯 *Layanan:* ${inquiry.service}\n` +
      `💰 *Estimasi Budget:* ${inquiry.budget}\n` +
      `📝 *Kebutuhan Proyek:*\n${inquiry.message}\n\n` +
      `_Terkirim via formulir portfolio gilkreatifin_`;

    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      form.reset();
      showToast('Pesan tersimpan di Inbox & mengalihkan ke WhatsApp...');
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 700);
  });

  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('is-invalid');
      const err = input.parentElement.querySelector('.form-error');
      if (err) err.classList.remove('is-visible');
    });
  });
}

// ==========================================================================
// One-Click Clipboard Copy for Email
// ==========================================================================
function initClipboardCopy() {
  const copyBtn = document.getElementById('copyEmailBtn');
  if (!copyBtn) return;

  const copyText = copyBtn.querySelector('.copy-text');

  copyBtn.addEventListener('click', async () => {
    const targetEmail = copyBtn.getAttribute('data-email') || (currentSiteData.profile && currentSiteData.profile.email) || 'gilkreatifin@gmail.com';
    try {
      await navigator.clipboard.writeText(targetEmail);
      if (copyText) copyText.textContent = 'Tersalin!';
      showToast('Alamat email tersalin ke papan klip');

      setTimeout(() => {
        if (copyText) copyText.textContent = 'Salin';
      }, 2500);
    } catch {
      showToast(`Silakan salin manual: ${targetEmail}`);
    }
  });
}

// ==========================================================================
// Toast Notification Engine
// ==========================================================================
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add('is-show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('is-show');
  }, 3500);
}

// ==========================================================================
// Copyright Year Auto Updater
// ==========================================================================
function initCopyrightYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
