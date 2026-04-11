// 🔹 Get users (always fresh)
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// 🔹 SIGNUP
function signup() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("Please fill all fields ❗");
    return;
  }

  let users = getUsers();

  // Check existing user
  let exists = users.find(u => u.email === email);

  if (exists) {
    alert("User already exists ❌");
    return;
  }

  let user = { name, email, password };

  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful ✅");

  window.location.href = "login.html";
}

// 🔹 LOGIN
function login() {
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter email & password ❗");
    return;
  }

  let users = getUsers();

  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password ❌");
    return;
  }

  // Save logged in user
  localStorage.setItem("loggedInUser", JSON.stringify(user));

  alert("Login successful 🎉");

  window.location.href = "dashboard.html"; // 🔥 FIXED (better UX)
}

// 🔹 AUTO REDIRECT (safer)
document.addEventListener("DOMContentLoaded", () => {
  let currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

  let path = window.location.pathname;

  if (currentUser && (path.includes("login.html") || path.includes("signup.html"))) {
    window.location.href = "dashboard.html";
  }
});
