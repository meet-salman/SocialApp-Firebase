const postForm = document.querySelector('#post-form');
const postDes = document.querySelector('#post-description');


import { auth, db } from "./config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";


const rightNow = new Date();
const hours = rightNow.getHours();
const minutes = rightNow.getMinutes();
const ampm = hours >= 12 ? 'PM' : 'AM';
const hours12 = hours % 12 || 12;
const time = `${hours12}:${minutes} ${ampm}`;



postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const docRef = await addDoc(collection(db, "posts"), {
            content: postDes.value,
            uid: auth.currentUser.uid,
            time: time
        });

        console.log("Document written with ID: ", docRef.id);
        postDes.value = ''
        window.location = 'index.html'

    } catch (e) {
        console.error("Error adding document: ", e);
    }

})


