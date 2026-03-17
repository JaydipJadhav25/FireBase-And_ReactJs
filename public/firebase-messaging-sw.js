importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDRvkPQOy_DbhZIY5taiY9c8Cdd_xesgHM",
  authDomain: "myfrist-app-59ce2.firebaseapp.com",
  projectId: "myfrist-app-59ce2",
  storageBucket: "myfrist-app-59ce2.firebasestorage.app",
  messagingSenderId: "464783055452",
  appId: "1:464783055452:web:88659e6532dfacb593a499",
  databaseURL: "https://myfrist-app-59ce2-default-rtdb.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});