function addQuestion() {
  let category = document.getElementById("category").value;
  let set = document.getElementById("set").value;
  let question = document.getElementById("question").value;

  let opt1 = document.getElementById("opt1").value;
  let opt2 = document.getElementById("opt2").value;
  let opt3 = document.getElementById("opt3").value;
  let opt4 = document.getElementById("opt4").value;

  let answer = document.getElementById("answer").value;

  if (!category || !set || !question || !opt1 || !opt2 || !opt3 || !opt4 || !answer) {
    alert("Fill all fields");
    return;
  }

  let newQuestion = {
    category,
    set,
    question,
    options: [opt1, opt2, opt3, opt4],
    answer
  };

  let questions = JSON.parse(localStorage.getItem("customQuestions")) || [];

  questions.push(newQuestion);

  localStorage.setItem("customQuestions", JSON.stringify(questions));

  alert("Question Added ✅");

  location.reload();
}
