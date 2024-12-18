"use client"; // Enable client-side context
import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

// Create the AuthContext
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    username: "",
    email: "",
    token: "",
    isLoggedIn: false,
    admin: false,
  });

  // Initialize the state from cookies on component mount
  useEffect(() => {
    const userCookie = Cookies.get("user");
    const tokenCookie = Cookies.get("token");
    if (userCookie && tokenCookie) {
      const { username, email, admin } = JSON.parse(userCookie);
      setAuth({
        username,
        email,
        token: tokenCookie,
        isLoggedIn: true,
        admin,
      });
    }
  }, []);

  // Login function to update state and cookies
  const login = ({ username, email, token, admin }) => {
    setAuth({ username, email, token, isLoggedIn: true, admin });
    Cookies.set("user", JSON.stringify({ username, email, admin }), {
      expires: 7,
    }); // Store user details in cookies
    Cookies.set("token", token, { expires: 7 }); // Store token in cookies
  };

  // Logout function to clear state and cookies
  const logout = () => {
    setAuth({
      username: "",
      email: "",
      token: "",
      isLoggedIn: false,
      admin: false,
    });
    Cookies.remove("user");
    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
