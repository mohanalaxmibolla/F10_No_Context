// Mouth stage animation: runs automatically. Click the mouth to restart a chew cycle.
document.addEventListener('DOMContentLoaded', () => {
    const mouth = document.getElementById('mouthAnimation');
    const bolus = document.getElementById('foodBolus');

    if (!mouth || !bolus) return;

    mouth.addEventListener('click', () => {
        bolus.classList.remove('restart-chew');
        void bolus.offsetWidth;
        bolus.classList.add('restart-chew');
    });
});
