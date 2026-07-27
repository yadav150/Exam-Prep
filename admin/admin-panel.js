import { db } from './firestore-init.js';
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// ===== Gate elements =====
const captchaGate = document.getElementById('captchaGate');
const passwordGate = document.getElementById('passwordGate');
const adminContent = document.getElementById('adminContent');
const loadingOverlay = document.getElementById('loadingOverlay');

// ===== CAPTCHA logic =====
const captchaQuestion = document.getElementById('captchaQuestion');
const captchaAnswer = document.getElementById('captchaAnswer');
const captchaSubmit = document.getElementById('captchaSubmit');
const captchaMsg = document.getElementById('captchaMsg');
let expectedAnswer;

function generateCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  expectedAnswer = a + b;
  captchaQuestion.textContent = `What is ${a} + ${b} ?`;
}
generateCaptcha();

captchaSubmit.addEventListener('click', () => {
  const userAnswer = parseInt(captchaAnswer.value, 10);
  if (isNaN(userAnswer) || userAnswer !== expectedAnswer) {
    captchaMsg.innerHTML = '<div class="error-msg">Incorrect answer. Try again.</div>';
    // Regenerate a new question to avoid simple retries
    generateCaptcha();
    captchaAnswer.value = '';
    return;
  }
  // Correct CAPTCHA → show password gate
  captchaMsg.innerHTML = '';
  captchaGate.style.display = 'none';
  passwordGate.style.display = 'block';
});

// ===== Password gate =====
const adminPassword = document.getElementById('adminPassword');
const passwordSubmit = document.getElementById('passwordSubmit');
const passwordMsg = document.getElementById('passwordMsg');
const CORRECT_PASSWORD = '7896579939@';

passwordSubmit.addEventListener('click', () => {
  if (adminPassword.value !== CORRECT_PASSWORD) {
    passwordMsg.innerHTML = '<div class="error-msg">Incorrect password.</div>';
    return;
  }
  // Password correct → load reports
  passwordMsg.innerHTML = '';
  passwordGate.style.display = 'none';
  // Show loading spinner while fetching
  loadingOverlay.classList.remove('hidden');
  adminContent.style.display = 'block';
  loadReports();
});

// ===== Fetch reports from Firestore =====
async function loadReports() {
  const container = document.getElementById('reportsContainer');
  try {
    const q = query(collection(db, 'reports'), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    let html = '';
    if (snapshot.empty) {
      html = '<p>No reports yet.</p>';
    } else {
      snapshot.forEach(doc => {
        const data = doc.data();
        html += `
          <div class="report-card">
            <div class="report-meta">
              <span><strong>${data.user}</strong></span>
              <span>${new Date(data.timestamp).toLocaleString('en-IN')}</span>
            </div>
            <div class="report-message">${escapeHtml(data.message)}</div>
          </div>`;
      });
    }
    container.innerHTML = html;
  } catch (error) {
    container.innerHTML = '<div class="error-msg">Failed to load reports.</div>';
  } finally {
    loadingOverlay.classList.add('hidden');
  }
}

// Simple HTML escape to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
