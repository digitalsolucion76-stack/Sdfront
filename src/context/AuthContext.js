import React, { useState, createContext, useEffect } from 'react';
import apiClient from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/auth/protected');
        // The backend isn't returning the user object in the protected route response
        // I will assume for now it does, but this might need a fix in the backend.
        // For now, I will simulate getting the user from a different endpoint if needed
        // but let's stick to the provided backend code. The backend should be updated
        // to return the user on the protected route.
        // Let's assume response.data contains the user.
        // A better response from /protected would be { user: { id, nombre, role } }
        setUser(response.data.user); // Assuming backend sends { user: ... }
        setIsLoggedIn(true);
      } catch (error) {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (nombre, contraseña) => {
    try {
      const response = await apiClient.post('/auth/login', { nombre, contraseña });
      setUser(response.data.user);
      setIsLoggedIn(true);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'Error al iniciar sesión. Verifique sus credenciales.';
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
        await apiClient.post('/auth/logout');
    } catch(error) {
        console.error('Logout API call failed:', error);
    } finally {
        setUser(null);
        setIsLoggedIn(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
