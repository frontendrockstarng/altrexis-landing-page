// Custom cursor with small dot and larger circular stroke
// Add <script src="js/custom-cursor.js"></script> before </body> in your HTML

document.addEventListener('DOMContentLoaded', function () {
    // Create cursor elements
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');

    cursorDot.id = 'cursor-dot';
    cursorOutline.id = 'cursor-outline';

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    // Cursor position state
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let outlineX = mouseX, outlineY = mouseY;

    // Move the dot instantly, outline with lag
    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.18;
        outlineY += (mouseY - outlineY) * 0.18;
        cursorOutline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0)`;
        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Hide cursor on mouse leave
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });

    // Hide default cursor
    document.body.style.cursor = 'none';
});
