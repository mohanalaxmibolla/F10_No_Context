/* =================================================
   ESOPHAGUS & STOMACH JAVASCRIPT - oesophagus.js
   ================================================= */

// Stage switching
function showStage(stageNum) {
    // Hide all panels
    const panels = document.querySelectorAll('.stage-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    
    // Show selected stage
    const stage = document.getElementById('stage' + stageNum);
    if (stage) {
        stage.classList.add('active');
        playSound('click');
    }
    
    // Update tab buttons
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    // Scroll to content
    scrollToElement(document.querySelector('.stage-content'));
}

// Replay esophagus animation
function replayEsophagusAnimation() {
    const foodBall = document.getElementById('foodBall');
    if (foodBall) {
        // Reset animation
        foodBall.style.animation = 'none';
        setTimeout(() => {
            foodBall.style.animation = '';
        }, 10);
        
        playSound('success');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔻🫙 Esophagus & Stomach stage loaded');
    
    // Set first tab as active
    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) {
        firstTab.classList.add('active');
    }
});
