// Desc: Layout for dashboard

import { Outlet } from "react-router";

import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

const Layout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isMobile ? (
    <div className="bg-background flex h-screen w-full items-center justify-center p-6 text-center">
      <div className="border-secondary/30 bg-secondary/5 rounded-lg border p-8 shadow-lg">
        <h2 className="font-poppins text-accent mb-4 text-2xl font-bold">
          Mobile Access Limited
        </h2>
        <p className="font-victor text-text text-sm sm:text-base">
          The admin dashboard is designed for larger screens. Please access this
          panel from a desktop or tablet device.
        </p>
      </div>
    </div>
  ) : (
    <div className="bg-background flex h-screen w-full">
      <Sidebar />
      <div className="ml-64 flex-1 p-6">
        <div className="border-secondary/10 bg-secondary/5 min-h-[calc(100vh-3rem)] rounded-lg border p-6 shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
