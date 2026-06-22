/**
 * parallax.js — Background movement, cursor glow, hero tilt.
 */
document.addEventListener("DOMContentLoaded", () => {
  const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 1024;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return;

  // Background parallax
  const bgElements = document.querySelectorAll(".parallax-bg");
  if (bgElements.length) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          bgElements.forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 0.02;
            el.style.transform = `translate3d(0, ${window.scrollY * speed * 100}px, 0)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // Cursor glow (desktop only)
  if (!isMobile) {
    const glow = document.getElementById("cursor-glow");
    if (glow) {
      let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
      function lerp(a, b, f) { return a + (b - a) * f; }
      function update() {
        glowX = lerp(glowX, mouseX, 0.08);
        glowY = lerp(glowY, mouseY, 0.08);
        glow.style.left = `${glowX}px`;
        glow.style.top = `${glowY}px`;
        requestAnimationFrame(update);
      }
      document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        if (!glow.classList.contains("is-visible")) glow.classList.add("is-visible");
      });
      document.addEventListener("mouseleave", () => glow.classList.remove("is-visible"));
      requestAnimationFrame(update);
    }

    // Hero 3D tilt
    const heroContainer = document.getElementById("hero-image-container");
    if (heroContainer) {
      const maxTilt = 4;
      heroContainer.addEventListener("mousemove", (e) => {
        const rect = heroContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        heroContainer.style.transform = `perspective(800px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale(1)`;
      });
      heroContainer.addEventListener("mouseleave", () => {
        heroContainer.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
      });
    }

    // Video slow zoom
    const video = document.getElementById("bg-video");
    if (video) {
      let zoom = 1;
      function animateZoom() {
        zoom += 0.00008;
        if (zoom > 1.12) zoom = 1;
        video.style.transform = `scale(${zoom}) translate(-1%, -1%)`;
        requestAnimationFrame(animateZoom);
      }
      requestAnimationFrame(animateZoom);
    }
  }
});
