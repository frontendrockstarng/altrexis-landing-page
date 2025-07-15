// Team Carousel: endless auto-scrolling carousel with hover speed control
// Usage: Place <script src="js/team-carousel.js"></script> after the carousel HTML

document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.team-carousel-track');
  if (!carousel) return;

  const cards = Array.from(carousel.children);
  const cardCount = cards.length;
  let scrollSpeed = 1.2; // px/frame
  let animationId;

  // Duplicate cards for seamless infinite effect
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.add('clone');
    carousel.appendChild(clone);
  });

  // Set width for seamless loop
  function getTrackWidth() {
    return Array.from(carousel.children).reduce((acc, el) => acc + el.offsetWidth, 0);
  }

  let offset = 0;
  function animate() {
    offset += scrollSpeed;
    if (offset >= getTrackWidth() / 2) {
      offset = 0;
    }
    carousel.style.transform = `translateX(${-offset}px)`;
    animationId = requestAnimationFrame(animate);
  }
  animate();

  carousel.addEventListener('mouseenter', () => {
    scrollSpeed = 0.35;
  });
  carousel.addEventListener('mouseleave', () => {
    scrollSpeed = 1.2;
  });

  // Responsive: recalc on resize
  window.addEventListener('resize', () => {
    offset = 0;
    carousel.style.transform = 'translateX(0)';
  });
});
