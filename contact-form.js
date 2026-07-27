import { auth } from './firebase.js';
import { db } from './firestore.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const contactForm = document.getElementById('contactForm');
const subjectInput = document.getElementById('contactSubject');
const messageInput = document.getElementById('contactMessage');
const sendBtn = document.getElementById('sendContactBtn');
const msgDiv = document.getElementById('contactMsg');
const successModal = document.getElementById('contactSuccessModal');
const closeModalBtn = document.getElementById('closeContactModal');

// Universal status container (optional)
const universalStatus = document.getElementById('universalStatus');

function showInlineMsg(element, message, type) {
  const className = type === 'success' ? 'success-msg' : 'error-msg';
  element.innerHTML = `<div class="${className}">${message}</div>`;
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const subject = subjectInput.value.trim();
  const message = messageInput.value.trim();

  if (!subject || !message) {
    showInlineMsg(msgDiv, 'Please fill in both the subject and message.', 'error');
    return;
  }

  sendBtn.disabled = true;
  sendBtn.textContent = 'Sending…';

  try {
    const user = auth.currentUser;
    const docData = {
      email: user ? user.email : 'anonymous',
      displayName: user ? (user.displayName || '') : '',
      subject: subject,
      message: message,
      createdAt: serverTimestamp()
    };

    await addDoc(collection(db, "supportTickets"), docData);

    // Clear form
    subjectInput.value = '';
    messageInput.value = '';
    showInlineMsg(msgDiv, '', ''); // clear any previous error

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

// Modal close handlers
closeModalBtn.addEventListener('click', () => {
  successModal.classList.remove('active');
});
successModal.addEventListener('click', (e) => {
  if (e.target === successModal) successModal.classList.remove('active');
});
