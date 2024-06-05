import { useContext } from "react";
import PropTypes from "../propTypes";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (user) {
    return children;
  }

  return (
    <div>
      <h2 className="text-3xl">You must login to view this page</h2>
      <Navigate state={location.pathname} to="/login"></Navigate>
    </div>
  );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
