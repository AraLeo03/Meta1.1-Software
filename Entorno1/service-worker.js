const CACHE_NAME = "todo-cache-v3";

const APP_SHELL = [
  "./index.html",
  "./css/styles.css",
  "./js/app.js",
  "./js/ui.js",
  "./js/tasks.js",
  "./js/storage.js",
  "./manifest.json",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      // Usamos cache.addAll que es más eficiente para arrays
      try {
        await cache.addAll(APP_SHELL);
        console.log("Archivos cacheados correctamente");
      } catch (err) {
        console.error("Fallo en cache.addAll:", err);
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  // Limpieza de cachés viejas (Importante al cambiar versiones)
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  // Estrategia: Cache First, falling back to Network
  event.respondWith(
    caches.match(event.request).then(response => {
      // Si está en caché, lo devuelve
      if (response) {
        return response;
      }
      // Si no, intenta buscarlo en red
      return fetch(event.request);
    })
  );
});