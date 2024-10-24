import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContextProvider } from "./contexts/ToastContext";
import { SignInContextProvider } from "./contexts/SignInContext.jsx";
import {
  protectedRouteslinks,
  publicRoutes,
} from "./Components/Routes/index.js";
import ProtectRoutes from "./Components/Routes/ProtectRoutes.tsx";

const protectedRoutes = protectedRouteslinks?.flatMap((route) =>
  route.children.map((childRoute) => ({
    ...childRoute,
    element: <ProtectRoutes>{childRoute.element}</ProtectRoutes>,
  }))
);
const routes = {
  path: "/",
  element: <App />,
  children: protectedRoutes,
};
const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([...publicRoutes, routes]);
root.render(
  <ToastContextProvider>
    <SignInContextProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </SignInContextProvider>
  </ToastContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
