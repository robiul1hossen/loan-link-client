import React, { use } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Register = () => {
  const { registerUser, updateUser } = use(AuthContext);
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
            console.log(updateUserInfo);
            updateUser(updateUserInfo)
              .then(() => console.log("user updated"))
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
      <div className="card-body ">
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
            <label className="label">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input file-input-primary outline-none w-full"
            />
            {errors.photo && (
              <span className="text-xs text-red-500">Photo is required</span>
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
            <button className="btn btn-primary mt-4 w-full">Sign up</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
