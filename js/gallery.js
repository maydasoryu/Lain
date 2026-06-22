/**
 * gallery.js — Screenshot gallery with swipe and fullscreen.
 */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("gallery-track");
  if (!track) return;

  const items = track.querySelectorAll("[data-gallery-item]");
  const prevBtn = document.getElementById("gallery-prev");
  const nextBtn = document.getElementById("gallery-next");
  const fullscreen = document.getElementById("gallery-fullscreen");
  const fullscreenImg = document.getElementById("gallery-fullscreen-img");
  const fullscreenClose = document.getElementById("gallery-fullscreen-close");
  if (!items.length) return;

  let currentIndex = 0;

  function updateGallery(newIndex) {
    currentIndex = Math.max(0, Math.min(newIndex, items.length - 1));
    const trackWidth = track.parentElement.offsetWidth;
    const item = items[currentIndex];
    const itemWidth = item.offsetWidth + 24;
    const offset = -(item.offsetLeft - trackWidth / 2 + itemWidth / 2);

    track.style.transition = `transform 800ms var(--ease-premium)`;
    track.style.transform = `translateX(${offset}px)`;
    items.forEach((el, i) => el.classList.toggle("is-active", i === currentIndex));
  }

  setTimeout(() => updateGallery(0), 300);

  prevBtn?.addEventListener("click", () => {
    updateGallery(currentIndex > 0 ? currentIndex - 1 : items.length - 1);
  });

  nextBtn?.addEventListener("click", () => {
    updateGallery(currentIndex < items.length - 1 ? currentIndex + 1 : 0);
  });

  let startX = 0;
  track.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50) {
      if (diff < 0 && currentIndex < items.length - 1) updateGallery(currentIndex + 1);
      else if (diff > 0 && currentIndex > 0) updateGallery(currentIndex - 1);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (document.activeElement?.closest("#gallery-container")) {
      if (e.key === "ArrowLeft" && currentIndex > 0) { e.preventDefault(); updateGallery(currentIndex - 1); }
      if (e.key === "ArrowRight" && currentIndex < items.length - 1) { e.preventDefault(); updateGallery(currentIndex + 1); }
    }
    if (e.key === "Escape" && fullscreen?.classList.contains("is-visible")) closeFullscreen();
  });

  items.forEach(item => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      if (img) {
        fullscreenImg.src = img.src;
        fullscreenImg.alt = img.alt;
        fullscreen.classList.add("is-visible");
        document.body.style.overflow = "hidden";
      }
    });
  });

  function closeFullscreen() {
    fullscreen.classList.remove("is-visible");
    document.body.style.overflow = "";
  }

  fullscreenClose?.addEventListener("click", closeFullscreen);
  fullscreen?.addEventListener("click", (e) => { if (e.target === fullscreen) closeFullscreen(); });
});
