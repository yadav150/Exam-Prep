import { auth } from './firebase.js';
import { db } from './firestore-init.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const FORMSPREE_URL = 'https://formspree.io/f/xaqraljr';

const submitBtn = document.getElementById('submitIssueBtn');
const issueTextarea = document.getElementById('issueDescription');
const issueMsg = document.getElementById('issueMsg');

if (submitBtn && issueTextarea && issueMsg) {
  submitBtn.addEventListener('click', async () => {
    const message = issueTextarea.value.trim();
    if (!message) {
      issueMsg.innerHTML = '<div class="error-msg">Please describe the issue before submitting.</div>';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    issueMsg.innerHTML = '';

    try {
      // 1. Send to Formspree
      const formspreePromise = fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          user: auth.currentUser?.email || 'Anonymous',
          timestamp: new Date().toISOString()
        })
      });

      // 2. Save to Firestore
      const firestorePromise = addDoc(collection(db, 'reports'), {
        message: message,
        user: auth.currentUser?.email || 'Anonymous',
        timestamp: new Date().toISOString()
      });

      await Promise.all([formspreePromise, firestorePromise]);

      issueMsg.innerHTML = '<div class="success-msg">Thank you! Your message has been sent.</div>';
      issueTextarea.value = '';
    } catch (error) {
      issueMsg.innerHTML = '<div class="error-msg">Failed to send. Please try again later.</div>';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Report';
    }
  });
}
