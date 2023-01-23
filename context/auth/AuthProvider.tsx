import { FC, useReducer, ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext, authReducer } from "./";
import { IUser } from "../../interfaces";
import { mbepApi } from "../../api";

export interface AuthState {
  isLoggeIn: boolean;
  user?: IUser;
}

interface Props {
  children: ReactNode;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggeIn: false,
  user: undefined,
};

type registerProps = { hasError: boolean; message?: string };

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  /* TODO falta la configuracion api*/
  const { data, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      dispatch({ type: "[Auth] - Login", payload: data?.user as IUser });
    }
  }, [data, status]);

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<registerProps> => {
    try {
      /* Destructuring the data property from the response object. */
      const { data } = await mbepApi.post("/user/register", {
        name,
        email,
        password,
      });

      const { token, user } = data;

      /* Setting a cookie with the name "token" and the value of the token. */
      Cookies.set("token", token);

      /* Dispatching an action to the authReducer. */
      dispatch({ type: "[Auth] - Login", payload: user });

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
        message: "No se pudo crear el usuario - intente de nuevo",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        // method
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
