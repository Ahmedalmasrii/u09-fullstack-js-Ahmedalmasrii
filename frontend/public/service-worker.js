const cacheName = 'clean-master-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/android-chrome-192x192.png',
  '/icons/android-chrome-512x512.png',
  '/login',
  '/contact',
  '/services',
  '/register',
  '/bookings',

];

// Installerar service worker och cachea filer
self.addEventListener('install', (event) => {
  console.log('Service Worker installerad');
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Filer cachade:', filesToCache);
      return cache.addAll(filesToCache).catch((err) => {
        console.error("Cache misslyckades:", err);
      });
    })
  );
});

// Aktiverar och rensar gamla cachar
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [cacheName];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (!cacheWhitelist.includes(cache)) {
            console.log("Raderar gammal cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Hämtar filer från cache eller nätverket
self.addEventListener('fetch', (event) => {
  console.log('Hämtar:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch((err) => {
        console.error("Fetch-misslyckande:", err);
      });
    })
  );
});
