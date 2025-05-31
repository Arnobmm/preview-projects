// DOM Elements
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const modelContainer = document.getElementById('model-container');

// Initialize Three.js elements
let scene, camera, renderer, cube, sphere, torus;
let mouseX = 0, mouseY = 0;

// On page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js scene
    initThreeJS();
    
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
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            nav.classList.remove('active');
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Track mouse movement for parallax effects
    document.addEventListener('mousemove', onMouseMove);
});

// Initialize Three.js scene
function initThreeJS() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, modelContainer.clientWidth / modelContainer.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    modelContainer.appendChild(renderer.domElement);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0x4f46e5, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Add point light
    const pointLight = new THREE.PointLight(0x06b6d4, 1);
    pointLight.position.set(-5, 3, 2);
    scene.add(pointLight);
    
    // Create shapes
    createShapes();
    
    // Start animation loop
    animate();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

// Create 3D shapes for the scene
function createShapes() {
    // Create a cube
    const cubeGeometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const cubeMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x4f46e5,
        metalness: 0.1,
        roughness: 0.2,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = -1.5;
    scene.add(cube);
    
    // Create a sphere
    const sphereGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const sphereMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4,
        metalness: 0.1,
        roughness: 0.2,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    });
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = 1.5;
    scene.add(sphere);
    
    // Create a torus
    const torusGeometry = new THREE.TorusGeometry(0.6, 0.2, 16, 100);
    const torusMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xf59e0b,
        metalness: 0.1,
        roughness: 0.2,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    });
    torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.y = 1.5;
    scene.add(torus);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate shapes
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    
    // Add subtle movement based on mouse position
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (- mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    // Render scene
    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = modelContainer.clientWidth / modelContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(modelContainer.clientWidth, modelContainer.clientHeight);
}

// Track mouse movement
function onMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = (event.clientY / window.innerHeight) * 2 - 1;
}

// Initialize GSAP animations
function initAnimations() {
    // Create a timeline for the hero section animations
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Animate hero section elements
    heroTimeline
        .from('header', { y: -100, opacity: 0, duration: 1 })
        .from('.hero-content h1', { y: 50, opacity: 0, duration: 1 }, '-=0.7')
        .from('.hero-content .tagline', { y: 30, opacity: 0, duration: 0.8 }, '-=0.7')
        .from('.cta-buttons', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6');
    
    // Create scroll-triggered animations
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate about section
        gsap.from('.about .glass-card', {
            scrollTrigger: {
                trigger: '.about',
                start: 'top 70%',
                end: 'top 30%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8
        });
        
        // Animate skills
        gsap.from('.skills .skill', {
            scrollTrigger: {
                trigger: '.skills',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            width: 0,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8
        });
        
        // Animate project cards
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '.projects',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8
        });
        
        // Animate contact section
        gsap.from('.contact .glass-card', {
            scrollTrigger: {
                trigger: '.contact',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8
        });
    }
    
    // Animate skill progress bars
    gsap.to('.skill-progress', {
        width: function() {
            return this.getAttribute('style').split('width: ')[1];
        },
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.5
    });
} 