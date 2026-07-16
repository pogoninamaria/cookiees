const CACHE_NAME = 'fortune-cache-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/predictions.html',
    '/history.html',
    '/categories.html',
    '/style.css',
    '/manifest.json',
    '/sw.js',
    '/logo.png',
    '/img/cookie.png'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
