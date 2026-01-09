import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/Router.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="text-white bg-[url(https://i.ibb.co.com/gLdZT1N5/vecteezy-minimalist-deep-blue-premium-abstract-background-with-luxury-27157752.jpg)]">
          <RouterProvider router={router} />
          <ToastContainer />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
