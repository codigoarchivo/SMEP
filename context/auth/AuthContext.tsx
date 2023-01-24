import { createContext } from "react";
import { IUser } from "../../interfaces";
import { hm } from "./";

interface ContextProps {
  isLoggeIn: boolean;
  user?: IUser;

  // method
  registerUser: (name: string, email: string, password: string) => Promise<hm>;
  logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);
