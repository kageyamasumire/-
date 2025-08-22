// sw.js — シンプルなオフライン対応（HTMLはネット優先、その他はキャッシュ優先）
const CACHE = 'labcalc-v0-22-3';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const req = e.request;

  // ページ遷移はネット優先、オフライン時のみキャッシュHTML
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(r => {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put('./', copy));
        return r;
      }).catch(() => caches.match('./') || caches.match('./index.html'))
    );
    return;
  }

  // その他（画像/フォント等）はキャッシュ優先・裏で更新
  e.respondWith(
    caches.match(req).then(hit => {
      const fetchAndUpdate = fetch(req).then(net => {
        const copy = net.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return net;
      }).catch(() => hit);
      return hit || fetchAndUpdate;
    })
  );
});
