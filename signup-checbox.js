const signupForm = document.getElementById('signup-form');
const termsCheckbox = document.getElementById('termsCheckbox');
const termsGroup = document.getElementById('termsGroup');
const termsError = document.getElementById('termsError');

if (signupForm && termsCheckbox && termsGroup && termsError) {
  signupForm.addEventListener('submit', function (e) {
    if (!termsCheckbox.checked) {
      e.preventDefault();
      e.stopImmediatePropagation();
      termsGroup.classList.add('error');
      termsError.style.display = 'block';
    } else {
      termsGroup.classList.remove('error');
      termsError.style.display = 'none';
    }
  }, true);
}
