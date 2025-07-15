// Load the Lottie player script for the sticky fade section only
(function(){
  if (!window.customLottieLoaded) {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs';
    document.head.appendChild(script);
    window.customLottieLoaded = true;
  }
})();
