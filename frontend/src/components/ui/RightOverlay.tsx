// Date: 03/18/2021
// Description: Left overlay component
import { HiChevronLeft } from "react-icons/hi2";

const RightOverlay = () => {
  const navigationItems = ["00", "01", "02", "03", "04"];

  return (
    <aside className="flex h-screen flex-col items-end justify-between bg-transparent py-20 mr-16">
      <div className="text-text text-lg font-bold border-2 px-10 border-accent hover:text-black rounded-md py-3 hover:bg-accent font-jetBrains transition-colors duration-500">Contact</div>
      <div>
        <ul className="border-secondary/30 flex flex-col gap-2 border-r-2 pr-2 font-poppins">
          {navigationItems.map((item, index) => (
            <li
              key={index}
              className="group hover:text-accent relative cursor-pointer py-2 transition-colors"
            >
              {/* This span appears on hover to create the accent border */}
              <span className="group-hover:bg-accent absolute inset-y-0 right-0 -mr-2 w-0.5 bg-transparent transition-all duration-200"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Scroll down text with animated down arrow */}
      <div className="group text-text/40 -mr-18 inline-flex rotate-270 cursor-pointer pb-10 text-sm font-medium font-poppins">
        <HiChevronLeft
          className="text-xl text-text transition-transform space-x-2 duration-500 ease-in-out group-hover:translate-x-[-8px] group-hover:text-accent"
          aria-hidden="true"
        />
        <span className="mb-2">Scroll down</span>
      </div>
    </aside>
  );
};

export default RightOverlay;
