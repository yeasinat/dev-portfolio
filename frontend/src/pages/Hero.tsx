// Desc: Home Page Hero Section
import { HiChevronRight } from "react-icons/hi2";
import { images } from "../config/images";

const Hero = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-4 py-8 sm:h-screen md:flex-row md:px-8 lg:px-16 lg:py-16">
      {/* Left side - Text content */}
      <div className="mb-10 w-full space-y-6 text-center md:mb-0 md:w-1/2 md:max-w-2xl md:text-left">
        <h1 className="font-poppins text-text text-4xl leading-tight font-bold sm:text-5xl">
          Full-Stack Software Developer
        </h1>
        <p className="font-victor text-text/70 text-base sm:text-lg">
          Passionate about building web applications and solving problems with
          code. I specialize in JavaScript technologies and frameworks. I am
          open to new opportunities and challenges.
        </p>

        <button className="text-accent group inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors">
          <span className="font-jetBrains text-lg sm:text-xl">About me</span>{" "}
          <HiChevronRight
            fontSize={20}
            className={
              "transition-transform duration-300 group-hover:rotate-90"
            }
          />
        </button>
      </div>

      {/* Right side - Image or illustration */}
      <div className="w-full max-w-xs sm:max-w-sm md:w-1/2 md:max-w-none">
        <div className="flex items-center justify-center">
          <div className=" flex h-[280px] w-[280px] items-center justify-center sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]">
            <div
              className="absolute inset-0 -z-10 rounded"
              style={{
                background:
                  "radial-gradient(circle, rgba(100,100,100,0.15) 2px, transparent 2px)",
                backgroundSize: "20px 20px",
              }}
            ></div>
            <span>
              <img
                src={images.hello}
                alt="Hello"
                className="h-48 w-48 object-contain sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-[500px] lg:w-[500px]"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
