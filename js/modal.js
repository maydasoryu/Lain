/* =============================================
   PROJECT LAIN — MODAL
   ============================================= */

let modalState = {
  isOpen: false,
  currentROM: null,
  selectedRegion: null
};

const telegramLink = 'https://t.me/nihilupdates';

export function initModal(modalOverlay) {
  if (!modalOverlay) return;

  const closeBtn = modalOverlay.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalState.isOpen) {
      closeModal();
    }
  });

  window.modalModule = {
    open: openModal,
    close: closeModal
  };
}

function openModal(romId) {
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalContent = modalOverlay?.querySelector('.modal-content');
  
  if (!modalOverlay) return;

  // Import roms dynamically to avoid circular dependency
  import('./data.js').then(({ roms }) => {
    const rom = roms?.find(r => r.id === romId);
    
    if (rom) {
      modalState.currentROM = rom;
      modalState.selectedRegion = null;
      
      resetModalContent();
      document.body.style.overflow = 'hidden';
      modalOverlay.classList.add('active');
      modalState.isOpen = true;

      const closeBtn = modalOverlay.querySelector('.modal-close');
      if (closeBtn) closeBtn.focus();
    }
  });
}

function closeModal() {
  const modalOverlay = document.querySelector('.modal-overlay');
  
  if (!modalOverlay) return;

  modalOverlay.classList.remove('active');
  modalState.isOpen = false;
  modalState.currentROM = null;
  modalState.selectedRegion = null;
  document.body.style.overflow = '';
}

function resetModalContent() {
  const modalContent = document.querySelector('.modal-content');
  if (!modalContent) return;

  modalContent.innerHTML = `
    <button class="modal-close" aria-label="Close modal">✕</button>
    
    <div class="modal-header">
      <h3 class="modal-title">Select Your Region</h3>
      <p class="modal-desc">Choose your country for pricing</p>
    </div>
    
    <div class="modal-body">
      <div class="region-options">
        <div class="region-option" data-region="brazil">
          <span class="region-name">Brazil</span>
          <span class="region-price">R$8</span>
        </div>
        <div class="region-option" data-region="usa">
          <span class="region-name">United States</span>
          <span class="region-price">$2</span>
        </div>
      </div>
    </div>
    
    <div class="modal-footer">
      <button class="btn btn-primary btn-large modal-proceed-btn" disabled>
        Proceed to Download
      </button>
    </div>
  `;

  initModalEvents();
}

function initModalEvents() {
  const closeBtn = document.querySelector('.modal-close');
  const regionOptions = document.querySelectorAll('.region-option');
  const proceedBtn = document.querySelector('.modal-proceed-btn');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  regionOptions.forEach(option => {
    option.addEventListener('click', () => {
      regionOptions.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      modalState.selectedRegion = option.dataset.region;
      
      if (proceedBtn) {
        proceedBtn.disabled = false;
      }
    });
  });

  if (proceedBtn) {
    proceedBtn.addEventListener('click', handleProceed);
  }
}

function handleProceed() {
  if (!modalState.selectedRegion) return;

  const modalContent = document.querySelector('.modal-content');
  if (!modalContent) return;

  modalContent.innerHTML = `
    <button class="modal-close" aria-label="Close modal">✕</button>
    
    <div class="modal-success">
      <div class="modal-success-icon">✓</div>
      <h3 class="modal-title">Selection Confirmed</h3>
      <p class="modal-desc" style="margin-top: 16px;">
        Head over to Telegram to proceed with payment.
      </p>
    </div>
    
    <div class="modal-footer" style="margin-top: 32px;">
      <a href="${telegramLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-large">
        Open Telegram
      </a>
    </div>
  `;

  const closeBtn = modalContent.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
}

export function open(romId) {
  openModal(romId);
}

export function close() {
  closeModal();
}