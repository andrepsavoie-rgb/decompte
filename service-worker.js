const CACHE_NAME = 'decompte-cache-v1';
const urlsToCache = [
  '/decompte/',
  '/decompte/index.html',
  '/decompte/widget.html',
  '/decompte/manifest.json',
  '/decompte/countdown.js',
  '/decompte/icons/icon-192.png',
  '/decompte/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
