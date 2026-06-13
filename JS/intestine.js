/* =================================================
   SMALL & LARGE INTESTINE JAVASCRIPT - intestine.js
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

// Show villus information
function showVillusInfo() {
    const infoBox = document.getElementById('villusInfo');
    if (infoBox) {
        infoBox.classList.remove('hidden');
        playSound('click');
        setTimeout(() => {
            infoBox.classList.add('hidden');
        }, 5000);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌊🚀 Intestine stage loaded');
    
    // Set first tab as active
    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) {
        firstTab.classList.add('active');
    }
    
    // Add click animation to villi
    const villi = document.querySelectorAll('.villus');
    villi.forEach(villus => {
        villus.addEventListener('click', function() {
            showVillusInfo();
        });
    });
});
