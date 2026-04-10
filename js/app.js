// Check login
let user = JSON.parse(localStorage.getItem("loggedInUser"));

// Navbar control (only if nav exists)
let nav = document.getElementById("navLinks");

if (nav) {
  if (user) {
    nav.innerHTML = `
      <a href="dashboard.html">Dashboard</a>
      <a href="#" onclick="logout()">Logout</a>
    `;
  } else {
    nav.innerHTML = `
      <a href="login.html">Login</a>
      <a href="signup.html">Sign Up</a>
    `;
  }
}

// Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}

// 🔥 UPDATED QUIZ FUNCTION (with login check)
function goToQuiz(category) {
  if (!user) {
    alert("Please login first 🔐");
    window.location.href = "login.html";
    return;
  }

  // Save selected category
  localStorage.setItem("quizCategory", category);

  // Redirect
  window.location.href = "quiz.html";
}
