import { FC, useReducer, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { ICheck } from "../../interfaces";
import { MembershipContext, MembershipReducer } from "./";
import { isEmpty } from "../../helpers";

export interface MembershipState {
  check: ICheck;
}

interface Props {
  children: ReactNode;
}

const MEMBERSHIP_INITIAL_STATE: MembershipState = {
  check: {},
};

export const MembershipProvider: FC<Props> = ({ children }) => {
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
    MembershipReducer,
    MEMBERSHIP_INITIAL_STATE
  );

  useEffect(() => {
    if (!isEmpty(state.check)!)
      Cookies.set("check", JSON.stringify(state.check));
  }, [state.check]);

  const selectedCheck = (check: ICheck) => {
    dispatch({ type: "[Check] - all", payload: check });
  };

  return (
    <MembershipContext.Provider
      value={{
        ...state,

        //method
        selectedCheck,
      }}
    >
      {children}
    </MembershipContext.Provider>
  );
};
