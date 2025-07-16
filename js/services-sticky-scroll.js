// Sticky Scroll Animation for ALTREXIS Services Section
// (IntersectionObserver + scroll fallback)

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section');
    const textContents = document.querySelectorAll('.text-content');
    
    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionIndex = entry.target.getAttribute('data-section');
                // Remove active class from all sections and text content
                sections.forEach(section => section.classList.remove('active'));
                textContents.forEach(text => text.classList.remove('active'));
                // Add active class to current section
                entry.target.classList.add('active');
                // Add active class to corresponding text content
                const correspondingText = document.querySelector(`[data-text="${sectionIndex}"]`);
                if (correspondingText) {
                    correspondingText.classList.add('active');
                }
                // Add stagger effect to geometric objects
                const geometricObject = entry.target.querySelector('.geometric-object');
                if (geometricObject) {
                    setTimeout(() => {
                        geometricObject.style.transform = 'translateY(0) scale(1)';
                        geometricObject.style.opacity = '1';
                    }, 100);
                }
            }
        });
    }, observerOptions);

    // Observe each section
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Alternative scroll-based text switching (fallback)
    let currentActiveIndex = 0;
    function updateTextOnScroll() {
        const scrollContainer = document.querySelector('.scroll-container');
        if (!scrollContainer) return;
        const containerRect = scrollContainer.getBoundingClientRect();
        const containerTop = containerRect.top + window.scrollY;
        const sectionHeight = window.innerHeight;
        // === Scroll speed multiplier (1 = default, <1 = faster, >1 = slower) ===
        const scrollSpeedMultiplier = 1; // 1 = 1:1 scroll-to-section ratio
        // Calculate scroll progress within the container
        const scrollY = window.scrollY;
        const relativeScroll = scrollY - containerTop;
        // Clamp to valid range
        const minScroll = 0;
        const maxScroll = sectionHeight * (sections.length - 1);
        const clampedScroll = Math.max(minScroll, Math.min(maxScroll, relativeScroll));
        const newActiveIndex = Math.round(clampedScroll / (sectionHeight * scrollSpeedMultiplier));
        const clampedIndex = Math.max(0, Math.min(sections.length - 1, newActiveIndex));
        if (clampedIndex !== currentActiveIndex) {
            currentActiveIndex = clampedIndex;
            textContents.forEach((text, index) => {
                if (index === currentActiveIndex) text.classList.add('active');
                else text.classList.remove('active');
            });
            sections.forEach((section, index) => {
                if (index === currentActiveIndex) section.classList.add('active');
                else section.classList.remove('active');
            });
        }
    }

    // Parallax and scroll effects for objects
    let ticking = false;
    function updateScrollEffects() {
        updateTextOnScroll();
        const windowHeight = window.innerHeight;
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));
            const geometricObject = section.querySelector('.geometric-object');
            if (geometricObject) {
                const translateY = (1 - progress) * 30;
                geometricObject.style.transform = `translateY(${translateY}px) scale(${0.9 + progress * 0.1})`;
            }
        });
        ticking = false;
    }
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    window.addEventListener('scroll', onScroll);

    // Initialize first section and text
    if (sections.length > 0) {
        sections[0].classList.add('active');
        textContents[0].classList.add('active');
    }

    // Add hover effects for geometric objects
    sections.forEach(section => {
        const geometricObject = section.querySelector('.geometric-object');
        if (geometricObject) {
            section.addEventListener('mouseenter', () => {
                geometricObject.style.transform = 'translateY(-10px) scale(1.1)';
                geometricObject.style.transition = 'all 0.3s ease';
            });
            section.addEventListener('mouseleave', () => {
                geometricObject.style.transform = 'translateY(0) scale(1)';
            });
        }
    });
});
