import { createContext, useState, useEffect } from "react";
import { getSession, saveSession, removeSession } from "../session/Cookies";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [token, setToken] = useState(() => getSession("Token"));
    const [user, setUser] = useState(() => getSession("User") || null);

    useEffect(() => {
        if (token) {
            saveSession("Token", token);
            saveSession("User", user);
        } else { 
            removeSession("Token");
            removeSession("User");
        }
    }, [token]);

    const login = (token,user) => {
      setToken(token)
      setUser(user)
    }

    const logout = () => {
      setToken(null);
      setUser(null);
    }

  return (
    <UserContext.Provider value={{ token,user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
