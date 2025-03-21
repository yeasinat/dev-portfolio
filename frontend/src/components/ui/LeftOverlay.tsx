import { TfiGithub } from "react-icons/tfi";
const LeftOverlay = () => {
  return (
    <aside className="ml-20 flex h-screen flex-col items-center justify-between bg-transparent py-20">
      <h1 className="text-text font-poppins text-3xl font-bold tracking-[.25em]">
        DVLPR
      </h1>

      <a href="https://github.com/yeasinat" target="_blank" rel="noreferrer">
        <TfiGithub size={40} />
      </a>
    </aside>
  );
};

export default LeftOverlay;
