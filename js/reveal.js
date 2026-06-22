/* Intersection Observer for Premium Section Scroll Reveal */

export class RevealManager {
  constructor() {
    this.revealElements = document.querySelectorAll(".will-animate");
    this.staggerContainers = document.querySelectorAll("[data-stagger]");
    this.init();
  }

  init() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      // Instantly reveal all
      this.revealElements.forEach(el => el.classList.add("revealed"));
      return;
    }

    // Set up observer with 25% visibility trigger point (threshold 0.25)
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15 // 15-25% threshold works best for tall viewport-sized elements
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          
          // Trigger nested stagger items if applicable
          const staggerItems = entry.target.querySelectorAll(".stagger-item");
          if (staggerItems.length > 0) {
            staggerItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("revealed");
              }, index * 100); // 100ms stagger delay as requested
            });
          }
          
          // Stop observing once animated (Animate Once)
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    this.revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }
}
