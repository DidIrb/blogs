// AuthContext.tsx
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContextValue, user } from '../util/types';
import { environment } from "../config";
import api from '../services/api.service';


export const AuthContext = createContext<AuthContextValue | null>(null);
const env = environment
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Update it later to check if the user's access Token is still active
  const initialUser = JSON.parse(localStorage.getItem('user') || 'null'); 

  const [currentUser, setCurrentUser] = useState<user | null>(initialUser);

  const isAuthenticated = !!currentUser; 

  const signin = async (userData: user) => {
    const response = await axios.post(`${env.BASE_URL_DEV}/auth/signin`, userData, {withCredentials: true})
    setCurrentUser(response.data.data);
    return response
  };
  

  const signup = async (userData: user) => {
    try {
      const res = await axios.post(`${env.BASE_URL_DEV}auth/signup`, userData);
      console.log('User Creation Response', res.data); 
      return res.data;
    } catch (error: any) {
      console.log('Error creating user:', error);
      throw error; 
    }
  };

  const signout = async () => {
    try {
      const res = await api.post(`/auth/logout`);
      console.log(res);
      setCurrentUser(null);
    } catch (error: any) {
      console.log('Error Signing user out:', error);
      throw error; 
    }
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, signin, signout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
