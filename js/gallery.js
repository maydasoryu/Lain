/* Screenshot Gallery with Swipe, Transitions and Fullscreen Modal */

export class ScreenshotGallery {
  constructor() {
    this.container = document.querySelector(".gallery-slider-wrapper");
    this.track = document.querySelector(".gallery-track");
    this.prevBtn = document.getElementById("gallery-prev");
    this.nextBtn = document.getElementById("gallery-next");
    this.fsModal = document.getElementById("fs-gallery-modal");
    
    this.currentIndex = 0;
    this.slides = [];
    
    this.startX = 0;
    this.currentTranslate = 0;
    this.prevTranslate = 0;
    this.isDragging = false;
    
    this.init();
  }

  init() {
    this.slides = Array.from(document.querySelectorAll(".gallery-slide"));
    if (this.slides.length === 0) return;

    this.updateGallery();

    // Carousel buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.slidePrev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.slideNext());
    }

    // Touch & Swipe Support
    this.track.addEventListener("touchstart", (e) => this.dragStart(e), { passive: true });
    this.track.addEventListener("touchend", () => this.dragEnd());
    this.track.addEventListener("touchmove", (e) => this.dragAction(e), { passive: true });

    // Mouse drag support
    this.track.addEventListener("mousedown", (e) => this.dragStart(e));
    this.track.addEventListener("mouseup", () => this.dragEnd());
    this.track.addEventListener("mouseleave", () => { if (this.isDragging) this.dragEnd(); });
    this.track.addEventListener("mousemove", (e) => this.dragAction(e));

    // Keyboard support (Arrow keys when slider is visible)
    window.addEventListener("keydown", (e) => this.handleKeyDown(e));

    // Fullscreen zoom trigger on active slide
    this.slides.forEach((slide, index) => {
      slide.addEventListener("click", () => {
        if (index === this.currentIndex) {
          const imgUrl = slide.querySelector("img").getAttribute("src");
          this.openFullscreen(imgUrl);
        } else {
          this.currentIndex = index;
          this.updateGallery();
        }
      });
    });

    // Close fullscreen modal
    if (this.fsModal) {
      const closeBtn = this.fsModal.querySelector(".fs-gallery-close");
      if (closeBtn) closeBtn.addEventListener("click", () => this.closeFullscreen());
      this.fsModal.addEventListener("click", (e) => {
        if (e.target === this.fsModal) this.closeFullscreen();
      });
    }

    window.addEventListener("resize", () => this.updateGallery(), { passive: true });
  }

  updateGallery() {
    if (this.slides.length === 0) return;

    // Boundaries
    if (this.currentIndex < 0) this.currentIndex = 0;
    if (this.currentIndex >= this.slides.length) this.currentIndex = this.slides.length - 1;

    // Classes
    this.slides.forEach((slide, index) => {
      slide.classList.remove("active");
      if (index === this.currentIndex) {
        slide.classList.add("active");
      }
    });

    // Calculation to center active portrait slide
    const viewportWidth = this.container.offsetWidth;
    const activeSlide = this.slides[this.currentIndex];
    
    if (!activeSlide) return;

    const slideWidth = activeSlide.offsetWidth;
    const slideOffsetLeft = activeSlide.offsetLeft;
    const spacing = 40; // 20px margins on each slide = 40px gap

    const targetTranslate = -(slideOffsetLeft - (viewportWidth - slideWidth) / 2);
    
    this.track.style.transform = `translateX(${targetTranslate}px)`;
    this.currentTranslate = targetTranslate;
    this.prevTranslate = targetTranslate;

    // Button states
    if (this.prevBtn) {
      this.prevBtn.style.opacity = this.currentIndex === 0 ? "0.3" : "1";
      this.prevBtn.style.pointerEvents = this.currentIndex === 0 ? "none" : "auto";
    }
    if (this.nextBtn) {
      this.nextBtn.style.opacity = this.currentIndex === this.slides.length - 1 ? "0.3" : "1";
      this.nextBtn.style.pointerEvents = this.currentIndex === this.slides.length - 1 ? "none" : "auto";
    }
  }

  slidePrev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateGallery();
    }
  }

  slideNext() {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
      this.updateGallery();
    }
  }

  handleKeyDown(e) {
    if (this.fsModal && this.fsModal.classList.contains("open")) {
      if (e.key === "Escape") this.closeFullscreen();
      return;
    }

    const rect = this.container.getBoundingClientRect();
    const inViewport = (rect.top < window.innerHeight && rect.bottom > 0);
    if (!inViewport) return;

    if (e.key === "ArrowLeft") {
      this.slidePrev();
    } else if (e.key === "ArrowRight") {
      this.slideNext();
    }
  }

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

    if (moveDistance < -60 && this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
    } else if (moveDistance > 60 && this.currentIndex > 0) {
      this.currentIndex--;
    }

    this.updateGallery();
  }

  getPositionX(e) {
    return e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
  }

  // Fullscreen Modal Zoom functions
  openFullscreen(imgUrl) {
    if (!this.fsModal) return;
    const fsImg = this.fsModal.querySelector(".fs-gallery-img");
    if (fsImg) {
      fsImg.src = imgUrl;
      this.fsModal.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  }

  closeFullscreen() {
    if (!this.fsModal) return;
    this.fsModal.classList.remove("open");
    document.body.style.overflow = "";
  }
}
