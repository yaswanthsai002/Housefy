// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "housefy-8ae71.firebaseapp.com",
  projectId: "housefy-8ae71",
  storageBucket: "housefy-8ae71.appspot.com",
  messagingSenderId: "429299291294",
  appId: "1:429299291294:web:caeb93be455b0ec7e0578f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
