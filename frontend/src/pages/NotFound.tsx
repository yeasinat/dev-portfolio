import { Link } from "react-router";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { HiArrowLongLeft } from "react-icons/hi2";

const NotFound = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl rounded-md sm:max-w-lg md:max-w-5xl">
        <DotLottieReact
          src="https://lottie.host/f9d9e1c8-6d68-4eae-8e25-8325f3e4b97e/fLUh9utoNB.lottie"
          loop
          autoplay
        />
      </div>

      <Link
        to="/"
        className="text-text hover:bg-secondary border-secondary font-jetBrains sm:text-md mt-6 inline-flex items-center justify-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-all duration-200 sm:gap-4 sm:px-4 sm:py-2"
      >
        <HiArrowLongLeft />
        Go back to homepage
      </Link>
    </div>
  );
};

export default NotFound;
