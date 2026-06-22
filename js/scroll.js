/* Scroll Management Module */

export class ScrollManager {
  constructor() {
    this.progressBar = document.getElementById("scroll-progress");
    this.init();
  }

  init() {
    // Update scroll progress bar
    window.addEventListener("scroll", () => this.updateProgressBar(), { passive: true });
    
    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute("href");
        if (targetId === "#") return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Close mobile menu if open
          const navElement = document.querySelector("nav");
          const menuToggle = document.querySelector(".mobile-menu-toggle");
          if (navElement && navElement.classList.contains("open")) {
            navElement.classList.remove("open");
            if (menuToggle) menuToggle.classList.remove("open");
          }

          const headerHeight = 72; // Nav height
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      });
    });
  }

  updateProgressBar() {
    if (!this.progressBar) return;
    
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    
    this.progressBar.style.width = scrolled + "%";
  }
}
