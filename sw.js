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
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
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

self.addEventListener('push', function(event) {
    const data = event.data ? event.data.json() : {};

    const options = {
        body: data.body || 'Вы получили новое предсказание!',
        icon: data.icon || 'logo.png',
        badge: 'logo.png',
        vibrate: [200, 100, 200],
        data: {
            url: data.url || '/index.html' 
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'Судьба по печенькам', options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close(); 

    const urlToOpen = event.notification.data.url || '/index.html';

    event.waitUntil(
        clients.matchAll({ type: 'window' })
            .then(function(windowClients) {
                for (var i = 0; i < windowClients.length; i++) {
                    var client = windowClients[i];
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});