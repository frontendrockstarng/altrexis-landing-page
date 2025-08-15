// Lottie scroll observer for sticky fade section
// Observe all .scroll-lottie elements and play/pause on scroll
// Requires dotlottie-player to be loaded in <head>
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.scroll-lottie').forEach(lottiePlayer => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          lottiePlayer.play();
        } else {
          lottiePlayer.stop();
        }
      });
    }, {
      threshold: 1 // 50% of element must be visible
    });
    observer.observe(lottiePlayer);
  });
});
