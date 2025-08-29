import { TfiGithub } from "react-icons/tfi";
import { BsTerminal } from "react-icons/bs";

const LeftOverlay = () => {
  return (
    <aside className="ml-20 flex h-screen flex-col items-center justify-between bg-transparent py-20">
      <h1 className="text-text font-poppins text-3xl font-bold tracking-[.25em] inline-flex items-center gap-3 ml-20">
      <BsTerminal /> DVLPR
      </h1>

      <a href="https://github.com/yeasinat" target="_blank" rel="noreferrer" className="mr-18" >
        <TfiGithub size={40} />
      </a>
    </aside>
  );
};

export default LeftOverlay;
