/**
 * navigation.js — Sticky nav, smooth scroll, mobile menu.
 */
document.addEventListener("DOMContentLoaded", () => {
  initScrollBehavior();
  initMobileMenu();
  initSmoothScroll();
});

function initScrollBehavior() {
  const nav = document.getElementById("main-nav");
  let ticking = false;

  const updateNav = () => {
    if (window.scrollY > 80) {
      nav.classList.remove("is-transparent");
      nav.classList.add("is-glass");
    } else {
      nav.classList.add("is-transparent");
      nav.classList.remove("is-glass");
    }
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => { updateNav(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });

  updateNav();
}

function initMobileMenu() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.classList.toggle("is-active");
    toggle.setAttribute("aria-expanded", isOpen);
  });

  links.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.classList.remove("is-active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && links.classList.contains("is-open")) {
      links.classList.remove("is-open");
      toggle.classList.remove("is-active");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = 72;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
}
