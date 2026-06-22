/* Navigation Behavior, Mobile Drawer, and Active Highlighting */

export class NavigationManager {
  constructor() {
    this.header = document.querySelector("header");
    this.navLinks = document.querySelectorAll("nav a");
    this.sections = document.querySelectorAll("section[id]");
    this.menuToggle = document.querySelector(".mobile-menu-toggle");
    this.navMenu = document.querySelector("nav");
    
    this.init();
  }

  init() {
    // Header state scroll handling
    window.addEventListener("scroll", () => this.handleHeaderScroll(), { passive: true });
    
    // Active link highlighting on scroll
    window.addEventListener("scroll", () => this.highlightActiveSection(), { passive: true });
    
    // Mobile menu toggle
    if (this.menuToggle && this.navMenu) {
      this.menuToggle.addEventListener("click", () => this.toggleMobileMenu());
    }

    // Run initial checks
    this.handleHeaderScroll();
    this.highlightActiveSection();
  }

  handleHeaderScroll() {
    if (!this.header) return;
    if (window.scrollY > 80) {
      this.header.classList.add("scrolled");
    } else {
      this.header.classList.remove("scrolled");
    }
  }

  toggleMobileMenu() {
    const isOpen = this.navMenu.classList.toggle("open");
    this.menuToggle.classList.toggle("open", isOpen);
    
    // Prevent background scrolling when menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  highlightActiveSection() {
    let scrollPosition = window.scrollY + 120; // offset for nav height

    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        this.navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }
}
