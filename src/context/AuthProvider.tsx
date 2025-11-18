import { useState, type ReactNode } from "react";
import { AuthContext, type User } from "./AuthContext";
import { authAPI } from "../services/APIServices.js";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const registerApplicant = async (email: string): Promise<boolean> => {
    try{
      const data = await authAPI.registerApplicant({email});
      if(data){
        setUser(data);
        console.log("Registered user:", data);
        return true;
      }else{
        return false; 
      }
    }catch(error){
        console.error("Register failed:", error);
        return false;
    }
  };

  const loginApplicant = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await authAPI.loginApplicant({ email, password });
      if (data) {
        setUser(data);
        console.log("Logged in user:", data);
        return true;
      } else {
        alert("Invalid email or password");
        return false;
      }
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const loginRecruiter = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await authAPI.loginRecruiter({ email, password });
      if (data) {
        setUser(data);
        console.log("Logged in user:", data);
        return true;
      } else {
        alert("Invalid email or password");
        return false;
      }
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const registerGoogle = async () => {
    const user = await authAPI.registerGoogle();
    if(user) setUser(user);
    return user;
  };

  const loginGoogle = async () => {
    const user = await authAPI.loginGoogle();
    if(user) setUser(user);
    return user;
  };

  const loginMagicLink = async (email: string): Promise<boolean> => {
    try {
      const data = await authAPI.loginRecruiter({ email });
      if (data) {
        setUser(data);
        console.log("Logged in user:", data);
        return true;
      } else {
        alert("Invalid email or password");
        return false;
      }
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logoutUser = () => {
    setUser(null);
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, registerApplicant, loginApplicant, loginRecruiter, registerGoogle, loginGoogle, loginMagicLink, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
