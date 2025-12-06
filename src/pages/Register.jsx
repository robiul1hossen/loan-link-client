import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegister = (data) => {
    console.log(data);
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
