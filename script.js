// DOM Elements
const header = document.querySelector('header');
const projectCards = document.querySelectorAll('.project-card');
const scrollIndicator = document.querySelector('.scroll-indicator');

// On page load animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP animations
    initAnimations();
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Project cards hover effects
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { 
                y: -10, 
                scale: 1.02, 
                boxShadow: '0 20px 30px rgba(0, 0, 0, 0.3)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { 
                y: 0, 
                scale: 1, 
                boxShadow: '0 15px 25px rgba(0, 0, 0, 0.2)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
});

// Initialize GSAP animations
function initAnimations() {
    // Create a timeline for the hero section animations
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Animate hero section elements
    heroTimeline
        .from('header', { y: -100, opacity: 0, duration: 1 })
        .from('.hero h1', { y: 50, opacity: 0, duration: 1 }, '-=0.5')
        .from('.hero .subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.7')
        .from(scrollIndicator, { y: 20, opacity: 0, duration: 0.8 }, '-=0.5');
    
    // Create scroll-triggered animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate heading in projects section
    gsap.from('.projects h2', {
        scrollTrigger: {
            trigger: '.projects',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8
    });
    
    // Animate project cards
    gsap.from(projectCards, {
        scrollTrigger: {
            trigger: '.project-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8
    });
    
    // Animate contact section
    gsap.from('.contact h2', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8
    });
    
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
    });
    
    gsap.from('.social-links a', {
        scrollTrigger: {
            trigger: '.social-links',
            start: 'top 90%',
            toggleActions: 'play none none none'
        },
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5
    });
}

// Add mousemove effect to the hero section
const hero = document.querySelector('.hero');
hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 20;
    const yPos = (clientY / window.innerHeight - 0.5) * 20;
    
    gsap.to('.hero h1', {
        x: xPos * 0.5,
        y: yPos * 0.5,
        duration: 1,
        ease: 'power2.out'
    });
    
    gsap.to('.subtitle', {
        x: xPos * 0.3,
        y: yPos * 0.3,
        duration: 1,
        ease: 'power2.out'
    });
}); 