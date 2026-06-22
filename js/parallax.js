/* Subtle 3D Tilt Effect and Smooth Interpolating Cursor Glow Follower */

export class ParallaxManager {
  constructor() {
    this.heroCard = document.querySelector(".hero-image-showcase");
    this.cursorGlow = document.querySelector(".cursor-glow");
    
    this.cursorX = 0;
    this.cursorY = 0;
    this.currentX = 0;
    this.currentY = 0;
    
    this.init();
  }

  init() {
    // Check constraints
    const isMobile = window.innerWidth <= 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || prefersReducedMotion) {
      if (this.cursorGlow) this.cursorGlow.style.display = "none";
      return;
    }

    // 3D Tilt on Hero card (desktop only)
    if (this.heroCard) {
      this.heroCard.addEventListener("mousemove", (e) => this.handleTilt(e));
      this.heroCard.addEventListener("mouseleave", () => this.resetTilt());
    }

    // Cursor Follower
    window.addEventListener("mousemove", (e) => {
      this.cursorX = e.clientX;
      this.cursorY = e.clientY;
      if (this.cursorGlow) this.cursorGlow.style.opacity = "1";
    });

    window.addEventListener("mouseleave", () => {
      if (this.cursorGlow) this.cursorGlow.style.opacity = "0";
    });

    this.animateCursorGlow();
  }

  handleTilt(e) {
    if (!this.heroCard) return;
    
    const rect = this.heroCard.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position inside element
    const y = e.clientY - rect.top;  // y position inside element
    
    // Normalize coordinates: -0.5 to 0.5
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    
    // Max tilt 4 degrees as requested
    const maxTilt = 4;
    const rotateY = normalizedX * maxTilt;
    const rotateX = -normalizedY * maxTilt;
    
    this.heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  resetTilt() {
    if (!this.heroCard) return;
    this.heroCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }

  animateCursorGlow() {
    if (!this.cursorGlow) return;

    // Linear interpolation (lerp) for ultra-smooth follow effect
    const ease = 0.08; 
    this.currentX += (this.cursorX - this.currentX) * ease;
    this.currentY += (this.cursorY - this.currentY) * ease;

    this.cursorGlow.style.left = `${this.currentX}px`;
    this.cursorGlow.style.top = `${this.currentY}px`;

    requestAnimationFrame(() => this.animateCursorGlow());
  }
}
