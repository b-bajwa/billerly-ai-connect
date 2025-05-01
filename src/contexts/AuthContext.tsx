
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

export type UserRole = "admin" | "doctor" | "patient";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Mock users for demo
const mockUsers = {
  admin: {
    id: "admin-1",
    name: "Admin User",
    email: "admin@billerly.ai",
    role: "admin" as UserRole,
    avatar: "https://images.unsplash.com/photo-1597589827317-4c6d6e0a90f1?q=80&w=250"
  },
  doctor: {
    id: "doctor-1",
    name: "Dr. Sarah Johnson",
    email: "doctor@billerly.ai",
    role: "doctor" as UserRole,
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=250"
  },
  patient: {
    id: "patient-1",
    name: "John Smith",
    email: "patient@billerly.ai",
    role: "patient" as UserRole,
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=250"
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is already logged in (using localStorage in this demo)
  useEffect(() => {
    const storedUser = localStorage.getItem("billerlyUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // In a real app, you would verify credentials with an API
    setIsLoading(true);
    
    // Mock authentication - simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Check if email contains the role for demo purposes
    const userMatch = mockUsers[role];
    
    if (userMatch && email.includes(role)) {
      setUser(userMatch);
      localStorage.setItem("billerlyUser", JSON.stringify(userMatch));
    } else {
      throw new Error("Invalid credentials");
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("billerlyUser");
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
