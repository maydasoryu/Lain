/* ROM Carousel with Touch, Mouse Drag, Keyboard & Slide Effects */

export class RomCarousel {
  constructor() {
    this.container = document.querySelector(".rom-carousel-viewport");
    this.track = document.querySelector(".rom-carousel-track");
    this.prevBtn = document.getElementById("rom-prev");
    this.nextBtn = document.getElementById("rom-next");
    
    this.currentIndex = 0;
    this.cards = [];
    
    this.startX = 0;
    this.currentTranslate = 0;
    this.prevTranslate = 0;
    this.isDragging = false;
    
    this.init();
  }

  init() {
    this.cards = Array.from(document.querySelectorAll(".carousel-rom-card"));
    if (this.cards.length === 0) return;

    this.updateCarousel();

    // Controls
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.slidePrev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.slideNext());
    }

    // Keyboard support
    window.addEventListener("keydown", (e) => this.handleKeyDown(e));

    // Touch support
    this.track.addEventListener("touchstart", (e) => this.dragStart(e), { passive: true });
    this.track.addEventListener("touchend", () => this.dragEnd());
    this.track.addEventListener("touchmove", (e) => this.dragAction(e), { passive: true });

    // Mouse drag support
    this.track.addEventListener("mousedown", (e) => this.dragStart(e));
    this.track.addEventListener("mouseup", () => this.dragEnd());
    this.track.addEventListener("mouseleave", () => { if (this.isDragging) this.dragEnd(); });
    this.track.addEventListener("mousemove", (e) => this.dragAction(e));

    // Window resize observer
    window.addEventListener("resize", () => this.updateCarousel(), { passive: true });
  }

  updateCarousel() {
    if (this.cards.length === 0) return;

    // Boundary protection
    if (this.currentIndex < 0) this.currentIndex = 0;
    if (this.currentIndex >= this.cards.length) this.currentIndex = this.cards.length - 1;

    // Apply active class
    this.cards.forEach((card, index) => {
      card.classList.remove("active");
      if (index === this.currentIndex) {
        card.classList.add("active");
      }
    });

    // Calculate middle offset
    const viewportWidth = this.container.offsetWidth;
    const trackWidth = this.track.offsetWidth;
    const activeCard = this.cards[this.currentIndex];
    
    if (!activeCard) return;

    const cardWidth = activeCard.offsetWidth;
    const cardOffsetLeft = activeCard.offsetLeft;
    
    // Position active card exactly in the middle of viewport
    const targetTranslate = -(cardOffsetLeft - (viewportWidth - cardWidth) / 2);
    
    this.track.style.transform = `translateX(${targetTranslate}px)`;
    this.currentTranslate = targetTranslate;
    this.prevTranslate = targetTranslate;

    // Disable/Enable buttons if at boundaries
    if (this.prevBtn) {
      this.prevBtn.style.opacity = this.currentIndex === 0 ? "0.3" : "1";
      this.prevBtn.style.pointerEvents = this.currentIndex === 0 ? "none" : "auto";
    }
    if (this.nextBtn) {
      this.nextBtn.style.opacity = this.currentIndex === this.cards.length - 1 ? "0.3" : "1";
      this.nextBtn.style.pointerEvents = this.currentIndex === this.cards.length - 1 ? "none" : "auto";
    }
  }

  slidePrev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateCarousel();
      this.syncDetailSection();
    }
  }

  slideNext() {
    if (this.currentIndex < this.cards.length - 1) {
      this.currentIndex++;
      this.updateCarousel();
      this.syncDetailSection();
    }
  }

  handleKeyDown(e) {
    // Only slide if carousel is somewhat in viewport
    const rect = this.container.getBoundingClientRect();
    const inViewport = (rect.top < window.innerHeight && rect.bottom > 0);
    if (!inViewport) return;

    if (e.key === "ArrowLeft") {
      this.slidePrev();
    } else if (e.key === "ArrowRight") {
      this.slideNext();
    }
  }

  // Touch & Drag Logistics
  dragStart(e) {
    this.isDragging = true;
    this.track.style.transition = "none";
    this.startX = this.getPositionX(e);
  }

  dragAction(e) {
    if (!this.isDragging) return;
    const currentX = this.getPositionX(e);
    const diff = currentX - this.startX;
    this.track.style.transform = `translateX(${this.prevTranslate + diff}px)`;
    this.currentTranslate = this.prevTranslate + diff;
  }

  dragEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.track.style.transition = "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)";
    
    const moveDistance = this.currentTranslate - this.prevTranslate;

    // Swipe sensitivity threshold
    if (moveDistance < -80 && this.currentIndex < this.cards.length - 1) {
      this.currentIndex++;
    } else if (moveDistance > 80 && this.currentIndex > 0) {
      this.currentIndex--;
    }

    this.updateCarousel();
    this.syncDetailSection();
  }

  getPositionX(e) {
    return e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
  }

  syncDetailSection() {
    // Custom sync event to jump detail view or highlight active card details
    const activeCardId = this.cards[this.currentIndex].getAttribute("data-rom-id");
    const detailSection = document.getElementById(`detail-${activeCardId}`);
    if (detailSection) {
      detailSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  slideToRom(romId) {
    const targetIndex = this.cards.findIndex(card => card.getAttribute("data-rom-id") === romId);
    if (targetIndex !== -1) {
      this.currentIndex = targetIndex;
      this.updateCarousel();
    }
  }
}
