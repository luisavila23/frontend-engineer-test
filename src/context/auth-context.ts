import { createContext } from 'react';

export type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);