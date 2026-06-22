/* Accessibility Enhancements and Reduced Motion Modes */

export class AccessibilityManager {
  constructor() {
    this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.init();
  }

  init() {
    this.handleReducedMotion();
    this.prefersReducedMotion.addEventListener("change", () => this.handleReducedMotion());
    
    // Add focus-visible indicators for keyboard users
    this.setupKeyboardFocusStates();
  }

  handleReducedMotion() {
    const isReduced = this.prefersReducedMotion.matches;
    
    if (isReduced) {
      document.body.classList.add("reduced-motion");
      
      // Stop film grain and other cinematic transitions
      const video = document.querySelector(".bg-video");
      if (video) {
        video.style.animation = "none";
        video.style.transform = "scale(1)";
      }

      const glows = document.querySelectorAll(".glow-glow");
      glows.forEach(glow => {
        glow.style.animation = "none";
      });

      const filmGrain = document.querySelector(".film-grain");
      if (filmGrain) {
        filmGrain.classList.remove("noise-active");
      }
    } else {
      document.body.classList.remove("reduced-motion");
      
      const filmGrain = document.querySelector(".film-grain");
      if (filmGrain) {
        filmGrain.classList.add("noise-active");
      }
    }
  }

  setupKeyboardFocusStates() {
    // Basic focus management: only outline when navigating with TAB
    window.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        document.body.classList.add("user-is-tabbing");
      }
    });

    window.addEventListener("mousedown", () => {
      document.body.classList.remove("user-is-tabbing");
    });
  }
}
