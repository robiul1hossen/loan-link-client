// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrCqZvEYUiuqiitt2D-bi3IQVATbeRyTs",
  authDomain: "loan-link-99f33.firebaseapp.com",
  projectId: "loan-link-99f33",
  storageBucket: "loan-link-99f33.firebasestorage.app",
  messagingSenderId: "836975459762",
  appId: "1:836975459762:web:b104f675fd8a4ee47a38ab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
