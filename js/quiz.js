let questions = [];
let currentQuestion = 0;
let score = 0;
let selectedCategory = localStorage.getItem("quizCategory");

// Fetch questions
fetch("data/questions.json")
  .then(res => res.json())
  .then(data => {
    // Filter by category
    questions = data.filter(q => q.category === selectedCategory);

    if (questions.length === 0) {
      document.getElementById("question").innerText = "No questions available";
      return;
    }

    loadQuestion();
  });

function loadQuestion() {
  let q = questions[currentQuestion];

  document.getElementById("question").innerText = q.question;

  let options = document.querySelectorAll(".option");

  options.forEach((btn, index) => {
    btn.innerText = q.options[index];

    btn.onclick = () => {
      checkAnswer(btn.innerText);
    };
  });
}

function checkAnswer(selected) {
  let correct = questions[currentQuestion].answer;

  if (selected === correct) {
    score++;
  }

  nextQuestion();
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    // Save score
    localStorage.setItem("quizScore", score);
    localStorage.setItem("totalQuestions", questions.length);

    // Go to result page
    window.location.href = "result.html";
  }
}

// Next button
document.getElementById("nextBtn").onclick = nextQuestion;

let timeLeft = 30;
let timer;
