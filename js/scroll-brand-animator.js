// --- Scroll animation for ALTREXIS brand ---
const scrollingBrand = document.getElementById('scrollingBrand');
const logo = document.querySelector('.logo');
const siteHeader = document.querySelector('.site-header');

function updateBrandPosition() {
    const heroSection = document.querySelector('.hero-section');
    if (!scrollingBrand || !heroSection) return;
    
    const scrollY = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    const heroTop = heroSection.offsetTop;
    const scrollProgress = Math.min(Math.max((scrollY - heroTop) / heroHeight, 0), 1);

    // Always keep brand centered at bottom of hero section
    scrollingBrand.style.position = 'absolute';
    scrollingBrand.style.left = '50%';
    scrollingBrand.style.bottom = '20px';
    scrollingBrand.style.top = 'auto';
    scrollingBrand.style.transform = 'translateX(-50%)';
    scrollingBrand.style.opacity = (1 - scrollProgress).toString();
    scrollingBrand.style.zIndex = '-1';
}

// Use requestAnimationFrame for smoother animation
let ticking = false;
function handleScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateBrandPosition();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', updateBrandPosition);
document.addEventListener('DOMContentLoaded', updateBrandPosition);
window.addEventListener('load', updateBrandPosition);
