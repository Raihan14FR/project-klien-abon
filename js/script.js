document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Partners Carousel
    // ======================
    const partnersCarousel = document.querySelector('.partners-carousel');
    const partnerLogos = document.querySelectorAll('.partner-logo');
    const carouselContainer = document.querySelector('.partners-carousel-container');
    
    // Clone logos for infinite loop
    function cloneLogos() {
        const logosToClone = Array.from(partnerLogos).slice(0, Math.ceil(partnerLogos.length / 2));
        logosToClone.forEach(logo => {
            const clone = logo.cloneNode(true);
            partnersCarousel.appendChild(clone);
        });
    }
    
    // Initialize carousel
    function initCarousel() {
        // Only clone if not already cloned
        if (partnersCarroller.children.length === partnerLogos.length) {
            cloneLogos();
        }
        
        // Set animation duration based on device
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const baseDuration = 30; // Base duration in seconds
        const duration = isMobile ? baseDuration * 1.5 : baseDuration;
        
        partnersCarousel.style.animationDuration = `${duration}s`;
        
        // Pause/play on visibility change
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    partnersCarousel.style.animationPlayState = 'running';
                } else {
                    partnersCarousel.style.animationPlayState = 'paused';
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(carouselContainer);
    }
    
    // Handle hover for desktop
    function setupHover() {
        if (window.matchMedia('(pointer: fine)').matches) {
            partnersCarousel.addEventListener('mouseenter', () => {
                partnersCarousel.style.animationPlayState = 'paused';
            });
            
            partnersCarousel.addEventListener('mouseleave', () => {
                partnersCarousel.style.animationPlayState = 'running';
            });
        }
    }
    
    // Handle touch devices
    function setupTouch() {
        if ('ontouchstart' in window) {
            let touchStartX = 0;
            let touchEndX = 0;
            
            carouselContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                partnersCarousel.style.animationPlayState = 'paused';
            }, { passive: true });
            
            carouselContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                // If not a significant swipe, resume animation
                if (Math.abs(touchEndX - touchStartX) < 50) {
                    setTimeout(() => {
                        partnersCarousel.style.animationPlayState = 'running';
                    }, 1000);
                }
            }, { passive: true });
        }
    }
    
    // Responsive adjustments
    function handleResize() {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const logoWidth = isMobile ? 120 : 160;
        const gap = isMobile ? 20 : 40;
        
        // Calculate animation distance
        const totalWidth = (partnersCarousel.children.length * logoWidth) + 
                          ((partnersCarousel.children.length - 1) * gap);
        const translateValue = -(totalWidth / 2 + gap);
        
        // Update keyframes
        const styleSheet = document.styleSheets[0];
        const rules = styleSheet.cssRules || styleSheet.rules;
        
        // Remove existing keyframes if any
        for (let i = 0; i < rules.length; i++) {
            if (rules[i].name === 'scroll') {
                styleSheet.deleteRule(i);
                break;
            }
        }
        
        // Add new keyframes
        styleSheet.insertRule(`
            @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(${translateValue}px); }
            }
        `, styleSheet.cssRules.length);
        
        // Update animation duration
        const baseDuration = isMobile ? 60 : 30;
        partnersCarousel.style.animationDuration = `${baseDuration}s`;
    }
    
    // Initialize everything
    cloneLogos();
    initCarousel();
    setupHover();
    setupTouch();
    handleResize();
    
    // Recalculate on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            handleResize();
        }, 250);
    });
    
    // Force redraw for mobile browsers
    function triggerReflow() {
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            partnersCarousel.style.display = 'none';
            void partnersCarousel.offsetHeight; // Trigger reflow
            partnersCarousel.style.display = 'flex';
        }
    }
    
    // Run after all assets load
    window.addEventListener('load', () => {
        triggerReflow();
        partnersCarousel.style.animationPlayState = 'running';
    });
});
