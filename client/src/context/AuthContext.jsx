// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const baseUrl = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is logged in when the app loads
  useEffect(() => {
    const checkUserStatus = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("customerToken");
        if (!token) {
          setUser(null);
          return;
        }
        const response = await fetch(`${baseUrl}/api/auth/isloggedin`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (!data.success) {
          localStorage.removeItem("customerToken");
          setUser(null);
        } else {
          setUser({ token, ...data.user });
        }
      } catch (error) {
        console.error("Error checking user status:", error);
        localStorage.removeItem("customerToken");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserStatus();
  }, []);

  // Login helper - store token and user data
  const login = (token, userData) => {
    localStorage.setItem("customerToken", token);
    setUser({ token, ...userData });
  };

  // Logout helper - clear user data and token
  const logout = () => {
    localStorage.removeItem("customerToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
