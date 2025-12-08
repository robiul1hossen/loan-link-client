import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";
import useRole from "../hooks/useRole";
import Loader from "../components/Loader";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <Loader />;
  }
  if (!user) {
    <Navigate to="/auth/login" />;
  }
  if (role !== "Admin") {
    return (
      <h2 className="text-4xl text-warning">Forbidden! You are not an Admin</h2>
    );
  }
  return children;
};

export default AdminRoute;
