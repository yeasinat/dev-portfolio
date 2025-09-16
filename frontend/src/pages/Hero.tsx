// Desc: Home Page Hero Section
import Typewriter from "typewriter-effect";
import { HiChevronRight } from "react-icons/hi2";

import { images } from "../config/images";
import Button from "../components/ui/Button";

const Hero = () => {
  // const { devData, devDataLoading } = useFront();

  return (
    <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 overflow-hidden px-4 py-8 sm:h-screen md:flex-row md:px-8 lg:px-16 lg:py-16">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="bg-accent/10 animate-float absolute top-1/4 left-1/4 h-72 w-72 rounded-full blur-3xl"></div>
        <div
          className="bg-primary/10 animate-float absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="dotted_bg opacity-20"></div>
      </div>

      {/* Left side - Text content */}
      <div className="animate-fade-in mt-20 mb-10 w-full space-y-8 text-center md:mb-0 md:w-1/2 md:max-w-2xl md:text-left">
        <div className="space-y-4">
          <h1 className="font-poppins text-text text-start text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            <span className="text-accent mb-2 block text-start">
              <Typewriter
                options={{
                  strings: ["Frontend", "Backend", "Full-Stack"],
                  autoStart: true,
                  loop: true,
                  cursor: "_",
                  delay: 100,
                  deleteSpeed: 50,
                }}
              />
            </span>
            <span className="from-text to-primary bg-gradient-to-r bg-clip-text text-transparent">
              Software Developer
            </span>
          </h1>
        </div>

        <p className="font-victor text-text/80 text-lg leading-relaxed sm:text-xl">
          Passionate about building{" "}
          <span className="text-accent font-semibold">
            modern web applications
          </span>{" "}
          and solving complex problems with elegant code. I specialize in{" "}
          <span className="text-primary font-semibold">
            JavaScript technologies
          </span>{" "}
          and cutting-edge frameworks.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row md:items-start">
          <Button variant="primary" className="group">
            <span className="font-jetBrains text-lg">Get Started</span>
            <HiChevronRight
              fontSize={20}
              className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Button>

          <Button variant="outline" className="group">
            <span className="font-jetBrains text-lg">About me</span>
            <HiChevronRight
              fontSize={20}
              className="ml-2 transition-transform duration-300 group-hover:rotate-90"
            />
          </Button>
        </div>

        {/* Social proof or stats */}
        <div className="flex justify-center space-x-8 pt-8 md:justify-start">
          <div className="text-center">
            <div className="text-accent text-2xl font-bold">3+</div>
            <div className="text-text/60 font-victor text-sm">
              Years Experience
            </div>
          </div>
          <div className="text-center">
            <div className="text-primary text-2xl font-bold">50+</div>
            <div className="text-text/60 font-victor text-sm">
              Projects Built
            </div>
          </div>
          <div className="text-center">
            <div className="text-secondary text-2xl font-bold">100%</div>
            <div className="text-text/60 font-victor text-sm">
              Client Satisfaction
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image or illustration */}
      <div className="animate-fade-in w-full max-w-xs sm:max-w-sm md:w-1/2 md:max-w-none">
        <div className="relative flex items-center justify-center">
          {/* Glowing background */}
          <div className="from-accent/20 to-primary/20 animate-glow absolute inset-0 rounded-full bg-gradient-to-r blur-2xl"></div>

          <div className="hover-lift relative flex h-[280px] w-[280px] items-center justify-center sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]">
            {/* Background pattern */}
            <div
              className="absolute inset-0 -z-10 rounded-full opacity-30"
              style={{
                background:
                  "radial-gradient(circle, rgba(144, 215, 200, 0.3) 2px, transparent 2px)",
                backgroundSize: "20px 20px",
              }}
            ></div>

            {/* Floating decorative elements */}
            <div className="bg-accent absolute top-10 left-10 h-4 w-4 animate-bounce rounded-full opacity-60"></div>
            <div
              className="bg-primary absolute top-20 right-16 h-3 w-3 animate-bounce rounded-full opacity-40"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="bg-secondary absolute bottom-16 left-20 h-2 w-2 animate-bounce rounded-full opacity-50"
              style={{ animationDelay: "1s" }}
            ></div>

            {/* Main image with enhanced styling */}
            <div className="relative">
              <img
                src={images.hello}
                alt="Hello"
                className="animate-float h-48 w-48 object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-[400px] lg:w-[400px]"
              />
              {/* Image glow effect */}
              <div className="from-accent/30 to-primary/30 absolute inset-0 -z-10 rounded-full bg-gradient-to-r blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
