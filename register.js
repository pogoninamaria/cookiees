if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then((reg) => {
            console.log('Service Worker зарегистрирован');
            setTimeout(() => {
                if ('Notification' in window && Notification.permission === 'default') {
                    Notification.requestPermission().then(perm => {
                        if (perm === 'granted') {
                            console.log('Разрешение получено!');
                        } else {
                            console.log('Пользователь запретил уведомления');
                        }
                    });
                }
            }, 3000); 
        })
        .catch(err => console.log('SW ошибка:', err));
}
async function subscribeUser(reg) {
    try {
        const subscription = await reg.pushManager.subscribe({
            userVisibleOnly: true,
        });
        console.log('Подписка создана:', subscription);

    } catch (err) {
        console.log('Ошибка подписки:', err);
    }
}

if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(reg => subscribeUser(reg));
}