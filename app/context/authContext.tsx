"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = "https://task-manager-k0i9.onrender.com";

interface AuthContextType {
  user: any;
  token: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  loading: any;
  error: any;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  isLoggedIn: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedRefreshToken = localStorage.getItem("refreshToken");

      if (storedToken && storedRefreshToken) {
        try {
          await verifyToken(storedToken, storedRefreshToken);
        } catch (error) {
          console.error("Token verification failed:", error);
          logout();
        }
      }
    };

    initializeAuth();
  }, []);

  const verifyToken = async (token: string, refreshToken: string) => {
    try {
      const response = await axios.post(`${baseUrl}/api/refresh-token`, {
        refreshToken,
      });
      const newToken = response.data.token;
      localStorage.setItem("token", newToken);
      setToken(newToken);
    } catch (error) {
      console.error("Token refresh failed:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${baseUrl}/api/login`, {
        email,
        password,
      });
      const newToken = response.data.token;
      const user = response.data.user
      const newRefreshToken = response.data.refreshToken;
      localStorage.setItem("token", newToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      localStorage.setItem("user", user);

      setToken(newToken);
      setRefreshToken(newRefreshToken);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${baseUrl}/api/register`, {
        firstName,
        lastName,
        email,
        password,
      });
      toast.success("Registration successful!");
    } catch (err) {
      setError("Registration failed. Please try again.");
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  const isLoggedIn = () => {
    return !!token;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        refreshToken,
        login,
        register,
        logout,
        isLoggedIn,
        loading,
        error,
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
