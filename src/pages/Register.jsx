import React, { use } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Register = () => {
  const { registerUser, updateUser } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegister = (data) => {
    // console.log(data);
    const profileImage = data.photo[0];
    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImage);
        const imageHostingURL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_host_image
        }`;
        axios
          .post(imageHostingURL, formData)
          .then((res) => {
            const userPhotoURL = res.data?.data?.url;
            const updateUserInfo = {
              displayName: data.name,
              photoURL: userPhotoURL,
            };

            // send user to db
            const userInfoToDB = {
              displayName: data.name,
              photoURL: userPhotoURL,
              email: data.email,
              role: data.role,
            };
            console.log(userInfoToDB);
            axiosSecure.post("/users", userInfoToDB).then((res) => {
              console.log(res.data);
            });
            // update user
            updateUser(updateUserInfo)
              .then(() => {
                console.log("user updated");
              })
              .catch((error) => console.log("user update error", error));
          })
          .catch((error) => {
            console.log(error);
          });
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up Now!</h2>
      <div className="card-body rounded-2xl px-20 shadow-2xl">
        <form onSubmit={handleSubmit(handleRegister)}>
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input outline-none w-full"
              placeholder="Your Name"
            />
            {errors.name && (
              <span className="text-xs text-red-500">Name is required</span>
            )}

            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input outline-none w-full"
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-xs text-red-500">Email is required</span>
            )}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="input outline-none w-full"
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-xs text-red-500">Password is required</span>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex-1">
                <label className="label">Photo</label>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="file-input file-input-primary outline-none w-full"
                />
                {errors.photo && (
                  <span className="text-xs text-red-500">
                    Photo is required
                  </span>
                )}
              </div>
              <div className="flex-1">
                <label className="label">Select Your Role</label>
                <select
                  className="select select-primary"
                  defaultValue=""
                  {...register("role", { required: true })}>
                  <option value="" disabled>
                    Pick Your Role
                  </option>
                  <option value="Borrower">Borrower</option>
                  <option value="Manager">Manager</option>
                </select>

                {errors.role && (
                  <span className="text-xs text-red-500">Role is required</span>
                )}
              </div>
            </div>

            <button className="btn btn-primary mt-4 w-full">Sign up</button>
          </fieldset>
          <p>
            Already have an account? Please{" "}
            <Link to="/auth/login" className="text-primary">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
