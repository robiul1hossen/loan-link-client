import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Login = () => {
  const { loginUser, loading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    loginUser(data.email, data.password)
      .then((res) => {
        navigate(`${location?.state ? location?.state : "/"}`);
        // send user to db
        const userInfoToDB = {
          displayName: res.user.displayName,
          photoURL: res.user.PhotoURL,
          email: data.email,
          role: "Borrower",
        };
        axiosSecure
          .post("/users", userInfoToDB)
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">Login Now!</h2>
      <div className="px-6 md:px-20">
        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
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
            <button className="btn btn-primary mt-4 w-full">Login</button>
          </fieldset>
          <p>
            New to this website? Please{" "}
            <Link to="/auth/register" className="text-primary">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
