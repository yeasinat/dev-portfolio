import { Link, useLocation } from "react-router";
import { HiArrowRightStartOnRectangle } from "react-icons/hi2";

import { useAuth } from "../../context/authContext";
import SidebarProfile from "./SidebarProfile";
import { adminNavLinks } from "../../constants";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const { logout } = useAuth();

  return (
    <nav className="border-secondary/30 fixed top-0 left-0 h-screen w-64 border-r p-4">
      <div className="mb-8">
        <h1 className="font-poppins text-accent text-2xl font-bold">
          DevPortfolio
        </h1>
      </div>
      <ul className="space-y-2">
        {adminNavLinks.map((link, index) => (
          <li key={index}>
            <Link
              to={link.path}
              className={`font-jetBrains flex items-center rounded-md p-3 transition-all duration-200 ${
                currentPath === link.path
                  ? "border-accent bg-secondary/20 text-accent border-l-2"
                  : "text-text hover:bg-secondary/10 hover:text-accent"
              }`}
            >
              {link.icon && <span className="mr-3">{link.icon}</span>}
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="border-secondary/30 absolute bottom-0 left-0 w-full border-t p-4">
        <SidebarProfile />

        <button
          onClick={logout}
          className="font-jetBrains text-text hover:text-accent bg-secondary/5 hover:bg-secondary/20 flex w-full items-center justify-center rounded-md p-2 text-sm transition-colors duration-200"
        >
          <HiArrowRightStartOnRectangle className="mr-2 text-lg"/>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
