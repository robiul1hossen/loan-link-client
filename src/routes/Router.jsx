import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import LoanDetails from "../pages/LoanDetails";
import AllLoans from "../pages/AllLoans";
import ApplyLoanForm from "../pages/ApplyLoanForm";
import MainRoute from "../layouts/MainRoute";
import AuthRoute from "../layouts/AuthRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyLoan from "../pages/Dashboard/MyLoan";

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
      {
        path: "all-loans",
        Component: AllLoans,
      },
      {
        path: "loan-form",
        Component: ApplyLoanForm,
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
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "my-loan",
        Component: MyLoan,
      },
    ],
  },
]);
