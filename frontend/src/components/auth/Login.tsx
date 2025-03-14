
import { useForm } from "react-hook-form";



// Create TypeScript type from schema
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

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Handle form submission logic
      console.log("Form submitted:", data);

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Handle successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="border-accent/20 bg-background/80 w-full max-w-md rounded-lg border p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-primary">
          Sign In
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1 block font-medium text-text"
            >
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
              className="mb-1 block font-medium text-text"
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

        <div className="mt-4 text-center">
          <a href="#" className="text-accent text-sm hover:text-primary">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
