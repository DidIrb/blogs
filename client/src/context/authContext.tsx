// AuthContext.tsx
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios'; // Import axios if not already done
import { AuthContextValue, user } from '../util/types';



export const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Update it later to check if the user's access Token is still active
  const storedUser = localStorage.getItem('user');
  const initialUser = JSON.parse(storedUser || 'null'); // Parse or default to null

  const [currentUser, setCurrentUser] = useState<user | null>(initialUser);
  const isAuthenticated = !!currentUser; // Set isAuthenticated based on currentUser

  const login = async (inputs: user) => {
    const res = await axios.post('/auth/login', inputs);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post('/auth/logout');
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
