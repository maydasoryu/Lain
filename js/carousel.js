/* =============================================
   PROJECT LAIN — CAROUSEL
   ============================================= */

let carouselState = {
  currentIndex: 0,
  totalItems: 0,
  isAnimating: false,
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0
};

let touchStartTime = 0;

export function initCarousel() {
  const track = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-btn--prev');
  const nextBtn = document.querySelector('.carousel-btn--next');
  
  if (!track) return;

  const cards = track.querySelectorAll('.carousel-card');
  carouselState.totalItems = cards.length;
  carouselState.currentIndex = 0;

  // Update initial state
  updateCarousel();

  // Button events
  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToPrev());
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToNext());
  }

  // Mouse drag events
  track.addEventListener('mousedown', handleDragStart);
  track.addEventListener('mousemove', handleDragMove);
  track.addEventListener('mouseup', handleDragEnd);
  track.addEventListener('mouseleave', handleDragEnd);

  // Touch events
  track.addEventListener('touchstart', handleTouchStart, { passive: true });
  track.addEventListener('touchmove', handleTouchMove, { passive: true });
  track.addEventListener('touchend', handleTouchEnd);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goToPrev();
    if (e.key === 'ArrowRight') goToNext();
  });

  // Click on cards
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      if (index !== carouselState.currentIndex) {
        goToSlide(index);
      }
    });
  });

  // Resize handler
  window.addEventListener('resize', handleResize);
}

function updateCarousel() {
  const track = document.querySelector('.carousel-track');
  const cards = track?.querySelectorAll('.carousel-card');
  const prevBtn = document.querySelector('.carousel-btn--prev');
  const nextBtn = document.querySelector('.carousel-btn--next');
  
  if (!cards || cards.length === 0) return;

  // Update card states
  cards.forEach((card, index) => {
    card.classList.remove('active');
    
    if (index === carouselState.currentIndex) {
      card.classList.add('active');
    }
  });

  // Center the active card
  const activeCard = cards[carouselState.currentIndex];
  if (activeCard && track) {
    const trackRect = track.getBoundingClientRect();
    const cardRect = activeCard.getBoundingClientRect();
    const scrollLeft = activeCard.offsetLeft - (trackRect.width / 2) + (cardRect.width / 2);
    
    track.style.transform = `translateX(-${scrollLeft}px)`;
  }

  // Update button states
  if (prevBtn) {
    prevBtn.disabled = carouselState.currentIndex === 0;
  }
  if (nextBtn) {
    nextBtn.disabled = carouselState.currentIndex === carouselState.totalItems - 1;
  }
}

function goToPrev() {
  if (carouselState.isAnimating || carouselState.currentIndex === 0) return;
  
  carouselState.isAnimating = true;
  carouselState.currentIndex--;
  updateCarousel();
  
  setTimeout(() => {
    carouselState.isAnimating = false;
  }, 800);
}

function goToNext() {
  if (carouselState.isAnimating || carouselState.currentIndex === carouselState.totalItems - 1) return;
  
  carouselState.isAnimating = true;
  carouselState.currentIndex++;
  updateCarousel();
  
  setTimeout(() => {
    carouselState.isAnimating = false;
  }, 800);
}

function goToSlide(index) {
  if (carouselState.isAnimating || index === carouselState.currentIndex) return;
  if (index < 0 || index >= carouselState.totalItems) return;
  
  carouselState.isAnimating = true;
  carouselState.currentIndex = index;
  updateCarousel();
  
  setTimeout(() => {
    carouselState.isAnimating = false;
  }, 800);
}

function handleDragStart(e) {
  if (e.target.closest('.carousel-btn')) return;
  
  carouselState.startX = e.clientX;
  carouselState.startY = e.clientY;
  track?.classList.add('dragging');
}

function handleDragMove(e) {
  if (!carouselState.startX) return;
  
  carouselState.deltaX = e.clientX - carouselState.startX;
  carouselState.deltaY = e.clientY - carouselState.startY;
}

function handleDragEnd(e) {
  const track = document.querySelector('.carousel-track');
  track?.classList.remove('dragging');
  
  if (Math.abs(carouselState.deltaX) > 50 && Math.abs(carouselState.deltaX) > Math.abs(carouselState.deltaY)) {
    if (carouselState.deltaX > 0) {
      goToPrev();
    } else {
      goToNext();
    }
  }
  
  carouselState.startX = 0;
  carouselState.startY = 0;
  carouselState.deltaX = 0;
  carouselState.deltaY = 0;
}

function handleTouchStart(e) {
  touchStartTime = Date.now();
  carouselState.startX = e.touches[0].clientX;
  carouselState.startY = e.touches[0].clientY;
}

function handleTouchMove(e) {
  if (!carouselState.startX) return;
  
  const touch = e.touches[0];
  carouselState.deltaX = touch.clientX - carouselState.startX;
  carouselState.deltaY = touch.clientY - carouselState.startY;
}

function handleTouchEnd(e) {
  const touchDuration = Date.now() - touchStartTime;
  
  // Detect swipe
  const isHorizontalSwipe = Math.abs(carouselState.deltaX) > Math.abs(carouselState.deltaY);
  const isQuickSwipe = touchDuration < 300;
  
  if (isHorizontalSwipe && Math.abs(carouselState.deltaX) > 50) {
    if (carouselState.deltaX > 0) {
      goToPrev();
    } else {
      goToNext();
    }
  } else if (isQuickSwipe && Math.abs(carouselState.deltaX) > 20) {
    if (carouselState.deltaX > 0) {
      goToPrev();
    } else {
      goToNext();
    }
  }
  
  carouselState.startX = 0;
  carouselState.startY = 0;
  carouselState.deltaX = 0;
  carouselState.deltaY = 0;
}

function handleResize() {
  // Debounce resize handling
  clearTimeout(window.carouselResizeTimeout);
  window.carouselResizeTimeout = setTimeout(() => {
    updateCarousel();
  }, 250);
}

// Export for external use
export function getCarouselState() {
  return { ...carouselState };
}

export function setCarouselIndex(index) {
  goToSlide(index);
}