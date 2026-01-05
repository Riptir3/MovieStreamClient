import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
 
export default function ProtectedRoute() {
    const { token } = useContext(UserContext)
    const location = useLocation();

    if (!token) {
        return (
            <Navigate 
                to="/login" 
                replace 
                state={{ from: location }} 
            />
        );
    }

    return <Outlet />;
}

