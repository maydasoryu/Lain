/* Main Application Orchestration & Dynamic Renderer */

import { romData, techDetails } from "./data.js";
import { ScrollManager } from "./scroll.js";
import { NavigationManager } from "./navigation.js";
import { RevealManager } from "./reveal.js";
import { RomCarousel } from "./carousel.js";
import { ScreenshotGallery } from "./gallery.js";
import { ModalManager } from "./modal.js";
import { ParallaxManager } from "./parallax.js";
import { AccessibilityManager } from "./accessibility.js";

class App {
  constructor() {
    this.init();
  }

  async init() {
    // 1. Render all dynamic components
    this.renderTechnologyPanels();
    this.renderRomCarousel();
    this.renderRomDetails();
    this.renderScreenshotGallery();

    // 2. Play Premium Intro Sequence
    await this.runIntroSequence();

    // 3. Initialize all managers after DOM is ready and intro is done
    this.scrollManager = new ScrollManager();
    this.navigationManager = new NavigationManager();
    this.revealManager = new RevealManager();
    this.romCarousel = new RomCarousel();
    this.screenshotGallery = new ScreenshotGallery();
    this.modalManager = new ModalManager();
    this.parallaxManager = new ParallaxManager();
    this.accessibilityManager = new AccessibilityManager();
    
    // Bind Hero button to slide to ROM
    const exploreBtn = document.getElementById("hero-explore-btn");
    if (exploreBtn) {
      exploreBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.getElementById("variants");
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 72,
            behavior: "smooth"
          });
        }
      });
    }
  }

  runIntroSequence() {
    return new Promise((resolve) => {
      const introScreen = document.getElementById("intro-screen");
      const introLogo = document.querySelector(".intro-logo-container");
      const heroLeft = document.querySelector(".hero-left");
      const heroRight = document.querySelector(".hero-right");
      const pageWrapper = document.getElementById("page-wrapper");

      // Initially disable page scrolling
      document.body.classList.add("intro-active");
      if (pageWrapper) pageWrapper.style.opacity = "0";

      // Timeline sequence
      // Step 1: Logo fades in softly
      setTimeout(() => {
        if (introLogo) introLogo.classList.add("show");
      }, 500);

      // Step 2: Main screen fades in and video initiates
      setTimeout(() => {
        if (pageWrapper) {
          pageWrapper.style.opacity = "1";
          pageWrapper.style.transition = "opacity 1.5s ease-out";
        }
      }, 1200);

      // Step 3: Fade out intro black barrier
      setTimeout(() => {
        if (introScreen) {
          introScreen.classList.add("fade-out");
          // Remove intro element from DOM completely after fade-out transition
          setTimeout(() => introScreen.remove(), 1000);
        }
        document.body.classList.remove("intro-active");
      }, 2200);

      // Step 4: Scale and reveal hero image showcase
      setTimeout(() => {
        if (heroLeft) {
          heroLeft.style.opacity = "1";
          heroLeft.style.transform = "translate3d(0, 0, 0)";
          heroLeft.style.transition = "opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1), transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)";
        }
        if (heroRight) {
          heroRight.style.opacity = "1";
          heroRight.style.transform = "scale(1)";
          heroRight.style.transition = "opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1), transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)";
        }
        resolve();
      }, 2500);
    });
  }

  renderTechnologyPanels() {
    const container = document.getElementById("tech-panels-container");
    if (!container) return;

    container.innerHTML = techDetails.map((tech, index) => `
      <div class="tech-panel will-animate" id="tech-panel-${index}">
        <div class="container">
          <div class="metadata-pills">
            <span class="pill"><span class="pill-dot"></span><span class="pill-text">${tech.subtitle}</span></span>
          </div>
          <h2 class="section-title sweep-text" style="margin-bottom: 24px;">${tech.title}</h2>
          <p class="body-text" style="font-size: 1.15rem; line-height: 1.8; color: var(--text-secondary);">${tech.description}</p>
        </div>
      </div>
    `).join("");
  }

  renderRomCarousel() {
    const track = document.querySelector(".rom-carousel-track");
    if (!track) return;

    track.innerHTML = romData.map((rom, index) => {
      // Determine correct badge classes
      let badgeClass = "";
      if (rom.statusBadge.includes("PERFORMANCE")) badgeClass = "special";
      else if (rom.statusBadge.includes("PREVIEW")) badgeClass = "preview";
      
      return `
        <div class="carousel-rom-card ${index === 0 ? 'active' : ''}" data-rom-id="${rom.id}">
          <div class="rom-card-img-wrapper">
            <img src="${rom.thumbnail}" alt="${rom.name} Landscape Thumbnail" loading="lazy">
          </div>
          <div class="rom-card-content">
            <div class="rom-card-header">
              <h3 class="rom-card-title">${rom.name}</h3>
              <span class="rom-card-badge ${badgeClass}">${rom.statusBadge}</span>
            </div>
            <div class="rom-card-meta">
              <span>Android ${rom.androidVersion}</span>
              <span>•</span>
              <span>S20 FE Port</span>
            </div>
            <p class="rom-card-desc">${rom.description}</p>
            <div style="display: flex; gap: 16px;">
              <a href="#detail-${rom.id}" class="btn btn-secondary" style="padding: 10px 24px; font-size: 0.85rem; flex: 1;">Specifications</a>
              <button class="btn btn-primary" data-download-rom="${rom.id}" style="padding: 10px 24px; font-size: 0.85rem; flex: 1;">Get Build</button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  renderRomDetails() {
    const container = document.getElementById("rom-details-container");
    if (!container) return;

    container.innerHTML = romData.map((rom, index) => {
      const isEven = index % 2 === 0;
      
      return `
        <div class="rom-detail-section ${isEven ? '' : 'alternate'} will-animate" id="detail-${rom.id}">
          <div class="container">
            <div class="rom-detail-grid">
              <!-- Left side / Carousel detail thumbnail and list info -->
              <div class="rom-detail-left">
                <div class="metadata-pills">
                  <span class="pill"><span class="pill-dot"></span><span class="pill-text">${rom.systemType}</span></span>
                  <span class="pill"><span class="pill-dot crimson"></span><span class="pill-text">Build ${rom.buildDate}</span></span>
                </div>
                <h2 class="rom-title text-glow-gold" style="margin-bottom: 20px;">${rom.name}</h2>
                <p class="body-text" style="margin-bottom: 30px;">${rom.description}</p>
                
                <h4 style="font-family: var(--font-display); font-size: 1.15rem; margin-bottom: 16px; letter-spacing: 0.05em; text-transform: uppercase;">Changelog</h4>
                <div class="detail-list" style="margin-bottom: 40px;">
                  ${rom.changelog.map(item => `
                    <div class="detail-item">
                      <span class="detail-bullet">✓</span>
                      <div class="detail-item-content">${item}</div>
                    </div>
                  `).join("")}
                </div>

                ${rom.knownIssues && rom.knownIssues.length > 0 ? `
                  <h4 style="font-family: var(--font-display); font-size: 1.15rem; margin-bottom: 16px; letter-spacing: 0.05em; text-transform: uppercase; color: #ff6b6b;">Known Issues</h4>
                  <div class="detail-list" style="margin-bottom: 40px;">
                    ${rom.knownIssues.map(issue => `
                      <div class="detail-item">
                        <span class="detail-bullet" style="color: #ff6b6b;">•</span>
                        <div class="detail-item-content" style="color: rgba(255,107,107,0.8);">${issue}</div>
                      </div>
                    `).join("")}
                  </div>
                ` : ''}

                <h4 style="font-family: var(--font-display); font-size: 1.15rem; margin-bottom: 16px; letter-spacing: 0.05em; text-transform: uppercase;">Credits</h4>
                <div class="detail-list" style="margin-bottom: 40px;">
                  ${rom.credits.map(credit => `
                    <div class="detail-item">
                      <span class="detail-bullet">★</span>
                      <div class="detail-item-content" style="color: var(--text-secondary); font-weight: 500;">${credit}</div>
                    </div>
                  `).join("")}
                </div>
              </div>

              <!-- Right side / Specification Table and Portrait Slider reference -->
              <div class="rom-detail-right" style="position: sticky; top: 120px;">
                <div style="border-radius: 24px; background: rgba(255, 255, 255, 0.02); border: var(--border-glass-light); padding: 36px; box-shadow: var(--shadow-glass);">
                  <div style="width: 100%; aspect-ratio: 16/9; border-radius: 14px; overflow: hidden; margin-bottom: 24px; border: 1px solid rgba(255, 255, 255, 0.05);">
                    <img src="${rom.thumbnail}" alt="${rom.name} landscape graphic" style="width:100%; height:100%; object-fit:cover;">
                  </div>
                  
                  <table class="rom-spec-table">
                    <tr class="rom-spec-row">
                      <td class="rom-spec-label">Device</td>
                      <td class="rom-spec-value">${rom.device}</td>
                    </tr>
                    <tr class="rom-spec-row">
                      <td class="rom-spec-label">Android</td>
                      <td class="rom-spec-value">Version ${rom.androidVersion}</td>
                    </tr>
                    <tr class="rom-spec-row">
                      <td class="rom-spec-label">Base</td>
                      <td class="rom-spec-value">${rom.baseFirmware}</td>
                    </tr>
                    <tr class="rom-spec-row">
                      <td class="rom-spec-label">Kernel</td>
                      <td class="rom-spec-value">${rom.kernelSupport}</td>
                    </tr>
                  </table>

                  <button class="btn btn-crimson" data-download-rom="${rom.id}" style="width: 100%; justify-content: center; font-size: 1.05rem;">
                    Download ${rom.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  renderScreenshotGallery() {
    const track = document.querySelector(".gallery-track");
    if (!track) return;

    // Collect all screenshots from romData
    const allScreenshots = [];
    romData.forEach(rom => {
      rom.screenshots.forEach(sc => {
        allScreenshots.push({
          src: sc,
          name: rom.name
        });
      });
    });

    track.innerHTML = allScreenshots.map((sc, index) => `
      <div class="gallery-slide ${index === 0 ? 'active' : ''}">
        <img src="${sc.src}" alt="${sc.name} OS Portrait Screenshot" loading="lazy">
      </div>
    `).join("");
  }
}

// Instantiate the App Orchestrator
window.addEventListener("DOMContentLoaded", () => {
  new App();
});
