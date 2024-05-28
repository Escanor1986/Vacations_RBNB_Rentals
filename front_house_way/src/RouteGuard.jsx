/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";

const RouteGuard = ({ requiresAuth }) => {
  const hasJWT = () => {
    return localStorage.getItem("token") ? true : false;
  };

  if (requiresAuth && !hasJWT()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RouteGuard;
