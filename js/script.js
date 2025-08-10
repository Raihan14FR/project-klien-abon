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
        en: {
            "hero_title": "Premium Indonesian Shredded Meat for the World",
            "order_now": "Order Now",
            "learn_more": "Learn More",
            "about_title": "About Cap Pelangi Mas",
            "about_description": "Since 1995, Cap Pelangi Mas has been producing premium quality shredded meat products using carefully selected ingredients and traditional recipes. Our products are known for their authentic taste and have been exported to 15 countries worldwide, bringing the rich flavor of Indonesian cuisine to global markets.",
            "products_title": "Our Premium Products",
            "product_shelf_life": "6 months shelf life",
            "product_packaging": "200g net weight",
            "product_ingredients": "Premium chicken, selected spices",
            "partners_title": "Our Trusted Partners",
            "delivery_title": "Global Delivery Network",
            "delivery_subtitle": "Trusted by customers worldwide",
            "delivery_text1": "Professional Packing",
            "delivery_text2": "Quality Checked",
            "delivery_text3": "Global Logistics",
            "contact_title": "Get in Touch",
            "contact_name": "Name",
            "contact_email": "Email",
            "contact_message": "Message",
            "contact_send": "Send Message",
            "footer_contact": "Contact Info",
            "footer_hours": "Monday - Friday: 8AM - 5PM\nSaturday: 9AM - 2PM",
            "footer_location": "Our Location",
            "footer_social": "Connect With Us",
            "footer_whatsapp": "Chat on WhatsApp",
            "footer_rights": "All Rights Reserved",
            "contact_subtitle": "For inquiries or orders, please fill out the form below",
            "contact_message": "Your Message"
        },
            id: {
            "hero_title": "Abon dari Indonesia dengan kualitas Premium untuk Dunia",
            "order_now": "Pesan Sekarang",
            "learn_more": "Pelajari Lebih Lanjut",
            "about_title": "Tentang Cap Pelangi Mas",
            "about_description": "Sejak 1995, Cap Pelangi Mas memproduksi abon berkualitas premium dengan bahan pilihan dan resep tradisional. Produk kami dikenal dengan cita rasa autentik dan telah diekspor ke 15 negara di seluruh dunia, menghadirkan kekayaan rasa kuliner Indonesia ke pasar global.",
            "products_title": "Produk Unggulan Kami",
            "product_shelf_life": "Masa simpan 6 bulan",
            "product_packaging": "Berat bersih 200g",
            "product_ingredients": "Daging ayam premium, rempah pilihan",
            "partners_title": "Mitra Terpercaya Kami",
            "delivery_title": "Jaringan Pengiriman Global",
            "delivery_subtitle": "Dipercaya pelanggan di seluruh dunia",
            "delivery_text1": "Pengepakan Profesional",
            "delivery_text2": "Pemeriksaan Kualitas",
            "delivery_text3": "Logistik Global",
            "contact_title": "Hubungi Kami",
            "contact_name": "Nama",
            "contact_email": "Email",
            "contact_message": "Pesan",
            "contact_send": "Kirim Pesan",
            "footer_contact": "Informasi Kontak",
            "footer_hours": "Senin - Jumat: 08.00 - 17.00\nSabtu: 09.00 - 14.00",
            "footer_location": "Lokasi Kami",
            "footer_social": "Media Sosial",
            "footer_whatsapp": "Chat via WhatsApp",
            "footer_rights": "Hak Cipta Dilindungi",
            "contact_message": "Pesan Anda",
            "contact_subtitle": "Untuk pertanyaan atau pemesanan, silakan isi formulir di bawah ini"
        }
    };
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
    // Partner Carousel (FIXED FOR ALL DEVICES)
    // ======================
    const initPartnerCarousel = () => {
        const container = document.querySelector('.partners-carousel-container');
        const carousel = document.querySelector('.partners-carousel');
        const logos = document.querySelectorAll('.partner-logo');
        
        if (!carousel || !logos.length) return;

        // Clone logos for infinite loop effect
        const clonedLogos = Array.from(logos).map(logo => logo.cloneNode(true));
        clonedLogos.forEach(clone => carousel.appendChild(clone));

        let speed = 1.5;
        let isScrolling = true;
        let animationId;
        let isDragging = false;
        let startX, scrollLeft;

        function autoScroll() {
            if (!isScrolling || isDragging) return;
            
            carousel.scrollLeft += speed;
            
            // Reset when reaching half of carousel
            if (carousel.scrollLeft >= (carousel.scrollWidth / 2)) {
                carousel.scrollLeft = 0;
            }
            
            animationId = requestAnimationFrame(autoScroll);
        }

        // Start auto-scroll
        autoScroll();

        // Pause on hover (desktop only)
        if (window.matchMedia("(hover: hover)").matches) {
            container.addEventListener('mouseenter', () => {
                isScrolling = false;
            });
            
            container.addEventListener('mouseleave', () => {
                isScrolling = true;
                autoScroll();
            });
        }

        // Touch support for mobile
        carousel.addEventListener('touchstart', (e) => {
            isDragging = true;
            isScrolling = false;
            startX = e.touches[0].pageX;
            scrollLeft = carousel.scrollLeft;
            cancelAnimationFrame(animationId);
        }, { passive: true });

        carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.touches[0].pageX;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        }, { passive: false });

        carousel.addEventListener('touchend', () => {
            isDragging = false;
            isScrolling = true;
            autoScroll();
        });

        // Cleanup on resize
        window.addEventListener('resize', () => {
            carousel.scrollLeft = 0;
        });
    };

    // Initialize partner carousel
    initPartnerCarousel();

    // ======================
    // Prevent Layout Shift on Load
    // ======================
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
});
