window.addEventListener('scroll', () => {
  const footer = document.getElementById('parallax-footer');
  const footerBrand = document.querySelector('.footer-brand-giant');
  const footerTop = footer.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  // Reveal when footer enters viewport by at least half its height
  if (footerTop < windowHeight - footer.offsetHeight / 2) {
    footer.classList.add('revealed');
    footerBrand.classList.add('animate');
  } else {
    footer.classList.remove('revealed');
    footerBrand.classList.remove('animate');
  }
});