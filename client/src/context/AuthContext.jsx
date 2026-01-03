import { createContext, useContext, useEffect, useState } from "react";
import { api, setAuthToken } from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchMe();
    }
  }, []);

  const fetchMe = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.data);
    } catch (err) {
      logout();
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const access = res.data.data.accessToken;
      setToken(access);
      localStorage.setItem("accessToken", access);
      setAuthToken(access);
      await fetchMe();
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      await api.post("/auth/register", payload);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Registration failed" };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("accessToken");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, fetchMe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);





