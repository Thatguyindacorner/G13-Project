// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-a93tnYa6Bd_thjdxLmnrAGYVL3SOJFs",
    authDomain: "g13movieproject.firebaseapp.com",
    projectId: "g13movieproject",
    storageBucket: "g13movieproject.appspot.com",
    messagingSenderId: "674863145961",
    appId: "1:674863145961:web:bf03e7305a29b86b74e178"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);