// Daniel Ecko Photography Portfolio - JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavigation();
    initHeroSlider();
    initPortfolio();
    initAboutCounters();
    initContactForm();
    initLightbox();
    initBackToTop();
    initSmoothScroll();
});

// ===== Navigation Module =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on a link
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        let currentSection = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
}

// ===== Hero Slider Module =====
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const typewriterText = document.getElementById('typewriter-text');
    const taglines = [
        "Capturing moments.",
        "Telling stories.",
        "Framing the unseen.",
        "Creating visual narratives."
    ];
    
    let currentSlide = 0;
    let currentTagline = 0;
    let isTyping = false;
    let isDeleting = false;
    let typingSpeed = 100;
    
    // Rotate hero background images
    function rotateSlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Typewriter effect
    function typeWriter() {
        const currentText = taglines[currentTagline];
        
        if (!isTyping && !isDeleting) {
            isTyping = true;
        }
        
        if (isTyping) {
            typewriterText.textContent = currentText.substring(0, typewriterText.textContent.length + 1);
            
            if (typewriterText.textContent === currentText) {
                isTyping = false;
                setTimeout(() => {
                    isDeleting = true;
                }, 2000);
            }
        }
        
        if (isDeleting) {
            typewriterText.textContent = currentText.substring(0, typewriterText.textContent.length - 1);
            
            if (typewriterText.textContent === '') {
                isDeleting = false;
                currentTagline = (currentTagline + 1) % taglines.length;
            }
        }
        
        // Adjust typing speed
        const speed = isDeleting ? typingSpeed / 2 : typingSpeed;
        setTimeout(typeWriter, speed);
    }
    
    // Start slide rotation (every 6 seconds)
    setInterval(rotateSlides, 6000);
    
    // Start typewriter effect
    setTimeout(typeWriter, 1500);
}

// ===== Portfolio Module =====
function initPortfolio() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Portfolio data - in a real app, this would come from an API or database
    const portfolioItems = [
        { id: 1, title: "Urban Elegance", category: "editorial", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", wide: false, tall: true },
        { id: 2, title: "Mountain Sunrise", category: "landscape", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", wide: true, tall: false },
        { id: 3, title: "Fashion Editorial", category: "editorial", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w-800&q=80", wide: false, tall: false },
        { id: 4, title: "Corporate Portrait", category: "portraits", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", wide: false, tall: false },
        { id: 5, title: "Product Showcase", category: "commercial", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", wide: true, tall: false },
        { id: 6, title: "Beach Sunset", category: "landscape", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", wide: false, tall: true },
        { id: 7, title: "Studio Portrait", category: "portraits", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", wide: false, tall: false },
        { id: 8, title: "Night Cityscape", category: "landscape", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", wide: true, tall: false },
        { id: 9, title: "Fashion Campaign", category: "editorial", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", wide: false, tall: true },
        { id: 10, title: "Brand Advertisement", category: "commercial", image: "https://images.unsplash.com/photo-1556228578-9c360e1d8d34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", wide: false, tall: false },
        { id: 11, title: "Desert Landscape", category: "landscape", image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", wide: true, tall: false },
        { id: 12, title: "Character Portrait", category: "portraits", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", wide: false, tall: false }
    ];
    
    // Generate portfolio items
    function renderPortfolioItems(filter = 'all') {
        portfolioGrid.innerHTML = '';
        
        const filteredItems = filter === 'all' 
            ? portfolioItems 
            : portfolioItems.filter(item => item.category === filter);
        
        filteredItems.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = `portfolio-item ${item.wide ? 'wide' : ''} ${item.tall ? 'tall' : ''}`;
            portfolioItem.setAttribute('data-category', item.category);
            portfolioItem.setAttribute('data-id', item.id);
            
            portfolioItem.innerHTML = `
                <img 
                    src="${item.image}" 
                    alt="${item.title}" 
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                >
                <div class="portfolio-overlay">
                    <span class="portfolio-category">${item.category}</span>
                    <h3 class="portfolio-title">${item.title}</h3>
                </div>
            `;
            
            portfolioGrid.appendChild(portfolioItem);
            
            // Add click event to open lightbox
            portfolioItem.addEventListener('click', () => {
                openLightbox(item);
            });
        });
        
        // Initialize lazy loading for images
        initLazyLoading();
    }
    
    // Initialize lazy loading using Intersection Observer
    function initLazyLoading() {
        const images = document.querySelectorAll('.portfolio-item img');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '0px 0px 100px 0px'
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without Intersection Observer
            images.forEach(img => {
                img.src = img.dataset.src || img.src;
            });
        }
    }
    
    // Filter button event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            const filter = this.getAttribute('data-filter');
            renderPortfolioItems(filter);
        });
    });
    
    // Initial render
    renderPortfolioItems();
}

// ===== About Counters Module =====
function initAboutCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const count = parseInt(counter.textContent);
        const increment = Math.ceil(target / speed);
        
        if (count < target) {
            counter.textContent = Math.min(count + increment, target);
            setTimeout(() => animateCounter(counter), 10);
        } else {
            counter.textContent = target + '+';
        }
    }
    
    // Use Intersection Observer to trigger counters when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.5
    });
    
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
}

// ===== Contact Form Module =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // In a real application, you would send the data to a server here
        // For demo purposes, we'll simulate a successful submission
        simulateFormSubmission(name, email, message);
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
            formMessage.textContent = '';
        }, 5000);
    }
    
    function simulateFormSubmission(name, email, message) {
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Show success message
            showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
}

// ===== Lightbox Module =====
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCategory = document.getElementById('lightboxCategory');
    
    let currentImageIndex = 0;
    let portfolioItems = [];
    
    // In a real app, this would match the portfolio items array
    function getPortfolioItemsForLightbox() {
        // Return all portfolio items from the portfolio module
        // For simplicity, we're creating a similar structure here
        return [
            { id: 1, title: "Urban Elegance", category: "editorial", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
            { id: 2, title: "Mountain Sunrise", category: "landscape", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
            { id: 3, title: "Fashion Editorial", category: "editorial", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
            { id: 4, title: "Corporate Portrait", category: "portraits", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
            { id: 5, title: "Product Showcase", category: "commercial", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" },
            { id: 6, title: "Beach Sunset", category: "landscape", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" }
        ];
    }
    
    function openLightbox(item) {
        portfolioItems = getPortfolioItemsForLightbox();
        
        // Find the index of the clicked item
        currentImageIndex = portfolioItems.findIndex(i => i.id === item.id);
        if (currentImageIndex === -1) currentImageIndex = 0;
        
        // Update lightbox content
        updateLightboxContent();
        
        // Show lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add event listeners for keyboard navigation
        document.addEventListener('keydown', handleKeydown);
    }
    
    function updateLightboxContent() {
        const item = portfolioItems[currentImageIndex];
        
        // Set image with a small version first, then load high-res
        lightboxImage.src = item.image;
        lightboxImage.alt = item.title;
        lightboxTitle.textContent = item.title;
        lightboxCategory.textContent = item.category.charAt(0).toUpperCase() + item.category.slice(1);
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeydown);
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % portfolioItems.length;
        updateLightboxContent();
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + portfolioItems.length) % portfolioItems.length;
        updateLightboxContent();
    }
    
    function handleKeydown(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    }
    
    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', showNextImage);
    lightboxPrev.addEventListener('click', showPrevImage);
    
    // Close lightbox when clicking on the background
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// ===== Back to Top Module =====
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== Smooth Scroll Module =====
function initSmoothScroll() {
    // This is handled by CSS with `scroll-behavior: smooth`
    // But we need to override for browsers that don't support it
    if (!('scrollBehavior' in document.documentElement.style)) {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}