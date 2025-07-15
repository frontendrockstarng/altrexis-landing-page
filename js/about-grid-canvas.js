// Animated perspective grid for the About section background
(function() {
  const canvas = document.getElementById('aboutGridCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let animationId;
  let time = 0;
  let offsetY = 0;

  function resizeCanvas() {
    // Make canvas fill its parent (about-section)
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function drawPerspectiveGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const vanishingY = centerY - 250;

    // Brighter white gradient for grid lines
    const gradient = ctx.createLinearGradient(0, canvas.height, 0, vanishingY);
    gradient.addColorStop(0, 'rgba(255,255,255,0.9)');
    gradient.addColorStop(0.3, 'rgba(220,220,220,0.7)');
    gradient.addColorStop(0.7, 'rgba(180,180,180,0.5)');
    gradient.addColorStop(1, 'rgba(120,120,120,0.2)');
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1;

    // Draw horizontal lines (receding toward vanishing point)
    const numHorizontalLines = 18;
    for (let i = 0; i < numHorizontalLines; i++) {
      const progress = i / numHorizontalLines;
      const spacing = canvas.height / numHorizontalLines;
      const y = canvas.height - (progress * (canvas.height - vanishingY)) + (offsetY * 40) % spacing;
      const scale = 1 - (progress * 0.8);
      const width = canvas.width * scale;
      const x1 = centerX - width / 2;
      const x2 = centerX + width / 2;
      const opacity = 0.4 + (1 - progress) * 0.6;
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.stroke();
    }

    // Draw vertical lines (converging to vanishing point)
    const numVerticalLines = 20;
    for (let i = -numVerticalLines/2; i <= numVerticalLines/2; i++) {
      if (i === 0) continue;
      const baseX = centerX + (i * 60);
      const vanishingX = centerX + (i * 8);
      const opacity = Math.max(0.2, 1 - Math.abs(i) / (numVerticalLines/2));
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.moveTo(baseX, canvas.height);
      ctx.lineTo(vanishingX, vanishingY);
      ctx.stroke();
    }

    // Subtle glow at vanishing point
    const pulseIntensity = 0.2 + 0.1 * Math.sin(time * 0.03);
    ctx.globalAlpha = pulseIntensity;
    const glowGradient = ctx.createRadialGradient(centerX, vanishingY, 0, centerX, vanishingY, 120);
    glowGradient.addColorStop(0, 'rgba(255,255,255,0.4)');
    glowGradient.addColorStop(0.5, 'rgba(200,200,200,0.2)');
    glowGradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = glowGradient;
    ctx.fillRect(centerX - 120, vanishingY - 120, 240, 240);
    ctx.globalAlpha = 1;
  }

  function animate() {
    time++;
    offsetY += 0.025;
    // Subtle camera movement
    const shakeX = Math.sin(time * 0.008) * 1;
    const shakeY = Math.cos(time * 0.012) * 0.5;
    ctx.save();
    ctx.translate(shakeX, shakeY);
    drawPerspectiveGrid();
    ctx.restore();
    animationId = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  animate();
  window.addEventListener('beforeunload', () => {
    if (animationId) cancelAnimationFrame(animationId);
  });
})();
