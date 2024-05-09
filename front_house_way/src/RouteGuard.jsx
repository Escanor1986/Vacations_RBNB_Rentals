import { Route, Navigate } from "react-router-dom";

const RouteGuard = ({ component: Component, requiresAuth, ...rest }) => {
  function hasJWT() {
    return localStorage.getItem("token") ? true : false;
  }

  return (
    <Route
      {...rest}
      element={
        requiresAuth && !hasJWT() ? (
          <Navigate to="/login" replace />
        ) : (
          <Component />
        )
      }
    />
  );
};

export default RouteGuard;
