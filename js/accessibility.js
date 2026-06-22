/**
 * accessibility.js — Keyboard navigation and focus management.
 */
document.addEventListener("DOMContentLoaded", () => {
  function trapFocus(container) {
    container.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const focusable = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  const modal = document.getElementById("download-modal");
  const galleryFs = document.getElementById("gallery-fullscreen");
  if (modal) trapFocus(modal);
  if (galleryFs) trapFocus(galleryFs);

  // Escape closes overlays
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const m = document.getElementById("download-modal");
      if (m?.classList.contains("is-visible")) {
        m.classList.remove("is-visible");
        document.getElementById("page-content")?.classList.remove("is-blurred");
        document.body.style.overflow = "";
      }
      const g = document.getElementById("gallery-fullscreen");
      if (g?.classList.contains("is-visible")) {
        g.classList.remove("is-visible");
        document.body.style.overflow = "";
      }
    }
  });

  // Reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach(el => {
      el.style.opacity = "1"; el.style.transform = "none"; el.style.filter = "none";
    });
    document.querySelectorAll(".parallax-bg, .hero-parallax").forEach(el => {
      el.style.transform = "none";
    });
    const glow = document.getElementById("cursor-glow");
    if (glow) glow.style.display = "none";
  }

  // Skip link
  const skipLink = document.createElement("a");
  skipLink.href = "#hero";
  skipLink.textContent = "Skip to main content";
  skipLink.style.cssText = "position:fixed;top:0;left:0;z-index:9999;padding:1rem;background:var(--color-accent-gold);color:var(--color-bg-primary);font-weight:600;text-decoration:none;transform:translateY(-100%);transition:transform var(--duration-fast) var(--ease-premium);";
  skipLink.addEventListener("focus", () => { skipLink.style.transform = "translateY(0)"; });
  skipLink.addEventListener("blur", () => { skipLink.style.transform = "translateY(-100%)"; });
  document.body.prepend(skipLink);
});
