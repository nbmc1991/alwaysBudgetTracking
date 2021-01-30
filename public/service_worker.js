<<<<<<< HEAD
const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

const iconSizes = ["192", "512"];
const iconFiles = iconSizes.map(size => `/icons/icon-${size}x${size}.png`);

=======
>>>>>>> aa78fa1981c9cc0ccc4bf49d893999d450adab6d
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/index.js',
    '/styles.css',
    '/service_worker.js',
<<<<<<< HEAD
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    '/manifest.webmanifest',
=======
    '/dist/app.bundle.js',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
>>>>>>> aa78fa1981c9cc0ccc4bf49d893999d450adab6d
    'https://fonts.googleapis.com/css?family=Istok+Web|Montserrat:800&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
];

<<<<<<< HEAD

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(PRECACHE).then((cache) => {
            console.log("Your files were pre-cached successfully!");
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== PRECACHE && key !== RUNTIME) {
                        console.log("Removing old cache data", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const { url } = event.request;
    // handle runtime GET requests for data from /api routes
    if (url.includes("/api/transaction")) {
=======
const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(PRECACHE)
            .then((cache) => cache.addAll(FILES_TO_CACHE))
            .then(self.skipWaiting())
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', (event) => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
            })
            .then((cachesToDelete) => {
                return Promise.all(
                    cachesToDelete.map((cacheToDelete) => {
                        return caches.delete(cacheToDelete);
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    // handle runtime GET requests for data from /api routes
    if (event.request.url.includes("/api/transaction")) {
>>>>>>> aa78fa1981c9cc0ccc4bf49d893999d450adab6d
        // make network request and fallback to cache if network request fails (offline)
        event.respondWith(
            caches.open(RUNTIME).then(cache => {
                return fetch(event.request)
                    .then(response => {
<<<<<<< HEAD
                        if (response.status === 200) {
                            cache.put(event.request, response.clone());
                        }
                        return response;
                    })
                    .catch(err => {
                        return cache.match(event.request);
                    });
            }).catch(err => console.log(err))
        );

    } else {
        // respond from static cache, request is not for /api/*
        event.respondWith(
            caches.open(PRECACHE).then(cache => {
                return cache.match(event.request).then(response => {
                    return response || fetch(event.request);
                });
            })
        );
    }
=======
                        cache.put(event.request, response.clone());
                        return response;
                    })
                    .catch(() => caches.match(event.request));
            })
        );
        return;
    }

>>>>>>> aa78fa1981c9cc0ccc4bf49d893999d450adab6d
});