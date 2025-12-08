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
import PrivateRoute from "./PrivateRoute";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import RoleUpdate from "../pages/Dashboard/RoleUpdate";
import AllLoanApplication from "../pages/Dashboard/AllLoanApplication";
import AllLoanAdmin from "../pages/Dashboard/AllLoanAdmin";
import UpdateLoan from "../pages/Dashboard/UpdateLoan";
import AddLoan from "../pages/Dashboard/AddLoan";
import AdminRoute from "./AdminRoute";

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
    element: (
      <PrivateRoute>
        {" "}
        <DashboardLayout />{" "}
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-loan",
        Component: MyLoan,
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "update-role/:id",
        element: (
          <AdminRoute>
            <RoleUpdate />
          </AdminRoute>
        ),
      },
      {
        path: "all-loan-application",
        element: (
          <AdminRoute>
            <AllLoanApplication />
          </AdminRoute>
        ),
      },
      {
        path: "all-loans-admin",
        element: (
          <AdminRoute>
            <AllLoanAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "update-loan/:id",
        Component: UpdateLoan,
      },
      {
        path: "add-loan",
        Component: AddLoan,
      },
    ],
  },
]);
