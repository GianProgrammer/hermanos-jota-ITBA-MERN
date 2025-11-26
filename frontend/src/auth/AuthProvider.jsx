// src/Auth/AuthProvider.jsx
import { useState} from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const isAuthenticated = Boolean(token);

  // 🔹 login(token, user)
  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);

    // Persistir
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 🔹 logout()
  const logout = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const authContextValue = {
    user,
    token,
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
