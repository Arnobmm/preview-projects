// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const themeToggle = document.querySelector('.theme-toggle');

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle.js
    initParticles();
    
    // Initialize Charts
    initCharts();
    
    // Initialize animations
    initAnimations();
    
    // Event Listeners
    menuToggle.addEventListener('click', toggleSidebar);
    themeToggle.addEventListener('click', toggleTheme);
    
    // Initialize Analytics
    initAnalytics();
    
    // Simulate realtime data updates
    startRealtimeUpdates();
});

// Toggle sidebar on mobile
function toggleSidebar() {
    sidebar.classList.toggle('active');
}

// Toggle between dark and light theme
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    
    // Change icon based on theme
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('light-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Initialize particle.js
function initParticles() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#05d9e8"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ff2a6d",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}

// Initialize Charts
function initCharts() {
    // Network Activity Chart
    const networkChartCtx = document.getElementById('networkChart').getContext('2d');
    
    // Create gradient for chart background
    const gradientFill = networkChartCtx.createLinearGradient(0, 0, 0, 350);
    gradientFill.addColorStop(0, 'rgba(255, 42, 109, 0.6)');
    gradientFill.addColorStop(0.5, 'rgba(255, 42, 109, 0.2)');
    gradientFill.addColorStop(1, 'rgba(255, 42, 109, 0)');
    
    const networkChart = new Chart(networkChartCtx, {
        type: 'line',
        data: {
            labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
            datasets: [{
                label: 'Network Traffic',
                data: [42, 65, 38, 95, 72, 52, 90, 55, 78],
                borderColor: '#ff2a6d',
                borderWidth: 3,
                pointBackgroundColor: '#05d9e8',
                pointBorderColor: '#05d9e8',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
                backgroundColor: gradientFill,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            }
        }
    });
    
    // Store chart as global for updates
    window.networkChart = networkChart;
}

// Initialize GSAP animations
function initAnimations() {
    // Create timeline for initial animations
    const tl = gsap.timeline({
        onComplete: () => {
            // Re-enable all buttons after animation completes
            document.querySelectorAll('button, .btn').forEach(btn => {
                btn.style.pointerEvents = 'auto';
            });
        }
    });

    // Ensure buttons are clickable during animations
    document.querySelectorAll('button, .btn').forEach(btn => {
        btn.style.pointerEvents = 'auto';
    });

    // Add your animations here
    tl.from('.sidebar', {
        x: -100,
        opacity: 0,
        duration: 0.5
    })
    .from('.main-content > *', {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1
    }, '-=0.3');
}

// Animate the CPU usage circle
function animateUsageCircle(percent) {
    const circle = document.querySelector('.usage-circle-progress');
    const circumference = 283; // 2 * Math.PI * 45 (circle radius)
    const offset = circumference - (percent / 100 * circumference);
    
    gsap.to(circle, {
        strokeDashoffset: offset,
        duration: 1.5,
        ease: 'power2.out'
    });
}

// Simulate realtime data updates
function startRealtimeUpdates() {
    // Update network chart data
    setInterval(() => {
        if (window.networkChart) {
            // Generate new data point
            const newData = Math.floor(Math.random() * 50) + 50;
            
            // Remove first data point and add new one
            window.networkChart.data.datasets[0].data.shift();
            window.networkChart.data.datasets[0].data.push(newData);
            
            // Update chart
            window.networkChart.update();
        }
    }, 5000);
    
    // Update CPU usage randomly
    setInterval(() => {
        const newPercent = Math.floor(Math.random() * 30) + 55; // 55-85% range
        document.querySelector('.percentage').textContent = `${newPercent}%`;
        animateUsageCircle(newPercent);
    }, 8000);
    
    // Update memory progress bars
    setInterval(() => {
        const memoryItems = document.querySelectorAll('.memory-item');
        
        memoryItems.forEach(item => {
            const progressBar = item.querySelector('.progress');
            const percentText = item.querySelector('span:last-child');
            
            // Generate new percentage
            const newPercent = Math.floor(Math.random() * 40) + 40; // 40-80% range
            
            // Update elements
            gsap.to(progressBar, {
                width: `${newPercent}%`,
                duration: 1,
                ease: 'power2.out'
            });
            
            percentText.textContent = `${newPercent}%`;
        });
    }, 10000);
}

// Initialize Analytics
function initAnalytics() {
    const analyticsChart = document.getElementById('analyticsChart').getContext('2d');
    
    const gradientFill = analyticsChart.createLinearGradient(0, 0, 0, 350);
    gradientFill.addColorStop(0, 'rgba(16, 185, 129, 0.6)');
    gradientFill.addColorStop(0.5, 'rgba(16, 185, 129, 0.2)');
    gradientFill.addColorStop(1, 'rgba(16, 185, 129, 0)');
    
    window.analyticsChart = new Chart(analyticsChart, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'User Engagement',
                data: [65, 78, 90, 85, 95, 110, 125, 130, 120, 140, 150, 160],
                borderColor: '#10b981',
                borderWidth: 3,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#10b981',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
                backgroundColor: gradientFill,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            }
        }
    });
}