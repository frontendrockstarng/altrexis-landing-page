// Animate a stack of 3 isometric block images (floating)
document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('hero-isometric-stack');
  if (!container) return;
  const blocks = Array.from(container.querySelectorAll('img.iso-block-img'));
  const baseOffsets = [44, 24, 0]; // match CSS top offsets
  const floatAmplitudes = [10, 12, 9];
  const floatSpeeds = [1.4, 1.1, 1.7];
  const phases = [0, Math.PI / 3, Math.PI / 1.2];

  function animate() {
    const t = performance.now() / 1000;
    blocks.forEach((img, i) => {
      const float = Math.sin(t * floatSpeeds[i] + phases[i]) * floatAmplitudes[i];
      img.style.transform = `translateX(-50%) translateY(${float}px)`;
      img.style.opacity = 1;
    });
    requestAnimationFrame(animate);
  }

  // Fade-in effect
  blocks.forEach((img, i) => {
    img.style.opacity = 0;
    img.style.transition = 'opacity 0.8s cubic-bezier(.4,.2,.2,1)';
    setTimeout(() => {
      img.style.opacity = 1;
    }, 200 + i * 180);
  });

  animate();
});
