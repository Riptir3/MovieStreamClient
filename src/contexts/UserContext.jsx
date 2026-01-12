import { createContext, useState, useEffect } from "react";
import { getSession, saveSession, clearUserSession } from "../session/Cookies";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [token, setToken] = useState(() => getSession("Token"));
    const [user, setUser] = useState(() => getSession("User"));
    const [role, setRole] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            setAuthLoading(false);
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const name = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
            const userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

            setUser(name);
            setRole(userRole);
            
            saveSession("Token", token);
            saveSession("User", name);
        } catch (err) {
            logout(); 
        } finally {
            setAuthLoading(false);
        }
    }, [token]);

    const login = (newToken) => setToken(newToken);

    const logout = () => {
        clearUserSession(); 
        setToken(null);
        setUser(null);
        setRole(null);
    };

    const isAdmin = role === "Admin";

    return (
        <UserContext.Provider value={{ token, user, role, isAdmin, authLoading, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}