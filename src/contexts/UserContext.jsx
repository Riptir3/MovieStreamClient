import { createContext, useState, useEffect } from "react";
import { getSession, saveSession, removeSession } from "../session/Cookies";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [token, setToken] = useState(() => getSession("Token"));
    const [user, setUser] = useState(() => getSession("User"));
    const [role, setRole] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    const nameClaim = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
                    const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

                    setUser(decoded[nameClaim]);
                    setRole(decoded[roleClaim]);
                    
                    saveSession("Token", token);
                    saveSession("User", decoded[nameClaim]);
                } catch {
                    logout();
                }
            }
            setAuthLoading(false); 
        };

        checkAuth();
    }, [token]);

    const login = (token) => {
      setToken(token)
    }

    const logout = () => {
        setToken(null);
        setUser(null);
        setRole(null);
        removeSession("Token")
        removeSession("User")
    };

    const isAdmin = role === "Admin";

  return (
    <UserContext.Provider value={{ token, user, role, isAdmin, authLoading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
