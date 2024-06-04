import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";

const Results = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? (
    <div>{children}</div>
  ) : (
    <div className="container-center my-9 flex flex-col items-center justify-center space-y-4">
      <h2 className="text-center text-2xl font-medium">
        You must login to view this page
      </h2>
      <Link to="/login" className="btn btn-accent text-center">
        Go To Login Page
      </Link>
    </div>
  );
};

export default Results;
