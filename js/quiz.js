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

    let custom = JSON.parse(localStorage.getItem("customQuestions")) || [];

    let allQuestions = [...data, ...custom];

    let selectedSet = localStorage.getItem("quizSet");

    questions = allQuestions.filter(q =>
      q.category === selectedCategory && q.set === selectedSet
    );

    if (questions.length === 0) {
      document.getElementById("question").innerText = "No questions available";
      return;
    }

    loadQuestion();
  });

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

    // 🔥 Get logged in user
    let user = JSON.parse(localStorage.getItem("loggedInUser"));

    // 🔥 Get existing leaderboard
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    // 🔥 Add new score
    if (user) {
      leaderboard.push({
        name: user.name,
        score: score,
        total: questions.length
      });

      localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    }

    // ✅ Keep existing result system (unchanged)
    localStorage.setItem("quizScore", score);
    localStorage.setItem("totalQuestions", questions.length);

    // Redirect
    window.location.href = "result.html";
  }
}
