import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists on load
    const token = localStorage.getItem('admin_token');
    const storedUser = localStorage.getItem('admin_user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      // Optionally verify token with backend here
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('admin_token', response.data.token);
        localStorage.setItem('admin_user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        return true;
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      throw error;
    }
    return false;
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      setUser(null);
      window.location.href = '/admin/login';
    }
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
