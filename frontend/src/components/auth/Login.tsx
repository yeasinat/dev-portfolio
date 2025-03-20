import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Login successful");
      navigate("/dev-portfolio/dashboard/home");
    },
    onError: () => {
      toast.error("Invalid credentials");
      // You could add toast notification here
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="border-accent/20 bg-background/80 w-full max-w-md rounded-lg border p-8 shadow-lg">
        <h2 className="text-primary mb-6 text-center text-2xl font-bold">
          Sign In
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="text-text mb-1 block font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="border-secondary bg-background focus:border-accent focus:ring-accent w-full rounded border p-2 focus:ring-1 focus:outline-none"
              placeholder="your@email.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="text-text mb-1 block font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="border-secondary bg-background focus:border-accent focus:ring-accent w-full rounded border p-2 focus:ring-1 focus:outline-none"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="focus:ring-opacity-50 bg-secondary text-background hover:bg-accent focus:ring-accent w-full rounded px-4 py-2 font-bold transition duration-200 focus:ring-2 focus:outline-none disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* <div className="mt-4 text-center">
          <a href="#" className="text-accent hover:text-primary text-sm">
            Forgot password?
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
