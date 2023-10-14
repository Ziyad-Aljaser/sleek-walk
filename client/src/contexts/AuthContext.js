import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { signIn, signInWithGoogle, logout, error } = useAuth();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    error,
    signIn,
    signInWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
