import { FC, useReducer, ReactNode, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthContext, authReducer } from './';
import { IUser } from '../../interfaces';
import { mbepApi } from '../../api';

export interface AuthState {
  isLoggeIn: boolean;
  user?: IUser;
}

export type hm = { hasError: boolean; message?: string };

interface Props {
  children: ReactNode;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggeIn: false,
  user: undefined,
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  /* A hook that is provided by the next-auth package. It is used to check if the user is logged in. */
  const { data, status } = useSession();
  useEffect(() => {
    if (status === 'authenticated')
      dispatch({ type: '[Auth] - Login', payload: data?.user as IUser });
  }, [data, status]);

  /* A method that is used to register a user. */
  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<hm> => {
    try {
      /* Destructuring the data property from the response object. */
      const { data } = await mbepApi.post('/user/register', {
        name,
        email,
        password,
      });

      /* Setting a cookie with the name 'token' and the value of the token. */
      Cookies.set('token', data.token);

      /* Dispatching an action to the authReducer. */
      dispatch({ type: '[Auth] - Login', payload: data.user });

      return { hasError: false };
    } catch (error) {
      /* Checking if the error is an Axios error. If it is, it returns an object with a hasError
      property set to true and a message property set to the error message. */
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      /* Returning an object with a hasError property set to true and a message property set to the
      error message. */
      return {
        hasError: true,
        message: 'Failed to create user - try again',
      };
    }
  };

  const logout = () => {
    signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        // method
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
