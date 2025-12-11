import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

const MainRoute = () => {
  const { loading } = use(AuthContext);
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainRoute;
