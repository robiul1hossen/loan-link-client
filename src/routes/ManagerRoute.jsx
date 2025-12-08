import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";
import useRole from "../hooks/useRole";
import Loader from "../components/Loader";

const ManagerRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) {
    return <Loader />;
  }
  if (!user) {
    <Navigate to="/auth/login" />;
  }
  if (role !== "Manager") {
    return (
      <h2 className="text-4xl text-warning">
        Forbidden! You are not a Manager
      </h2>
    );
  }
  return children;
};

export default ManagerRoute;
