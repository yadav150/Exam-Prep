import { auth, onAuthStateChanged } from './firebase.js';
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// Use the existing Firebase app instance via auth.app
const app = auth.app;
const db = getFirestore(app);

// Protect page – redirect if not logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.replace('auth.html');
    return;
  }
  loadQuiz();
});

// ----- Quiz Data (5 hardcoded questions) -----
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language"
    ],
    correct: 0
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "JavaScript", "Python"],
    correct: 2
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets"
    ],
    correct: 1
  },
  {
    question: "Which method selects an element by ID in JavaScript?",
    options: [
      "getElementByClassName()",
      "querySelector()",
      "getElementById()",
      "getElementsByTagName()"
    ],
    correct: 2
  },
  {
    question: "Firebase is a product of which company?",
    options: ["Microsoft", "Amazon", "Google", "Facebook"],
    correct: 2
  }
];

// Render quiz questions
function loadQuiz() {
  const container = document.getElementById('questionsContainer');
  container.innerHTML = questions.map((q, i) => `
    <div class="question-card">
      <h3>${i + 1}. ${q.question}</h3>
      <div class="options">
        ${q.options.map((opt, j) => `
          <div class="option-item">
            <input type="radio" name="q${i}" id="q${i}_${j}" value="${j}" required />
            <label for="q${i}_${j}">${opt}</label>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  document.getElementById('quizForm').addEventListener('submit', handleSubmit);
}

// Handle form submission and scoring
async function handleSubmit(e) {
  e.preventDefault();
  const resultDiv = document.getElementById('quizResult');
  resultDiv.className = 'status-message';
  resultDiv.style.display = 'none';

  // Check all questions answered
  let allAnswered = true;
  questions.forEach((_, i) => {
    if (!document.querySelector(`input[name="q${i}"]:checked`)) allAnswered = false;
  });

  if (!allAnswered) {
    resultDiv.textContent = 'Please answer all questions before submitting.';
    resultDiv.className = 'status-message error';
    resultDiv.style.display = 'block';
    return;
  }

  // Calculate score
  let score = 0;
  questions.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (parseInt(selected.value) === q.correct) score++;
  });

  const total = questions.length;
  const percentage = Math.round((score / total) * 100);

  // Show score
  resultDiv.textContent = `You scored ${score} out of ${total} (${percentage}%).`;
  resultDiv.className = 'status-message success';
  resultDiv.style.display = 'block';

  // Save to Firestore
  const user = auth.currentUser;
  if (user) {
    try {
      await setDoc(doc(db, 'quiz_scores', user.uid), {
        displayName: user.displayName || user.email.split('@')[0],
        email: user.email,
        score: score,
        total: total,
        percentage: percentage,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error('Error saving score:', error);
      // Score still shown even if save fails
    }
  }

  // Disable resubmission
  const submitBtn = document.querySelector('#quizForm button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitted';
  document.querySelectorAll('input[type="radio"]').forEach(r => r.disabled = true);
}
