// Get logged in user
let user = JSON.parse(localStorage.getItem("loggedInUser"));

// Protect page
if (!user) {
  window.location.href = "login.html";
}

// Show name
document.getElementById("welcomeText").innerText =
  "Welcome, " + user.name + " 👋";

// Start quiz
function startQuiz(category) {
  localStorage.setItem("quizCategory", category);
  window.location.href = "quiz.html";
}

// Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}
