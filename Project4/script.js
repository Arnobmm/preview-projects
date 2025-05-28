// Futuristic Gaming Portal Animations & Interactivity

document.addEventListener('DOMContentLoaded', () => {
    // GSAP Hero Entrance
    gsap.from('.hero-content', { y: 60, opacity: 0, duration: 1, ease: 'power3.out' });
    gsap.from('.hero-image', { x: 80, opacity: 0, duration: 1.2, delay: 0.3, ease: 'power3.out' });
    gsap.from('.hero-buttons .btn', { scale: 0.8, opacity: 0, stagger: 0.15, duration: 0.6, delay: 0.7 });
    gsap.from('.hero-stats .stat', { y: 30, opacity: 0, stagger: 0.15, duration: 0.7, delay: 1 });

    // Featured Games Animation
    gsap.from('.game-card', {
        scrollTrigger: {
            trigger: '.featured',
            start: 'top 80%'
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7
    });

    // Tournament Cards Animation
    gsap.from('.tournament-card', {
        scrollTrigger: {
            trigger: '.tournaments',
            start: 'top 80%'
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7
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

    // Card Hover Effects
    document.querySelectorAll('.game-card, .tournament-card, .news-item').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { boxShadow: '0 0 32px 0 #00ffe1', scale: 1.03, duration: 0.3 });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { boxShadow: 'none', scale: 1, duration: 0.3 });
        });
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