// AuthContext.tsx
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContextValue, user } from '../util/types';
import { environment } from "../config";

export const AuthContext = createContext<AuthContextValue | null>(null);
const env = environment
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Update it later to check if the user's access Token is still active
  const initialUser = JSON.parse(localStorage.getItem('user') || 'null'); 
  const [currentUser, setCurrentUser] = useState<user | null>(initialUser);

  const isAuthenticated = !!currentUser; 

  const signin = async (userData: user) => {
    const res = await axios.post(`${env.BASE_URL_DEV}/auth/signin`, userData,  { withCredentials: true });
    setCurrentUser(res.data);
    console.log(res);
  };

  const signup = async (userData: user) => {
    try {
      const res = await axios.post(`${env.BASE_URL_DEV}/auth/signup`, userData);
      console.log('User Creation Response', res.data); 
      return res.data;
    } catch (error: any) {
      console.error('Error creating user:', error.response?.data?.message);
      throw error; 
    }
  };

  const logout = async () => {
    await axios.post(`${env.BASE_URL_DEV}/auth/sign-out`);
    // Supposed to send access token to have it deleted
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, signin, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
