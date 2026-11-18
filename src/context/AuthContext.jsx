import { createContext, useState } from "react";
import { login } from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function handleLogin(username, password) {
    const userData = await login(username, password);

    if (userData) {
      setUser(userData);
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
