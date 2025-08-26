// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-bf8da.firebaseapp.com",
  projectId: "mern-estate-bf8da",
  storageBucket: "mern-estate-bf8da.firebasestorage.app",
  messagingSenderId: "189565441388",
  appId: "1:189565441388:web:e7effe194a4267e5680f49"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);