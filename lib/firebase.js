// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "linkup-95c9c.firebaseapp.com",
  projectId: "linkup-95c9c",
  storageBucket: "linkup-95c9c.appspot.com",
  messagingSenderId: "1072895058809",
  appId: "1:1072895058809:web:fb05c61cb5c1ff80cac5a8"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore()

export default db