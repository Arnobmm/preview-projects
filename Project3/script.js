// DOM Elements
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('nav a');
const brainNodes = document.querySelectorAll('.brain-node');
const brainConnections = document.querySelectorAll('.brain-connection');

// On page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initAnimations();
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        document.querySelector('nav ul').classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Animate brain on load
    animateBrain();
});

// Smooth scroll function
function smoothScroll(e) {
    e.preventDefault();
    
    // Get the target element
    const targetId = this.getAttribute('href');
    const targetPosition = document.querySelector(targetId).offsetTop - 100;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;
    
    // Highlight active nav link
    navLinks.forEach(link => link.classList.remove('active'));
    this.classList.add('active');
    
    // Close mobile menu if open
    menuToggle.classList.remove('active');
    document.querySelector('nav ul').classList.remove('active');
    
    // Smooth scroll animation
    window.requestAnimationFrame(step);
    
    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        
        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
        
        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    }
    
    // Easing function
    function easeInOutCubic(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    }
}

// Initialize GSAP animations
function initAnimations() {
    // Create a timeline for the hero section
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Stagger animation for logo paths
    gsap.set('.logo-path', { strokeDasharray: 100, strokeDashoffset: 100 });
    gsap.to('.logo-path', { 
        strokeDashoffset: 0, 
        duration: 1.5,
        stagger: 0.2,
        ease: 'power2.out'
    });
    
    // Animate hero elements
    heroTimeline
        .from('.hero-content h1', { y: 50, opacity: 0, duration: 1 })
        .from('.hero-content p', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.cta-buttons', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero-stats', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6');
    
    // Animate on scroll
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Features section animation
        gsap.from('.section-header', {
            scrollTrigger: {
                trigger: '.features',
                start: 'top 80%'
            },
            y: 50,
            opacity: 0,
            duration: 0.8
        });
        
        gsap.from('.feature-card', {
            scrollTrigger: {
                trigger: '.features-grid',
                start: 'top 80%'
            },
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8
        });
        
        // Feature icon animations
        gsap.set('.feature-icon svg', { strokeDasharray: 100, strokeDashoffset: 100 });
        gsap.to('.feature-icon svg', {
            scrollTrigger: {
                trigger: '.features-grid',
                start: 'top 70%'
            },
            strokeDashoffset: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: 'power2.out'
        });
    }
    
    // Partner logos animation
    gsap.from('.partner-logo', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.5
    });
}

// Animate brain visualization
function animateBrain() {
    // Brain nodes animation
    gsap.set(brainNodes, { 
        opacity: 0,
        scale: 0
    });
    
    gsap.to(brainNodes, {
        opacity: 0.7,
        scale: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'back.out(1.7)',
        onComplete: () => {
            // Start pulse animation
            brainNodes.forEach(node => {
                node.style.animation = 'pulse 3s infinite alternate';
            });
        }
    });
    
    // Brain connections animation
    gsap.set(brainConnections, {
        strokeDasharray: 200,
        strokeDashoffset: 200,
        opacity: 0
    });
    
    gsap.to(brainConnections, {
        strokeDashoffset: 0,
        opacity: 0.6,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 1
    });
    
    // Add interactive hover effect
    const brain = document.querySelector('.ai-brain');
    
    brain.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = brain.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        gsap.to('.brain-svg', {
            rotationY: x * 10,
            rotationX: -y * 10,
            duration: 0.5
        });
    });
    
    brain.addEventListener('mouseleave', () => {
        gsap.to('.brain-svg', {
            rotationY: 0,
            rotationX: 0,
            duration: 1
        });
    });
}

// Feature hover animations
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.feature-icon');
        
        gsap.to(icon, {
            backgroundColor: 'rgba(139, 92, 246, 0.2)',
            scale: 1.1,
            duration: 0.3
        });
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.feature-icon');
        
        gsap.to(icon, {
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            scale: 1,
            duration: 0.3
        });
    });
}); 