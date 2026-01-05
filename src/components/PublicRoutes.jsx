import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function PublicRoute({ children }) {
    const { token } = useContext(UserContext)
    const location = useLocation();

    if (token) {
        const redirectTo = location.state?.from?.pathname || "/";
        return <Navigate to={redirectTo} replace />;
    }

    return children;
}
