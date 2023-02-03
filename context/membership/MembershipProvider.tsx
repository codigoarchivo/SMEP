import { FC, useReducer, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { ICheck, ISessionOrSubscription, IUserLem } from "../../interfaces";
import { MembershipContext, membershipReducer } from "./";
import { isEmpty } from "../../helpers";
import { mbepApi } from "../../api";
import { AuthProvider } from "../auth/AuthProvider";
import { useSession } from "next-auth/react";

export interface MembershipState {
  check: ICheck;
  buy: ISessionOrSubscription[];
}

interface Props {
  children: ReactNode;
}

const MEMBERSHIP_INITIAL_STATE: MembershipState = {
  check: {},
  buy: [],
};

export const MembershipProvider: FC<Props> = ({ children }) => {
  const el = useSession();

  useEffect(() => {
    const cookieCheck = Cookies.get("check")
      ? JSON.parse(Cookies.get("check")!)
      : {};
    try {
      dispatch({ type: "[Check] - all", payload: cookieCheck });
    } catch (error) {
      dispatch({ type: "[Check] - all", payload: {} as ICheck });
    }
  }, []);

  const [state, dispatch] = useReducer(
    membershipReducer,
    MEMBERSHIP_INITIAL_STATE
  );

  useEffect(() => {
    if (!isEmpty(state.check)!)
      Cookies.set("check", JSON.stringify(state.check));
  }, [state.check]);

  const selectedCheck = (check: ICheck) => {
    dispatch({ type: "[Check] - all", payload: check });
  };

  const sessionOrSubscription = async (buy: ISessionOrSubscription) => {
    /* Getting the user from the session. */
    // const { role, ...user } = { ...el.data?.user } as IUserLem;

    // console.log(user);

    const { data, statusText } = await mbepApi.post(`/membership/subcription`, buy);
    console.log({ data, statusText });

    // if (statusText === "OK") {
    //   await mbepApi.post("/admin/membership", {
    //     name: user.name,
    //     email: user.email,
    //     _id: data._id,
    //     valid: false,
    //   });
    // }

    dispatch({ type: "[Check] - all", payload: buy });
  };

  return (
    <MembershipContext.Provider
      value={{
        ...state,

        //method
        selectedCheck,
        sessionOrSubscription,
      }}
    >
      {children}
    </MembershipContext.Provider>
  );
};
