// import { Navigate, useLocation } from "react-router";
// import { AuthContext } from "../context/AuthContext";
// import { use, useContext } from "react";
// import Loader from "../components/Loader";

// const PrivateRoute = ({ children }) => {
//   const { user, loading } = useContext(AuthContext);
//   const location = useLocation();

//   if (loading) {
//     return <Loader />;
//   }
//   if (!user) {
//     return <Navigate state={location?.pathname} to="/auth/login"></Navigate>;
//   }
//   return children;
// };

// export default PrivateRoute;
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/auth/login" state={location?.pathname} replace />;
  }

  return children;
};

export default PrivateRoute;
