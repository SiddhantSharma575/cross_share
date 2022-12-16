// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyA8g_1-EP4j7sJ1nydazrnWxsOVspOQliQ",
    authDomain: "linkedin-clone-da3dd.firebaseapp.com",
    projectId: "linkedin-clone-da3dd",
    storageBucket: "linkedin-clone-da3dd.appspot.com",
    messagingSenderId: "210572572839",
    appId: "1:210572572839:web:3645d262fe12bcb0270382",
    measurementId: "G-Q6HFC9F9Q1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }