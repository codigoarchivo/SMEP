import { createContext } from 'react';
import { IUser } from '../../interfaces';

interface ContextProps {
    isLoggeIn: boolean;
    user?: IUser;

    // method
    registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string; }>
}

export const AuthContext = createContext({} as ContextProps);