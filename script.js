/**
 * Portfolio Website - JavaScript
 * Handles navigation, animations, theme toggle, form validation, and more
 */

// ============================================
// DOM Elements
// ============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const scrollTopBtn = document.getElementById('scroll-top');
const contactForm = document.getElementById('contact-form');
const skillProgressBars = document.querySelectorAll('.skill-progress-bar');

// ============================================
// Initialize on DOM Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initScrollEffects();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initSkillProgress();
    initContactForm();
    initScrollToTop();
    setCurrentYear();
});

// ============================================
// Theme Toggle
// ============================================
function initTheme() {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Theme toggle event
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    });
}

function updateThemeIcon(theme) {
    // The CSS handles the icon switching via data-theme attribute
}

// ============================================
// Navbar Effects
// ============================================
function initNavbar() {
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Scroll Effects & Animations
// ============================================
function initScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.section-title, .section-subtitle, .project-card, .skill-item, .stat-card, .contact-info, .contact-form-wrapper'
    );
    
    // Add reveal class to elements
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// ============================================
// Skill Progress Animation
// ============================================
function initSkillProgress() {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    const animateProgress = () => {
        progressBars.forEach(progress => {
            const rect = progress.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
            
            if (isVisible) {
                const bar = progress.querySelector('.skill-progress-bar');
                const targetWidth = bar.getAttribute('data-progress');
                
                if (targetWidth) {
                    setTimeout(() => {
                        bar.style.width = targetWidth + '%';
                    }, 200);
                }
                
                // Remove listener after animation
                progress.removeEventListener('mouseenter', animateProgress);
            }
        });
    };
    
    // Trigger animation when skill section is in view
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgress();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(skillsSection);
    }
}

// ============================================
// Contact Form Validation
// ============================================
function initContactForm() {
    if (!contactForm) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const formSuccess = document.getElementById('form-success');
    
    // Real-time validation
    const validateField = (input, errorId) => {
        const errorElement = document.getElementById(errorId);
        const parent = input.parentElement;
        let isValid = true;
        
        // Remove error state
        parent.classList.remove('error');
        
        // Clear error message
        if (errorElement) {
            errorElement.textContent = getErrorMessage(input.name, input.value);
        }
        
        return isValid;
    };
    
    const getErrorMessage = (fieldName, value) => {
        switch (fieldName) {
            case 'name':
                return value.trim().length < 2 ? 'Please enter your name (at least 2 characters)' : '';
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
            case 'subject':
                return value.trim().length < 3 ? 'Please enter a subject (at least 3 characters)' : '';
            case 'message':
                return value.trim().length < 10 ? 'Please enter a message (at least 10 characters)' : '';
            default:
                return '';
        }
    };
    
    // Input event listeners for real-time feedback
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            const errorId = `${input.id}-error`;
            validateField(input, errorId);
        });
        
        input.addEventListener('blur', () => {
            const errorId = `${input.id}-error`;
            validateField(input, errorId);
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        const inputs = [
            { input: nameInput, errorId: 'name-error' },
            { input: emailInput, errorId: 'email-error' },
            { input: subjectInput, errorId: 'subject-error' },
            { input: messageInput, errorId: 'message-error' }
        ];
        
        inputs.forEach(({ input, errorId }) => {
            const errorText = getErrorMessage(input.name, input.value);
            const parent = input.parentElement;
            
            if (errorText) {
                parent.classList.add('error');
                document.getElementById(errorId).textContent = errorText;
                isValid = false;
            } else {
                parent.classList.remove('error');
            }
        });
        
        if (!isValid) return;
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        try {
            await simulateFormSubmission();
            
            // Show success message
            formSuccess.classList.add('show');
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 5000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Something went wrong. Please try again later.');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

// Simulate form submission (replace with actual backend integration)
function simulateFormSubmission() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 2000);
    });
}

// ============================================
// Scroll to Top
// ============================================
function initScrollToTop() {
    const handleScroll = () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Set Current Year in Footer
// ============================================
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ============================================
// Intersection Observer for Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-item, .stat-card');
    animatedElements.forEach(el => observer.observe(el));
});

// ============================================
// Keyboard Navigation
// ============================================
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Focus management for accessibility
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

// Remove keyboard navigation class when mouse is used
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ============================================
// Performance Optimization
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Use throttled scroll handler for performance
const throttledScrollHandler = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScrollHandler);

// ============================================
// Project Card Hover Effects
// ============================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ============================================
// Lazy Loading Images (if added in future)
// ============================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// Console Easter Egg
// ============================================
console.log('%c👋 Hello, Developer!', 'color: #3b82f6; font-size: 24px; font-weight: bold;');
console.log('%cInterested in how this was built? Check out the source code!', 'color: #64748b; font-size: 14px;');
console.log('%c📧 Want to collaborate? Send me an email!', 'color: #10b981; font-size: 14px; font-weight: bold;');

// ============================================
// End of Script
// ============================================
