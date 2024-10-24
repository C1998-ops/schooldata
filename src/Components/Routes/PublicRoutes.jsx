import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
// const useAuth = () => {
//   const user = localStorage.getItem("UserNew");
//   if (user) {
//     return true;
//   } else {
//     return false;
//   }
// };
const PublicRoutes = (props) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? <Navigate to={"/dashboard"} /> : <Outlet />;
};

export default PublicRoutes;
