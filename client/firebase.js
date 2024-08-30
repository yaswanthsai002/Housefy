// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "housefy-bb5b9.firebaseapp.com",
  projectId: "housefy-bb5b9",
  storageBucket: "housefy-bb5b9.appspot.com",
  messagingSenderId: "524923176691",
  appId: "1:524923176691:web:ac173a0681784c58349986",
  measurementId: "G-WM8LLB3TEW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);