import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/toast.css";

import "./index.css";
import Hero from "./pages/Hero.tsx";
import NotFound from "./pages/NotFound.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import Project from "./components/projects/Projects.tsx";
import Technology from "./components/technologies/Technology.tsx";
import Experience from "./components/experiences/Experience.tsx";
import Login from "./components/auth/Login.tsx";
import { AuthProvider } from "./context/authContext.tsx";
import Overview from "./components/dashboard/Overview.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/dev-portfolio/",
    element: <Hero />,
    errorElement: <NotFound />,
  },
  {
    path: "/dev-portfolio/login",
    element: <Login />,
  },
  {
    path: "/dev-portfolio/dashboard",

    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),

    children: [
      {
        path: "/dev-portfolio/dashboard/home",
        element: <Overview />,
      },
      {
        path: "/dev-portfolio/dashboard/projects",
        element: <Project />,
      },
      {
        path: "/dev-portfolio/dashboard/technologies",
        element: <Technology />,
      },
      {
        path: "/dev-portfolio/dashboard/experiences",
        element: <Experience />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastClassName="bg-[#070d0c] border border-[#208f77]/30 text-[#e5ebea] rounded-md shadow-lg"
          progressClassName="bg-[#32e9c1]"
        />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
