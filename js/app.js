/* =============================================
   PROJECT LAIN — APP
   ============================================= */

import { roms, techFeatures, metaPills, communityLinks } from './data.js';

// State
let currentSlide = 0;
let isReducedMotion = false;

/* =============================================
   INIT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  renderAll();
  initAnimations();
  initEffects();
  bindEvents();
});

/* =============================================
   RENDER
   ============================================= */

function renderAll() {
  renderHero();
  renderTech();
  renderCarousel();
  renderRomSections();
  renderGallery();
  renderCommunity();
}

function renderHero() {
  const pills = document.querySelector('.hero-content .pills');
  if (pills) {
    pills.innerHTML = metaPills.map(p => `<span class="pill">${p.label}</span>`).join('');
  }
  
  const thumb = document.querySelector('.hero-thumb img');
  if (thumb) {
    const rom = roms.find(r => r.id === 'project-sakana') || roms[0];
    thumb.src = rom.thumbnail;
    thumb.alt = rom.name;
  }
}

function renderTech() {
  const container = document.querySelector('.tech-panels');
  if (!container) return;
  
  container.innerHTML = techFeatures.map((f, i) => `
    <div class="tech-panel animate-3d" data-index="${i}">
      <div class="tech-content">
        <h2 class="tech-title">${f.title}</h2>
        <p class="tech-desc">${f.description}</p>
      </div>
    </div>
  `).join('');
}

function renderCarousel() {
  const track = document.querySelector('.cards-track');
  const dots = document.querySelector('.dots');
  if (!track || !dots) return;
  
  track.innerHTML = roms.map((rom, i) => `
    <div class="rom-card ${i === 0 ? 'active' : ''}" data-index="${i}">
      <div class="card-img">
        <img src="${rom.thumbnail}" alt="${rom.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 225%22%3E%3Crect fill=%22%230a0a0a%22 width=%22400%22 height=%22225%22/%3E%3Ctext fill=%22%23F6C35B%22 font-family=%22sans-serif%22 font-size=%2214%22 x=%22200%22 y=%22115%22 text-anchor=%22middle%22%3E${rom.name}%3C/text%3E%3C/svg%3E'">
      </div>
      <div class="card-info">
        <h3 class="card-title">${rom.name}</h3>
        <div class="card-meta">
          <span class="pill">${rom.androidVersion}</span>
          <span class="badge badge-${rom.statusBadge.type}">${rom.statusBadge.label}</span>
        </div>
        <p class="card-version">${rom.baseFirmware}</p>
      </div>
    </div>
  `).join('');
  
  dots.innerHTML = roms.map((_, i) => `
    <button class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></button>
  `).join('');
}

function renderRomSections() {
  const container = document.querySelector('.rom-sections');
  if (!container) return;
  
  container.innerHTML = roms.map((rom, i) => {
    const reversed = i % 2 === 1;
    return `
      <section class="rom-section animate-3d-${reversed ? 'right' : 'left'}" id="${rom.id}">
        <div class="rom-header ${reversed ? 'reversed' : ''}">
          <div class="rom-image">
            <img src="${rom.thumbnail}" alt="${rom.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 225%22%3E%3Crect fill=%22%230a0a0a%22 width=%22400%22 height=%22225%22/%3E%3Ctext fill=%22%23F6C35B%22 font-family=%22sans-serif%22 font-size=%2214%22 x=%22200%22 y=%22115%22 text-anchor=%22middle%22%3E${rom.name}%3C/text%3E%3C/svg%3E'">
          </div>
          <div class="rom-info">
            <div class="rom-meta">
              <span class="pill" style="border-color: rgba(246,194,91,0.4); color: #F6C35B;">${rom.androidVersion}</span>
              <span class="badge badge-${rom.statusBadge.type}">${rom.statusBadge.label}</span>
            </div>
            <h2 class="rom-title">${rom.name}</h2>
            <p class="rom-desc">${rom.description}</p>
            
            <div class="detail-item">
              <span class="detail-label">Device</span>
              <span class="detail-value">${rom.device}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Build Date</span>
              <span class="detail-value">${rom.buildDate}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Base Firmware</span>
              <span class="detail-value">${rom.baseFirmware}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">System Type</span>
              <span class="detail-value">${rom.systemType}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Kernel</span>
              <span class="detail-value">${rom.kernelSupport}</span>
            </div>
            
            <div class="list-title">Changelog</div>
            <ul class="changelog-list">
              ${rom.changelog.map(item => `<li class="changelog-item">${item}</li>`).join('')}
            </ul>
            
            ${rom.knownIssues.length > 0 ? `
              <div class="list-title" style="color: #d44550;">Known Issues</div>
              <ul class="issues-list">
                ${rom.knownIssues.map(item => `<li class="issue-item">${item}</li>`).join('')}
              </ul>
            ` : ''}
            
            <div class="list-title">Credits</div>
            <div class="credits-list">
              ${rom.credits.map(c => `<span class="credit-item">${c}</span>`).join('')}
            </div>
            
            <button class="btn btn-primary btn-large download-btn" data-rom="${rom.id}">
              Download — ${rom.priceBRL ? `R$${rom.priceBRL}` : `$${rom.priceUSD}`}
            </button>
          </div>
        </div>
      </section>
    `;
  }).join('');
  
  // Bind download buttons
  container.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.rom));
  });
}

function renderGallery() {
  const track = document.querySelector('.gallery-track');
  if (!track) return;
  
  const allScreenshots = roms.flatMap(rom => rom.screenshots);
  
  track.innerHTML = allScreenshots.map((src, i) => `
    <div class="gallery-item" data-index="${i}">
      <img src="${src}" alt="Screenshot ${i + 1}" onerror="this.parentElement.style.display='none'">
    </div>
  `).join('');
  
  // Click to fullscreen
  track.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) openFullscreen(img.src);
    });
  });
}

function renderCommunity() {
  const grid = document.querySelector('.community-grid');
  if (!grid) return;
  
  grid.innerHTML = communityLinks.map(link => `
    <div class="community-item">
      <h3 class="community-title">${link.title}</h3>
      <p class="community-desc">${link.description}</p>
      <a href="${link.link}" class="community-link" target="_blank">Join Channel →</a>
    </div>
  `).join('');
}

/* =============================================
   ANIMATIONS
   ============================================= */

function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  
  // Observe all animated elements
  document.querySelectorAll('.animate-in, .animate-3d, .animate-3d-left, .animate-3d-right').forEach(el => {
    observer.observe(el);
  });
  
  // Stagger animation for groups
  document.querySelectorAll('.section-header, .hero-content').forEach(group => {
    const staggers = group.querySelectorAll('.stagger');
    if (staggers.length > 0) {
      const groupObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            staggers.forEach(s => s.classList.add('visible'));
            groupObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      groupObserver.observe(group);
    }
  });
}

/* =============================================
   EFFECTS
   ============================================= */

function initEffects() {
  // Intro
  const intro = document.querySelector('.intro');
  const logo = document.querySelector('.intro-logo');
  
  if (intro && logo) {
    setTimeout(() => logo.classList.add('revealed'), 400);
    setTimeout(() => {
      intro.classList.add('hidden');
      document.body.style.overflow = '';
    }, 2800);
    setTimeout(() => intro.style.display = 'none', 3600);
  } else {
    document.body.style.overflow = '';
  }
  
  // Scroll effects
  window.addEventListener('scroll', onScroll, { passive: true });
  
  // 3D Thumbnail
  if (!isReducedMotion) init3DThumb();
  
  // Cursor glow
  if (!isReducedMotion) initCursorGlow();
  
  // Ambient lights
  initAmbientLights();
}

function onScroll() {
  const scrollY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
  
  // Progress bar
  const progressEl = document.querySelector('.progress');
  if (progressEl) progressEl.style.transform = `scaleX(${progress})`;
  
  // Back to top
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) backToTop.classList.toggle('visible', scrollY > 500);
  
  // Nav
  const nav = document.querySelector('.nav');
  if (nav) nav.classList.toggle('scrolled', scrollY > 80);
  
  // Active nav link
  document.querySelectorAll('section[id]').forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < 150 && rect.bottom > 150) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
      });
    }
  });
}

function init3DThumb() {
  const thumb = document.querySelector('.hero-thumb');
  if (!thumb) return;
  
  let tx = 0, ty = 0;
  let cx = 0, cy = 0;
  
  thumb.addEventListener('mousemove', (e) => {
    const rect = thumb.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    tx = y * 6;
    ty = -x * 6;
  });
  
  thumb.addEventListener('mouseleave', () => { tx = 0; ty = 0; });
  
  function animate() {
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    thumb.style.transform = `perspective(1200px) rotateX(${cx}deg) rotateY(${cy}deg)`;
    requestAnimationFrame(animate);
  }
  
  animate();
}

function initCursorGlow() {
  const glow = document.querySelector('.cursor-glow');
  if (!glow) return;
  
  let x = 0, y = 0;
  let tx = 0, ty = 0;
  
  document.addEventListener('mousemove', (e) => {
    tx = e.clientX;
    ty = e.clientY;
  });
  
  glow.classList.add('active');
  
  function animate() {
    x += (tx - x) * 0.12;
    y += (ty - y) * 0.12;
    glow.style.left = x + 'px';
    glow.style.top = y + 'px';
    requestAnimationFrame(animate);
  }
  
  animate();
}

function initAmbientLights() {
  const gold = document.querySelector('.ambient-1');
  const crimson = document.querySelector('.ambient-2');
  
  if (!gold || !crimson) return;
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const p = maxScroll > 0 ? scrollY / maxScroll : 0;
    
    gold.style.transform = `translate(${100 - p * 150}%, ${10 + p * 60}%)`;
    gold.style.opacity = 0.6 - p * 0.2;
    
    crimson.style.transform = `translate(${-10 + p * 100}%, ${100 - p * 120}%)`;
    crimson.style.opacity = 0.6 - (1 - p) * 0.2;
  }, { passive: true });
}

/* =============================================
   CAROUSEL
   ============================================= */

function goToSlide(index) {
  if (index < 0 || index >= roms.length) return;
  
  currentSlide = index;
  
  // Update cards
  document.querySelectorAll('.rom-card').forEach((card, i) => {
    card.classList.toggle('active', i === index);
    
    // Scroll into view
    if (i === index) {
      card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  });
  
  // Update dots
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  
  // Update buttons
  const prevBtn = document.querySelector('.carousel-btn--prev');
  const nextBtn = document.querySelector('.carousel-btn--next');
  if (prevBtn) prevBtn.disabled = index === 0;
  if (nextBtn) nextBtn.disabled = index === roms.length - 1;
}

/* =============================================
   MODAL
   ============================================= */

function openModal(romId) {
  const overlay = document.querySelector('.modal-overlay');
  const content = overlay?.querySelector('.modal-content');
  if (!overlay || !content) return;
  
  const rom = roms.find(r => r.id === romId);
  if (!rom) return;
  
  content.innerHTML = `
    <button class="modal-close">✕</button>
    <div class="modal-header">
      <h3 class="modal-title">Select Your Region</h3>
      <p class="modal-desc">Choose your country for pricing</p>
    </div>
    <div class="region-options">
      <div class="region-option" data-region="brazil">
        <span class="region-name">Brazil</span>
        <span class="region-price">R$8</span>
      </div>
      <div class="region-option" data-region="usa">
        <span class="region-name">United States</span>
        <span class="region-price">$2</span>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" id="proceed-btn" disabled>Proceed to Download</button>
    </div>
  `;
  
  let selectedRegion = null;
  
  content.querySelector('.modal-close').addEventListener('click', closeModal);
  
  content.querySelectorAll('.region-option').forEach(opt => {
    opt.addEventListener('click', () => {
      content.querySelectorAll('.region-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      selectedRegion = opt.dataset.region;
      content.querySelector('#proceed-btn').disabled = false;
    });
  });
  
  content.querySelector('#proceed-btn').addEventListener('click', () => {
    if (selectedRegion) {
      content.innerHTML = `
        <button class="modal-close">✕</button>
        <div class="modal-success">
          <div class="modal-success-icon">✓</div>
          <h3 class="modal-title">Selection Confirmed</h3>
          <p class="modal-desc" style="margin-top: 16px;">Head over to Telegram to proceed with payment.</p>
        </div>
        <div class="modal-footer" style="margin-top: 32px;">
          <a href="https://t.me/nihilupdates" target="_blank" class="btn btn-primary">Open Telegram</a>
        </div>
      `;
      content.querySelector('.modal-close').addEventListener('click', closeModal);
    }
  });
  
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function openFullscreen(src) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 3000;
    background: rgba(0,0,0,0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `;
  
  const img = document.createElement('img');
  img.src = src;
  img.style.cssText = 'max-width: 90%; max-height: 90vh; border-radius: 16px;';
  
  overlay.appendChild(img);
  document.body.appendChild(overlay);
  
  overlay.addEventListener('click', () => overlay.remove());
}

/* =============================================
   EVENTS
   ============================================= */

function bindEvents() {
  // Carousel buttons
  document.querySelector('.carousel-btn--prev')?.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
  });
  
  document.querySelector('.carousel-btn--next')?.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
  });
  
  // Dots
  document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.index));
    });
  });
  
  // Cards click
  document.querySelectorAll('.rom-card').forEach(card => {
    card.addEventListener('click', () => {
      goToSlide(parseInt(card.dataset.index));
    });
  });
  
  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (e.target.closest('.carousel-section')) {
      if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
      if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
    }
    if (e.key === 'Escape') closeModal();
  });
  
  // Back to top
  document.querySelector('.back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Modal close on overlay click
  document.querySelector('.modal-overlay')?.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) closeModal();
  });
}