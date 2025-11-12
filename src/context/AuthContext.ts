import { createContext } from "react";

export interface User {
  email: string;
  password: string;
  [key: string]: any;
}

export interface AuthContextType {
  user: User | null;
  registerApplicant: (email: string) => Promise<boolean>;
  loginRecruiter: (email: string, password: string) => Promise<boolean>;
  registerGoogle: () => Promise<User | null>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);