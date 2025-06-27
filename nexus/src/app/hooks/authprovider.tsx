'use client';
import { useContext, useState, useEffect, createContext, ReactNode } from "react";
import React from "react";

type User = {
  googleId: string;
  email: string;
  name: string;
  avatar?: string;
};
 
type AuthContextType = {
  user: User | null; // User can be null if not authenticated
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/protected/', { credentials: 'include' });
      if (!response.ok) {
        setUser(null);
        throw new Error('Cannot fetch auth');
      }
      const data = await response.json();
      setUser(data); // Adjust according to your API response shape
    } catch (err) {
      console.error('Error fetching user:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async() => {
    try{
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Logout failed');
      }
      setUser(null);
      window.location.href= '/'
    }catch(err) {
      console.error('Error during logout:', err);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const refresh = async () => {
    setLoading(true);
    await fetchUser();
  };

 return (
    <AuthContext.Provider value={{ user,logout, loading, isAuthenticated: !!user, refresh }}>
      {children}
    </AuthContext.Provider>
  );
 
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};