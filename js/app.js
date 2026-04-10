function goToQuiz(category) {
  // Save selected category
  localStorage.setItem("quizCategory", category);

  // Redirect to quiz page
  window.location.href = "quiz.html";
}
