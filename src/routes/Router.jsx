import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import AuthRoute from "./AuthRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainRoute from "./MainRoute";
import LoanDetails from "../pages/LoanDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainRoute,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "loan-details/:id",
        element: <LoanDetails />,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthRoute,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);
