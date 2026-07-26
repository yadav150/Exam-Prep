// Injects an install button (SVG arrow) before the hamburger menu.
// Listens for the beforeinstallprompt event and shows the button.

let deferredPrompt;

// Create the install button
function createInstallButton() {
  const headerInner = document.querySelector('.header-inner');
  if (!headerInner) return;

  // Check if button already exists
  if (document.getElementById('pwa-install-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'pwa-install-btn';
  btn.title = 'Install app';
  btn.setAttribute('aria-label', 'Install application');
  btn.style.cssText = `
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    margin-right: 8px;
    display: none; /* hidden until installable */
    align-items: center;
    justify-content: center;
  `;

  // SVG download arrow (primary color)
  btn.innerHTML = `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color, #191919)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2v14"/>
      <polyline points="7 11 12 16 17 11"/>
      <line x1="5" y1="21" x2="19" y2="21"/>
    </svg>
  `;

  btn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('PWA install outcome:', outcome);
      deferredPrompt = null;
      btn.style.display = 'none';
    }
  });

  // Insert before the hamburger button (or before last child if hamburger not present)
  const hamburger = headerInner.querySelector('.hamburger');
  if (hamburger) {
    headerInner.insertBefore(btn, hamburger);
  } else {
    headerInner.appendChild(btn);
  }
}

// Listen for install prompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const btn = document.getElementById('pwa-install-btn');
  if (btn) btn.style.display = 'flex';
});

// Hide button when app is already installed
window.addEventListener('appinstalled', () => {
  const btn = document.getElementById('pwa-install-btn');
  if (btn) btn.style.display = 'none';
  deferredPrompt = null;
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createInstallButton);
} else {
  createInstallButton();
}
