// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-state-31a09.firebaseapp.com",
  projectId: "real-state-31a09",
  storageBucket: "real-state-31a09.appspot.com",
  messagingSenderId: "329864215294",
  appId: "1:329864215294:web:aa8ef6b9e623f2a10403af"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);