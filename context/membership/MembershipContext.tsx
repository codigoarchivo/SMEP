import { createContext } from "react";
import { ICheck, ISessionOrSubscription } from "../../interfaces";

interface ContextProps {
  check: ICheck;
  sub: ISessionOrSubscription[];
  ses: ISessionOrSubscription[];

  // method
  selectedCheck: (business: ICheck) => void;
  subscription: (data: ISessionOrSubscription) => void
  session: (data: ISessionOrSubscription) => void
}

export const MembershipContext = createContext({} as ContextProps);
