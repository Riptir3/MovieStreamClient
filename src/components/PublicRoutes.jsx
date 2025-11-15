import { Navigate, useLocation } from "react-router-dom";

export default function PublicRoute({ children }) {
    const token = localStorage.getItem("token");
    const location = useLocation();

    if (token) {
        const redirectTo = location.state?.from?.pathname || "/";
        return <Navigate to={redirectTo} replace />;
    }

    return children;
}
