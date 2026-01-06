import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function AdminRoute() {
    const { token, isAdmin, authLoading } = useContext(UserContext);

    if (authLoading) return <div>Checking permissions...</div>;
    if (!token || !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}