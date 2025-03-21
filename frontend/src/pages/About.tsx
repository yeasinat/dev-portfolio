
const About = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-between px-8 py-16 lg:px-16">
      {/* Left side - Text content */}
      <div className="max-w-2xl space-y-6">
        <h1 className="font-doodle text-text text-5xl leading-tight font-bold">
          Hi, I'm <span className="text-accent">Your Name</span>
        </h1>
        <h2 className="text-text/90 text-3xl font-medium">
          Software Developer & Designer
        </h2>
        <p className="text-text/70 text-lg">
          I create engaging web experiences with clean, efficient code.
          Passionate about building accessible and user-friendly applications.
        </p>
        <div className="flex gap-4 pt-4">
          <button className="bg-primary hover:bg-primary/90 rounded-lg px-6 py-3 font-medium text-white transition-colors">
            View Projects
          </button>
          <button className="border-text/20 hover:border-primary text-text rounded-lg border px-6 py-3 font-medium transition-colors">
            Contact Me
          </button>
        </div>
      </div>

      {/* Right side - Image or illustration */}
      <div className="hidden md:block">
        <div className="bg-primary/20 flex h-80 w-80 items-center justify-center rounded-full">
          {/* You can replace this with an actual image */}
          <div className="bg-primary/40 flex h-64 w-64 items-center justify-center rounded-full">
            <span className="font-doodle text-text text-xl">
              Your Image Here
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
