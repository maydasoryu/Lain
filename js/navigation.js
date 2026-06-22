/* =============================================
   PROJECT LAIN — NAVIGATION
   ============================================= */

export function initNavigation(navElement, navLinks) {
  if (!navElement) return;

  let lastScrollY = 0;
  let ticking = false;

  // Scroll-based navigation styling
  const updateNav = () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 80) {
      navElement.classList.add('scrolled');
    } else {
      navElement.classList.remove('scrolled');
    }
    
    lastScrollY = scrollY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  }, { passive: true });

  // Smooth anchor scrolling
  if (navLinks && navLinks.length > 0) {
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          
          if (target) {
            const navHeight = navElement?.offsetHeight || 72;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  // Active section highlighting
  const sections = document.querySelectorAll('section[id]');
  
  const highlightNav = () => {
    const scrollY = window.scrollY + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks?.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', () => {
    requestAnimationFrame(highlightNav);
  }, { passive: true });

  // Mobile menu toggle (for future expansion)
  const initMobileMenu = () => {
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.setAttribute('aria-label', 'Toggle menu');
    menuButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        color: var(--color-text-primary);
        cursor: pointer;
        padding: var(--space-sm);
      }
      
      @media (max-width: 768px) {
        .mobile-menu-btn {
          display: flex;
        }
      }
    `;
    document.head.appendChild(style);
    
    const navInner = navElement.querySelector('.nav-inner');
    if (navInner) {
      navInner.appendChild(menuButton);
    }
  };

  initMobileMenu();
}