import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App, {
  CategoryComponent,
  DepartmentComponent,
  SubCategoryComponent,
} from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "department", element: <DepartmentComponent /> },
  { path: "category", element: <CategoryComponent /> },
  { path: "subcategory", element: <SubCategoryComponent /> },
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
