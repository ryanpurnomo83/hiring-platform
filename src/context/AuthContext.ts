import { createContext } from "react";

export interface User {
  email: string;
  password: string;
  [key: string]: any;
}

export interface AuthContextType {
  user: User | null;
  registerApplicant: (email: string) => Promise<boolean>;
  loginApplicant: (email:string, password: string) => Promise<boolean>;
  loginRecruiter: (email: string, password: string) => Promise<boolean>;
  loginGoogle: (role: string) => Promise<User | null>;
  registerGoogle: (role: string) => Promise<User | null>;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);