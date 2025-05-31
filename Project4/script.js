// Futuristic Gaming Portal Animations & Interactivity

document.addEventListener('DOMContentLoaded', () => {
    // GSAP Hero Entrance with enhanced animations
    const heroTl = gsap.timeline();
    heroTl.from('.hero-content h1', { 
        duration: 1.2,
        y: 100,
        opacity: 0,
        ease: 'power4.out',
        stagger: 0.2
    })
    .from('.hero-content p', {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: 'power3.out'
    }, '-=0.8')
    .from('.hero-buttons .btn', {
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'back.out(1.7)'
    }, '-=0.6')
    .from('.hero-stats .stat', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.4');

    // Parallax effect on hero image
    document.querySelector('.hero').addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;
        
        gsap.to('.hero-image', {
            x: xPos,
            y: yPos,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Enhanced Game Cards Animation
    gsap.from('.game-card', {
        scrollTrigger: {
            trigger: '.featured',
            start: 'top 80%',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Game Card Hover Effects
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -15,
                rotationX: 5,
                duration: 0.4,
                ease: 'power2.out'
            });
            gsap.to(card.querySelector('img'), {
                scale: 1.1,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                rotationX: 0,
                duration: 0.4,
                ease: 'power2.out'
            });
            gsap.to(card.querySelector('img'), {
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });

    // Enhanced Tournament Cards Animation
    gsap.from('.tournament-card', {
        scrollTrigger: {
            trigger: '.tournaments',
            start: 'top 80%',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Tournament Card Hover Effects
    document.querySelectorAll('.tournament-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                boxShadow: '0 0 30px rgba(99, 102, 241, 0.4)',
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: 'none',
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Button Hover Effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                y: -3,
                duration: 0.2,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                y: 0,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });

    // News Cards Animation
    gsap.from('.news-item', {
        scrollTrigger: {
            trigger: '.news',
            start: 'top 80%'
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7
    });

    // Join Community Animation
    gsap.from('.join-content', {
        scrollTrigger: {
            trigger: '.join-community',
            start: 'top 80%'
        },
        x: -60,
        opacity: 0,
        duration: 0.8
    });
    gsap.from('.join-image', {
        scrollTrigger: {
            trigger: '.join-community',
            start: 'top 80%'
        },
        x: 60,
        opacity: 0,
        duration: 0.8,
        delay: 0.2
    });

    // Responsive Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const headerContent = document.querySelector('.header-content');
    const nav = headerContent.querySelector('nav ul');
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    // Close menu on scroll
    window.addEventListener('scroll', () => {
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Animate stats numbers (hero & join)
    animateStatNumbers('.hero-stats .stat-value');
    animateStatNumbers('.join-stat-value');
});

// Animate numbers for stats
function animateStatNumbers(selector) {
    document.querySelectorAll(selector).forEach(el => {
        const text = el.textContent.replace(/[^\d]/g, '');
        if (!text) return;
        const end = parseInt(text, 10);
        gsap.fromTo(el, { innerText: 0 }, {
            innerText: end,
            duration: 1.5,
            ease: 'power1.out',
            snap: { innerText: 1 },
            onUpdate: function () {
                el.textContent = Math.floor(el.innerText).toLocaleString() + (el.textContent.replace(/\d|,/g, ''));
            }
        });
    });
}

// GSAP ScrollTrigger registration
if (typeof gsap !== 'undefined' && typeof ScrollTrigger === 'undefined') {
    gsap.registerPlugin = function(){};
}
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
} 