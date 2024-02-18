import { useForm } from "react-hook-form";
import { user } from "../../util/types";

export const Register = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<user>();

  const onSubmit = (data: user) => {
    console.log("this is the data", data);
    reset();
  };

  return (
    <div>
      <h1 className="font-medium text-xl text-center pb-3 dark:text-white">Create Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} >
        {/* Create Account */}
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
          <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Already Have an Account? 
            <a href="/sign-in" className="text-blue-600 hover:underline dark:text-blue-500"> Signin </a></label>
        </div>
        <button type="submit" onClick={handleSubmit(onSubmit)} className="primary-btn">Create Account</button>
      </form>

    </div>
  );
}
