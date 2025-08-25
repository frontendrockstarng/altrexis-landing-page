// Lottie animations initialization
import lottie from 'lottie-web';

document.addEventListener('DOMContentLoaded', () => {
    initializeLottieAnimations();
});

function initializeLottieAnimations() {
    // Hero animation
    const heroAnimation = document.querySelector('.hero-animation');
    if (heroAnimation) {
        lottie.loadAnimation({
            container: heroAnimation,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'assets/animations/hero-animation.json'
        });
    }

    // Services section animations - no scroll trigger, just initialize
    const serviceAnimations = document.querySelectorAll('.service-animation');
    serviceAnimations.forEach((animation, index) => {
        lottie.loadAnimation({
            container: animation,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: `assets/animations/service-${index + 1}.json`
        });
    });
}
