const CACHE_NAME = 'yadav-auth-v1';
const urlsToCache = [
  '/authp/',
  '/authp/index.html',
  '/authp/auth.html',
  '/authp/dashboard.html',
  '/authp/style.css',
  '/authp/script.js',
  '/authp/firebase.js',
  '/authp/shield-icon.svg',
  '/authp/favicon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
