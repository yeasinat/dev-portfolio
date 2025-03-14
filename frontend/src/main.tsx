import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";
import Hero from "./pages/Hero.tsx";
import NotFound from "./pages/NotFound.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import Project from "./components/projects/Project.tsx";
import Technology from "./components/technologies/Technology.tsx";
import Experience from "./components/experiences/Experience.tsx";
import Login from "./components/auth/Login.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import { AuthProvider } from "./context/authContext.tsx";

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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
