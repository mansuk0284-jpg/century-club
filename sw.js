const CACHE_NAME = 'century-tennis-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.svg',
  './icon-512.svg',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&family=Gothic+A1:wght@700;800;900&family=Cormorant+Garamond:ital,wght@1,600&family=Cinzel:wght@600;700&display=swap'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE_NAME).then(c => { try { c.put(e.request, copy); } catch(_){} });
      return res;
    }).catch(() => cached))
  );
});