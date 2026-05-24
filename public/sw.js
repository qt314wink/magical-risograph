const CACHE_NAME = 'mag-riso-v1';
const urlsToCache = ['/', '/index.html', '/favicon.svg', '/icons.svg'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(response => response || fetch(e.request)));
});
