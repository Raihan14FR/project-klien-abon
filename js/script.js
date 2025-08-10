document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Header Scroll Effect
    // ======================
    const header = document.getElementById('header');
    
    function updateHeaderOnScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeaderOnScroll);
    updateHeaderOnScroll();

    // ======================
    // Mobile Menu Toggle
    // ======================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking nav links
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // ======================
    // Active Navigation Highlight
    // ======================
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    function setActiveLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveLink);
    setActiveLink();

    // ======================
    // Hero Slider
    // ======================
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 10000;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }
    
    function startSlider() {
        slideInterval = setInterval(nextSlide, slideDuration);
    }
    
    function resetSliderTimer() {
        clearInterval(slideInterval);
        startSlider();
    }
    
    nextBtn.addEventListener('click', () => { nextSlide(); resetSliderTimer(); });
    prevBtn.addEventListener('click', () => { prevSlide(); resetSliderTimer(); });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => { showSlide(index); resetSliderTimer(); });
    });
    
    startSlider();

    // Pause slider on hover
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
    sliderContainer.addEventListener('mouseleave', resetSliderTimer);

    // ======================
    // Language Switcher
    // ======================
    const languageSelect = document.getElementById('language-select');
    const selectedFlagIcon = document.getElementById('selected-flag-icon');
    const translatableElements = document.querySelectorAll('[data-i18n]');
    
    const translations = {
        en: { /* ... (isi terjemahan English sama seperti sebelumnya) ... */ },
        id: { /* ... (isi terjemahan Indonesian sama seperti sebelumnya) ... */ }
    };
    
    function updateContent(lang) {
        document.body.style.opacity = '0';
        translatableElements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang]?.[key]) element.textContent = translations[lang][key];
        });
        selectedFlagIcon.src = lang === 'en' ? 'assets/icons/gb-eng.svg' : 'assets/icons/id.svg';
        selectedFlagIcon.alt = lang === 'en' ? 'English' : 'Indonesian';
        setTimeout(() => { document.body.style.opacity = '1'; }, 50);
    }
    
    languageSelect.addEventListener('change', function() {
        const selectedLang = this.value;
        updateContent(selectedLang);
        localStorage.setItem('preferredLang', selectedLang);
    });
    
    updateContent(localStorage.getItem('preferredLang') || 'en');

    // ======================
    // Smooth Scrolling
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                if (mainNav.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    document.body.style.overflow = '';
                }
                window.scrollTo({ top: targetElement.offsetTop - 50, behavior: 'smooth' });
            }
        });
    });

    // ======================
    // Partner Carousel (FIXED FOR MOBILE & DESKTOP)
    // ======================
    const partnerCarousel = document.querySelector('.partners-carousel');
    const partnerLogos = document.querySelectorAll('.partner-logo');
    let isDragging = false;
    let startX, scrollLeft;

    // Auto-scroll animation
    function startAutoScroll() {
        let scrollAmount = 0;
        const scrollSpeed = 1; // Adjust speed here
        
        function animate() {
            partnerCarousel.scrollLeft += scrollSpeed;
            scrollAmount += Math.abs(scrollSpeed);
            
            // Reset scroll position to create infinite loop
            if (scrollAmount >= partnerCarousel.scrollWidth / 2) {
                partnerCarousel.scrollLeft = 0;
                scrollAmount = 0;
            }
            
            if (!isDragging) requestAnimationFrame(animate);
        }
        
        animate();
    }

    // Pause on hover (desktop only)
    if (window.matchMedia("(hover: hover)").matches) {
        partnerCarousel.addEventListener('mouseenter', () => {
            isDragging = true;
        });
        
        partnerCarousel.addEventListener('mouseleave', () => {
            isDragging = false;
            startAutoScroll();
        });
    }

    // Touch support for mobile
    partnerCarousel.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - partnerCarousel.offsetLeft;
        scrollLeft = partnerCarousel.scrollLeft;
    });

    partnerCarousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - partnerCarousel.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier
        partnerCarousel.scrollLeft = scrollLeft - walk;
    });

    partnerCarousel.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Start the carousel
    startAutoScroll();

    // ======================
    // Prevent Layout Shift on Load
    // ======================
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
});
