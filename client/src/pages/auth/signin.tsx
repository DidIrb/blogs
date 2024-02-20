import { useForm } from "react-hook-form";
import { AuthContextValue, user } from "../../util/types";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";

export const Signin = () => {
  const { signin } = useContext(AuthContext) as AuthContextValue;
  const navigate = useNavigate();
  const [err, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm<user>();

  const onSubmit = async (data: user) => { 
    console.log("this is the data", data);
    try {
      await signin(data);
      navigate("/home") 
    } catch (err: any) {
      console.log("Error inside Signin page", err)
      setError(err.response.data.message);
      setTimeout(() => { setError(null); }, 3000);
    }
  };

  return (
    <div>
      <h1 className="font-medium text-xl text-center dark:text-white pb-3">Sign in</h1>
      <form onSubmit={handleSubmit(onSubmit)} >
        {err && <div className="alert-danger" role="alert"> {err} </div>}
        <div className="text-sm text-red-500"></div>
        <div className="mb-3">
          <label className="label">Email address</label>
          <input type="email" placeholder="john.doe@company.com"
            className={`input ${errors.email ? "border-red-600 " : "border-gray-300 "}`}
            {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })} />
        </div>
        <div className="mb-3">
          <label className="label">Password</label>
          <input type="password" id="password" placeholder="•••••••••"
            className={`input ${errors.password ? "border-red-600 " : "border-gray-300 "}`}
            {...register("password", { required: true })}
          />
        </div>
        <div className="mb-3">
          <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Don&apos;t Have an Account?
            <Link to="/signup" className="text-blue-600 hover:underline dark:text-blue-500"> Create Account</Link></label>
        </div>
        {/*  SUBMIT BUTTON */}
        <button type="submit" onClick={handleSubmit(onSubmit)} className="primary-btn ">Sign In</button>
      </form>

    </div>
  );
};
