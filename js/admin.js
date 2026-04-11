// 🔐 AUTH CHECK (ONLY YOU)
let user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
  alert("Login required ❌");
  window.location.href = "login.html";
}

// ONLY YOUR EMAIL CAN ACCESS
if (user.email !== "yadavsubba2003@gmail.com") {
  alert("Access denied ❌ Admin only");
  window.location.href = "index.html";
}

// 📦 Load stored questions
let questions = JSON.parse(localStorage.getItem("questions")) || [];

// ➕ Add Question
function addQuestion() {
  let category = document.getElementById("category").value;
  let question = document.getElementById("question").value;
  let opt1 = document.getElementById("opt1").value;
  let opt2 = document.getElementById("opt2").value;
  let opt3 = document.getElementById("opt3").value;
  let opt4 = document.getElementById("opt4").value;
  let answer = document.getElementById("answer").value;

  if (!question || !opt1 || !opt2 || !opt3 || !opt4 || !answer) {
    alert("Fill all fields ❗");
    return;
  }

  let newQ = {
    category,
    question,
    options: [opt1, opt2, opt3, opt4],
    answer
  };

  questions.push(newQ);
  localStorage.setItem("questions", JSON.stringify(questions));

  renderPreview();
  alert("Question added ✅");

  clearForm();
}

// 🧹 Clear form
function clearForm() {
  document.getElementById("question").value = "";
  document.getElementById("opt1").value = "";
  document.getElementById("opt2").value = "";
  document.getElementById("opt3").value = "";
  document.getElementById("opt4").value = "";
  document.getElementById("answer").value = "";
}

// 👀 Preview
function renderPreview() {
  let preview = document.getElementById("preview");
  preview.innerHTML = "";

  questions.forEach((q, i) => {
    preview.innerHTML += `
      <p><b>${i + 1}. ${q.question}</b> (${q.category})</p>
    `;
  });
}

// 📤 Export JSON
function exportJSON() {
  let dataStr = JSON.stringify(questions, null, 2);

  let blob = new Blob([dataStr], { type: "application/json" });
  let url = URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = url;
  a.download = "questions.json";
  a.click();
}

// init preview
renderPreview();
