import Navbar from "../components/ui/Navbar";
import About from "./About";
import ExperiencesPage from "./Experiences";
import Hero from "./Hero";
import ProjectsPage from "./Projects";
import Technologies from "./Technologies";
//import Projects from "./Projects";
// import Skills from "./Skills";
// import Experience from "./Experience";
// import Contact from "./Contact";

const Layout = () => {
  return (
    <div className="relative">
      {/* Background effects */}
      <div className="fixed inset-0 -z-20">
        <div className="bg-accent/5 absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl"></div>
        <div className="bg-primary/5 absolute right-1/3 bottom-1/3 h-64 w-64 rounded-full blur-2xl"></div>
        <div className="bg-secondary/3 absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"></div>
      </div>

      <Navbar />

      {/* Main content sections */}
      <main className="relative">
        <section id="hero" className="min-h-screen">
          <Hero />
        </section>

        <section id="about" className="min-h-screen">
          <About />
        </section>

        <section id="experience" className="min-h-screen">
          <ExperiencesPage />
        </section>

        <section id="technology" className="min-h-screen">
          <Technologies />
        </section>

        <section id="projects" className="min-h-screen">
          <ProjectsPage />
        </section>
        {/* Add more sections as you build them */}
        {/* 
        
        <section id="skills" className="min-h-screen">
          <Skills />
        </section>
        
        
        <section id="contact" className="min-h-screen">
          <Contact />
        </section>
        */}
      </main>

      {/* Scroll indicator */}
      <div className="fixed right-8 bottom-8 z-50">
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-accent/30 relative h-16 w-1 overflow-hidden rounded-full">
            <div
              className="bg-accent w-full animate-pulse rounded-full"
              style={{ height: "25%" }}
            ></div>
          </div>
          <span className="text-accent font-victor text-xs">Scroll</span>
        </div>
      </div>
    </div>
  );
};

export default Layout;
