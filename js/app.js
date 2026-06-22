/* =============================================
   PROJECT LAIN — APP
   ============================================= */

import { roms, techFeatures, metaPills, communityLinks } from './data.js';

class ProjectLainApp {
  constructor() {
    this.currentIndex = 0;
    this.isReducedMotion = false;
  }

  init() {
    this.checkReducedMotion();
    this.renderHero();
    this.renderTech();
    this.renderCarousel();
    this.renderRomSections();
    this.renderGallery();
    this.renderCommunity();
    this.initEffects();
    this.bindEvents();
  }

  checkReducedMotion() {
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // === RENDER ===
  
  renderHero() {
    const container = document.querySelector('.hero-content');
    if (!container) return;

    // Meta pills
    const pillsEl = container.querySelector('.meta-pills');
    if (pillsEl) {
      pillsEl.innerHTML = metaPills.map(p => `<span class="pill">${p.label}</span>`).join('');
    }

    // Thumbnail
    const thumb = document.querySelector('.hero-thumbnail img');
    if (thumb) {
      const featured = roms.find(r => r.id === 'project-sakana') || roms[0];
      thumb.src = featured.thumbnail;
      thumb.alt = featured.name;
    }
  }

  renderTech() {
    const container = document.querySelector('.tech-panels');
    if (!container) return;

    container.innerHTML = techFeatures.map((f, i) => `
      <div class="tech-panel reveal-3d" data-index="${i}">
        <div class="tech-title">${f.title}</div>
        <p class="tech-desc">${f.description}</p>
      </div>
    `).join('');

    this.initReveal();
  }

  renderCarousel() {
    const track = document.querySelector('.rom-cards');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (!track || !dotsContainer) return;

    // Create cards
    track.innerHTML = roms.map((rom, i) => `
      <div class="rom-card ${i === 0 ? 'active' : ''}" data-index="${i}">
        <div class="rom-card-image">
          <img src="${rom.thumbnail}" alt="${rom.name}">
        </div>
        <div class="rom-card-info">
          <h3 class="rom-card-title">${rom.name}</h3>
          <div class="rom-card-meta">
            <span class="pill">${rom.androidVersion}</span>
            <span class="badge badge-${rom.statusBadge.type}">${rom.statusBadge.label}</span>
          </div>
          <p class="rom-card-version">${rom.baseFirmware}</p>
        </div>
      </div>
    `).join('');

    // Create dots
    dotsContainer.innerHTML = roms.map((_, i) => `
      <button class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></button>
    `).join('');

    // Click on cards
    track.querySelectorAll('.rom-card').forEach(card => {
      card.addEventListener('click', () => {
        const index = parseInt(card.dataset.index);
        this.goToSlide(index);
      });
    });

    this.initReveal();
  }

  renderRomSections() {
    const container = document.querySelector('.rom-sections');
    if (!container) return;

    container.innerHTML = roms.map((rom, i) => {
      const reversed = i % 2 === 1;
      return `
        <section class="rom-section reveal-3d ${reversed ? 'reveal-3d-right' : 'reveal-3d-left'}" id="${rom.id}">
          <div class="rom-header ${reversed ? 'reversed' : ''}">
            <div class="rom-image">
              <img src="${rom.thumbnail}" alt="${rom.name}">
            </div>
            <div class="rom-info">
              <div class="rom-meta">
                <span class="pill" style="border-color: rgba(246,194,91,0.4); color: #F6C35B;">${rom.androidVersion}</span>
                <span class="badge badge-${rom.statusBadge.type}">${rom.statusBadge.label}</span>
              </div>
              <h2 class="rom-title">${rom.name}</h2>
              <p class="rom-desc">${rom.description}</p>
              
              <div class="rom-detail-item">
                <span class="rom-detail-label">Device</span>
                <span class="rom-detail-value">${rom.device}</span>
              </div>
              <div class="rom-detail-item">
                <span class="rom-detail-label">Build Date</span>
                <span class="rom-detail-value">${rom.buildDate}</span>
              </div>
              <div class="rom-detail-item">
                <span class="rom-detail-label">Base Firmware</span>
                <span class="rom-detail-value">${rom.baseFirmware}</span>
              </div>
              <div class="rom-detail-item">
                <span class="rom-detail-label">System Type</span>
                <span class="rom-detail-value">${rom.systemType}</span>
              </div>
              <div class="rom-detail-item">
                <span class="rom-detail-label">Kernel</span>
                <span class="rom-detail-value">${rom.kernelSupport}</span>
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

    // Download buttons
    container.querySelectorAll('.download-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const romId = btn.dataset.rom;
        this.openModal(romId);
      });
    });

    this.initReveal();
  }

  renderGallery() {
    const track = document.querySelector('.gallery-track');
    if (!track) return;

    const allScreenshots = roms.flatMap(rom => rom.screenshots.map(src => src));

    track.innerHTML = allScreenshots.map((src, i) => `
      <div class="gallery-item" data-index="${i}">
        <img src="${src}" alt="Screenshot ${i + 1}">
      </div>
    `).join('');

    // Click to fullscreen
    track.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        this.openFullscreen(img.src);
      });
    });
  }

  renderCommunity() {
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

  // === CAROUSEL ===

  goToSlide(index) {
    if (index < 0 || index >= roms.length) return;
    
    this.currentIndex = index;

    // Update cards
    document.querySelectorAll('.rom-card').forEach((card, i) => {
      card.classList.toggle('active', i === index);
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

    // Scroll card into view
    const track = document.querySelector('.rom-cards');
    const card = track?.querySelectorAll('.rom-card')[index];
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  nextSlide() {
    if (this.currentIndex < roms.length - 1) {
      this.goToSlide(this.currentIndex + 1);
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.goToSlide(this.currentIndex - 1);
    }
  }

  // === EFFECTS ===

  initEffects() {
    // Intro
    const intro = document.querySelector('.intro-overlay');
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
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });

    // 3D thumbnail
    if (!this.isReducedMotion) {
      this.init3DThumbnail();
    }

    // Cursor glow
    if (!this.isReducedMotion) {
      this.initCursorGlow();
    }

    // Ambient lights
    this.initAmbientWarper();

    // Reveal on scroll
    this.initReveal();
  }

  initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    document.querySelectorAll('.reveal-3d, .reveal, .reveal-3d-left, .reveal-3d-right, .stagger').forEach(el => {
      observer.observe(el);
    });

    // Stagger children
    document.querySelectorAll('[class*="stagger-"]').forEach(el => {
      const parent = el.closest('.hero-content, .carousel-header, .gallery-header');
      if (parent && !parent.dataset.observed) {
        parent.dataset.observed = 'true';
        const staggerEls = parent.querySelectorAll('.stagger');
        const parentObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              staggerEls.forEach(s => s.classList.add('visible'));
              parentObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.2 });
        parentObserver.observe(parent);
      }
    });
  }

  init3DThumbnail() {
    const thumb = document.querySelector('.hero-thumbnail');
    if (!thumb) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    thumb.addEventListener('mousemove', (e) => {
      const rect = thumb.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      targetX = y * 5;
      targetY = -x * 5;
    });

    thumb.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      thumb.style.transform = `perspective(1200px) rotateX(${currentX}deg) rotateY(${currentY}deg)`;
      requestAnimationFrame(animate);
    };

    animate();
  }

  initCursorGlow() {
    const glow = document.querySelector('.cursor-glow');
    if (!glow) return;

    let x = 0, y = 0;
    let targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    glow.classList.add('active');

    const animate = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      glow.style.left = x + 'px';
      glow.style.top = y + 'px';
      requestAnimationFrame(animate);
    };

    animate();
  }

  initAmbientWarper() {
    const gold = document.querySelector('.ambient-gold');
    const crimson = document.querySelector('.ambient-crimson');

    if (!gold || !crimson) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

      gold.style.transform = `translate(${100 - progress * 150}%, ${10 + progress * 60}%)`;
      gold.style.opacity = 0.35 - progress * 0.15;

      crimson.style.transform = `translate(${-10 + progress * 100}%, ${100 - progress * 120}%)`;
      crimson.style.opacity = 0.35 - (1 - progress) * 0.15;
    }, { passive: true });
  }

  onScroll() {
    const scrollY = window.scrollY;
    
    // Progress bar
    const progress = document.querySelector('.progress-bar');
    if (progress) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const p = maxScroll > 0 ? scrollY / maxScroll : 0;
      progress.style.transform = `scaleX(${p})`;
    }

    // Back to top
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      backToTop.classList.toggle('visible', scrollY > 500);
    }

    // Nav
    const nav = document.querySelector('.nav');
    if (nav) {
      nav.classList.toggle('scrolled', scrollY > 80);
    }

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < 200 && rect.bottom > 200) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
        });
      }
    });
  }

  // === EVENTS ===

  bindEvents() {
    // Carousel buttons
    document.querySelector('.carousel-btn--prev')?.addEventListener('click', () => this.prevSlide());
    document.querySelector('.carousel-btn--next')?.addEventListener('click', () => this.nextSlide());

    // Dots
    document.querySelectorAll('.dot').forEach(dot => {
      dot.addEventListener('click', () => {
        this.goToSlide(parseInt(dot.dataset.index));
      });
    });

    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (e.target.closest('.carousel-section')) {
        if (e.key === 'ArrowLeft') this.prevSlide();
        if (e.key === 'ArrowRight') this.nextSlide();
      }
    });

    // Back to top
    document.querySelector('.back-to-top')?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Modal close
    document.querySelector('.modal-overlay')?.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        this.closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });
  }

  // === MODAL ===

  openModal(romId) {
    const overlay = document.querySelector('.modal-overlay');
    const content = overlay?.querySelector('.modal-content');
    if (!overlay || !content) return;

    const rom = roms.find(r => r.id === romId);
    if (!rom) return;

    this.selectedRegion = null;

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

    content.querySelector('.modal-close').addEventListener('click', () => this.closeModal());

    content.querySelectorAll('.region-option').forEach(opt => {
      opt.addEventListener('click', () => {
        content.querySelectorAll('.region-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        this.selectedRegion = opt.dataset.region;
        content.querySelector('#proceed-btn').disabled = false;
      });
    });

    content.querySelector('#proceed-btn').addEventListener('click', () => this.showSuccess());

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  showSuccess() {
    const content = document.querySelector('.modal-content');
    if (!content) return;

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

    content.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
  }

  closeModal() {
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  openFullscreen(src) {
    // Simple fullscreen with overlay
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
}

// Init
const app = new ProjectLainApp();
document.addEventListener('DOMContentLoaded', () => app.init());