/*import React from "react";
import  { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      API.get(`/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => setUser(res.data.user))
        .catch(() => logout());
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await API.post(`/auth/login`, { email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.error("Login Error:", err?.response?.data || err.message);
    }
  };

  const register = async (formData) => {
  try {
    const res = await API.post(`/auth/register`, formData);
    setToken(res.data.token);
    setUser(res.data.user);
    localStorage.setItem("token", res.data.token);
  } catch (err) {
    console.error("Register Error:", err?.response?.data || err.message);
  }
};

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
*/

// src/context/AuthContext.jsx
import React from "react";
import  { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      API.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => setUser(res.data.user))
        .catch(() => logout());
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    localStorage.setItem("token", res.data.token);
  };

  const register = async (formData) => {
    const res = await API.post("/auth/register", formData);
    setToken(res.data.token);
    setUser(res.data.user);
    localStorage.setItem("token", res.data.token);
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
