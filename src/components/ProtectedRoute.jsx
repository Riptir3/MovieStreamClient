import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import LoadingSpinner from "./LoadingSpinner"

export default function ProtectedRoute() {
  const { token, authLoading } = useContext(UserContext);
  const location = useLocation();

  if (authLoading) {
    return <LoadingSpinner />; 
  }

  if (!token) {
    const isManual = sessionStorage.getItem("manualLogout") === "true";
    return <Navigate to="/login" state={{ from: location, expired: !isManual }} replace />;
  }

  return <Outlet />;
}