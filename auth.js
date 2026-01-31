// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEYtS3wrSfidCp8r_6H4vy4vpL-pUzzSw",
  authDomain: "smart-student-planner-57582.firebaseapp.com",
  projectId: "smart-student-planner-57582",
  storageBucket: "smart-student-planner-57582.firebasestorage.app",
  messagingSenderId: "458313066296",
  appId: "1:458313066296:web:ea9d274a348c3e0475c3cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Signup successful!");
            window.location.href = "index.html";
        })
        .catch(err => alert(err.message));
}

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch(err => alert(err.message));
}
