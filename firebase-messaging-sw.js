importScripts('https://www.gstatic.com/firebasejs/5.0.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.0.4/firebase-messaging.js');

const config = {
  messagingSenderId: "687255899047"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
  const options = {
    icon: payload.data.img,
    body: payload.data.url
  };
  return self.registration.showNotification(payload.title, options);
});
