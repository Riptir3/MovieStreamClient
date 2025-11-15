import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else { 
            localStorage.removeItem("token");
        }
    }, [token]);

    const login = (token) => {
      setToken(token)
      setUser(user)
    }

    const logout = () => {
      setToken(null);
      setUser(null)
    }

  return (
    <UserContext.Provider value={{ token,user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
