import { useForm } from "react-hook-form";
import { AuthContextValue, user } from "../../util/types";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  const { signup } = useContext(AuthContext) as AuthContextValue;
  const navigate = useNavigate();
  const [err, setError] = useState(null);
  const [sMessage, setsMessage] = useState(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<user>();

  const onSubmit = async (data: user) => {
    console.log("this is the data", data);
    try {
      const res: any = await signup(data);
      setsMessage(res.message);
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (err: any) {
      console.log("Something went wrong", err);
      setError(err.response.data.message);
    }
    reset();
  };

  return (
    <div>
      <h1 className="font-medium text-xl text-center pb-3 dark:text-white">Create Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} >
        {/* Create Account */}
        {err && <div className="alert-danger" role="alert"> {err} </div>}
        {sMessage && <div className="alert-success" role="alert"> {sMessage} </div>}
        <div className="mb-3">
          <label className="label">Username</label>
          <input type="email" placeholder="John Doe"
            className={`input ${errors.username ? "border-red-600 " : "border-gray-300 "}`}
            {...register("username", { required: true })} />
        </div>
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
          <div className="flex items-start">
            <label className="label">Confirm password</label> <p className='text-red-500 text-xs ml-3 mt-1'>{errors.confirmPassword?.message}</p>
          </div>
          <input type="password" placeholder="•••••••••"
            className={`input ${errors.confirmPassword ? "border-red-600 " : "border-gray-300 "}`}
            {...register("confirmPassword", {
              required: true,
              validate: (val: string) => {
                if (watch('password') != val) {
                  return "Passwords do no match";
                }
              },
            })}
          />
        </div>
        <div className="mb-3">
          <label  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Already Have an Account? 
            <Link to="/signin" className="text-blue-600 hover:underline dark:text-blue-500"> Sign In </Link></label>
        </div>
        <button type="submit" onClick={handleSubmit(onSubmit)} className="primary-btn">Create Account</button>
      </form>
    </div>
  );
}
