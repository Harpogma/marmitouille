// public/worker.js
// Service Worker - stratégie "Cache then Network" (stale-while-revalidate light)
// Toutes les requêtes sont interceptées : on sert le cache si dispo, sinon on
// laisse passer la requête, on la met en cache et on retourne la réponse.

const CACHE_NAME = 'marmitouille-v1';

// ─── Installation ─────────────────────────────────────────────────────────────
self.addEventListener('install', (event) => {
  // Pré-cache les ressources essentielles de l'app shell
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        '/',
        '/src/style.css',
        '/src/index.js',
      ])
    )
  );
  self.skipWaiting();
});

// ─── Activation ───────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  // Supprimer les anciens caches
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ─── Interception des requêtes ────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Ressource trouvée en cache → on la sert directement
        return cached;
      }

      // Pas en cache → on laisse passer la requête réseau
      return fetch(event.request).then(networkResponse => {
        // On ne met en cache que les requêtes GET réussies
        if (
          event.request.method === 'GET' &&
          networkResponse.status === 200
        ) {
          const cloned = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache =>
            cache.put(event.request, cloned)
          );
        }
        return networkResponse;
      });
    })
  );
});
