import { auth } from './firebase.js';
import { db } from './firestore.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const contactForm = document.getElementById('contactForm');
const subjectType = document.getElementById('contactSubjectType');
const customSubjectGroup = document.getElementById('customSubjectGroup');
const subjectInput = document.getElementById('contactSubject');
const messageInput = document.getElementById('contactMessage');
const sendBtn = document.getElementById('sendContactBtn');
const msgDiv = document.getElementById('contactMsg');
const successModal = document.getElementById('contactSuccessModal');
const closeModalBtn = document.getElementById('closeContactModal');

// Show/hide custom subject field based on dropdown
subjectType.addEventListener('change', () => {
  if (subjectType.value === 'Other') {
    customSubjectGroup.style.display = 'block';
    subjectInput.required = true;
  } else {
    customSubjectGroup.style.display = 'none';
    subjectInput.required = false;
  }
});

function showInlineMsg(element, message, type) {
  const className = type === 'success' ? 'success-msg' : 'error-msg';
  element.innerHTML = `<div class="${className}">${message}</div>`;
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Determine the final subject
  let finalSubject = '';
  if (subjectType.value === 'Other') {
    finalSubject = subjectInput.value.trim();
  } else {
    finalSubject = subjectType.value;
  }

  const message = messageInput.value.trim();

  // Validation
  if (!finalSubject) {
    showInlineMsg(msgDiv, 'Please select a topic or enter a custom subject.', 'error');
    return;
  }
  if (!message) {
    showInlineMsg(msgDiv, 'Please enter a message.', 'error');
    return;
  }

  sendBtn.disabled = true;
  sendBtn.textContent = 'Sending…';

  try {
    const user = auth.currentUser;
    const docData = {
      email: user ? user.email : 'anonymous',
      displayName: user ? (user.displayName || '') : '',
      subject: finalSubject,
      message: message,
      createdAt: serverTimestamp()
    };

    await addDoc(collection(db, "supportTickets"), docData);

    // Clear form
    subjectType.value = '';
    customSubjectGroup.style.display = 'none';
    subjectInput.value = '';
    messageInput.value = '';
    showInlineMsg(msgDiv, '', ''); // clear any error

    // Show success modal
    successModal.classList.add('active');

  } catch (error) {
    console.error('Contact form error:', error);
    showInlineMsg(msgDiv, 'Failed to send message. Please try again.', 'error');
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = 'Send Message';
  }
});

// Modal close
closeModalBtn.addEventListener('click', () => successModal.classList.remove('active'));
successModal.addEventListener('click', (e) => {
  if (e.target === successModal) successModal.classList.remove('active');
});
