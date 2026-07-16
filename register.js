if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(() => console.log('Service Worker зарегистрирован'))
        .catch(err => console.log('SW ошибка:', err));
}
setTimeout(() => {
    if (!document.querySelector('.pwa-toast')) {
        const toast = document.createElement('div');
        toast.className = 'pwa-toast';
        toast.innerHTML = `
            <div style="display:flex; align-items:center; gap:15px;">
                <span style="font-size:30px;">🥠</span>
                <div>
                    <div style="font-weight:bold; font-size:16px;">Судьба по печенькам</div>
                    <div style="font-size:14px; color:#aaa;">Вы получили новое предсказание! Загляните в раздел «Предсказания».</div>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="background:transparent; border:none; color:#00d4ff; font-size:20px; cursor:pointer;">×</button>
            </div>
        `;
        document.body.appendChild(toast);
    }
}, 3000);