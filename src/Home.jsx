import { useContext } from "react";
import { AuthContext } from "./provider/AuthProvider";

function Home() {
  const authInfo = useContext(AuthContext);

  return (
    <>
      <h1>I am the home page</h1>
    </>
  );
}

export default Home;
