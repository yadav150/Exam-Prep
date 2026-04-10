let score = localStorage.getItem("quizScore");
let total = localStorage.getItem("totalQuestions");

score = Number(score);
total = Number(total);

document.getElementById("scoreText").innerText =
  `You scored ${score} out of ${total}`;

// Performance message
let performanceText = "";

if (score === total) {
  performanceText = "Excellent 🔥";
} else if (score >= total / 2) {
  performanceText = "Good 👍";
} else {
  performanceText = "Keep Practicing 💪";
}

document.getElementById("performance").innerText = performanceText;

// Go home
function goHome() {
  window.location.href = "index.html";
}
