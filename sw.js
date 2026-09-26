const CACHE_NAME = 'century-tennis-v28';
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

// 앱 본체는 "네트워크 우선": 새 배포가 다음 실행 때 바로 반영되고, 오프라인이면 캐시로 실행
function networkFirst(req) {
  return new Promise(resolve => {
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      caches.match(req).then(cached => resolve(cached || fetch(req)));
    }, 3500);
    fetch(req).then(res => {
      if (settled) {  // 타임아웃 후 늦게 도착 → 다음 실행을 위해 캐시만 갱신
        if (res && res.ok) caches.open(CACHE_NAME).then(c => { try { c.put(req, res); } catch (_) {} });
        return;
      }
      clearTimeout(timer);
      settled = true;
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(c => { try { c.put(req, copy); } catch (_) {} });
        resolve(res);
      } else {
        caches.match(req).then(cached => resolve(cached || res));
      }
    }).catch(() => {
      if (settled) return;
      clearTimeout(timer);
      settled = true;
      caches.match(req).then(cached => resolve(cached || caches.match('./index.html')));
    });
  });
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;  // Firebase 등 GET 외 요청은 개입하지 않음
  const url = new URL(req.url);
  const isShell = req.mode === 'navigate' ||
    (url.origin === location.origin && url.pathname.endsWith('/index.html'));
  if (isShell) {
    e.respondWith(networkFirst(req));
    return;
  }
  // 정적 자원: 캐시 우선 + 백그라운드 갱신
  e.respondWith(
    caches.match(req).then(cached => {
      const fp = fetch(req).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => { try { c.put(req, copy); } catch (_) {} });
        }
        return res;
      }).catch(() => cached);
      return cached || fp;
    })
  );
});
