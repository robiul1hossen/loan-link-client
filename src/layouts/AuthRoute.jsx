import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const AuthRoute = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col-reverse md:flex-row justify-center items-center max-w-11/12 mx-auto ">
        <div className="w-full">
          <Outlet />
        </div>
        <div className="w-full">
          <DotLottieReact
            src="https://lottie.host/482a8c6a-edf8-4adf-9489-789255187db5/D03IxfcvjL.lottie"
            loop
            autoplay
          />
        </div>
      </div>
    </>
  );
};

export default AuthRoute;
