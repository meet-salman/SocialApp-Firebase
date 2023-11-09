import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { db } from "./config.js";


const signOutBtn = document.querySelector('#sign-out');
const allPostsBox = document.querySelector('#all-posts-box');


// CHECK USER LOGIN or LOGOUT

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(`User ID => ${uid}`);

    } else {
        console.log('Logged Out');
        window.location = 'signin.html'
    }
});



// SIGNOUT BUTTON FUNCTION

signOutBtn.addEventListener('click', () => {

    signOut(auth).then(() => {
        window.location = 'signin.html'
    }).catch((err) => {
        console.log(err);
    });
})






// GETTING POSTS & RENDER IT FROM FIREBASE DATABSE  

async function getDataFromFirebase() {
    const allPosts = []
    allPostsBox.innerHTM = ''

    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {

        // console.log(`Post ID => ${doc.id}`);
        // console.log(doc.data());

        allPosts.push(doc.data())
    });
    console.log(allPosts);

    allPosts.forEach(item => {

        allPostsBox.innerHTML += `
        <div id="post-box">
            <div id="post-details" class="d-flex justify-between padd-lr">
                <p>Post by User: ${item.uid} </p>
                <p> ${item.time} </p>
            </div>

            <div class="padd-lr">
                <p> ${item.content} </p>
            </div>
        </div>
        `

    });
};

getDataFromFirebase()













