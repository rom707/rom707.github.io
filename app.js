const serverUrl = 'https://cc16cb31.ngrok.io';

const config = {
  messagingSenderId: "687255899047"
};

firebase.initializeApp(config);

if ('Notification' in window) {
  var messaging = firebase.messaging();

  messaging.onMessage(function(payload) {
    console.log('Message received. ', payload);

    navigator.serviceWorker.register('https://cc16cb31.ngrok.io/messaging-sw.js');

    Notification.requestPermission(function(result) {
      if (result === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
          new Notification(payload.notification.title, payload.notification);
          // payload.notification.data = payload.notification; // параметры уведомления
          // return registration.showNotification(payload.notification.title, payload.notification);
        }).catch(function(error) {
          console.log('ServiceWorker registration failed', error);
        });
      }
    });
  });

  if (Notification.permission === 'granted') {
    subscribe();
  }

  $('#subscribe').on('click', function () {
    subscribe();
  });
}

function subscribe() {
  messaging.requestPermission()
  .then(() => {
    console.log('Have permission');
    return messaging.getToken();
  })
  .then((token) => {
    sendTokenToServer(token);
  })
  .catch((err) => {
    console.log('Error Occured');
  });
}

function sendTokenToServer(currentToken) {
  // if (!isTokenSentToServer(currentToken)) {
    console.log('Отправка токена на сервер...');

    var url = `${serverUrl}/subscribe`;
    $.post(url, {
      token: currentToken
    });

  //   setTokenSentToServer(currentToken);
  // } else {
  //   console.log('Токен уже отправлен на сервер.');
  // }
}

// function isTokenSentToServer(currentToken) {
//   return window.localStorage.getItem('sentFirebaseMessagingToken') == currentToken;
// }
//
// function setTokenSentToServer(currentToken) {
//   window.localStorage.setItem(
//     'sentFirebaseMessagingToken',
//     currentToken ? currentToken : ''
//   );
// }
