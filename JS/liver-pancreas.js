/* =================================================
   LIVER & PANCREAS JAVASCRIPT - liver-pancreas.js
   ================================================= */

// Stage switching
function showStage(stageKey) {
    // Hide all panels
    const panels = document.querySelectorAll('.stage-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    
    // Show selected stage
    const stage = document.getElementById(stageKey);
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🫘🔴 Liver & Pancreas stage loaded');
    
    // Set first tab as active
    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) {
        firstTab.classList.add('active');
    }
});
