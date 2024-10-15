const cacheName = "clean-master-v1";
const filesToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/android-chrome-192x192.png",
  "/icons/android-chrome-512x512.png",
  "/login",
  "/contact",
  "/services",
  "/register",
  "/bookings",
];

// Installerar service worker och cachea filer
self.addEventListener("install", (event) => {
  console.log("Service Worker installerad");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("Filer cachade:", filesToCache);
      return cache.addAll(filesToCache).catch((err) => {
        console.error("Cache misslyckades:", err);
      });
    })
  );
  // Tvingar service workern att direkt ta över
  self.skipWaiting();
});

// Aktiverar och rensar gamla cachar
self.addEventListener("activate", (event) => {
  console.log("Service Worker aktiverad");
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
  //service workern aktiv direkt
  return self.clients.claim();
});

// Hämtar filer från nätverket först, och fallback till cache vid nätverksfel
self.addEventListener("fetch", (event) => {
  console.log("Hämtar:", event.request.url);
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Om nätverksanropet lyckas, cachea svaret
        return caches.open(cacheName).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => {
        // Om nätverksanropet misslyckas, använd cache
        return caches.match(event.request);
      })
  );
});
