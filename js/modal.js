/* Premium Purchase & Download Modal Experience */

export class ModalManager {
  constructor() {
    this.overlay = document.getElementById("download-modal");
    this.container = document.querySelector(".modal-container");
    this.closeBtn = document.querySelector(".modal-close-btn");
    
    this.regionPane = document.getElementById("modal-region-pane");
    this.redirectPane = document.getElementById("modal-redirect-pane");
    
    this.brazilBtn = document.getElementById("region-br");
    this.usBtn = document.getElementById("region-us");
    
    this.activeRomId = null;
    
    this.init();
  }

  init() {
    // Listen for global click event to capture dynamically rendered download buttons
    document.addEventListener("click", (e) => {
      const downloadBtn = e.target.closest("[data-download-rom]");
      if (downloadBtn) {
        e.preventDefault();
        this.activeRomId = downloadBtn.getAttribute("data-download-rom");
        this.openModal();
      }
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.closeModal());
    }

    if (this.overlay) {
      this.overlay.addEventListener("click", (e) => {
        if (e.target === this.overlay) this.closeModal();
      });
    }

    // Region selections
    if (this.brazilBtn) {
      this.brazilBtn.addEventListener("click", () => this.selectRegion("BR"));
    }
    if (this.usBtn) {
      this.usBtn.addEventListener("click", () => this.selectRegion("US"));
    }

    // ESC key support
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.overlay && this.overlay.classList.contains("open")) {
        this.closeModal();
      }
    });
  }

  openModal() {
    if (!this.overlay) return;
    
    // Reset panes
    this.regionPane.style.display = "block";
    this.redirectPane.style.display = "none";
    
    // Freeze scroll & set scale-down transition classes on body
    document.body.classList.add("modal-open");
    this.overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  closeModal() {
    if (!this.overlay) return;
    
    document.body.classList.remove("modal-open");
    this.overlay.classList.remove("open");
    document.body.style.overflow = "";
    
    this.activeRomId = null;
  }

  selectRegion(region) {
    // Hide region pane, show redirect pane
    this.regionPane.style.display = "none";
    this.redirectPane.style.display = "flex";
  }
}
