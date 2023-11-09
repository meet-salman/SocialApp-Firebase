import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";


const signinForm = document.querySelector('#signin-form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const error = document.querySelector('#error');


signinForm.addEventListener('submit', (e) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            window.location = 'index.html'
        })
        .catch((err) => {
            const errorCode = err.code;
            const errorMessage = err.message;
            console.log(errorMessage);
            error.innerHTML = `${errorMessage}`
        });
});

