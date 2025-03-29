
import Navbar from "../components/ui/Navbar";
//import Projects from "./Projects";
// import Skills from "./Skills";
// import Experience from "./Experience";
// import Contact from "./Contact";

const Layout = () => {
  // const [activeSection, setActiveSection] = useState(0);
  // const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  // // Setup sections array for easy mapping
  // const sections = [
  //   { id: "hero", component: <Hero /> },
  //   { id: "about", component: <About /> },
  //   // { id: "projects", component: <Projects /> },
  //   // { id: "skills", component: <Skills /> },
  //   // { id: "experience", component: <Experience /> },
  //   // { id: "contact", component: <Contact /> }
  // ];

  // Setup intersection observer to track active section
  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.5,
  //   };

  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         const index = sectionsRef.current.findIndex(
  //           (ref) => ref === entry.target,
  //         );
  //         setActiveSection(index);
  //       }
  //     });
  //   }, options);

  //   // Observe all section elements
  //   sectionsRef.current.forEach((section) => {
  //     if (section) observer.observe(section);
  //   });

  //   return () => {
  //     sectionsRef.current.forEach((section) => {
  //       if (section) observer.unobserve(section);
  //     });
  //   };
  // }, []);

  return (
    <section className="">
      {/* <aside className="hidden md:block">
        <LeftOverlay />
      </aside>
      <aside className="hidden md:block">
        <RightOverlay />
      </aside> */}
      <Navbar />
    </section>
  );
};

export default Layout;
