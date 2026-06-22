/* =============================================
   PROJECT LAIN — APP
   ============================================= */

import { roms, techFeatures, metaPills, communityLinks } from './data.js';
import { initNavigation } from './navigation.js';
import { initReveal } from './reveal.js';
import { initCarousel } from './carousel.js';
import { initGallery } from './gallery.js';
import { initModal } from './modal.js';
import { initScroll } from './scroll.js';
import { initAccessibility } from './accessibility.js';

class ProjectLainApp {
  constructor() {
    this.elements = {};
    this.state = {
      currentCarouselIndex: 0,
      scrollY: 0,
      reducedMotion: false
    };
  }

  init() {
    this.checkReducedMotion();
    this.cacheElements();
    this.renderContent();
    this.initBackground();
    this.initIntroSequence();
    this.initScrollEffects();
    this.initAllModules();
    this.bindEvents();
  }

  checkReducedMotion() {
    this.state.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  cacheElements() {
    this.elements = {
      introOverlay: document.querySelector('.intro-overlay'),
      introLogo: document.querySelector('.intro-logo'),
      scrollProgress: document.querySelector('.scroll-progress'),
      nav: document.querySelector('.nav'),
      heroThumbnail: document.querySelector('.hero-thumbnail'),
      backToTop: document.querySelector('.back-to-top'),
      cursorGlow: document.querySelector('.cursor-glow'),
      modalOverlay: document.querySelector('.modal-overlay'),
      galleryOverlay: document.querySelector('.fullscreen-gallery'),
      ambientGold: document.querySelector('.ambient-light--gold'),
      ambientCrimson: document.querySelector('.ambient-light--crimson')
    };
  }

  renderContent() {
    this.renderHero();
    this.renderTechnology();
    this.renderCarousel();
    this.renderROMSections();
    this.renderGallery();
    this.renderCommunity();
  }

  renderHero() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    const metaPillsContainer = heroContent.querySelector('.meta-pills');
    if (metaPillsContainer) {
      metaPillsContainer.innerHTML = metaPills.map(pill => 
        `<span class="pill">${pill.label}</span>`
      ).join('');
    }

    const thumbnailImg = this.elements.heroThumbnail?.querySelector('img');
    if (thumbnailImg) {
      const featuredROM = roms.find(r => r.id === 'project-sakana') || roms[0];
      thumbnailImg.src = featuredROM.thumbnail;
      thumbnailImg.alt = featuredROM.name;
    }
  }

  renderTechnology() {
    const techContainer = document.querySelector('.tech-panels');
    if (!techContainer) return;

    techContainer.innerHTML = techFeatures.map((feature, index) => `
      <div class="tech-panel reveal-3d" data-index="${index}">
        <div class="tech-content">
          <h2 class="tech-title text-split" data-text="${feature.title}">${feature.title}</h2>
          <p class="tech-description">${feature.description}</p>
        </div>
      </div>
    `).join('');
  }

  renderCarousel() {
    const blueprint = document.querySelector('.rom-blueprint');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (!blueprint || !dotsContainer) return;

    // Update preview
    this.updateCarouselPreview(0);

    // Update dots
    dotsContainer.innerHTML = roms.map((_, index) => `
      <button class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>
    `).join('');
  }

  updateCarouselPreview(index) {
    const blueprint = document.querySelector('.rom-blueprint');
    const preview = blueprint?.querySelector('.rom-preview');
    
    if (!preview || !roms[index]) return;

    const rom = roms[index];
    preview.innerHTML = `
      <img src="${rom.thumbnail}" alt="${rom.name}">
      <div class="rom-preview-info">
        <h3 class="rom-preview-title">${rom.name}</h3>
        <div class="rom-preview-meta">
          <span class="pill">${rom.androidVersion}</span>
          <span class="badge badge-${rom.statusBadge.type}">${rom.statusBadge.label}</span>
          <span class="pill">${rom.baseFirmware}</span>
        </div>
      </div>
    `;

    // Update dots
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    // Update buttons
    const prevBtn = document.querySelector('.carousel-btn--prev');
    const nextBtn = document.querySelector('.carousel-btn--next');
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === roms.length - 1;
  }

  renderROMSections() {
    const container = document.querySelector('.rom-sections');
    if (!container) return;

    container.innerHTML = roms.map((rom, index) => {
      const isReversed = index % 2 === 1;
      return `
        <section class="rom-section reveal-3d ${isReversed ? 'reveal-3d-right' : 'reveal-3d-left'}" id="${rom.id}">
          <div class="rom-header ${isReversed ? 'rom-header--reversed' : ''}">
            <div class="rom-image">
              <img src="${rom.thumbnail}" alt="${rom.name}">
            </div>
            <div class="rom-info">
              <div class="rom-meta">
                <span class="pill" style="border-color: rgba(246,194,91,0.4); color: var(--color-gold);">${rom.androidVersion}</span>
                <span class="badge badge-${rom.statusBadge.type}">${rom.statusBadge.label}</span>
              </div>
              <h2 class="rom-title">${rom.name}</h2>
              <p class="rom-desc">${rom.description}</p>
              
              <div class="rom-details">
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
              </div>
              
              <h4 class="changelog-title">Changelog</h4>
              <ul class="changelog-list">
                ${rom.changelog.map(item => `<li class="changelog-item">${item}</li>`).join('')}
              </ul>
              
              ${rom.knownIssues.length > 0 ? `
                <h4 class="issues-title">Known Issues</h4>
                <ul class="issues-list">
                  ${rom.knownIssues.map(issue => `<li class="issue-item">${issue}</li>`).join('')}
                </ul>
              ` : ''}
              
              <h4 class="credits-title">Credits</h4>
              <div class="credits-list">
                ${rom.credits.map(credit => `<span class="credit-item">${credit}</span>`).join('')}
              </div>
              
              <button class="btn btn-primary btn-large download-btn hover-glow" data-rom-id="${rom.id}">
                Download — ${rom.priceBRL ? `R$${rom.priceBRL}` : `$${rom.priceUSD}`}
              </button>
            </div>
          </div>
        </section>
      `;
    }).join('');

    // Bind download buttons
    container.querySelectorAll('.download-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const romId = e.target.dataset.romId;
        this.openDownloadModal(romId);
      });
    });
  }

  renderGallery() {
    const galleryTrack = document.querySelector('.gallery-track');
    if (!galleryTrack) return;

    const allScreenshots = roms.flatMap(rom => 
      rom.screenshots.map((src, i) => ({
        src,
        romName: rom.name,
        index: i
      }))
    );

    galleryTrack.innerHTML = allScreenshots.map((shot, index) => `
      <div class="gallery-item" data-index="${index}" data-src="${shot.src}">
        <img src="${shot.src}" alt="${shot.romName} screenshot">
      </div>
    `).join('');

    this.initGalleryParallax();
  }

  renderCommunity() {
    const communityGrid = document.querySelector('.community-grid');
    if (!communityGrid) return;

    communityGrid.innerHTML = communityLinks.map(link => `
      <div class="community-item hover-lift">
        <h3 class="community-title">${link.title}</h3>
        <p class="community-desc">${link.description}</p>
        <a href="${link.link}" class="community-link" target="_blank" rel="noopener noreferrer">
          Join Channel →
        </a>
      </div>
    `).join('');
  }

  initBackground() {
    const bgVideo = document.querySelector('.background-video');
    if (bgVideo) {
      bgVideo.src = '/assets/video/bg.mp4';
      bgVideo.addEventListener('loadeddata', () => bgVideo.classList.add('loaded'));
      bgVideo.addEventListener('error', () => bgVideo.style.display = 'none');
    }
  }

  initIntroSequence() {
    if (this.state.reducedMotion) {
      this.hideIntro();
      return;
    }

    const introOverlay = this.elements.introOverlay;
    const introLogo = this.elements.introLogo;

    if (!introOverlay || !introLogo) {
      this.hideIntro();
      return;
    }

    setTimeout(() => introLogo.classList.add('revealed'), 400);
    setTimeout(() => {
      introOverlay.classList.add('hidden');
      document.body.style.overflow = '';
    }, 2800);
    setTimeout(() => introOverlay.style.display = 'none', 3600);
  }

  hideIntro() {
    const introOverlay = this.elements.introOverlay;
    if (introOverlay) introOverlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  initScrollEffects() {
    // Scroll progress bar
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      
      if (this.elements.scrollProgress) {
        this.elements.scrollProgress.style.transform = `scaleX(${progress})`;
      }

      // Back to top visibility
      if (this.elements.backToTop) {
        this.elements.backToTop.classList.toggle('visible', scrollTop > 500);
      }

      // Nav scroll state
      if (this.elements.nav) {
        this.elements.nav.classList.toggle('scrolled', scrollTop > 80);
      }
    }, { passive: true });

    // 3D Thumbnail parallax
    if (this.elements.heroThumbnail && !this.state.reducedMotion) {
      this.initThumbnail3D();
    }

    // Cursor glow
    if (this.elements.cursorGlow && !this.state.reducedMotion) {
      this.initCursorGlow();
    }

    // Ambient light warping based on scroll
    this.initAmbientWarper();

    // Text split animations
    this.initTextSplit();
  }

  initThumbnail3D() {
    const thumbnail = this.elements.heroThumbnail;
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    const maxTilt = 5;

    const handleMouseMove = (e) => {
      const rect = thumbnail.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      targetX = deltaY * maxTilt;
      targetY = -deltaX * maxTilt;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      thumbnail.style.transform = `perspective(1200px) rotateX(${currentX}deg) rotateY(${currentY}deg)`;
      requestAnimationFrame(animate);
    };

    thumbnail.addEventListener('mousemove', handleMouseMove);
    thumbnail.addEventListener('mouseleave', () => { targetX = 0; targetY = 0; });
    animate();
  }

  initCursorGlow() {
    const cursorGlow = this.elements.cursorGlow;
    if (!cursorGlow) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      cursorGlow.style.left = `${currentX}px`;
      cursorGlow.style.top = `${currentY}px`;
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    cursorGlow.classList.add('active');
    animate();
  }

  initAmbientWarper() {
    const goldLight = this.elements.ambientGold;
    const crimsonLight = this.elements.ambientCrimson;

    if (!goldLight || !crimsonLight) return;

    let lastScrollY = 0;

    const updateLights = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollY / docHeight : 0;

      // Gold light: moves from top-right to bottom-left as you scroll
      const goldX = 100 - (scrollProgress * 150);
      const goldY = 10 + (scrollProgress * 60);
      const goldScale = 1 + (scrollProgress * 0.5);
      const goldOpacity = 0.35 - (scrollProgress * 0.15);

      goldLight.style.transform = `translate(${goldX}%, ${goldY}%) scale(${goldScale})`;
      goldLight.style.opacity = goldOpacity;

      // Crimson light: moves from bottom-left to top-right as you scroll
      const crimsonX = -10 + (scrollProgress * 100);
      const crimsonY = 100 - (scrollProgress * 120);
      const crimsonScale = 1 + ((1 - scrollProgress) * 0.3);
      const crimsonOpacity = 0.35 - ((1 - scrollProgress) * 0.15);

      crimsonLight.style.transform = `translate(${crimsonX}%, ${crimsonY}%) scale(${crimsonScale})`;
      crimsonLight.style.opacity = crimsonOpacity;

      lastScrollY = scrollY;
    };

    window.addEventListener('scroll', updateLights, { passive: true });
    updateLights();
  }

  initTextSplit() {
    const textElements = document.querySelectorAll('.text-split[data-text]');
    
    textElements.forEach(el => {
      const text = el.dataset.text || el.textContent;
      const words = text.split(' ');
      
      el.innerHTML = words.map(word => `
        <span class="word">
          <span class="word-inner">${word}</span>
        </span>
      `).join(' ');
    });
  }

  initGalleryParallax() {
    const container = document.querySelector('.gallery-container');
    const track = document.querySelector('.gallery-track');
    
    if (!container || !track) return;

    const items = track.querySelectorAll('.gallery-item');
    if (items.length === 0) return;

    // Calculate total width
    const updatePositions = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.width / 2;
      
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2 - containerRect.left;
        const offset = (itemCenter - containerCenter) * 0.15;
        
        item.style.transform = `translateX(${-offset}px)`;
      });
    };

    // Scroll-linked horizontal movement
    let lastScrollY = 0;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollDelta = scrollY - lastScrollY;
      lastScrollY = scrollY;

      const gallerySection = document.querySelector('.gallery-section');
      if (!gallerySection) return;

      const rect = gallerySection.getBoundingClientRect();
      const sectionHeight = gallerySection.offsetHeight;
      
      // Only move when gallery is in view
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + sectionHeight);
        const translateX = (progress - 0.5) * 600; // Move左右
        track.style.transform = `translateY(-50%) translateX(${-translateX}px)`;
      }

      updatePositions();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updatePositions();
  }

  initAllModules() {
    initNavigation(this.elements.nav);
    initReveal();
    initCarousel(this);
    initGallery();
    initModal(this.elements.modalOverlay);
    initScroll();
    initAccessibility();
  }

  bindEvents() {
    // Back to top
    if (this.elements.backToTop) {
      this.elements.backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Carousel navigation buttons
    document.querySelector('.carousel-btn--prev')?.addEventListener('click', () => {
      if (this.state.currentCarouselIndex > 0) {
        this.state.currentCarouselIndex--;
        this.updateCarouselPreview(this.state.currentCarouselIndex);
      }
    });

    document.querySelector('.carousel-btn--next')?.addEventListener('click', () => {
      if (this.state.currentCarouselIndex < roms.length - 1) {
        this.state.currentCarouselIndex++;
        this.updateCarouselPreview(this.state.currentCarouselIndex);
      }
    });

    // Carousel dots
    document.querySelectorAll('.carousel-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.index);
        this.state.currentCarouselIndex = index;
        this.updateCarouselPreview(index);
      });
    });

    // Keyboard navigation for carousel
    document.addEventListener('keydown', (e) => {
      if (e.target.closest('.carousel-section')) {
        if (e.key === 'ArrowLeft' && this.state.currentCarouselIndex > 0) {
          this.state.currentCarouselIndex--;
          this.updateCarouselPreview(this.state.currentCarouselIndex);
        }
        if (e.key === 'ArrowRight' && this.state.currentCarouselIndex < roms.length - 1) {
          this.state.currentCarouselIndex++;
          this.updateCarouselPreview(this.state.currentCarouselIndex);
        }
      }
    });
  }

  openDownloadModal(romId) {
    const modal = window.modalModule;
    if (modal) modal.open(romId);
  }
}

// Initialize
const app = new ProjectLainApp();
document.addEventListener('DOMContentLoaded', () => app.init());

export default app;