// Lottie animations initialization
import lottie from 'lottie-web';

document.addEventListener('DOMContentLoaded', () => {
    initializeLottieAnimations();
});

function initializeLottieAnimations() {
    // Hero animation
    lottie.loadAnimation({
        container: document.querySelector('.hero-animation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/animations/hero-animation.json'
    });

    // Services section animations
    const serviceAnimations = document.querySelectorAll('.service-animation');
    serviceAnimations.forEach((animation, index) => {
        lottie.loadAnimation({
            container: animation,
            renderer: 'svg',
            loop: true,
            autoplay: false,
            path: `assets/animations/service-${index + 1}.json`
        });
    });

    // Add scroll reveal for service animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animation = entry.target.querySelector('.service-animation');
                if (animation && animation.lottie) {
                    animation.lottie.play();
                }
            }
        });
    }, {
        threshold: 0.5
    });

    serviceAnimations.forEach(animation => observer.observe(animation));
}
