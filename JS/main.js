/* =================================================
   MAIN JAVASCRIPT - Global Functions & Initialization
   ================================================= */

// Audio settings (global)
let musicEnabled = true;
let sfxEnabled = true;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set up music and SFX toggles if they exist
    const musicToggle = document.getElementById('musicToggle');
    const sfxToggle = document.getElementById('sfxToggle');
    
    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }
    
    if (sfxToggle) {
        sfxToggle.addEventListener('click', toggleSFX);
    }
    
    // Log initialization
    console.log('🫀 Digestive System Simulation initialized!');
});

// Toggle background music
function toggleMusic() {
    musicEnabled = !musicEnabled;
    const musicToggle = document.getElementById('musicToggle');
    
    if (musicEnabled) {
        musicToggle.textContent = '🔊 Music';
        musicToggle.style.opacity = '1';
    } else {
        musicToggle.textContent = '🔇 Music';
        musicToggle.style.opacity = '0.5';
    }
}

// Toggle sound effects
function toggleSFX() {
    sfxEnabled = !sfxEnabled;
    const sfxToggle = document.getElementById('sfxToggle');
    
    if (sfxEnabled) {
        sfxToggle.textContent = '🔔 SFX';
        sfxToggle.style.opacity = '1';
    } else {
        sfxToggle.textContent = '🔇 SFX';
        sfxToggle.style.opacity = '0.5';
    }
}

// Play sound effects
function playSound(soundType) {
    if (!sfxEnabled && soundType !== 'music') return;
    if (!musicEnabled && soundType === 'music') return;
    
    // Simulate sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        
        // Different frequencies for different sounds
        switch(soundType) {
            case 'click':
                oscillator.frequency.value = 800;
                gain.gain.setValueAtTime(0.1, audioContext.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
                break;
            case 'success':
                oscillator.frequency.value = 1200;
                gain.gain.setValueAtTime(0.1, audioContext.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.2);
                break;
            case 'error':
                oscillator.frequency.value = 300;
                gain.gain.setValueAtTime(0.1, audioContext.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.15);
                break;
        }
    } catch(e) {
        console.log('Sound effect would play: ' + soundType);
    }
}

// Scroll to element
function scrollToElement(element) {
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Accessibility: Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
    }
    
    if (event.code === 'Space') {
        if (event.target.tagName === 'BUTTON' || event.target.tagName === 'A') {
            event.preventDefault();
            event.target.click();
        }
    }
});

// Utility: Get random item from array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Utility: Shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Utility: Format percentage
function formatPercentage(current, total) {
    return Math.round((current / total) * 100) + '%';
}

// Console welcome message
console.log('%c🫀 Welcome to the Interactive Digestive System Simulation! 🫀', 
    'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cLearning Objectives:', 'color: #764ba2; font-weight: bold;');
console.log('%c✓ Understand digestion ✓ Learn organs ✓ Discover nutrition ✓ Test knowledge', 
    'color: #666; font-size: 12px;');
