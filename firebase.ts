// /lib/firebaseClient.ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Your Firebase configuration object from the Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyA70kBZ7WnFD0o9tLYpIOkS0Ils1C6Ct2I",
    authDomain: "codethon-130ab.firebaseapp.com",
    projectId: "codethon-130ab",
    storageBucket: "codethon-130ab.firebasestorage.app",
    messagingSenderId: "28388444581",
    appId: "1:28388444581:web:0cecee0afa98c64738c04c",
    measurementId: "G-4TC29X2WQS"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db, collection, addDoc };
