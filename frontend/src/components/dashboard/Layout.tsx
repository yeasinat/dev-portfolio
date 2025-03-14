// Desc: Layout for dashboard

import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div>
      <Sidebar />
      <div >
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
