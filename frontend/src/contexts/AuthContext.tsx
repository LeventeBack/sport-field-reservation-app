import React from "react";
import { Token, User } from "../types/auth";

export type AuthContextType = {
  token: Token | null;
  user: User | null;
  setToken: (token: Token) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
  isLoading: boolean;
  isAdmin: boolean;
};

export const AuthContext = React.createContext<AuthContextType>(null!);
