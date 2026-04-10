document.addEventListener("DOMContentLoaded", function () {
  let user = JSON.parse(localStorage.getItem("loggedInUser"));
  let nav = document.getElementById("navLinks");

  if (!nav) return;

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
});

function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}
