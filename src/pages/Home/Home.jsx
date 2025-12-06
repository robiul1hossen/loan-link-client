import React from "react";
import Navbar from "../../components/Navbar";
import Banner from "../../components/Banner";
import Login from "../Login";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Navbar />
      <Banner />
      {/* <Login /> */}
    </div>
  );
};

export default Home;
