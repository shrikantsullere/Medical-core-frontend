import React, { createContext, useContext, useState, useEffect } from 'react';
import { ROLES } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Auto login for development if needed, otherwise start with null
  useEffect(() => {
    const savedUser = localStorage.getItem('clinic_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (role) => {
    const userData = {
      name: `Demo ${role}`,
      role: role,
      email: `${role.toLowerCase().replace(' ', '')}@demo.com`,
      id: Math.random().toString(36).substr(2, 9),
      clinic: 'Demo Multi-speciality Clinic'
    };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('clinic_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('clinic_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
