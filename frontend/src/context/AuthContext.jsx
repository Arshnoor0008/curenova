import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const DEMO_CREDENTIALS = {
  doctor: {
    email: 'doctor@curenova.ai',
    password: 'doctor123',
    role: 'doctor',
    name: 'Dr. Sarah Chen, MD, FACC',
    title: 'Cardiovascular Specialist & Clinician',
  },
  researcher: {
    email: 'researcher@curenova.ai',
    password: 'researcher123',
    role: 'researcher',
    name: 'Dr. Marcus Vance, PhD',
    title: 'Senior Computational Pharmacologist',
  },
  patient: {
    email: 'patient@curenova.ai',
    password: 'patient123',
    role: 'patient',
    name: 'Eleanor Jenkins',
    title: 'Empowered Health Consumer',
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('curenova_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('curenova_user');
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('curenova_user');
        localStorage.removeItem('curenova_token');
      }
    } else {
      // By default for demo ease, initialize as Demo Doctor if no user session
      const defaultDemo = DEMO_CREDENTIALS.doctor;
      setUser({
        id: 'usr-doctor-01',
        name: defaultDemo.name,
        email: defaultDemo.email,
        role: 'doctor',
        organization: 'Academic Medical Center',
      });
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    try {
      const res = await authService.login(email, password, role);
      localStorage.setItem('curenova_token', res.access_token);
      localStorage.setItem('curenova_user', JSON.stringify(res.user));
      setToken(res.access_token);
      setUser(res.user);
      return res.user;
    } catch (err) {
      // Fallback in demo mode if server is booting
      const matchedDemo = Object.values(DEMO_CREDENTIALS).find(
        (c) => c.email.toLowerCase() === email.toLowerCase()
      );
      if (matchedDemo && password === matchedDemo.password) {
        const fallbackUser = {
          id: `usr-${matchedDemo.role}-01`,
          name: matchedDemo.name,
          email: matchedDemo.email,
          role: matchedDemo.role,
          organization: 'CureNova Demo Network',
        };
        localStorage.setItem('curenova_user', JSON.stringify(fallbackUser));
        setUser(fallbackUser);
        return fallbackUser;
      }
      throw err;
    }
  };

  const loginAsDemo = async (role) => {
    const cred = DEMO_CREDENTIALS[role];
    if (!cred) return;
    try {
      return await login(cred.email, cred.password, cred.role);
    } catch (err) {
      const fallbackUser = {
        id: `usr-${role}-01`,
        name: cred.name,
        email: cred.email,
        role: cred.role,
        organization: 'CureNova Demo Network',
      };
      localStorage.setItem('curenova_user', JSON.stringify(fallbackUser));
      setUser(fallbackUser);
      return fallbackUser;
    }
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

  const switchRole = (newRole) => {
    return loginAsDemo(newRole);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        loginAsDemo,
        register,
        logout,
        switchRole,
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
