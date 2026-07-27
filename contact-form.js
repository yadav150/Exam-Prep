// Contact form handler for Help & Support panel
// No existing files are modified.

import { auth } from './firebase.js';

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
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          user: auth.currentUser?.email || 'Anonymous',
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        issueMsg.innerHTML = '<div class="success-msg">Thank you! Your message has been sent.</div>';
        issueTextarea.value = '';
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      issueMsg.innerHTML = '<div class="error-msg">Failed to send. Please try again later.</div>';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Report';
    }
  });
}
