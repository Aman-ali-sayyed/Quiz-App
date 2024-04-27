const quizData = [
    {
        question: 'What is the capital of France?',
        answers: ['Paris', 'Berlin', 'Madrid', 'Rome'],
        correct: 'Paris'
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: ['Earth', 'Mars', 'Jupiter', 'Venus'],
        correct: 'Mars'
    },
    {
        question: 'What is the largest mammal in the world?',
        answers: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        correct: 'Blue Whale'
    }
    // Add more questions and answers as needed
];

let currentQuestion = 0;
let score = 0;

const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const resultContainer = document.getElementById('result-container');
const scoreValue = document.getElementById('score-value');

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    resultContainer.classList.add('hidden');
    nextButton.classList.add('hidden');
    showQuestion(quizData[currentQuestion]);
}

function showQuestion(question) {
    questionContainer.innerText = question.question;
    resetAnswerButtons();

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer, question.correct));
        answerButtons.appendChild(button);
    });
}

function resetAnswerButtons() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(selectedAnswer, correctAnswer) {
    const isCorrect = selectedAnswer === correctAnswer;
    if (isCorrect) {
        score++;
    }

    answerButtons.childNodes.forEach(button => {
        button.disabled = true;
        if (button.innerText === correctAnswer) {
            button.classList.add('correct');
        } else if (button.innerText === selectedAnswer) {
            button.classList.add('incorrect');
        }
    });

    nextButton.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        showQuestion(quizData[currentQuestion]);
        nextButton.classList.add('hidden');
    } else {
        showResult();
    }
}

function showResult() {
    resultContainer.classList.remove('hidden');
    scoreValue.innerText = score + '/' + quizData.length;
    resetAnswerButtons();
}

// Start the quiz when the page loads
document.addEventListener('DOMContentLoaded', startQuiz);
