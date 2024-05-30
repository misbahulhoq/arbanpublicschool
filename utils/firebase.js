// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB97Fw0zi2pMJ0xm_LKb2DPgPiN9rNNsSI",
  authDomain: "fir-caaac.firebaseapp.com",
  projectId: "fir-caaac",
  storageBucket: "fir-caaac.appspot.com",
  messagingSenderId: "817216405766",
  appId: "1:817216405766:web:fbbb2573e8d7e3a0569e87",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
