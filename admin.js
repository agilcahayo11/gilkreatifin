/**
 * CMS DASHBOARD CONTROLLER
 * Gilkreatifin Studio Content Management System
 */
import { getSiteData, saveSiteData, resetSiteData, exportDataAsJSON, importDataFromJSON } from './store.js';

const ADMIN_PASSCODE = 'admin123';
let currentSiteData = null;

/**
 * Otomatis kompres dan batasi gambar ke maksimal 16:9 (1920x1080)
 * agar ukuran berkas tidak berat dan tidak membebani memori browser/localStorage.
 */
function processAndOptimizeImage(file, { maxWidth = 1920, maxHeight = 1080, quality = 0.85, force16x9 = false } = {}) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let srcX = 0, srcY = 0, srcW = img.naturalWidth, srcH = img.naturalHeight;

        if (force16x9) {
          // Potong (crop) tengah jika rasio lebih tinggi/lebar dari 16:9
          const targetRatio = 16 / 9;
          const currentRatio = srcW / srcH;
          if (currentRatio > targetRatio) {
            srcW = Math.round(srcH * targetRatio);
            srcX = Math.round((img.naturalWidth - srcW) / 2);
          } else if (currentRatio < targetRatio) {
            srcH = Math.round(srcW / targetRatio);
            srcY = Math.round((img.naturalHeight - srcH) / 2);
          }
        }

        // Batasi resolusi maksimal agar tidak berat
        let outW = srcW;
        let outH = srcH;
        if (outW > maxWidth || outH > maxHeight) {
          const ratio = Math.min(maxWidth / outW, maxHeight / outH);
          outW = Math.round(outW * ratio);
          outH = Math.round(outH * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = outW;
        canvas.height = outH;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, outW, outH);

        // Ekspor ke format JPEG terkompresi
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve({ dataUrl, width: outW, height: outH, originalSize: file.size });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  currentSiteData = getSiteData();
  initCMS();
});

// ==========================================================================
// 1. Auth Gate
// ==========================================================================
function initAuth() {
  const authGate = document.getElementById('authGate');
  const cmsApp = document.getElementById('cmsApp');
  const authForm = document.getElementById('authForm');
  const authInput = document.getElementById('adminPasscode');
  const authError = document.getElementById('authError');
  const logoutBtn = document.getElementById('logoutBtn');

  const isAuthed = sessionStorage.getItem('gilkreatifin_admin_auth') === 'true';

  if (isAuthed) {
    if (authGate) authGate.style.display = 'none';
    if (cmsApp) cmsApp.style.display = 'grid';
  } else {
    if (authGate) authGate.style.display = 'flex';
    if (cmsApp) cmsApp.style.display = 'none';
  }

  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = authInput.value.trim();
      if (code === ADMIN_PASSCODE || code === '') {
        sessionStorage.setItem('gilkreatifin_admin_auth', 'true');
        authGate.style.display = 'none';
        cmsApp.style.display = 'grid';
        showToast('Berhasil masuk ke CMS Studio!');
      } else {
        authError.style.display = 'block';
        authInput.classList.add('is-invalid');
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('gilkreatifin_admin_auth');
      window.location.reload();
    });
  }
}

// ==========================================================================
// 2. Initialize CMS Dashboard
// ==========================================================================
function initCMS() {
  initTabs();
  initProfileTab();
  initProjectsTab();
  initArticlesTab();
  initServicesTab();
  initInboxTab();
  initBackupTab();
  initGlobalSave();
  updateBadgeCounts();
}

function updateBadgeCounts() {
  const pCount = document.getElementById('countProjects');
  const aCount = document.getElementById('countArticles');
  const iCount = document.getElementById('countInbox');
  if (pCount) pCount.textContent = currentSiteData.projects.length;
  if (aCount) aCount.textContent = currentSiteData.articles.length;
  if (iCount) iCount.textContent = (currentSiteData.inbox || []).length;
}

// ==========================================================================
// 3. Tab Switching
// ==========================================================================
function initTabs() {
  const navBtns = document.querySelectorAll('.cms-nav__item');
  const tabPanes = document.querySelectorAll('.cms-tab-pane');
  const titleEl = document.getElementById('cmsCurrentTabTitle');

  const titles = {
    'tab-profile': 'Pengaturan Profil & Identitas',
    'tab-projects': 'Manajemen Portofolio & Studi Kasus',
    'tab-articles': 'Manajemen Artikel & Jurnal Desain',
    'tab-services': 'Manajemen Layanan Desain',
    'tab-inbox': 'Pesan Masuk (Inbox Formulir Proyek)',
    'tab-backup': 'Cadangan & Pemulihan Data'
  };

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');

      navBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const target = document.getElementById(tabId);
      if (target) target.classList.add('active');

      if (titleEl && titles[tabId]) {
        titleEl.textContent = titles[tabId];
      }
    });
  });
}

// ==========================================================================
// 4. Tab 1: Profile & General Settings
// ==========================================================================
function initProfileTab() {
  const form = document.getElementById('profileForm');
  const prof = currentSiteData.profile;

  const brandSymbol = document.getElementById('cmsBrandSymbol');
  const brandName = document.getElementById('cmsBrandName');

  // Fields
  const nameInput = document.getElementById('profName');
  const symbolInput = document.getElementById('profLogoSymbol');
  const titleInput = document.getElementById('profTitle');
  const headlineInput = document.getElementById('profHeadline');
  const bioInput = document.getElementById('profBio');
  const statusInput = document.getElementById('profStatus');
  const photoUrlInput = document.getElementById('profPhotoUrl');
  const photoPreview = document.getElementById('profPhotoPreview');
  const photoUpload = document.getElementById('profPhotoUpload');
  const emailInput = document.getElementById('profEmail');
  const waInput = document.getElementById('profWhatsapp');
  const locInput = document.getElementById('profLocation');
  const expInput = document.getElementById('profExp');
  const compInput = document.getElementById('profCompleted');
  const satInput = document.getElementById('profSatisfaction');
  const inInput = document.getElementById('profLinkedin');
  const drInput = document.getElementById('profDribbble');
  const beInput = document.getElementById('profBehance');
  const igInput = document.getElementById('profInstagram');

  // Fill initial values
  nameInput.value = prof.name || '';
  symbolInput.value = prof.logoSymbol || '';
  titleInput.value = prof.title || '';
  headlineInput.value = prof.headline || '';
  bioInput.value = prof.bio || '';
  statusInput.value = prof.availableStatus || '';
  photoUrlInput.value = prof.photo || '';
  photoPreview.src = prof.photo || 'assets/images/profile.png';
  emailInput.value = prof.email || '';
  waInput.value = prof.whatsapp || '';
  locInput.value = prof.location || '';
  expInput.value = prof.experienceYears || '';
  compInput.value = prof.completedProjects || '';
  satInput.value = prof.clientSatisfaction || '';
  inInput.value = (prof.social && prof.social.linkedin) || '';
  drInput.value = (prof.social && prof.social.dribbble) || '';
  beInput.value = (prof.social && prof.social.behance) || '';
  igInput.value = (prof.social && prof.social.instagram) || '';

  // Live photo url change
  photoUrlInput.addEventListener('input', () => {
    photoPreview.src = photoUrlInput.value || 'assets/images/profile.png';
  });

  // Local image upload handler
  photoUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        photoUrlInput.value = event.target.result;
        photoPreview.src = event.target.result;
        showToast('Foto baru siap disimpan.');
      };
      reader.readAsDataURL(file);
    }
  });

  // Save profile
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    currentSiteData.profile = {
      name: nameInput.value.trim(),
      logoSymbol: symbolInput.value.trim() || 'GK',
      title: titleInput.value.trim(),
      headline: headlineInput.value.trim(),
      bio: bioInput.value.trim(),
      availableStatus: statusInput.value.trim(),
      photo: photoUrlInput.value.trim() || 'assets/images/profile.png',
      email: emailInput.value.trim(),
      whatsapp: waInput.value.trim(),
      whatsappMessage: `Halo ${nameInput.value.trim()}, saya tertarik untuk diskusi proyek desain.`,
      location: locInput.value.trim(),
      experienceYears: expInput.value.trim(),
      completedProjects: compInput.value.trim(),
      clientSatisfaction: satInput.value.trim(),
      social: {
        linkedin: inInput.value.trim(),
        dribbble: drInput.value.trim(),
        behance: beInput.value.trim(),
        instagram: igInput.value.trim()
      }
    };

    saveSiteData(currentSiteData);
    if (brandSymbol) brandSymbol.textContent = currentSiteData.profile.logoSymbol;
    if (brandName) brandName.innerHTML = `${currentSiteData.profile.name.slice(0, 3).toUpperCase()}<strong>${currentSiteData.profile.name.slice(3).toUpperCase()}</strong>`;
    showToast('Profil desainer berhasil diperbarui!');
  });
}

// ==========================================================================
// 5. Tab 2: Projects Manager
// ==========================================================================
function initProjectsTab() {
  const tbody = document.getElementById('projectsTableBody');
  const addBtn = document.getElementById('addNewProjectBtn');
  const modal = document.getElementById('projectEditorModal');
  const form = document.getElementById('projectEditForm');
  const closeBtn = document.getElementById('closeProjectModalBtn');
  const cancelBtn = document.getElementById('cancelProjectModalBtn');
  const modalHeading = document.getElementById('projectModalHeading');

  // Form inputs
  const idInput = document.getElementById('editProjectId');
  const titleInput = document.getElementById('editProjTitle');
  const catInput = document.getElementById('editProjCategory');
  const catLabelInput = document.getElementById('editProjCategoryLabel');
  const clientInput = document.getElementById('editProjClient');
  const clientUrlInput = document.getElementById('editProjClientUrl');
  const yearInput = document.getElementById('editProjYear');
  const roleInput = document.getElementById('editProjRole');
  const toolsInput = document.getElementById('editProjTools');
  const imgInput = document.getElementById('editProjImage');
  const imgPreview = document.getElementById('editProjImagePreview');
  const imgUpload = document.getElementById('editProjImageUpload');
  const imgNotice = document.getElementById('projImageUrlNotice');
  const imgError = document.getElementById('projImageError');
  const designImgInput = document.getElementById('editProjDesignImage');
  const designImgPreview = document.getElementById('editProjDesignImagePreview');
  const designImgUpload = document.getElementById('editProjDesignImageUpload');
  const designImgDims = document.getElementById('projDesignImageDimensions');
  const descInput = document.getElementById('editProjDesc');
  const challengeInput = document.getElementById('editProjChallenge');
  const solutionInput = document.getElementById('editProjSolution');
  const impactsInput = document.getElementById('editProjImpacts');

  function checkProjectImageUrl(url) {
    if (!url) return;
    if (url.includes('ibb.co/') && !url.includes('i.ibb.co/')) {
      if (imgNotice) imgNotice.style.display = 'block';
    } else {
      if (imgNotice) imgNotice.style.display = 'none';
    }
  }

  imgInput.addEventListener('input', () => {
    imgPreview.src = imgInput.value;
    if (imgError) imgError.style.display = 'none';
    checkProjectImageUrl(imgInput.value);
  });

  const imgDims = document.getElementById('projImageDimensions');
  imgPreview.onerror = () => {
    if (imgInput.value) {
      if (imgError) imgError.style.display = 'block';
      if (imgDims) imgDims.style.display = 'none';
    }
  };
  imgPreview.onload = () => {
    if (imgError) imgError.style.display = 'none';
    if (imgDims && imgPreview.naturalWidth) {
      imgDims.style.display = 'block';
      const w = imgPreview.naturalWidth;
      const h = imgPreview.naturalHeight;
      const ratio = (w / h).toFixed(2);
      imgDims.innerHTML = `✓ Terdeteksi: <strong>${w} &times; ${h} px</strong> (Rasio ~${ratio}:1) &bull; Otomatis dipaskan proporsional`;
    }
  };

  if (designImgInput && designImgPreview) {
    designImgInput.addEventListener('input', () => {
      designImgPreview.src = designImgInput.value;
    });

    designImgPreview.onload = () => {
      if (designImgDims && designImgPreview.naturalWidth) {
        designImgDims.style.display = 'block';
        const w = designImgPreview.naturalWidth;
        const h = designImgPreview.naturalHeight;
        const ratio = (w / h).toFixed(2);
        designImgDims.innerHTML = `✓ Terdeteksi Foto Desain: <strong>${w} &times; ${h} px</strong> (Rasio ~${ratio}:1)`;
      }
    };
  }

  if (designImgUpload && designImgInput && designImgPreview) {
    designImgUpload.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        showToast('Mengoptimasi gambar ke format 16:9 ringan...');
        try {
          const result = await processAndOptimizeImage(file, { maxWidth: 1920, maxHeight: 1080, quality: 0.85, force16x9: true });
          designImgInput.value = result.dataUrl;
          designImgPreview.src = result.dataUrl;
          showToast(`Foto desain dioptimasi ke 16:9 (${result.width}x${result.height}px) ringan & cepat!`);
        } catch (err) {
          console.error(err);
          const reader = new FileReader();
          reader.onload = (ev) => {
            designImgInput.value = ev.target.result;
            designImgPreview.src = ev.target.result;
          };
          reader.readAsDataURL(file);
        }
      }
    });
  }

  if (imgUpload) {
    imgUpload.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        showToast('Mengompres thumbnail...');
        try {
          const result = await processAndOptimizeImage(file, { maxWidth: 1600, maxHeight: 1000, quality: 0.85, force16x9: false });
          imgInput.value = result.dataUrl;
          imgPreview.src = result.dataUrl;
          if (imgError) imgError.style.display = 'none';
          if (imgNotice) imgNotice.style.display = 'none';
          showToast(`Thumbnail berhasil dioptimasi (${result.width}x${result.height}px).`);
        } catch (err) {
          console.error(err);
          const reader = new FileReader();
          reader.onload = (ev) => {
            imgInput.value = ev.target.result;
            imgPreview.src = ev.target.result;
          };
          reader.readAsDataURL(file);
        }
      }
    });
  }

  function renderProjectsTable() {
    tbody.innerHTML = '';
    currentSiteData.projects.forEach((proj, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><img src="${proj.image}" alt="${proj.title}" class="table-thumb" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=200&q=80';"></td>
        <td><strong>${proj.title}</strong></td>
        <td><span class="badge badge--subtle">${proj.categoryLabel || proj.category}</span></td>
        <td>${proj.client || '-'}</td>
        <td>${proj.year || '-'}</td>
        <td>
          <div class="action-btns">
            <button type="button" class="btn btn--secondary btn--xs edit-proj-btn" data-id="${proj.id}">Edit</button>
            <button type="button" class="btn btn--outline btn--xs del-proj-btn" data-id="${proj.id}" style="color: var(--danger); border-color: var(--danger);">Hapus</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Attach row events
    tbody.querySelectorAll('.edit-proj-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openEditProject(id);
      });
    });

    tbody.querySelectorAll('.del-proj-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        deleteProject(id);
      });
    });

    updateBadgeCounts();
  }

  function openEditProject(id) {
    const proj = currentSiteData.projects.find(p => p.id === id);
    if (!proj) return;

    modalHeading.textContent = 'Sunting Proyek';
    idInput.value = proj.id;
    titleInput.value = proj.title;
    catInput.value = proj.category;
    catLabelInput.value = proj.categoryLabel || proj.category;
    clientInput.value = proj.client || '';
    if (clientUrlInput) clientUrlInput.value = proj.clientUrl || '';
    yearInput.value = proj.year || '';
    roleInput.value = proj.role || '';
    toolsInput.value = proj.tools || '';
    imgInput.value = proj.image || '';
    imgPreview.src = proj.image || '';
    
    // 16:9 Design Image
    const designImgVal = proj.designImage || proj.image || '';
    if (designImgInput) designImgInput.value = proj.designImage || '';
    if (designImgPreview) designImgPreview.src = designImgVal;

    descInput.value = proj.desc || '';
    challengeInput.value = proj.challenge || '';
    solutionInput.value = proj.solution || '';
    impactsInput.value = (proj.impacts || []).join('\n');

    if (imgError) imgError.style.display = 'none';
    if (imgUpload) imgUpload.value = '';
    if (designImgUpload) designImgUpload.value = '';
    checkProjectImageUrl(proj.image);

    modal.showModal();
  }

  function openNewProject() {
    modalHeading.textContent = 'Tambah Proyek Baru';
    idInput.value = 'project-' + Date.now();
    titleInput.value = '';
    catInput.value = 'branding uiux';
    catLabelInput.value = 'Branding & UI/UX';
    clientInput.value = '';
    if (clientUrlInput) clientUrlInput.value = '';
    yearInput.value = new Date().getFullYear().toString();
    roleInput.value = 'Lead Designer';
    toolsInput.value = 'Figma, Illustrator';
    imgInput.value = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
    imgPreview.src = imgInput.value;
    
    if (designImgInput) designImgInput.value = '';
    if (designImgPreview) designImgPreview.src = imgInput.value;

    descInput.value = '';
    challengeInput.value = '';
    solutionInput.value = '';
    impactsInput.value = '';

    if (imgError) imgError.style.display = 'none';
    if (imgNotice) imgNotice.style.display = 'none';
    if (imgUpload) imgUpload.value = '';
    if (designImgUpload) designImgUpload.value = '';

    modal.showModal();
  }

  function deleteProject(id) {
    if (confirm('Apakah Anda yakin ingin menghapus proyek ini?')) {
      currentSiteData.projects = currentSiteData.projects.filter(p => p.id !== id);
      saveSiteData(currentSiteData);
      renderProjectsTable();
      showToast('Proyek berhasil dihapus.');
    }
  }

  const closeModal = () => modal.close();
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (addBtn) addBtn.addEventListener('click', openNewProject);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = idInput.value;
    const impacts = impactsInput.value.split('\n').map(s => s.trim()).filter(Boolean);

    const projectData = {
      id,
      title: titleInput.value.trim(),
      category: catInput.value,
      categoryLabel: catLabelInput.value.trim() || catInput.value,
      client: clientInput.value.trim(),
      clientUrl: clientUrlInput ? clientUrlInput.value.trim() : '',
      year: yearInput.value.trim(),
      role: roleInput.value.trim(),
      tools: toolsInput.value.trim(),
      image: imgInput.value.trim(),
      designImage: designImgInput ? designImgInput.value.trim() : '',
      desc: descInput.value.trim(),
      challenge: challengeInput.value.trim(),
      solution: solutionInput.value.trim(),
      impacts
    };

    const existingIdx = currentSiteData.projects.findIndex(p => p.id === id);
    if (existingIdx >= 0) {
      currentSiteData.projects[existingIdx] = projectData;
    } else {
      currentSiteData.projects.unshift(projectData);
    }

    saveSiteData(currentSiteData);
    closeModal();
    renderProjectsTable();
    showToast('Proyek berhasil disimpan!');
  });

  renderProjectsTable();
}

// ==========================================================================
// 6. Tab 3: Articles Manager
// ==========================================================================
function initArticlesTab() {
  const tbody = document.getElementById('articlesTableBody');
  const addBtn = document.getElementById('addNewArticleBtn');
  const modal = document.getElementById('articleEditorModal');
  const form = document.getElementById('articleEditForm');
  const closeBtn = document.getElementById('closeArticleModalBtn');
  const cancelBtn = document.getElementById('cancelArticleModalBtn');
  const modalHeading = document.getElementById('articleModalHeading');

  // Inputs
  const idInput = document.getElementById('editArticleId');
  const titleInput = document.getElementById('editArtTitle');
  const catInput = document.getElementById('editArtCategory');
  const readTimeInput = document.getElementById('editArtReadTime');
  const dateInput = document.getElementById('editArtDate');
  const coverInput = document.getElementById('editArtCover');
  const coverPreview = document.getElementById('editArtCoverPreview');
  const coverUpload = document.getElementById('editArtCoverUpload');
  const coverNotice = document.getElementById('artCoverUrlNotice');
  const coverError = document.getElementById('artCoverError');
  const excerptInput = document.getElementById('editArtExcerpt');
  const contentInput = document.getElementById('editArtContent');

  function checkArticleCoverUrl(url) {
    if (!url) return;
    if (url.includes('ibb.co/') && !url.includes('i.ibb.co/')) {
      if (coverNotice) coverNotice.style.display = 'block';
    } else {
      if (coverNotice) coverNotice.style.display = 'none';
    }
  }

  coverInput.addEventListener('input', () => {
    coverPreview.src = coverInput.value;
    if (coverError) coverError.style.display = 'none';
    checkArticleCoverUrl(coverInput.value);
  });

  const coverDims = document.getElementById('artCoverDimensions');
  coverPreview.onerror = () => {
    if (coverInput.value) {
      if (coverError) coverError.style.display = 'block';
      if (coverDims) coverDims.style.display = 'none';
    }
  };
  coverPreview.onload = () => {
    if (coverError) coverError.style.display = 'none';
    if (coverDims && coverPreview.naturalWidth) {
      coverDims.style.display = 'block';
      const w = coverPreview.naturalWidth;
      const h = coverPreview.naturalHeight;
      const ratio = (w / h).toFixed(2);
      coverDims.innerHTML = `✓ Terdeteksi: <strong>${w} &times; ${h} px</strong> (Rasio ~${ratio}:1) &bull; Otomatis dipaskan proporsional`;
    }
  };

  if (coverUpload) {
    coverUpload.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file) {
        showToast('Mengoptimasi gambar cover...');
        try {
          const result = await processAndOptimizeImage(file, { maxWidth: 1600, maxHeight: 900, quality: 0.85, force16x9: true });
          coverInput.value = result.dataUrl;
          coverPreview.src = result.dataUrl;
          if (coverError) coverError.style.display = 'none';
          if (coverNotice) coverNotice.style.display = 'none';
          showToast(`Cover artikel dioptimasi ke 16:9 (${result.width}x${result.height}px) ringan & cepat!`);
        } catch (err) {
          console.error(err);
          const reader = new FileReader();
          reader.onload = (ev) => {
            coverInput.value = ev.target.result;
            coverPreview.src = ev.target.result;
          };
          reader.readAsDataURL(file);
        }
      }
    });
  }

  function renderArticlesTable() {
    tbody.innerHTML = '';
    currentSiteData.articles.forEach(art => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><img src="${art.image}" alt="${art.title}" class="table-thumb" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=200&q=80';"></td>
        <td><strong>${art.title}</strong></td>
        <td><span class="badge badge--subtle">${art.category}</span></td>
        <td>${art.readTime || '-'}</td>
        <td>${art.date || '-'}</td>
        <td>
          <div class="action-btns">
            <button type="button" class="btn btn--secondary btn--xs edit-art-btn" data-id="${art.id}">Edit</button>
            <button type="button" class="btn btn--outline btn--xs del-art-btn" data-id="${art.id}" style="color: var(--danger); border-color: var(--danger);">Hapus</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.edit-art-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        openEditArticle(btn.getAttribute('data-id'));
      });
    });

    tbody.querySelectorAll('.del-art-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        deleteArticle(btn.getAttribute('data-id'));
      });
    });

    updateBadgeCounts();
  }

  function openEditArticle(id) {
    const art = currentSiteData.articles.find(a => a.id === id);
    if (!art) return;

    modalHeading.textContent = 'Sunting Artikel';
    idInput.value = art.id;
    titleInput.value = art.title;
    catInput.value = art.category;
    readTimeInput.value = art.readTime;
    dateInput.value = art.date;
    coverInput.value = art.image;
    coverPreview.src = art.image;
    excerptInput.value = art.excerpt;
    contentInput.value = art.content;

    if (coverError) coverError.style.display = 'none';
    if (coverUpload) coverUpload.value = '';
    checkArticleCoverUrl(art.image);

    modal.showModal();
  }

  function openNewArticle() {
    modalHeading.textContent = 'Tulis Artikel Baru';
    idInput.value = 'article-' + Date.now();
    titleInput.value = '';
    catInput.value = 'Branding & Strategy';
    readTimeInput.value = '5 min read';
    dateInput.value = new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date());
    coverInput.value = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80';
    coverPreview.src = coverInput.value;
    excerptInput.value = '';
    contentInput.value = '<p>Tulis paragraf pertama artikel di sini...</p>\n\n<h3>Sub-judul Bagian</h3>\n<p>Paragraf penjelasan berikutnya...</p>';

    if (coverError) coverError.style.display = 'none';
    if (coverNotice) coverNotice.style.display = 'none';
    if (coverUpload) coverUpload.value = '';

    modal.showModal();
  }

  function deleteArticle(id) {
    if (confirm('Hapus artikel ini secara permanen?')) {
      currentSiteData.articles = currentSiteData.articles.filter(a => a.id !== id);
      saveSiteData(currentSiteData);
      renderArticlesTable();
      showToast('Artikel berhasil dihapus.');
    }
  }

  const closeModal = () => modal.close();
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (addBtn) addBtn.addEventListener('click', openNewArticle);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = idInput.value;

    const articleData = {
      id,
      title: titleInput.value.trim(),
      category: catInput.value.trim(),
      readTime: readTimeInput.value.trim(),
      date: dateInput.value.trim(),
      author: currentSiteData.profile.name || 'Gilkreatifin',
      image: coverInput.value.trim(),
      excerpt: excerptInput.value.trim(),
      content: contentInput.value.trim()
    };

    const existingIdx = currentSiteData.articles.findIndex(a => a.id === id);
    if (existingIdx >= 0) {
      currentSiteData.articles[existingIdx] = articleData;
    } else {
      currentSiteData.articles.unshift(articleData);
    }

    saveSiteData(currentSiteData);
    closeModal();
    renderArticlesTable();
    showToast('Artikel berhasil disimpan!');
  });

  renderArticlesTable();
}

// ==========================================================================
// 7. Tab 4: Services Manager
// ==========================================================================
function initServicesTab() {
  const container = document.getElementById('servicesListContainer');
  const form = document.getElementById('servicesForm');

  function renderServicesForm() {
    container.innerHTML = '';
    currentSiteData.services.forEach((srv, i) => {
      const card = document.createElement('div');
      card.className = 'service-edit-card';
      card.innerHTML = `
        <div class="form-group">
          <label class="form-label">Nama Layanan #${i + 1}</label>
          <input type="text" class="form-input srv-title" value="${srv.title}" data-index="${i}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Deskripsi Layanan</label>
          <textarea class="form-textarea srv-desc" rows="3" data-index="${i}">${srv.desc}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Daftar Deliverables (Satu per baris)</label>
          <textarea class="form-textarea srv-deliv" rows="4" data-index="${i}">${(srv.deliverables || []).join('\n')}</textarea>
        </div>
      `;
      container.appendChild(card);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const titles = container.querySelectorAll('.srv-title');
    const descs = container.querySelectorAll('.srv-desc');
    const delivs = container.querySelectorAll('.srv-deliv');

    currentSiteData.services.forEach((srv, idx) => {
      srv.title = titles[idx].value.trim();
      srv.desc = descs[idx].value.trim();
      srv.deliverables = delivs[idx].value.split('\n').map(s => s.trim()).filter(Boolean);
    });

    saveSiteData(currentSiteData);
    showToast('Layanan berhasil diperbarui!');
  });

  renderServicesForm();
}

// ==========================================================================
// 8. Tab 5: Inbox (Pesan Masuk Formulir)
// ==========================================================================
function initInboxTab() {
  const container = document.getElementById('inboxListContainer');
  const emptyState = document.getElementById('inboxEmptyState');
  const clearBtn = document.getElementById('clearInboxBtn');

  function renderInbox() {
    const list = currentSiteData.inbox || [];
    updateBadgeCounts();

    if (!container || !emptyState) return;

    if (list.length === 0) {
      emptyState.style.display = 'block';
      container.style.display = 'none';
      container.innerHTML = '';
      return;
    }

    emptyState.style.display = 'none';
    container.style.display = 'grid';
    container.innerHTML = '';

    list.forEach(item => {
      const card = document.createElement('article');
      card.className = 'cms-item-card';
      card.style.flexDirection = 'column';
      card.style.alignItems = 'stretch';
      card.style.gap = '0.75rem';

      const cleanWa = (currentSiteData.profile?.whatsapp || '+6285156165296').replace(/[^0-9]/g, '');
      const replyMsg = encodeURIComponent(`Halo ${item.name}, terima kasih telah menghubungi Gilkreatifin mengenai proyek ${item.service}.`);
      const replyWaUrl = `https://wa.me/${cleanWa}?text=${replyMsg}`;

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.2rem;">${item.name}</h3>
            <div style="font-size: 0.82rem; color: var(--text-muted); display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <span>✉️ <a href="mailto:${item.email}" style="color: inherit; text-decoration: underline;">${item.email}</a></span>
              <span>📅 ${item.date || 'Baru saja'}</span>
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <span class="table-badge" style="background: rgba(37, 99, 235, 0.15); color: #60a5fa;">${item.service}</span>
            <span class="table-badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399;">Budget: ${item.budget}</span>
          </div>
        </div>

        <div style="background: var(--bg-surface); padding: 0.85rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-color); font-size: 0.9rem; line-height: 1.6; white-space: pre-wrap; color: var(--text-primary);">
${item.message}
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.25rem;">
          <a href="${replyWaUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary btn--xs" style="text-decoration: none;">
            <span>Balas via WhatsApp</span> &rarr;
          </a>
          <button type="button" class="btn btn--outline btn--xs btn-delete-inbox" data-id="${item.id}" style="color: var(--danger); border-color: var(--danger);">
            Hapus Pesan
          </button>
        </div>
      `;

      container.appendChild(card);
    });

    // Delete single item
    container.querySelectorAll('.btn-delete-inbox').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        currentSiteData.inbox = (currentSiteData.inbox || []).filter(i => i.id !== id);
        saveSiteData(currentSiteData);
        renderInbox();
        showToast('Pesan berhasil dihapus.');
      });
    });
  }

  // Clear all
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (!currentSiteData.inbox || currentSiteData.inbox.length === 0) {
        showToast('Riwayat pesan sudah kosong.');
        return;
      }
      if (confirm('Apakah Anda yakin ingin menghapus seluruh riwayat pesan masuk?')) {
        currentSiteData.inbox = [];
        saveSiteData(currentSiteData);
        renderInbox();
        showToast('Seluruh riwayat pesan dibersihkan.');
      }
    });
  }

  renderInbox();
}

// ==========================================================================
// 9. Tab 6: Backup & Reset
// ==========================================================================
function initBackupTab() {
  const exportBtn = document.getElementById('exportDataBtn');
  const importFile = document.getElementById('importJsonFile');
  const importBtn = document.getElementById('importDataBtn');
  const resetBtn = document.getElementById('resetDataBtn');

  // Export JSON
  exportBtn.addEventListener('click', () => {
    const jsonStr = exportDataAsJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gilkreatifin-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Berkas backup JSON berhasil diunduh!');
  });

  // Import JSON
  importBtn.addEventListener('click', () => {
    const file = importFile.files[0];
    if (!file) {
      alert('Pilih berkas JSON terlebih dahulu.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        importDataFromJSON(e.target.result);
        currentSiteData = getSiteData();
        showToast('Data berhasil diimpor! Memuat ulang CMS...');
        setTimeout(() => window.location.reload(), 1200);
      } catch (err) {
        alert(err.message);
      }
    };
    reader.readAsText(file);
  });

  // Reset to default
  resetBtn.addEventListener('click', () => {
    if (confirm('PERINGATAN: Semua perubahan kustom akan dihapus dan dikembalikan ke data awal. Lanjutkan?')) {
      resetSiteData();
      showToast('Data berhasil dikembalikan ke pengaturan pabrik.');
      setTimeout(() => window.location.reload(), 1200);
    }
  });
}

// ==========================================================================
// 9. Global Save Button in Topbar
// ==========================================================================
function initGlobalSave() {
  const globalBtn = document.getElementById('globalSaveBtn');
  if (globalBtn) {
    globalBtn.addEventListener('click', () => {
      saveSiteData(currentSiteData);
      showToast('Semua data CMS tersimpan ke website!');
    });
  }
}

// ==========================================================================
// 10. Toast Feedback
// ==========================================================================
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  const msg = toast.querySelector('.toast__message');
  if (msg) msg.textContent = message;

  toast.classList.add('is-show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('is-show');
  }, 3500);
}

