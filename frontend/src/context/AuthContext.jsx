import { useState } from "react";
import { AuthContext } from "./AuthContext.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    if (!email || !password) {
      return {
        success: false,
        message: "Please enter your email and password.",
      };
    }

    const loggedInUser = {
      fullName: email.split("@")[0],
      email,
    };

    setUser(loggedInUser);

    return { success: true };
  };

  const register = (fullName, email, password) => {
    if (!fullName || !email || !password) {
      return {
        success: false,
        message: "Please complete all required fields.",
      };
    }

    const newUser = {
      fullName,
      email,
    };

    setUser(newUser);

    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
