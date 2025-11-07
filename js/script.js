// Initialize AOS (Animate on Scroll)
// Note: You must link to the AOS CSS and JS in your HTML files for this to work
// <link rel="stylesheet" href="https://unpkg.com/aos@2.3.4/dist/aos.css" />
// <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true, // Animations fire only once
            easing: 'ease-in-out',
        });
    }
}

// Function to handle the Mobile Navbar Toggle
function setupNavbarToggle() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            // Toggle between hamburger and close icon
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Global function for non-functional button alerts (Made slightly more professional)
function setupDummyButtonAlerts() {
    const dummyButtons = document.querySelectorAll('.btn-enroll, .btn-redeem, .btn-participate, .btn-submit-contact, .btn-view-sample');
    
    dummyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); 
            const buttonText = button.textContent.trim();
            let message = `${buttonText} functionality is currently under development. Please check back soon!`;
            
            if (button.classList.contains('btn-submit-contact')) {
                message = 'Thank you for your message! We will get back to you shortly.';
            } else if (button.classList.contains('btn-enroll')) {
                message = `Enrollment for the ${buttonText.replace('Enroll Now', '').trim()} course is launching soon!`;
            }
            
            alert(message);
        });
    });
}

// Quiz Logic for mocktest.html (Enhanced Feedback)
const catQuestions = [
    { question: "Which IIM was established first?", options: ["IIM Ahmedabad", "IIM Calcutta", "IIM Bangalore", "IIM Lucknow"], answer: "IIM Calcutta" },
    { question: "What is the value of 0! (zero factorial)?", options: ["0", "1", "Undefined", "Infinity"], answer: "1" },
    { question: "What section of CAT includes Reading Comprehension (RC)?", options: ["DILR", "QA", "VARC", "General Knowledge"], answer: "VARC" },
    { question: "If a sum of money doubles itself in 5 years at simple interest, what is the rate of interest?", options: ["10%", "15%", "20%", "25%"], answer: "20%" },
    { question: "Find the odd one out: LION, TIGER, CHEETAH, ZEBRA.", options: ["LION", "TIGER", "CHEETAH", "ZEBRA"], answer: "ZEBRA" }
];

function setupMockTestQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.getElementById('submit-quiz');
    const resultDisplay = document.getElementById('quiz-result');

    if (!quizContainer || !submitButton) return;

    // 1. Render Questions
    catQuestions.forEach((q, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question-block');
        questionElement.innerHTML = `
            <h4>Q${index + 1}: ${q.question}</h4>
            <div class="options">
                ${q.options.map(option => `
                    <label>
                        <input type="radio" name="question${index}" value="${option}">
                        ${option}
                    </label>
                `).join('')}
            </div>
        `;
        quizContainer.appendChild(questionElement);
    });

    // 2. Add Submit Event Listener
    submitButton.addEventListener('click', () => {
        let score = 0;
        
        // Remove previous feedback classes
        document.querySelectorAll('.question-block').forEach(block => block.classList.remove('correct', 'incorrect'));
        
        catQuestions.forEach((q, index) => {
            const selector = `input[name="question${index}"]:checked`;
            const userAnswerElement = document.querySelector(selector);
            const questionBlock = userAnswerElement ? userAnswerElement.closest('.question-block') : null;
            const userAnswer = userAnswerElement ? userAnswerElement.value : null;

            if (userAnswer === q.answer) {
                score++;
                if(questionBlock) questionBlock.classList.add('correct');
            } else {
                if(questionBlock) questionBlock.classList.add('incorrect');
            }
        });

        // 3. Display Result
        resultDisplay.innerHTML = `<h3>You scored **${score}/${catQuestions.length}**!</h3>`;
        resultDisplay.style.opacity = 1;
        
        if (score === catQuestions.length) {
            resultDisplay.innerHTML += '<p class="success-message">🎉 Perfect Score! You might be eligible for a ThinkPlus Scholarship!</p>';
        } else if (score >= 3) {
             resultDisplay.innerHTML += '<p class="good-score">Great attempt! Start our Medium course to perfect your core concepts.</p>';
        } else {
             resultDisplay.innerHTML += '<p class="needs-work">Time to buckle up! Enroll in our Basic Course for conceptual clarity.</p>';
        }
    });
}

// Coin Counter Animation for rewards.html (Refined professional animation)
function animateCoinCounter() {
    const counterElement = document.getElementById('coin-count');
    const targetValue = 12400;

    if (!counterElement) return;

    let currentCount = 0;
    const duration = 1500; // 1.5 seconds
    const startTimestamp = performance.now();
    
    function step(timestamp) {
        const elapsed = timestamp - startTimestamp;
        const progress = Math.min(1, elapsed / duration);
        currentCount = Math.floor(progress * targetValue);
        
        counterElement.textContent = currentCount.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}

// Initialize all features on page load
document.addEventListener('DOMContentLoaded', () => {
    // 1. Core Interactivity
    setupNavbarToggle();
    setupDummyButtonAlerts();
    
    // 2. Page-Specific Features
    setupMockTestQuiz(); 
    animateCoinCounter(); 

    // 3. Visual Polish
    initAOS(); 
});