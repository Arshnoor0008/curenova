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
        setUser(parsed);
        setToken(savedToken);
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

  const demoAccounts = {
    doctor: { email: 'doctor@curenova.ai', password: 'doctor123', role: 'doctor', name: 'Dr. Sarah Lin, MD' },
    researcher: { email: 'researcher@curenova.ai', password: 'researcher123', role: 'researcher', name: 'Dr. Marcus Vance, PhD' },
    patient: { email: 'patient@curenova.ai', password: 'patient123', role: 'patient', name: 'Elena Rostova' },
  };

  const switchRole = async (targetRole) => {
    const target = demoAccounts[targetRole] || demoAccounts.doctor;
    try {
      return await login(target.email, target.password, target.role);
    } catch {
      // Offline fallback: if backend is unreachable, still set verified mock session
      const mockUser = {
        id: `usr-${targetRole}-001`,
        name: target.name,
        email: target.email,
        role: target.role,
        organization: targetRole === 'doctor' ? 'Mount Sinai Hospital' : targetRole === 'researcher' ? 'Broad Institute of MIT & Harvard' : 'Patient / Caregiver',
      };
      const mockToken = `mock-jwt-token-${targetRole}`;
      localStorage.setItem('curenova_token', mockToken);
      localStorage.setItem('curenova_user', JSON.stringify(mockUser));
      setToken(mockToken);
      setUser(mockUser);
      return mockUser;
    }
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
        switchRole,
        demoLogin: switchRole,
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
