let questions = [];
let currentQuestion = 0;
let score = 0;

let selectedCategory = localStorage.getItem("quizCategory");
let selectedSet = localStorage.getItem("quizSet") || null;

let timeLeft = 30;
let timer;

// 🚀 LOAD QUESTIONS (FIXED + CLEAN)
function loadQuestions() {

  fetch("data/questions.json")
    .then(res => res.json())
    .then(data => {

      let custom = JSON.parse(localStorage.getItem("customQuestions")) || [];

      let allQuestions = [...data, ...custom];

      // Filter by category + set
      questions = allQuestions.filter(q =>
        q.category === selectedCategory &&
        (!selectedSet || q.set === selectedSet)
      );

      if (questions.length === 0) {
        document.getElementById("question").innerText = "No questions available";
        return;
      }

      // Show category
      document.getElementById("quizCategoryText").innerText =
        "Category: " + selectedCategory;

      loadQuestion();
    });
}

loadQuestions();

// 📌 LOAD QUESTION
function loadQuestion() {
  clearInterval(timer);

  let q = questions[currentQuestion];

  document.getElementById("question").innerText = q.question;

  let options = document.querySelectorAll(".option");

  options.forEach((btn, index) => {
    btn.innerText = q.options[index];

    btn.onclick = () => {
      clearInterval(timer);
      checkAnswer(btn.innerText);
    };
  });

  startTimer();
}

// ⏳ TIMER
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

// ✅ CHECK ANSWER
function checkAnswer(selected) {
  let correct = questions[currentQuestion].answer;

  if (selected === correct) {
    score++;
  }

  nextQuestion();
}

// ⏭ NEXT
function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

// 🔚 END QUIZ
function endQuiz() {
  clearInterval(timer);

  let user = JSON.parse(localStorage.getItem("loggedInUser"));

  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  if (user) {
    leaderboard.push({
      name: user.name,
      score: score,
      total: questions.length,
      category: selectedCategory
    });

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }

  localStorage.setItem("quizScore", score);
  localStorage.setItem("totalQuestions", questions.length);

  window.location.href = "result.html";
}

// 🔘 BUTTONS

// Next button
document.getElementById("nextBtn").onclick = () => {
  clearInterval(timer);
  nextQuestion();
};

// Skip button
document.getElementById("skipBtn").onclick = () => {
  clearInterval(timer);
  nextQuestion();
};

// Back button
document.getElementById("backBtn").onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion();
  }
};

// Exit button
document.getElementById("exitBtn").onclick = () => {
  let confirmExit = confirm("Are you sure you want to exit?");
  if (confirmExit) {
    window.location.href = "dashboard.html";
  }
};
