import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { auth, db } from "./config.js";


const signupForm = document.querySelector('#signup-form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const error = document.querySelector('#error');





// REGISTER USER FUNCTION

signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    if (password.value === confirmPassword.value) {

        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);


                // ADD USER DETAILS TO DB

                addDoc(collection(db, "users"), {
                    name: name.value,
                    email: email.value,
                    uid: user.uid
                })
                    .then((res) => {
                        console.log("User added to db");
                        window.location = 'index.html'
                    })
                    .catch((rej) => {
                        console.log(rej);
                    })

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




















