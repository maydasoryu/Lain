/* =============================================
   PROJECT LAIN — GALLERY
   ============================================= */

let galleryState = {
  currentIndex: 0,
  items: []
};

export function initGallery() {
  const galleryOverlay = document.querySelector('.fullscreen-gallery');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (!galleryOverlay || galleryItems.length === 0) return;

  galleryState.items = Array.from(galleryItems);
  galleryState.currentIndex = 0;

  // Click to open fullscreen
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openFullscreen(index));
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openFullscreen(index);
      }
    });
  });

  // Close button
  const closeBtn = galleryOverlay.querySelector('.fullscreen-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeFullscreen);
  }

  // Navigation buttons
  const prevBtn = galleryOverlay.querySelector('.fullscreen-nav--prev');
  const nextBtn = galleryOverlay.querySelector('.fullscreen-nav--next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => navigateFullscreen(-1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => navigateFullscreen(1));
  }

  // Click outside to close
  galleryOverlay.addEventListener('click', (e) => {
    if (e.target === galleryOverlay) {
      closeFullscreen();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!galleryOverlay.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeFullscreen();
    } else if (e.key === 'ArrowLeft') {
      navigateFullscreen(-1);
    } else if (e.key === 'ArrowRight') {
      navigateFullscreen(1);
    }
  });
}

function openFullscreen(index) {
  const galleryOverlay = document.querySelector('.fullscreen-gallery');
  const fullscreenImage = galleryOverlay?.querySelector('.fullscreen-image');
  
  if (!galleryOverlay || !fullscreenImage) return;

  const item = galleryState.items[index];
  const imageSrc = item?.dataset.src;

  if (imageSrc) {
    galleryState.currentIndex = index;
    fullscreenImage.src = imageSrc;
    galleryOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    const closeBtn = galleryOverlay.querySelector('.fullscreen-close');
    if (closeBtn) closeBtn.focus();
  }
}

function closeFullscreen() {
  const galleryOverlay = document.querySelector('.fullscreen-gallery');
  
  if (galleryOverlay) {
    galleryOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function navigateFullscreen(direction) {
  const galleryOverlay = document.querySelector('.fullscreen-gallery');
  const fullscreenImage = galleryOverlay?.querySelector('.fullscreen-image');
  
  if (!fullscreenImage) return;

  const newIndex = galleryState.currentIndex + direction;
  
  if (newIndex >= 0 && newIndex < galleryState.items.length) {
    galleryState.currentIndex = newIndex;
    const item = galleryState.items[newIndex];
    const imageSrc = item?.dataset.src;
    
    if (imageSrc) {
      fullscreenImage.src = imageSrc;
    }
  }
}

export function getGalleryState() {
  return { ...galleryState };
}