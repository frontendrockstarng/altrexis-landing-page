// GSAP animations for ALTREXIS landing page
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
});

function initializeAnimations() {
    // Hero section animation
    gsap.from('.hero-content', {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Project cards animation
    gsap.from('.project-card', {
        duration: 0.8,
        opacity: 0,
        y: 50,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.portfolio-section',
            start: 'top center',
            end: 'bottom center',
            once: true
        }
    });

    // Navigation animation
    gsap.from('.nav-links li', {
        duration: 0.5,
        opacity: 0,
        x: -20,
        stagger: 0.1,
        ease: 'power2.out'
    });
}
