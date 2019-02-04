self.addEventListener('install', function(event) {
    console.log('service-worker install event in progress...');
    event.waitUntil(
      caches
        .open('sample-pwa-cache')
        .then(function(cache) {
          return cache.addAll([
            /*
            '/sample-pwa-app/',
            '/sample-pwa-app/index.html',
            '/sample-pwa-app/images/*',
            '/sample-pwa-app/css/*',
            '/sample-pwa-app/scripts/*'
            */
          ]);
        })
        .then(function() {
          console.log('service-worker install completed');
        })
    );
  });

self.addEventListener("activate", function(event) {
console.log('service-worker activate in progress...');
event.waitUntil(
    caches
    .keys()
    .then(function (keys) {
        // We return a promise that settles when all outdated caches are deleted.
        return Promise.all(
            keys.map(function (key) {
                return caches.delete(key);
            })
        );
    })
    .then(function() {
        console.log('service-worker activate completed.');
    })
);
});

self.addEventListener('fetch', function(event) {
    console.log('service-worker fetch requested: ' + event.request);
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
