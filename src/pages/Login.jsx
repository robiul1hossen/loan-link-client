import { use } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { loginUser } = use(AuthContext);
  console.log(name);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    console.log(data);
    loginUser(data.email, data.password)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="card-body ">
        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
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
            <button className="btn btn-primary mt-4 w-full">Login</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
