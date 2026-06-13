/* =================================================
   QUIZ JAVASCRIPT - quiz.js
   Comprehensive Quiz System for Digestive System
   ================================================= */

// Quiz data - 10 questions
const quizQuestions = [
    {
        question: "What is the main function of saliva in the mouth?",
        options: [
            "To swallow food more easily",
            "To break down carbohydrates using enzymes like amylase",
            "To make food taste better",
            "To change the color of food"
        ],
        correct: 1,
        explanation: "Saliva contains enzymes, particularly salivary amylase, which begin breaking down carbohydrates. This is the start of chemical digestion."
    },
    {
        question: "What is the wave-like motion of the esophagus called?",
        options: [
            "Churning",
            "Emulsification",
            "Peristalsis",
            "Absorption"
        ],
        correct: 2,
        explanation: "Peristalsis is the rhythmic muscular contraction that moves food down the esophagus and through the entire digestive tract."
    },
    {
        question: "How long does it take for food to travel through the esophagus?",
        options: [
            "30 seconds",
            "5-8 seconds",
            "30 minutes",
            "2-3 hours"
        ],
        correct: 1,
        explanation: "Food travels quickly through the esophagus in about 5-8 seconds due to peristalsis. The esophagus is just a transport tube."
    },
    {
        question: "What is the name of the food ball that forms after chewing?",
        options: [
            "Bolus",
            "Chyme",
            "Stool",
            "Masticate"
        ],
        correct: 0,
        explanation: "A bolus is the ball-shaped mass of chewed food mixed with saliva. After the stomach processes it, it becomes chyme."
    },
    {
        question: "How long does food typically stay in your stomach?",
        options: [
            "5-10 minutes",
            "30 seconds to 1 minute",
            "2-4 hours",
            "8-12 hours"
        ],
        correct: 2,
        explanation: "Food spends 2-4 hours in the stomach, where it's churned and mixed with gastric juices for mechanical and chemical digestion."
    },
    {
        question: "What does the stomach produce that helps break down proteins?",
        options: [
            "Amylase",
            "Pepsin",
            "Bile",
            "Insulin"
        ],
        correct: 1,
        explanation: "Pepsin is an enzyme in the stomach that breaks down proteins. It works in the acidic environment created by hydrochloric acid."
    },
    {
        question: "What are the finger-like projections in the small intestine called?",
        options: [
            "Enzyme factories",
            "Villi",
            "Microvilli",
            "Intestinal glands"
        ],
        correct: 1,
        explanation: "Villi are tiny finger-like projections that line the small intestine and absorb nutrients. They have even smaller projections called microvilli."
    },
    {
        question: "How long is the small intestine?",
        options: [
            "3 feet",
            "10 feet",
            "20 feet",
            "30 feet"
        ],
        correct: 2,
        explanation: "The small intestine is about 20 feet (6 meters) long. Despite its name, it's where most nutrient absorption occurs."
    },
    {
        question: "What is the main function of the large intestine?",
        options: [
            "To digest proteins",
            "To absorb water and form stool",
            "To produce insulin",
            "To break down fats"
        ],
        correct: 1,
        explanation: "The large intestine (colon) absorbs water from undigested food, forming stool. It also houses beneficial bacteria."
    },
    {
        question: "What does the liver produce to help digest fats?",
        options: [
            "Pepsin",
            "Amylase",
            "Bile",
            "Lipase"
        ],
        correct: 2,
        explanation: "The liver produces bile, which breaks down (emulsifies) fats into smaller droplets for easier digestion by enzymes."
    }
];

// Quiz state
let currentQuestion = 0;
let answers = [];
let quizStarted = false;

// Initialize quiz
document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', startQuiz);
    }
    console.log('ðŸ“ Quiz initialized with ' + quizQuestions.length + ' questions');
});

// Start quiz
function startQuiz() {
    quizStarted = true;
    currentQuestion = 0;
    answers = new Array(quizQuestions.length).fill(null);
    
    // Shuffle questions
    const shuffledQuestions = shuffleArray(quizQuestions);
    quizQuestions.splice(0, quizQuestions.length, ...shuffledQuestions);
    
    // Hide start screen
    document.getElementById('startScreen').classList.remove('active');
    
    // Show quiz screen
    document.getElementById('quizScreen').classList.add('active');
    
    playSound('success');
    loadQuestion(0);
}

// Load and display question
function loadQuestion(questionIndex) {
    currentQuestion = questionIndex;
    const question = quizQuestions[questionIndex];
    
    // Update progress
    document.getElementById('currentQuestion').textContent = questionIndex + 1;
    updateProgressBar();
    
    // Display question
    document.getElementById('questionText').textContent = question.question;
    
    // Display options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('label');
        optionDiv.className = 'option';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.value = index;
        radio.checked = answers[questionIndex] === index;
        
        const label = document.createElement('label');
        label.textContent = option;
        
        optionDiv.appendChild(radio);
        optionDiv.appendChild(label);
        optionsContainer.appendChild(optionDiv);
        
        // Event listener
        radio.addEventListener('change', function() {
            answers[questionIndex] = index;
        });
    });
    
    // Update button states
    updateButtonStates();
    
    // Hide feedback box
    const feedbackBox = document.getElementById('feedbackBox');
    feedbackBox.classList.add('hidden');
}

// Update button states
function updateButtonStates() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.disabled = currentQuestion === quizQuestions.length - 1;
    submitBtn.disabled = answers[currentQuestion] === null;
}

// Previous question
function previousQuestion() {
    if (currentQuestion > 0) {
        loadQuestion(currentQuestion - 1);
        playSound('click');
    }
}

// Next question
function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        loadQuestion(currentQuestion + 1);
        playSound('click');
    }
}

// Submit answer
function submitAnswer() {
    const question = quizQuestions[currentQuestion];
    const selectedAnswer = answers[currentQuestion];
    const feedbackBox = document.getElementById('feedbackBox');
    const feedbackContent = document.getElementById('feedbackContent');
    
    const isCorrect = selectedAnswer === question.correct;
    
    // Show feedback
    feedbackBox.classList.remove('hidden');
    feedbackBox.className = isCorrect ? 'feedback-box correct' : 'feedback-box incorrect';
    
    const resultText = isCorrect ? 'âœ… Correct!' : 'âŒ Incorrect';
    feedbackContent.innerHTML = `
        <strong>${resultText}</strong><br>
        ${question.explanation}
    `;
    
    playSound(isCorrect ? 'success' : 'error');
    
    // Update button states
    document.getElementById('prevBtn').disabled = false;
    document.getElementById('nextBtn').disabled = false;
    document.getElementById('submitBtn').disabled = true;
}

// Update progress bar
function updateProgressBar() {
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('quizProgressFill').style.width = progress + '%';
}

// Calculate score
function calculateScore() {
    let correct = 0;
    answers.forEach((answer, index) => {
        if (answer === quizQuestions[index].correct) {
            correct++;
        }
    });
    return correct;
}

// Get encouraging message
function getResultMessage(percentage) {
    if (percentage >= 90) {
        return {
            message: 'ðŸŒŸ Outstanding! You\'re a Digestion Expert! ðŸŒŸ',
            class: 'excellent'
        };
    } else if (percentage >= 80) {
        return {
            message: 'ðŸŽ‰ Great Job! You Know Your Digestive System! ðŸŽ‰',
            class: 'good'
        };
    } else if (percentage >= 70) {
        return {
            message: 'ðŸ‘ Good Effort! Keep Learning About Digestion! ðŸ‘',
            class: 'fair'
        };
    } else {
        return {
            message: 'ðŸ’ª Keep Practicing! Review the Simulation and Try Again! ðŸ’ª',
            class: 'poor'
        };
    }
}

// Finish quiz and show results
function finishQuiz() {
    // Hide quiz screen
    document.getElementById('quizScreen').classList.remove('active');
    
    // Show results screen
    document.getElementById('resultsScreen').classList.add('active');
    
    // Calculate score
    const correct = calculateScore();
    const percentage = Math.round((correct / quizQuestions.length) * 100);
    
    // Display score
    document.getElementById('scoreNumber').textContent = percentage;
    
    // Display message
    const result = getResultMessage(percentage);
    const messageBox = document.getElementById('resultMessage');
    messageBox.textContent = result.message;
    messageBox.className = 'result-message ' + result.class;
    
    // Display stats
    document.getElementById('correctCount').textContent = correct + '/' + quizQuestions.length;
    document.getElementById('accuracy').textContent = percentage + '%';
    document.getElementById('incorrectCount').textContent = (quizQuestions.length - correct) + '/' + quizQuestions.length;
    
    // Display answer review
    displayAnswerReview(correct);
    
    playSound('success');
    scrollToElement(document.querySelector('.results-container'));
}

// Display answer review
function displayAnswerReview(correct) {
    const reviewContainer = document.getElementById('answerReviewContainer');
    reviewContainer.innerHTML = '';
    
    quizQuestions.forEach((question, index) => {
        const isCorrect = answers[index] === question.correct;
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item ' + (isCorrect ? 'correct' : 'incorrect');
        
        reviewItem.innerHTML = `
            <div class="review-question">${index + 1}. ${question.question}</div>
            <div class="review-answer user">Your Answer: ${question.options[answers[index]]}</div>
            ${!isCorrect ? `<div class="review-answer correct-answer">Correct Answer: ${question.options[question.correct]}</div>` : ''}
        `;
        
        reviewContainer.appendChild(reviewItem);
    });
}

// Retake quiz
function retakeQuiz() {
    // Reset state
    quizStarted = false;
    currentQuestion = 0;
    answers = [];
    
    // Hide results screen
    document.getElementById('resultsScreen').classList.remove('active');
    
    // Show start screen
    document.getElementById('startScreen').classList.add('active');
    
    playSound('click');
    scrollToElement(document.querySelector('.quiz-header'));
}

// Override submit behavior for last question
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the quiz page
    if (document.getElementById('quizScreen')) {
        // Override submit button to finish quiz after last question
        const originalSubmitAnswer = window.submitAnswer;
        window.submitAnswer = function() {
            originalSubmitAnswer.call(this);
            
            // If this is the last question, show a "Finish" button
            if (currentQuestion === quizQuestions.length - 1) {
                const submitBtn = document.getElementById('submitBtn');
                if (!submitBtn.classList.contains('finished')) {
                    submitBtn.classList.add('finished');
                    setTimeout(() => {
                        submitBtn.textContent = 'ðŸ Finish Quiz';
                        submitBtn.onclick = finishQuiz;
                    }, 1000);
                }
            }
        };
    }
});

