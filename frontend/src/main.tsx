import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import Hero from "./pages/Hero.tsx";
import NotFound from "./pages/NotFound.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import Project from "./components/projects/Projects.tsx";
import Technology from "./components/technologies/Technology.tsx";
import Experience from "./components/experiences/Experience.tsx";
import Login from "./components/auth/Login.tsx";
// import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import { AuthProvider } from "./context/authContext.tsx";
import Overview from "./components/dashboard/Overview.tsx";
import ProjectDetails from "./components/projects/ProjectDetails.tsx";
import AddProject from "./components/projects/AddProject.tsx";

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
    // TODO: Wrap the Dashboard component with the ProtectedRoute component
    element: <Dashboard />,

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
        path: "/dev-portfolio/dashboard/projects/new",
        element: <AddProject />,
      },
      {
        path: "/dev-portfolio/dashboard/projects/:id",
        element: <ProjectDetails />,
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
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
