/* =============================================
   PROJECT LAIN — ACCESSIBILITY
   ============================================= */

export function initAccessibility() {
  // Focus management
  initFocusManagement();
  
  // Skip link
  initSkipLink();
  
  // Keyboard navigation
  initKeyboardNav();
  
  // ARIA attributes
  initAriaAttributes();
  
  // Reduced motion support
  initReducedMotion();
  
  // High contrast mode
  initHighContrast();
}

function initFocusManagement() {
  // Trap focus within modals
  document.querySelectorAll('.modal-overlay.active, .fullscreen-gallery.active').forEach(modal => {
    trapFocus(modal);
  });

  // Restore focus when modal closes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          if (node.classList?.contains('modal-overlay') || node.classList?.contains('fullscreen-gallery')) {
            if (node.classList.contains('active')) {
              setTimeout(() => trapFocus(node), 100);
            }
          }
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);
  
  // Store handler for cleanup
  element._focusTrapHandler = handleTabKey;
}

function initSkipLink() {
  const skipLink = document.querySelector('.skip-link');
  if (!skipLink) return;

  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(skipLink.getAttribute('href'));
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

function initKeyboardNav() {
  // Arrow key navigation for carousels
  document.addEventListener('keydown', (e) => {
    // Carousel navigation
    if (e.target.closest('.carousel-section')) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        // Handled by carousel module
      }
    }

    // Gallery navigation
    if (e.target.closest('.gallery-section')) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        // Handled by gallery module
      }
    }
  });

  // Focus visible styles
  document.addEventListener('mousedown', () => {
    document.body.classList.add('using-mouse');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.remove('using-mouse');
    }
  });
}

function initAriaAttributes() {
  // Navigation
  const nav = document.querySelector('.nav');
  if (nav && !nav.getAttribute('role')) {
    nav.setAttribute('role', 'navigation');
  }

  const navLabel = nav?.querySelector('nav') || nav;
  if (navLabel && !navLabel.getAttribute('aria-label')) {
    navLabel.setAttribute('aria-label', 'Main navigation');
  }

  // Carousel
  const carousel = document.querySelector('.carousel-container');
  if (carousel && !carousel.getAttribute('role')) {
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-label', 'ROM variants carousel');
  }

  const carouselTrack = carousel?.querySelector('.carousel-track');
  if (carouselTrack && !carouselTrack.getAttribute('aria-live')) {
    carouselTrack.setAttribute('aria-live', 'polite');
  }

  // Gallery
  const gallery = document.querySelector('.gallery-track');
  if (gallery && !gallery.getAttribute('role')) {
    gallery.setAttribute('role', 'list');
  }

  const galleryItems = gallery?.querySelectorAll('.gallery-item');
  galleryItems?.forEach((item, index) => {
    if (!item.getAttribute('aria-label')) {
      item.setAttribute('aria-label', `Screenshot ${index + 1}`);
    }
  });

  // Progress indicator
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar && !progressBar.getAttribute('role')) {
    progressBar.setAttribute('role', 'progressbar');
    progressBar.setAttribute('aria-label', 'Page scroll progress');
    progressBar.setAttribute('aria-valuemin', '0');
    progressBar.setAttribute('aria-valuemax', '100');
  }

  // Update progress value
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
    
    if (progressBar) {
      progressBar.setAttribute('aria-valuenow', progress.toString());
    }
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

function initReducedMotion() {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  const handleReducedMotion = () => {
    if (mediaQuery.matches) {
      document.documentElement.style.setProperty('--duration-fast', '0ms');
      document.documentElement.style.setProperty('--duration-normal', '0ms');
      document.documentElement.style.setProperty('--duration-slow', '0ms');
      document.documentElement.style.setProperty('--duration-slower', '0ms');
      
      // Disable parallax
      document.querySelectorAll('[data-parallax]').forEach(el => {
        el.style.transform = 'none';
      });
    }
  };

  mediaQuery.addEventListener('change', handleReducedMotion);
  handleReducedMotion();
}

function initHighContrast() {
  const mediaQuery = window.matchMedia('(prefers-contrast: high)');
  
  const handleHighContrast = () => {
    if (mediaQuery.matches) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  mediaQuery.addEventListener('change', handleHighContrast);
  handleHighContrast();
}

// Focus element helper
export function focusElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.focus();
    if (element.scrollIntoView) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

// Announce to screen readers
export function announce(message, priority = 'polite') {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  
  const style = document.createElement('style');
  style.textContent = `
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(announcement);
  
  // Timeout to ensure announcement is read
  setTimeout(() => {
    announcement.textContent = message;
  }, 100);
  
  // Cleanup
  setTimeout(() => {
    announcement.remove();
  }, 1000);
}