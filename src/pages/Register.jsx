import React, { use } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Register = () => {
  const { registerUser, updateUser, loginWithGoogle } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegister = (data) => {
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
            axiosSecure.post("/users", userInfoToDB).then(() => {});
            // update user
            updateUser(updateUserInfo)
              .then(() => {
                navigate(`${location?.state ? location?.state : "/"}`);
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then((res) => {
        const userInfoToDB = {
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
          email: res.user.email,
          role: "Borrower",
        };
        axiosSecure.post("/users", userInfoToDB).then(() => {});
        // update user
        const updateUserInfo = {
          displayName: res.user.displayName,
          photoURL: res.user.photoURL,
        };
        updateUser(updateUserInfo)
          .then(() => {
            navigate(`${location?.state ? location?.state : "/"}`);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => toast.error(error.message));
  };
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up Now!</h2>
      <div className="px-6 md:px-20 ">
        <form onSubmit={handleSubmit(handleRegister)}>
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input outline-none w-full shadow-xl"
              placeholder="Your Name"
            />
            {errors.name && (
              <span className="text-xs text-red-500">Name is required</span>
            )}

            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input outline-none w-full shadow-xl"
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-xs text-red-500">Email is required</span>
            )}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="input outline-none w-full shadow-xl"
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-xs text-red-500">Password is required</span>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <div className="flex flex-col md:flex-row gap-2 items-center">
              <div className="flex-1">
                <label className="label">Photo</label>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="file-input file-input-primary outline-none w-full shadow-xl"
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
                  className="select select-primary shadow-xl"
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

            <button className="btn btn-primary mt-4 w-full shadow-xl">
              Sign up
            </button>
            <button
              onClick={handleGoogleLogin}
              className="btn bg-white text-black border-[#e5e5e5] shadow-xl">
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                </g>
              </svg>
              Login with Google
            </button>
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
