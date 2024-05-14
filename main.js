const question = [
    {
        question: "Which is the largest animal in the World?",
        answer: [
            { text: "Shark", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Tiger", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        question: "If you could have dinner with any historical figure, who would it be and why?",
        answer: [
            { text: "Einstein", correct: true},
            { text: "Bill", correct: false},
            { text: "James", correct: false},
            { text: "Harry", correct: false},
        ]
    },
    {
        question: "If you could visit any place in the world, where would it be and why?",
        answer: [
            { text: "America", correct: false},
            { text: "India", correct: false},
            { text: "New Zealand", correct: true},
            { text: "Australia", correct: false},
        ]
    },
    {
        question: "What is your favorite book, and what impact did it have on you?",
        answer: [
            { text: "1945", correct: false},
            { text: "1899", correct: false},
            { text: "1877", correct: false},
            { text: "1984", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer_button");
const nextButton = document.getElementById("next_btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e){
    const selectbtn = e.target;
    const isCorrect = selectbtn.dataset.correct === "true";
    if(isCorrect){
        selectbtn.classList.add("correct");
        score++
    } else{
        selectbtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add("correct");
        }
        button.disabled = true;
        });
        nextButton.style.display = "block"
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < question.length){
        handleNextButton();
    } else{
        startQuiz();
    }
})

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    } else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you score ${score} out of ${question.length}`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

startQuiz();