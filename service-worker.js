self.addEventListener("install", function(event) {
    console.log('WORKER: install event in progress.');
    event.waitUntil(
      caches
        .open('sample-pwa-cache')
        .then(function(cache) {
          return cache.addAll([
            '/sample-pwa-app/',
            '/sample-pwa-app/index.html',
            '/sample-pwa-app/images/*',
            '/sample-pwa-app/css/*',
            '/sample-pwa-app/scripts/*',
            '/js/global.js'
          ]);
        })
        .then(function() {
          console.log('WORKER: install completed');
        })
    );
  });

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });
