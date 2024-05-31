// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAgg-UUaYGkIrBKF8zSu4-x68uucVsQwE",
  authDomain: "arban-public-school.firebaseapp.com",
  projectId: "arban-public-school",
  storageBucket: "arban-public-school.appspot.com",
  messagingSenderId: "438255228914",
  appId: "1:438255228914:web:97352b295e7ecd8980bd6b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
