let questions = [];
let currentQuestion = 0;
let score = 0;
let selectedCategory = localStorage.getItem("quizCategory");

let timeLeft = 30;
let timer;

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
  clearInterval(timer); // reset timer

  let q = questions[currentQuestion];

  document.getElementById("question").innerText = q.question;

  let options = document.querySelectorAll(".option");

  options.forEach((btn, index) => {
    btn.innerText = q.options[index];

    btn.onclick = () => {
      clearInterval(timer); // stop timer when user clicks
      checkAnswer(btn.innerText);
    };
  });

  startTimer(); // start timer for each question
}

function startTimer() {
  timeLeft = 30;

  timer = setInterval(() => {
    document.getElementById("timer").innerText =
      "Time Left: " + timeLeft + "s";

    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
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
    clearInterval(timer);

    // Save score
    localStorage.setItem("quizScore", score);
    localStorage.setItem("totalQuestions", questions.length);

    // Go to result page
    window.location.href = "result.html";
  }
}

// Next button
document.getElementById("nextBtn").onclick = () => {
  clearInterval(timer);
  nextQuestion();
};
