import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "@/App";
// Internal components
import { Toaster } from "@/components/ui/toaster.tsx";
import { WalletProvider } from "@/components/WalletProvider.tsx";
import { WrongNetworkAlert } from "@/components/WrongNetworkAlert";
//import { createBrowserRouter, RouterProvider } from "react-router-dom";

const queryClient = new QueryClient();

// const router = createBrowserRouter([
//   {
//     path: "/home",
//     element: <div>Hello world!</div>,
//   },
//   {
//     path: "/",
//     element: <App />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WalletProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <WrongNetworkAlert />
        <Toaster />
      </QueryClientProvider>
    </WalletProvider>
  </React.StrictMode>,
);
