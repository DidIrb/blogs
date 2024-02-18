import { useForm } from "react-hook-form";
import { user } from "../../util/types";

export const Login = () => {
  // Setting Up React Hook Forms
  // MANAGE FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<user>();

  const onSubmit = (data: user) => {
    console.log("this is the data", data);
    reset();
  };

  return (
    <div>
      <h1 className="font-medium text-xl text-center dark:text-white pb-3">Sign in</h1>
      <form onSubmit={handleSubmit(onSubmit)} >
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
          <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Don&apos;t Have an Account?
            <a href="/sign-up" className="text-blue-600 hover:underline dark:text-blue-500"> Create Account</a></label>
        </div>
        {/*  SUBMIT BUTTON */}
        <button type="submit" onClick={handleSubmit(onSubmit)} className="primary-btn ">Signin</button>
      </form>

    </div>
  );
};
