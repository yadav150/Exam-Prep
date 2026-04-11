// Run after DOM loads (prevents errors)
document.addEventListener("DOMContentLoaded", () => {

  // 🔐 Get logged in user
  let user = JSON.parse(localStorage.getItem("loggedInUser"));

  // 🔒 Protect page
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // 👋 Show name safely
  let welcomeText = document.getElementById("welcomeText");
  if (welcomeText) {
    welcomeText.innerText = "Welcome, " + user.name + " 👋";
  }

});

// 🚀 Start quiz (kept same but improved)
function startQuiz(category) {
  localStorage.setItem("quizCategory", category);

  // If using sets system later, easy upgrade here
  window.location.href = "quiz.html";
}

// 🔓 Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}
