import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('curenova_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('curenova_user');
    const savedToken = localStorage.getItem('curenova_token');

    if (savedUser && savedToken) {
      try {
        const parsed = JSON.parse(savedUser);
        // Clear any previous legacy demo user IDs
        if (parsed?.id?.startsWith('usr-doctor') || parsed?.id?.startsWith('usr-researcher') || parsed?.id?.startsWith('usr-patient')) {
          localStorage.removeItem('curenova_user');
          localStorage.removeItem('curenova_token');
          setUser(null);
          setToken(null);
        } else {
          setUser(parsed);
          setToken(savedToken);
        }
      } catch (e) {
        localStorage.removeItem('curenova_user');
        localStorage.removeItem('curenova_token');
        setUser(null);
        setToken(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    const res = await authService.login(email, password, role);
    localStorage.setItem('curenova_token', res.access_token);
    localStorage.setItem('curenova_user', JSON.stringify(res.user));
    setToken(res.access_token);
    setUser(res.user);
    return res.user;
  };

  const register = async (userData) => {
    const res = await authService.register(userData);
    localStorage.setItem('curenova_token', res.access_token);
    localStorage.setItem('curenova_user', JSON.stringify(res.user));
    setToken(res.access_token);
    setUser(res.user);
    return res.user;
  };

  const logout = () => {
    localStorage.removeItem('curenova_token');
    localStorage.removeItem('curenova_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
