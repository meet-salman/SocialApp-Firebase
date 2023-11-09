import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyAOM3b0uNj4_3DJokUk5XhBGMHrCzAu-uI",
    authDomain: "loginsignup-f486c.firebaseapp.com",
    projectId: "loginsignup-f486c",
    storageBucket: "loginsignup-f486c.appspot.com",
    messagingSenderId: "157602554692",
    appId: "1:157602554692:web:9b1e38d219a0a8a9606d11",
    measurementId: "G-TTMKQ91MFC"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);