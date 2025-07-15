// Slide up on scroll for team carousel section
document.addEventListener('DOMContentLoaded', function () {
  const section = document.getElementById('team-carousel-section');
  if (!section) return;
  const title = section.querySelector('.team-carousel-title');
  const cards = section.querySelectorAll('.team-carousel-card');
  const elements = [title, ...cards];

  function revealOnScroll() {
    const sectionRect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    // Reveal when section is entering viewport by at least 80px
    if (sectionRect.top < windowHeight - 80) {
      elements.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('slide-up-in-view');
        }, i * 120);
      });
      window.removeEventListener('scroll', revealOnScroll);
    }
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
});
