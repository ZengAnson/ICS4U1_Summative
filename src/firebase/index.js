import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your firebaseConfig from Firebase Console here
const firebaseConfig = {
    apiKey: "AIzaSyAM1x8xwIK8Y2445d-lscDH2e3AiLi5bxA",
    authDomain: "summative-1c03a.firebaseapp.com",
    projectId: "summative-1c03a",
    storageBucket: "summative-1c03a.firebasestorage.app",
    messagingSenderId: "138208681794",
    appId: "1:138208681794:web:dd4db9cd59be7d57fdb2db"
  };  

const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };