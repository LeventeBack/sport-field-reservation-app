import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuthContext";

export const UserProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export const AdminProtectedRoute = () => {
  const { token, user } = useAuth();

  if (!token || !user) {
    return null;
  }

  if (user && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
