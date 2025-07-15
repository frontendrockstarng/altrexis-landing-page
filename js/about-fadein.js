// Fade-in/ease-in animation for about section elements on scroll
// Usage: Add class 'about-fadein' to elements in the about section

document.addEventListener('DOMContentLoaded', function () {
  // About fade-in
  const fadeEls = document.querySelectorAll('.about-fadein');
  function onScrollFadeIn() {
    fadeEls.forEach(function(el, i) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('fadein-visible');
      }
    });
  }

  // Slide-up for .slide-up-fade
  const slideUpEls = document.querySelectorAll('.slide-up-fade');
  function onScrollSlideUp() {
    slideUpEls.forEach(function(el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('slide-up-visible');
      }
    });
  }

  window.addEventListener('scroll', () => {
    onScrollFadeIn();
    onScrollSlideUp();
  });
  onScrollFadeIn();
  onScrollSlideUp();
});
