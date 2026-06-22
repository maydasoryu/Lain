/* =============================================
   PROJECT LAIN — PARALLAX
   ============================================= */

let parallaxState = {
  isEnabled: true,
  elements: [],
  ticking: false
};

export function initParallax() {
  // Check reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    parallaxState.isEnabled = false;
    return;
  }

  // Check touch device
  if (window.matchMedia('(hover: none)').matches) {
    parallaxState.isEnabled = false;
    return;
  }

  // Find all parallax elements
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  parallaxElements.forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.5;
    parallaxState.elements.push({
      element: el,
      speed: speed,
      y: 0
    });
  });

  // Background zoom effect
  initBackgroundZoom();

  // Bind scroll event
  window.addEventListener('scroll', onParallaxScroll, { passive: true });

  // Initialize positions
  onParallaxScroll();
}

function onParallaxScroll() {
  if (!parallaxState.isEnabled) return;
  
  if (!parallaxState.ticking) {
    requestAnimationFrame(updateParallax);
    parallaxState.ticking = true;
  }
}

function updateParallax() {
  const scrollY = window.scrollY;

  // Update parallax elements
  parallaxState.elements.forEach(item => {
    const rect = item.element.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const viewportCenterY = window.innerHeight / 2;
    const offset = (centerY - viewportCenterY) * item.speed;
    
    item.element.style.transform = `translate3d(0, ${offset}px, 0)`;
  });

  parallaxState.ticking = false;
}

function initBackgroundZoom() {
  const backgroundVideo = document.querySelector('.background-video');
  const backgroundFallback = document.querySelector('.background-fallback');
  
  if (!backgroundVideo && !backgroundFallback) return;

  const zoomElement = backgroundVideo || backgroundFallback;
  
  let lastScrollY = 0;
  
  const updateZoom = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = docHeight > 0 ? scrollY / docHeight : 0;
    
    // Scale from 1 to 1.05 based on scroll progress
    const scale = 1 + (scrollProgress * 0.05);
    zoomElement.style.transform = `scale(${scale})`;
    
    lastScrollY = scrollY;
  };

  window.addEventListener('scroll', () => {
    requestAnimationFrame(updateZoom);
  }, { passive: true });
}

// Manual parallax control
export function setParallaxEnabled(enabled) {
  parallaxState.isEnabled = enabled;
}

export function addParallaxElement(element, speed = 0.5) {
  if (!element) return;
  
  parallaxState.elements.push({
    element,
    speed,
    y: 0
  });
}

export function removeParallaxElement(element) {
  parallaxState.elements = parallaxState.elements.filter(
    item => item.element !== element
  );
}

// Cleanup
export function destroyParallax() {
  parallaxState.elements = [];
  window.removeEventListener('scroll', onParallaxScroll);
}