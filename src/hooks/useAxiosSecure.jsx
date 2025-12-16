import axios from "axios";
import React, { use, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "https://loan-link-server-lime.vercel.app",
});
const useAxiosSecure = () => {
  const { user, logOutUser } = use(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          logOutUser().then(() => {
            navigate("/auth/login");
          });
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOutUser, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
