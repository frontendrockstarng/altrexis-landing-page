// Main JavaScript file for ALTREXIS landing page

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initializeComponents();
    
    // Add event listeners
    setupEventListeners();
    
    // Overlay menu logic
    setupOverlayMenu();

    // Staggered fade-in for hero elements
    const heroEls = document.querySelectorAll('.fade-in');
    heroEls.forEach((el, idx) => {
        setTimeout(() => {
            el.classList.add('show');
        }, 200 + idx * 200);
    });

    // --- Team Card Horizontal Scroll Animation ---
    const teamSection = document.querySelector('.team-scroll-section');
    const teamOuter = document.querySelector('.team-scroll-outer');
    const teamContainer = document.querySelector('.team-scroll-container');
    const teamCards = document.querySelectorAll('.team-card');
    if (teamSection && teamCards.length > 0 && teamOuter && teamContainer) {
      // Hide scrollbars
      teamOuter.classList.add('no-scrollbar');
      // Set up observer for each card
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      }, {
        root: teamOuter,
        threshold: 0.5,
        rootMargin: '0px'
      });
      teamCards.forEach(card => observer.observe(card));

      // --- Sticky vertical-to-horizontal scroll ---
      function setTeamSectionHeight() {
        const cardCount = teamCards.length;
        const cardWidth = teamCards[0].offsetWidth + 32;
        const visibleCards = 3;
        const scrollLength = cardWidth * (cardCount - visibleCards);
        // Height = heading + sticky horizontal scroll
        const heading = teamSection.querySelector('.team-scroll-title');
        const headingHeight = heading ? heading.offsetHeight + 48 : 80;
        teamSection.style.height = (scrollLength + window.innerHeight * 0.7 + headingHeight) + 'px';
        return scrollLength;
      }
      let scrollLength = setTeamSectionHeight();
      function updateHorizontalScroll() {
        const outerRect = teamOuter.getBoundingClientRect();
        const stickyTop = outerRect.top + window.scrollY;
        const stickyBottom = stickyTop + teamOuter.offsetHeight - window.innerHeight;
        const scrollY = window.scrollY;
        let progress = (scrollY - stickyTop) / (stickyBottom - stickyTop);
        progress = Math.max(0, Math.min(1, progress));
        const translateX = -scrollLength * progress;
        teamContainer.style.transform = `translateX(${translateX}px)`;
      }
      function onScroll() {
        requestAnimationFrame(updateHorizontalScroll);
      }
      function onResize() {
        scrollLength = setTeamSectionHeight();
        updateHorizontalScroll();
      }
      window.addEventListener('scroll', onScroll);
      window.addEventListener('resize', onResize);
      onResize();
      // Enable horizontal scroll with mouse wheel (carousel-like)
      teamOuter.addEventListener('wheel', function(e) {
        if (e.deltaY !== 0) {
          e.preventDefault();
          this.scrollLeft += e.deltaY;
        }
      }, { passive: false });
    }
});

// Component initialization function
function initializeComponents() {
    // Inject header and footer from components if present
    fetch('components/header.html')
      .then(res => res.text())
      .then(html => {
        const header = document.querySelector('#header');
        if (header) header.innerHTML = html;
        setupOverlayMenu(); // re-bind overlay after injection
      });
    fetch('components/footer.html')
      .then(res => res.text())
      .then(html => {
        const footer = document.querySelector('#footer');
        if (footer) footer.innerHTML = html;
      });
}

// Event listener setup
function setupEventListeners() {
    // Add your event listeners here
}

// Header component HTML (legacy fallback)
function getHeaderHTML() {
    return `
        <header class="site-header">
            <nav class="main-nav">
                <div class="logo">ALTREXIS</div>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#portfolio">Portfolio</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    `;
}

function setupOverlayMenu() {
    const hamburger = document.querySelector('#hamburger-btn');
    const overlay = document.querySelector('#overlay-menu');
    const closeBtn = document.querySelector('#close-overlay');

    if (hamburger && overlay) {
        hamburger.addEventListener('click', () => {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    if (closeBtn && overlay) {
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    // Close overlay on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Footer component HTML (legacy fallback)
function getFooterHTML() {
    return `
        <footer class="site-footer">
            <div class="footer-content">
                <div class="footer-logo">ALTREXIS</div>
                <div class="footer-links">
                    <a href="#privacy">Privacy Policy</a>
                    <a href="#terms">Terms of Service</a>
                </div>
                <div class="copyright"> ${new Date().getFullYear()} ALTREXIS. All rights reserved.</div>
            </div>
        </footer>
    `;
}
