function signup() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  let user = {
    name,
    email,
    password
  };

  // Save user in localStorage
  localStorage.setItem("user", JSON.stringify(user));

  alert("Signup successful!");

  // Redirect to login
  window.location.href = "login.html";
}
