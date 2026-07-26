// ================================================
//  PWA Auto‑Injection – Yadav Authentication Project
//  Adds manifest, theme color, service worker,
//  and install button (SVG arrow) to every page.
// ================================================

(function () {
  // ---------- Inject <link> and <meta> into <head> ----------
  if (!document.querySelector('link[rel="manifest"]')) {
    var manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = 'manifest.json';
    document.head.appendChild(manifestLink);
  }

  if (!document.querySelector('meta[name="theme-color"]')) {
    var metaTheme = document.createElement('meta');
    metaTheme.name = 'theme-color';
    metaTheme.content = '#191919';
    document.head.appendChild(metaTheme);
  }

  // ---------- Register Service Worker ----------
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function (err) {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

  // ---------- Install Button (SVG arrow before hamburger) ----------
  var deferredPrompt;

  function createInstallButton() {
    var headerInner = document.querySelector('.header-inner');
    if (!headerInner || document.getElementById('pwa-install-btn')) return;

    var btn = document.createElement('button');
    btn.id = 'pwa-install-btn';
    btn.title = 'Install app';
    btn.setAttribute('aria-label', 'Install application');
    btn.style.cssText = 'background:none;border:none;cursor:pointer;padding:4px;margin-right:8px;display:none;align-items:center;justify-content:center;';

    // SVG download arrow (primary color)
    btn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color, #191919)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v14"/><polyline points="7 11 12 16 17 11"/><line x1="5" y1="21" x2="19" y2="21"/></svg>';

    btn.addEventListener('click', function () {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function (choiceResult) {
          console.log('PWA install outcome:', choiceResult.outcome);
          deferredPrompt = null;
          btn.style.display = 'none';
        });
      }
    });

    // Insert before the hamburger button (if present)
    var hamburger = headerInner.querySelector('.hamburger');
    if (hamburger) {
      headerInner.insertBefore(btn, hamburger);
    } else {
      headerInner.appendChild(btn);
    }
  }

  // Listen for the install prompt
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    var btn = document.getElementById('pwa-install-btn');
    if (btn) btn.style.display = 'flex';
  });

  // Hide button if app already installed
  window.addEventListener('appinstalled', function () {
    var btn = document.getElementById('pwa-install-btn');
    if (btn) btn.style.display = 'none';
    deferredPrompt = null;
  });

  // Create the button when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createInstallButton);
  } else {
    createInstallButton();
  }
})();
