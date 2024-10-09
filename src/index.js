import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App, { CategoryComponent, DepartmentComponent } from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/layout/Layout";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  { path: "/", element: <Layout /> },
  { path: "department", element: <DepartmentComponent /> },
  { path: "category", element: <CategoryComponent /> },
]);
root.render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
