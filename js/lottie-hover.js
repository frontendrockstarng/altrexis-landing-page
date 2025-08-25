// // Wait for both DOM and Lottie to be ready
// document.addEventListener('DOMContentLoaded', function() {
//     // Function to initialize Lottie players
//     function initLottiePlayers() {
//         // Get all Lottie players
//         const lottiePlayers = document.querySelectorAll('.scroll-lottie, dotlottie-player');
        
//         lottiePlayers.forEach(player => {
//             try {
//                 // Set initial state (paused at first frame)
//                 if (player.setLooping) player.setLooping(false);
//                 if (player.stop) player.stop();
//                 if (player.setSpeed) player.setSpeed(1);
                
//                 // Ensure the player is visible by default
//                 player.style.opacity = '1';
                
//                 // Add hover effect to the parent container
//                 const container = player.closest('.sticky-fade-object, .lottie-object');
//                 if (container) {
//                     // Make sure container is visible
//                     container.style.opacity = '1';
//                     container.style.pointerEvents = 'auto';
                    
//                     // Add hover effect
//                     container.addEventListener('mouseenter', () => {
//                         if (player.play) {
//                             if (player.setLooping) player.setLooping(true);
//                             player.play();
//                         }
//                     });
                    
//                     container.addEventListener('mouseleave', () => {
//                         if (player.stop) {
//                             player.stop();
//                             if (player.setLooping) player.setLooping(false);
//                         }
//                     });
//                 }
//             } catch (error) {
//                 console.error('Error initializing Lottie player:', error);
//             }
//         });
//     }
    
//     // Initialize immediately if Lottie is already loaded
//     if (window.lottie || window.dotLottie) {
//         initLottiePlayers();
//     } else {
//         // Wait for Lottie to load if it's not available yet
//         const checkLottie = setInterval(() => {
//             if (window.lottie || window.dotLottie) {
//                 clearInterval(checkLottie);
//                 initLottiePlayers();
//             }
//         }, 100);
//     }
// });
