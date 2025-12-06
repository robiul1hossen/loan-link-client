import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import AuthRoute from "./AuthRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainRoute from "./MainRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {
        index: true,
        Component: MainRoute,
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
