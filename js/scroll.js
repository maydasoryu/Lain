/* =============================================
   PROJECT LAIN — SCROLL
   ============================================= */

let scrollState = {
  lastScrollY: 0,
  ticking: false,
  scrollDirection: 'down',
  isAtTop: true,
  isAtBottom: false
};

export function initScroll() {
  // Initialize scroll state
  updateScrollState();

  // Bind scroll event
  window.addEventListener('scroll', onWindowScroll, { passive: true });

  // Back to top button visibility
  updateBackToTopVisibility();

  // Section visibility tracking
  initSectionObserver();
}

function onWindowScroll() {
  if (!scrollState.ticking) {
    requestAnimationFrame(() => {
      updateScrollState();
      scrollState.ticking = false;
    });
    scrollState.ticking = true;
  }
}

function updateScrollState() {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  
  // Update scroll direction
  scrollState.scrollDirection = scrollY > scrollState.lastScrollY ? 'down' : 'up';
  
  // Update position states
  scrollState.isAtTop = scrollY < 100;
  scrollState.isAtBottom = scrollY >= docHeight - 50;
  
  // Update last scroll position
  scrollState.lastScrollY = scrollY;

  // Update back to top visibility
  updateBackToTopVisibility();

  // Update cursor glow position (delegated to cursor module)
}

function updateBackToTopVisibility() {
  const backToTop = document.querySelector('.back-to-top');
  if (!backToTop) return;

  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

function initSectionObserver() {
  const sections = document.querySelectorAll('section[id]');
  
  if (sections.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');
        updateActiveSection(sectionId);
        
        // Add visible class for animations
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });
}

function updateActiveSection(sectionId) {
  scrollState.currentSection = sectionId;
  
  // Update navigation highlighting
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${sectionId}`) {
      link.classList.add('active');
    }
  });
}

// Smooth scroll to element
export function scrollToElement(selector, offset = 72) {
  const element = document.querySelector(selector);
  if (!element) return;

  const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

// Get scroll state
export function getScrollState() {
  return { ...scrollState };
}

// Get scroll progress (0-1)
export function getScrollProgress() {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return docHeight > 0 ? window.scrollY / docHeight : 0;
}

// Check if user is at top
export function isAtTop() {
  return scrollState.isAtTop;
}

// Check if user is at bottom
export function isAtBottom() {
  return scrollState.isAtBottom;
}

// Check scroll direction
export function getScrollDirection() {
  return scrollState.scrollDirection;
}