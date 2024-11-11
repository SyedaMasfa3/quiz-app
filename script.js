const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Dog", correct: false },
            { text: "Lion", correct: false }
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false },
            { text: "Arctic", correct: false },
            { text: "Australia", correct: true },
            { text: "Africa", correct: false }
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true }
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "The highest mountain in Pakistan is?",
        answers: [
            { text: "Gasherbrum I", correct: false },
            { text: "Broad Peak", correct: false },
            { text: "Nanga Parbat", correct: false },
            { text: "K2", correct: true }
        ]
    },
    {
        question: "What is the capital of Pakistan?",
        answers: [
            { text: "Karachi", correct: false },
            { text: "Islamabad", correct: true },
            { text: "Lahore", correct: false },
            { text: "Multan", correct: false }
        ]
    },
    {
        question: "Who was the first President of Pakistan?",
        answers: [
            { text: "Liaquat Ali Khan", correct: false },
            { text: "Ayub Khan", correct: false },
            { text: "Iskander Mirza", correct: true },
            { text: "Zulfikar Ali Bhutto", correct: false }
        ]
    },
    {
        question: "Who wrote Pakistan's national anthem?",
        answers: [
            { text: "Hafeez Jalandhari", correct: true },
            { text: "Ahmed Faraz", correct: false },
            { text: "Faiz Ahmed Faiz", correct: false },
            { text: "Allama Iqbal", correct: false }
        ]
    },
    {
        question: "In which year did Pakistan become a nuclear power?",
        answers: [
            { text: "1988", correct: false },
            { text: "2000", correct: false },
            { text: "1990", correct: false },
            { text: "1998", correct: true }
        ]
    },
    {
        question: "Who is known as the Father of the Nation in Pakistan?",
        answers: [
            { text: "Allama Iqbal", correct: false },
            { text: "Muhammad Ali Jinnah", correct: true },
            { text: "Liaquat Ali Khan", correct: false },
            { text: "Ayub Khan", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    selectedBtn.classList.add(isCorrect ? "correct" : "incorrect");
    
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    if (isCorrect) score++;
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerText = "Play Again";
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

