import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCA-qzJWQXsqjLVZElBpKUTg01GvA35s2I",
    authDomain: "gym-management-50506.firebaseapp.com",
    projectId: "gym-management-50506",
    storageBucket: "gym-management-50506.appspot.com",
    messagingSenderId: "185225061977",
    appId: "1:185225061977:web:53a45f7932909244097348",
    measurementId: "G-GYMSB94KNM"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
