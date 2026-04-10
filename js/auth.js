// Get all users or empty array
let users = JSON.parse(localStorage.getItem("users")) || [];

// 🔹 SIGNUP
function signup() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  // Check if user already exists
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
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password ❌");
    return;
  }

  // Save logged in user
  localStorage.setItem("loggedInUser", JSON.stringify(user));

  alert("Login successful 🎉");

  window.location.href = "index.html";
}

// 🔥 Auto redirect if already logged in
let currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (currentUser && window.location.pathname.includes("login.html")) {
  window.location.href = "dashboard.html";
}

if (currentUser && window.location.pathname.includes("signup.html")) {
  window.location.href = "dashboard.html";
}
