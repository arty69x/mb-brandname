"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Restore session from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("mb_user");
    if (saved) {
      try {
        const parsedUser = JSON.parse(saved);
        // Avoid synchronous state update warning
        setTimeout(() => setUser(parsedUser), 0);
      } catch {
        localStorage.removeItem("mb_user");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API
    await new Promise((r) => setTimeout(r, 800));
    if (password.length < 4) return false;

    // Fixed admin credentials for simulation
    const isAdmin =
      (email === "admin@mb-brandname.com" && password === "admin123") ||
      (email === "admin" && password === "admin");

    const newUser: User = {
      id: "u-" + Date.now(),
      name: email.split("@")[0],
      email,
      role: isAdmin ? "admin" : "user",
    };
    setUser(newUser);
    localStorage.setItem("mb_user", JSON.stringify(newUser));
    return true;
  };

  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 1000));
    if (password.length < 4) return false;

    const newUser: User = {
      id: "u-" + Date.now(),
      name,
      email,
      role: "user", // Registration always creates standard users
    };
    setUser(newUser);
    localStorage.setItem("mb_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mb_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAdmin: user?.role === "admin",
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
