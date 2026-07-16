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
	'/img/cook.png'
	'/img/ball.gif'
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
            }
        )
    );
});
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/index.html')
    );
});
