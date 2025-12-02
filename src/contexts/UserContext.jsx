import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(() => localStorage.getItem("user") || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", user);
        } else { 
            localStorage.removeItem("token");
            localStorage.removeItem("user");
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
