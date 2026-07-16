if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("sw.js")
    .then(function(reg){

        console.log("Service Worker зарегистрирован");

        if ("Notification" in window) {

            Notification.requestPermission().then(function(permission){

                if(permission === "granted"){

                    setTimeout(function(){

                        reg.showNotification("Судьба по печенькам",{

                            body:"Ваше новое предсказание уже ждёт вас!",

                            icon:"logo.png"

                        });

                    },5000);

                }

            });

        }

    });

}




