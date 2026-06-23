// PROJECT LAIN - Core Script
document.addEventListener('DOMContentLoaded', () => {

    // --- LOADING SCREEN ---
    const loader = document.getElementById('loader');
    
    // Simulate loading time for premium feel
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.visibility = 'hidden';
            document.querySelector('.hero-content').classList.add('visible');
        }, 1000);
    }, 2500);

    // --- SCROLL PROGRESS & NAVBAR ---
    const scrollProgress = document.getElementById('scroll-progress');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        // Scroll Progress
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';

        // Navbar blur and shrink
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- SMOOTH SCROLLING FOR ANCHORS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- INTERSECTION OBSERVER FOR REVEALS ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- SCREENSHOT SLIDER LOGIC ---
    const track = document.getElementById('slider-track');
    const slides = Array.from(track.children);
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;
    let currentTranslate = 0;
    let prevTranslate = 0;

    function updateSliderPosition() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Button Controls
    nextBtn.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Infinite loop forward
        }
        updateSliderPosition();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1; // Infinite loop backward
        }
        updateSliderPosition();
    });

    // Touch & Swipe Gestures
    track.addEventListener('touchstart', touchStart);
    track.addEventListener('touchend', touchEnd);
    track.addEventListener('touchmove', touchMove);

    function touchStart(event) {
        startX = event.touches[0].clientX;
        isDragging = true;
        track.style.transition = 'none';
    }

    function touchMove(event) {
        if (!isDragging) return;
        const currentX = event.touches[0].clientX;
        const diff = currentX - startX;
        const slideWidth = track.clientWidth;
        
        // Add resistance at edges
        if ((currentIndex === 0 && diff > 0) || (currentIndex === slides.length - 1 && diff < 0)) {
            currentTranslate = -(currentIndex * slideWidth) + (diff * 0.3);
        } else {
            currentTranslate = -(currentIndex * slideWidth) + diff;
        }
        
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function touchEnd(event) {
        isDragging = false;
        const endX = event.changedTouches[0].clientX;
        const diff = endX - startX;
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        
        if (Math.abs(diff) > 50) { // Threshold for swipe
            if (diff > 0 && currentIndex > 0) {
                currentIndex--;
            } else if (diff < 0 && currentIndex < slides.length - 1) {
                currentIndex++;
            }
        }
        updateSliderPosition();
    }

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        // Only navigate if showcase is in viewport
        const rect = track.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            if (e.key === 'ArrowRight') nextBtn.click();
            if (e.key === 'ArrowLeft') prevBtn.click();
        }
    });

    // --- AMBIENT FLOATING PARTICLES ---
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.fillStyle = `rgba(243, 229, 171, ${this.opacity})`; // Champagne gold
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        const numberOfParticles = (canvas.width * canvas.height) / 15000; // Density
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // Re-init particles on resize to maintain density
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            initParticles();
        }, 200);
    });
});