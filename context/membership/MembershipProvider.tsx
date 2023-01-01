import { FC, useReducer, ReactNode } from "react";
import { MembershipContext, MembershipReducer } from "./";

export interface MembershipState {
  membership: string;
}

interface Props {
  children: ReactNode;
}

const MEMBERSHIP_INITIAL_STATE: MembershipState = {
  membership: "",
};

export const MembershipProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(
    MembershipReducer,
    MEMBERSHIP_INITIAL_STATE
  );

  return (
    <MembershipContext.Provider
      value={{
        ...state,

        //method
      }}
    >
      {children}
    </MembershipContext.Provider>
  );
};
