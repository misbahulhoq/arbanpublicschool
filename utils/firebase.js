// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsQ6T_GodD9zdY1Z-JK0kX8HfOLkMEc30",
  authDomain: "arbanpublicschool.firebaseapp.com",
  projectId: "arbanpublicschool",
  storageBucket: "arbanpublicschool.appspot.com",
  messagingSenderId: "1051498801878",
  appId: "1:1051498801878:web:1299753faf3b89bbfa3777",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
