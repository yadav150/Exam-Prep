import { db } from '../firestore-init.js';
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
    generateCaptcha();
    captchaAnswer.value = '';
    return;
  }
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
  passwordMsg.innerHTML = '';
  passwordGate.style.display = 'none';
  loadingOverlay.classList.remove('hidden');
  adminContent.style.display = 'block';
  loadReports();
  startSessionTimer();
});

// ===== Close panel button =====
document.getElementById('closePanelBtn').addEventListener('click', () => {
  window.location.href = '../index.html';
});

// ===== Session timer (10‑minute inactivity timeout) =====
let sessionSeconds = 0;
let inactivityTimer;
const TIMEOUT_SECONDS = 10 * 60; // 10 minutes
const sessionTimerEl = document.getElementById('sessionTimer');
const sessionExpiredModal = document.getElementById('sessionExpiredModal');

function startSessionTimer() {
  updateTimerDisplay();
  resetInactivityTimer();

  window.addEventListener('mousemove', resetInactivityTimer);
  window.addEventListener('keydown', resetInactivityTimer);
  window.addEventListener('click', resetInactivityTimer);
  window.addEventListener('scroll', resetInactivityTimer);
}

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    // Show the expired modal
    sessionExpiredModal.classList.add('active');
    // Redirect after 5 seconds
    setTimeout(() => {
      window.location.href = '../index.html';
    }, 5000);
  }, TIMEOUT_SECONDS * 1000);
}

function updateTimerDisplay() {
  sessionSeconds++;
  const mins = Math.floor(sessionSeconds / 60);
  const secs = sessionSeconds % 60;
  sessionTimerEl.textContent = `Session active: ${mins}m ${secs}s`;
  setTimeout(updateTimerDisplay, 1000);
}

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
              <span><strong>${escapeHtml(data.user)}</strong></span>
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

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
