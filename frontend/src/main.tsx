import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/toast.css";

import "./index.css";
import NotFound from "./pages/NotFound.tsx";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import Project from "./components/projects/Projects.tsx";
import Technology from "./components/technologies/Technology.tsx";
import Experience from "./components/experiences/Experience.tsx";
import Login from "./components/auth/Login.tsx";
import { AuthProvider } from "./context/authContext.tsx";
import Overview from "./components/dashboard/Overview.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import Layout from "./pages/Layout.tsx";
import DevDetails from "./components/dev/DevDetails.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",

    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),

    children: [
      {
        path: "/dashboard/home",
        element: <Overview />,
      },
      {
        path: "/dashboard/projects",
        element: <Project />,
      },
      {
        path: "/dashboard/technologies",
        element: <Technology />,
      },
      {
        path: "/dashboard/experiences",
        element: <Experience />,
      },
      {
        path: "/dashboard/devdetails",
        element: <DevDetails />,
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
