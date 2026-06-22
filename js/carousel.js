/**
 * carousel.js — ROM carousel with touch, drag, keyboard.
 */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track");
  if (!track) return;

  const cards = track.querySelectorAll("[data-card]");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const dots = document.querySelectorAll(".carousel__dot");
  if (!cards.length) return;

  let currentIndex = 0;
  let isDragging = false;
  let startX = 0;

  function updateCarousel(newIndex, animate = true) {
    currentIndex = Math.max(0, Math.min(newIndex, cards.length - 1));
    const offset = -(currentIndex * 80);

    track.style.transition = animate ? `transform 800ms var(--ease-premium)` : "none";
    track.style.transform = `translateX(${offset}%)`;

    cards.forEach((card, i) => card.classList.toggle("is-active", i === currentIndex));
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === currentIndex));
  }

  setTimeout(() => updateCarousel(0, false), 100);

  prevBtn?.addEventListener("click", () => {
    updateCarousel(currentIndex > 0 ? currentIndex - 1 : cards.length - 1);
  });

  nextBtn?.addEventListener("click", () => {
    updateCarousel(currentIndex < cards.length - 1 ? currentIndex + 1 : 0);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => updateCarousel(parseInt(dot.dataset.index)));
  });

  document.addEventListener("keydown", (e) => {
    if (document.activeElement?.closest("#rom-carousel")) {
      if (e.key === "ArrowLeft") { e.preventDefault(); updateCarousel(currentIndex > 0 ? currentIndex - 1 : cards.length - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); updateCarousel(currentIndex < cards.length - 1 ? currentIndex + 1 : 0); }
    }
  });

  // Touch / Drag
  function handleStart(e) {
    isDragging = true;
    startX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    track.style.transition = "none";
  }

  function handleMove(e) {
    if (!isDragging) return;
    const currentX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX;
    const baseOffset = -(currentIndex * 80);
    const dragPercent = (diff / window.innerWidth) * 30;
    track.style.transform = `translateX(${baseOffset + dragPercent}%)`;
  }

  function handleEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX;
    const diff = endX - startX;

    if (diff < -50 && currentIndex < cards.length - 1) updateCarousel(currentIndex + 1);
    else if (diff > 50 && currentIndex > 0) updateCarousel(currentIndex - 1);
    else updateCarousel(currentIndex);
  }

  track.addEventListener("touchstart", handleStart, { passive: true });
  track.addEventListener("touchmove", handleMove, { passive: false });
  track.addEventListener("touchend", handleEnd);
  track.addEventListener("mousedown", handleStart);
  window.addEventListener("mousemove", handleMove);
  window.addEventListener("mouseup", handleEnd);
});
