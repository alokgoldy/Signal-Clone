import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCD5B_kl2EyqvzVTmo1n-RXcLjpG9cNpLU",
    authDomain: "signal-app-55ee8.firebaseapp.com",
    projectId: "signal-app-55ee8",
    storageBucket: "signal-app-55ee8.appspot.com",
    messagingSenderId: "1011046109339",
    appId: "1:1011046109339:web:da1ea025a99cef251df63e"
  };

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app;
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };