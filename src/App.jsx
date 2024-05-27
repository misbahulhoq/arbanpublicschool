import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import "./App.css";
import app from "./firebase";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const auth = getAuth(app);

  const provider = new GoogleAuthProvider();

  const handleGooglSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        console.log("error ", error.message);
      });
  };

  const handleGooglSignOut = () => {
    signOut(auth).then(setMessage("You have successfully signed out"));
  };

  return (
    <>
      <h1>I am the home page</h1>
      <h2 style={{ cursor: "pointer" }} onClick={handleGooglSignIn}>
        Sign In
      </h2>

      <h2 onClick={handleGooglSignOut}>Sign Out</h2>

      {user && (
        <div>
          <h3>{user?.displayName}</h3>
          <h3>{user?.email}</h3>
          <img src={user?.photoURL} />
        </div>
      )}

      <h2>{message}</h2>
    </>
  );
}

export default App;
