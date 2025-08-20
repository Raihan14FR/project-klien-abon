document.addEventListener('DOMContentLoaded', function () {
  // ======================
  // Header Scroll Effect
  // ======================
  let lastScrollPosition = 0;

  function updateHeaderState() {
    const header = document.getElementById('header');
    const homeSection = document.getElementById('home');
    const currentScroll = window.scrollY;
    const isInHome = homeSection &&
      currentScroll < homeSection.offsetHeight &&
      currentScroll >= 0;

    // Apply effects based on scroll position
    if (currentScroll > 20) {
      header.classList.add('scrolled');

      // Only remove blur if we've scrolled past home section
      if (!isInHome) {
        header.style.backdropFilter = 'none';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
      }
    } else {
      header.classList.remove('scrolled');
      if (isInHome) {
        header.style.backdropFilter = 'blur(10px)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
      }
    }

    lastScrollPosition = currentScroll;
  }

  // Optimized Scroll Event
  let isTicking = false;
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        updateHeaderState();
        isTicking = false;
      });
      isTicking = true;
    }
  }, { passive: true });

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    // Add home class to body if on homepage
    if (window.location.pathname === '/' || window.location.hash === '#home') {
      document.body.classList.add('home');
    }
    updateHeaderState();
  });

  // ======================
  // Mobile Menu Toggle
  // ======================
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  function toggleMobileMenu() {
    const isOpening = !mobileMenuToggle.classList.contains('active');

    mobileMenuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    document.body.style.overflow = isOpening ? 'hidden' : '';

    // Add ARIA attributes for accessibility
    mobileMenuToggle.setAttribute('aria-expanded', isOpening);
  }

  mobileMenuToggle.addEventListener('click', toggleMobileMenu);

  // Close menu when clicking links (improved)
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
      toggleMobileMenu();
    }
  });

  // Close mobile menu when clicking on nav links
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
  setActiveLink(); // Initialize on load

  // ======================
  // Hero Slider
  // ======================
  document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    // Function to show a specific slide
    function showSlide(n) {
      // Remove active class from all slides and dots
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      // Calculate the current slide index with wrapping
      currentSlide = (n + slides.length) % slides.length;

      // Add active class to the current slide and dot
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    }

    // Function to move to next slide
    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    // Function to start the automatic slider
    function startSlider() {
      slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Add click event to dots for manual navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        // Reset timer when manually navigating
        clearInterval(slideInterval);
        showSlide(index);
        startSlider();
      });
    });

    // Start the slider
    if (slides.length > 0) {
      showSlide(0); // Show first slide initially
      startSlider();

      // Pause slider on hover
      const slider = document.querySelector('.hero-slider');
      if (slider) {
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', startSlider);
      }
    }
  });

  // ======================
  // Language Switcher with Flags
  // ======================
  const languageSelect = document.getElementById('language-select');
  const selectedFlagIcon = document.getElementById('selected-flag-icon');
  const translatableElements = document.querySelectorAll('[data-i18n]');

  // Translation dictionary
  const translations = {
    en: {
      "hero_title": "Premium Indonesian Shredded Meat for the World",
      "order_now": "Order Now",
      "learn_more": "Learn More",
      "about_title": "About Cap Pelangi Mas",
      "about_description": "Since 1995, Cap Pelangi Mas has been producing premium quality shredded meat products using carefully selected ingredients and traditional recipes. Our products are known for their authentic taste and have been exported to 15 countries worldwide, bringing the rich flavor of Indonesian cuisine to global markets.",
      "products_title": "Our Premium Products",
      "product_shelf_life": "10 months shelf life",
      "product_packaging": "80g - 250g net weight",
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
      "contact_message": "Your Message",
    },
    id: {
      "hero_title": "Abon dari Indonesia dengan kualitas Premium untuk Dunia",
      "order_now": "Pesan Sekarang",
      "learn_more": "Pelajari Lebih Lanjut",
      "about_title": "Tentang Cap Pelangi Mas",
      "about_description": "Sejak 1995, Cap Pelangi Mas memproduksi abon berkualitas premium dengan bahan pilihan dan resep tradisional. Produk kami dikenal dengan cita rasa autentik dan telah diekspor ke 15 negara di seluruh dunia, menghadirkan kekayaan rasa kuliner Indonesia ke pasar global.",
      "products_title": "Produk Unggulan Kami",
      "product_shelf_life": "Masa simpan 10 bulan",
      "product_packaging": "Berat bersih 80g - 250g",
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

  function updateContent(lang) {
    // Temporarily hide content to prevent layout shift
    document.body.style.opacity = '0';

    translatableElements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });

    // Update flag icon
    const flagPath = lang === 'en'
      ? 'assets/icons/gb-eng.svg'
      : 'assets/icons/indonesia-flag-icon.svg';
    selectedFlagIcon.src = flagPath;
    selectedFlagIcon.alt = lang === 'en' ? 'English' : 'Indonesian';

    // Restore visibility after a short delay
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 50);
  }

  languageSelect.addEventListener('change', function () {
    const selectedLang = this.value;
    updateContent(selectedLang);
    localStorage.setItem('preferredLang', selectedLang);
  });

  // Initialize with preferred language
  const preferredLang = localStorage.getItem('preferredLang') || 'en';
  languageSelect.value = preferredLang;
  updateContent(preferredLang);

  // ======================
  // Smooth Scrolling
  // ======================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        if (mainNav.classList.contains('active')) {
          mobileMenuToggle.classList.remove('active');
          mainNav.classList.remove('active');
          document.body.style.overflow = '';
        }

        const headerHeight = document.getElementById('header').offsetHeight;
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  });

  document.querySelectorAll('.partner-logo').forEach(logo => {
    logo.addEventListener('mouseenter', () => {
      const carousel = document.querySelector('.partners-carousel');
      carousel.style.animationPlayState = 'paused';
    });

    logo.addEventListener('mouseleave', () => {
      const carousel = document.querySelector('.partners-carousel');
      carousel.style.animationPlayState = 'running';
    });
  });

  // ======================
  // Prevent Layout Shift on Load
  // ======================
  window.addEventListener('load', function () {
    document.body.style.opacity = '1';
  });
});