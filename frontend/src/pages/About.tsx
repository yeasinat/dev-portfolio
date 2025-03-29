
const About = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-between px-8 py-16 lg:px-16">
      {/* Left side - Text content */}
      <div className="max-w-2xl space-y-6">
        <h1 className="font-doodle text-text text-5xl leading-tight font-bold">
          Hi, I'm <span className="text-accent">Yeasin</span> <br />
          Web Developer
        </h1>
        <h2 className="text-text/90 text-3xl font-medium">
        </h2>

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
