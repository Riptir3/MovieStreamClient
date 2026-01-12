import { Navigate, Outlet, useLocation } from "react-router-dom";
import {getSession} from "../session/Cookies"
 
export default function ProtectedRoute() {
  const token = getSession("Token");
  const location = useLocation();
  const isManual = getSession("manualLogout");

  if (!token) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location, expired: !isManual }} 
        replace 
      />
    );
  }

    return <Outlet />;
}

