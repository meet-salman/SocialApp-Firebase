import { auth } from "./config.js";
import { db } from "./config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { collection, query, where, orderBy, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";


const userName = document.querySelector('#user-name');
const signOutBtn = document.querySelector('#sign-out');
const allPostsBox = document.querySelector('#all-posts-box');




// CHECK USER LOGIN or LOGOUT

let currentUser = {}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        console.log(`User ID => ${uid}`);


        // GETTING USER DATA  

        const q = query(collection(db, "users"), where("uid", '==', uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {

            // currentUser.push(doc.data())
            currentUser = doc.data();
            console.log("LoggedIn User =>", currentUser);
            userName.innerHTML = `<i class="fa-regular fa-circle-user"></i> ${currentUser.name}`
        });


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
});




// RENDERING POSTS

const allPosts = []

function renderingData() {
    allPostsBox.innerHTML = ''

    allPosts.forEach(item => {

        allPostsBox.innerHTML += `
        <div id="post-box">
            <div id="post-details" class="d-flex justify-between padd-lr">
                <p>Post by User: ${currentUser.name} </p>
                <p> ${item.time} </p>
            </div>

            <div class="padd-lr">
                <p> ${item.content} </p>
            </div>

            <div class="padd-lr mt-2">
                <button class="edit-btn"> <i class="fa-regular fa-pen-to-square"></i> Edit</button>
                <button id="delete" class="dlt-btn"> <i class="fa-solid fa-trash"></i> Delete</button>
            </div>
        </div>
        `
    });

    const editBtn = document.querySelectorAll('.edit-btn');
    const dltBtn = document.querySelectorAll('#delete');

    dltBtn.forEach((btn, index) => {

        btn.addEventListener('click', async () => {
            await deleteDoc(doc(db, "posts", "DC"));
            console.log("dlt called");
        });
    });

};




// GETTING POSTS FROM FIREBASE DATABSE  

async function getAllPostDataFromFirebase() {

    const q = query(collection(db, "posts"), orderBy("time", "desc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

        // console.log(`Post ID => ${doc.id}`);
        // console.log(doc.data());

        allPosts.push(doc.data());
    });
    console.log(allPosts);

    renderingData();
};

getAllPostDataFromFirebase();













export { onAuthStateChanged, signOutBtn }






