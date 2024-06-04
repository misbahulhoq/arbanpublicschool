import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./Home.jsx";
import SignUp from "./components/SignUp.jsx";
import LogIn from "./components/LogIn.jsx";
import Results from "./components/Results.jsx";
import ResultsContent from "./components/ResultsContent.jsx";

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
        path: "/results",
        element: (
          <Results>
            <ResultsContent />
          </Results>
        ),
      },
    ],
  },
]);

export default router;
