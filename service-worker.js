const CACHE_NAME = 'decompte-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/countdown.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Exemple simple pour mise à jour toutes les minutes
self.addEventListener('periodicsync', event => {
  if (event.tag === 'update-countdown') {
    event.waitUntil(
      fetch('/index.html') // Recharge les données pour le widget
    );
  }
});
