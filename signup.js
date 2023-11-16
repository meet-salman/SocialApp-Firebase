import { auth, db, storage } from "./config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";


const signupForm = document.querySelector('#signup-form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
let profilePic = document.querySelector('#profile-pic');
const error = document.querySelector('#error');





// REGISTER USER FUNCTION

signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    if (password.value === confirmPassword.value) {

        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User Details =>", user);


                // Upload profile picture
                profilePic = profilePic.files[0]
                const storageRef = ref(storage, name.value);

                uploadBytes(storageRef, profilePic).then(() => {

                    // Getting profile picture URL
                    getDownloadURL(storageRef).then((url) => {

                        // Add user to DB
                        addDoc(collection(db, "users"), {
                            name: name.value,
                            email: email.value,
                            uid: user.uid,
                            profilePic: url
                        })
                            .then(() => {
                                console.log("User added to db");
                                window.location = 'index.html'
                            })
                            .catch((rej) => {
                                console.log(rej);
                            });
                    });
                });
            })
            .catch((err) => {
                // const errorCode = err.code;
                const errorMessage = err.message;
                console.log(errorMessage);
                error.innerHTML = errorMessage;
            });

    } else {
        error.innerHTML = 'Password do not match'
    }
});




















