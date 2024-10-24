import React, { FC } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
type Props = {
  children?: React.ReactNode;
};
const ProtectRoutes: FC<Props> = ({ children }) => {
  const auth = useAuth();
  let location = useLocation();
  if (!auth.myState) {
    return <Navigate to={"/signin"} state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
export default ProtectRoutes;
