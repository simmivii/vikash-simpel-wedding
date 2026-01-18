// Wedding Countdown
const weddingDate = new Date("April 25, 2026 18:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById("timer").innerHTML =
        `${d} Days ${h} Hours ${m} Minutes ${s} Seconds`;
}, 1000);

// Music Control - Multiple Methods
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('backgroundMusic');
    let musicStarted = false;
    
    // Set volume
    audio.volume = 0.4;
    
    // Method 1: Try to play immediately
    function tryPlayMusic() {
        if (musicStarted) return;
        
        audio.play().then(() => {
            console.log('🎵 Music playing!');
            musicStarted = true;
        }).catch(() => {
            // If autoplay fails, try other methods
            console.log('Autoplay blocked, waiting for user interaction...');
        });
    }
    
    // Method 2: Play on any user interaction
    function playOnInteraction() {
        if (musicStarted) return;
        
        audio.play().then(() => {
            console.log('🎵 Music started on interaction!');
            musicStarted = true;
        }).catch(console.log);
    }
    
    // Method 3: Use Intersection Observer to detect when user scrolls
    function setupScrollDetection() {
        const observer = new IntersectionObserver((entries) => {
            if (!musicStarted) {
                playOnInteraction();
            }
        });
        
        // Observe the countdown section
        const countdown = document.querySelector('.countdown');
        if (countdown) {
            observer.observe(countdown);
        }
    }
    
    // Try immediate play
    tryPlayMusic();
    
    // Set up scroll detection
    setupScrollDetection();
    
    // Fallback event listeners
    ['click', 'scroll', 'touchstart', 'mousemove', 'keydown'].forEach(event => {
        document.addEventListener(event, playOnInteraction, { once: true });
    });
    
    // Force play after any delay
    setTimeout(() => {
        if (!musicStarted) {
            tryPlayMusic();
        }
    }, 1000);
});
