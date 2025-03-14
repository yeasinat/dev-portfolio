import { adminNavLinks } from "../../utils";
import { Link, useLocation } from "react-router";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

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
        <div className="text-accent flex items-center space-x-3">
          <div className="bg-secondary flex h-8 w-8 items-center justify-center rounded-full">
            <span className="text-sm font-bold">YA</span>
          </div>
          <div>
            <p className="font-poppins text-sm">User Account</p>
            <p className="text-accent/70 text-xs">Admin</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
