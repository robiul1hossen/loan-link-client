import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    console.log(data);
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
