// Offline support. Change VERSION whenever index.html changes so phones pick up the update.
const VERSION = 'leave-register-v2';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'];
// Only these are cached. Google sign-in and Google Drive always go to the network.
const CACHEABLE = [self.location.origin, 'https://cdnjs.cloudflare.com', 'https://fonts.googleapis.com', 'https://fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// Serve from cache straight away, refresh the cache in the background.
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || !CACHEABLE.includes(url.origin)) return;
  e.respondWith(caches.open(VERSION).then(async cache => {
    const hit = await cache.match(e.request);
    const net = fetch(e.request).then(res => {
      if (res && (res.ok || res.type === 'opaque')) cache.put(e.request, res.clone());
      return res;
    }).catch(() => hit);
    return hit || net;
  }));
});
