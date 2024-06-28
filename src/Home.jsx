import { useContext } from "react";
import { AuthContext } from "./provider/AuthProvider";
import WelcomeMessage from "./components/home/WelcomeMessage";

function Home() {
  const authInfo = useContext(AuthContext);

  return (
    <>
      <WelcomeMessage />
    </>
  );
}

export default Home;
