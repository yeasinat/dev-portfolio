import RightOverlay from "../components/ui/RightOverlay";
import LeftOverlay from "../components/ui/LeftOverlay";
import Hero from "./Hero";

const Layout = () => {
  return (
    <section className="grid min-h-screen grid-cols-[5%_90%_5%] md:grid-cols-[10%_80%_10%]">
      <aside className="hidden md:block">
        <LeftOverlay />
      </aside>

      <div>
        <Hero />
      </div>

      <aside className="hidden md:block">
        <RightOverlay />
      </aside>
    </section>
  );
};

export default Layout;
