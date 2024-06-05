import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./Home.jsx";
import SignUp from "./components/SignUp.jsx";
import LogIn from "./components/LogIn.jsx";
import Results from "./components/Results.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/results",
        element: (
          <PrivateRoute>
            <Results />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
