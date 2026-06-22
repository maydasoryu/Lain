/* =============================================
   PROJECT LAIN — REVEAL SYSTEM
   ============================================= */

export function initReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal, .reveal-3d, .reveal-3d-left, .reveal-3d-right, .reveal-3d-scale, .stagger').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  const revealElements = document.querySelectorAll('.reveal, .reveal-3d, .reveal-3d-left, .reveal-3d-right, .reveal-3d-scale');
  revealElements.forEach(el => revealObserver.observe(el));

  // Stagger animations
  const staggerParents = document.querySelectorAll('[class*="stagger-"]');
  const uniqueParents = new Set();
  
  staggerParents.forEach(el => {
    const parent = el.closest('.reveal, .reveal-3d, section, .rom-info, .hero-content');
    if (parent) uniqueParents.add(parent);
  });

  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const staggerElements = entry.target.querySelectorAll('.stagger');
        staggerElements.forEach(el => el.classList.add('visible'));
        staggerObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  uniqueParents.forEach(parent => staggerObserver.observe(parent));

  // Text split animations
  const textSplitObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        textSplitObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.text-split').forEach(el => textSplitObserver.observe(el));
}

export function revealElement(element) {
  if (!element) return;
  element.classList.add('visible');
}

export function resetReveal() {
  document.querySelectorAll('.reveal, .reveal-3d, .reveal-3d-left, .reveal-3d-right, .reveal-3d-scale, .stagger, .text-split').forEach(el => {
    el.classList.remove('visible');
  });
}