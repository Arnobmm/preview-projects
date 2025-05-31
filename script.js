// DOM Elements
const header = document.querySelector('header');
const projectCards = document.querySelectorAll('.project-card');
const scrollIndicator = document.querySelector('.scroll-indicator');

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    gsap.from('.hero h1', {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: 'power4.out',
        stagger: 0.2
    });
    
    gsap.from('.hero .subtitle', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.5
    });

    // About section animations
    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.tech-item', {
        scrollTrigger: {
            trigger: '.tech-stack',
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Project cards animations
    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects',
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Animate tech stack items on hover
    document.querySelectorAll('.tech-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                duration: 0.3,
                y: -5,
                scale: 1.05,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                duration: 0.3,
                y: 0,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });

    // Animate project cards on hover
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                duration: 0.3,
                y: -10,
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.3,
                y: 0,
                scale: 1,
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                ease: 'power2.out'
            });
        });
    });

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
});

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