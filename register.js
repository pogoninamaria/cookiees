if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then((registration) => {
            console.log('Service Worker зарегистрирован');
            
            Notification.requestPermission().then((perm) => {
                if (perm === 'granted') {
                    console.log('Разрешение на уведомления получено');
                   
                    setTimeout(() => {
                        if ('serviceWorker' in navigator) {
                            navigator.serviceWorker.ready.then((reg) => {
                                reg.showNotification('🥠 Судьба по печенькам', {
                                    body: 'Вы получили новое предсказание! Проверьте сайт.',
                                    icon: 'logo.png',
                                    vibrate: [200, 100, 200]
                                });
                            });
                        }
                    }, 3000);
                }
            });
        })
        .catch(err => console.log('SW ошибка:', err));
}