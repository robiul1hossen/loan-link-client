import React, { use } from "react";
import Title from "../../components/Title";
import { AuthContext } from "../../context/AuthContext";
import useRole from "../../hooks/useRole";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyProfile = () => {
  const { user, loading, logOutUser } = use(AuthContext);
  const { role, roleLoading } = useRole();
  const axiosSecure = useAxiosSecure();
  const { data: myData = {} } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile/${user?.email}`);
      return res.data;
    },
  });
  const handleLogout = () => {
    logOutUser()
      .then(() => {
        <Navigate to="/" />;
        toast.success("Successfully Signed Out");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  // console.log(myData);
  if (loading || roleLoading) {
    return <Loader />;
  }
  return (
    <div>
      <div className="mt-5">
        <Title
          text1={"My"}
          text2={"Profile"}
          text3={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut et repudiandae corporis quaerat quibusdam necessitatibus illo quae nostrum soluta."
          }
        />
      </div>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/pvkXhKnQ/snowy-mountains-sunset.jpg')",
        }}>
        <div className="backdrop-blur-xl bg-white/20 shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row max-w-4xl w-full">
          <div data-aos="fade-right" className="md:w-1/2 w-full">
            <img
              src={user.photoURL}
              alt="Profile"
              className="h-[400px] w-full object-cover"
            />
          </div>

          <div data-aos="fade-left" className="md:w-1/2 w-full p-8 text-white">
            <h2 className="text-3xl font-bold mb-2 tracking-wide">
              {user.displayName}
            </h2>
            <p className="text-lg opacity-90 mb-4">User Role: {role}</p>

            <div className="space-y-2">
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">Role Status:</span>{" "}
                {myData.roleStatus?.toUpperCase()}
              </p>
              {myData.message && myData.message !== "" ? (
                <p>
                  <span className="font-semibold">Suspend Note:</span>{" "}
                  {myData.message}
                </p>
              ) : (
                <></>
              )}
            </div>

            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="px-6 py-2 btn btn-primary font-semibold rounded-xl hover:btn-outline">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
