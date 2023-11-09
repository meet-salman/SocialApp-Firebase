import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";


const signupForm = document.querySelector('#signup-form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const error = document.querySelector('#error');


signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    if (password.value === confirmPassword.value) {

        createUserWithEmailAndPassword(auth, email.value, password.value)
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

    } else {
        error.innerHTML = 'Password do not match'
    }
});




















