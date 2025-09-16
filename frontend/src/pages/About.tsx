import { useFront } from "../hooks/useFront";

const About = () => {
  const { devData } = useFront();
  const { name, email } = devData || {};

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-8 py-16 text-center lg:px-16">
      <div className="max-w animate-fade-in space-y-8">
        {/* Background gradient blur */}
        <div className="absolute inset-0 -z-10">
          <div className="bg-accent/10 absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"></div>
          <div className="bg-primary/10 absolute top-1/3 right-1/3 h-64 w-64 rounded-full blur-2xl"></div>
        </div>

        {/* Main content with glass morphism effect */}
        <div className="bg-background/30 border-primary/20 rounded-2xl border p-8 shadow-2xl backdrop-blur-sm">
          <h1 className="font-jetBrains text-text text-6xl leading-tight font-bold transition-transform duration-300 hover:scale-105 md:text-7xl">
            I'm{" "}
            <span className="from-accent to-primary animate-pulse bg-gradient-to-r bg-clip-text text-transparent">
              {name}
            </span>{" "}
            <br />
          </h1>
          <h2 className="text-text/90 font-doodle hover:text-accent mt-4 text-2xl font-medium transition-colors duration-300 md:text-3xl">
            {email}
          </h2>

          {/* Decorative elements */}
          <div className="mt-8 flex justify-center space-x-4">
            <div className="bg-accent h-2 w-2 animate-bounce rounded-full"></div>
            <div
              className="bg-primary h-2 w-2 animate-bounce rounded-full"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="bg-secondary h-2 w-2 animate-bounce rounded-full"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
