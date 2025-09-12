import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login.tsx";
import MainPage from "./pages/MainPage.tsx";
import { ApiContext } from "./contexts/ApiContext.ts";
import { ApiClient } from "./api/client.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/main",
    element: <MainPage />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiContext.Provider value={new ApiClient()}>
      <RouterProvider router={router} />
    </ApiContext.Provider>
  </StrictMode>
);
