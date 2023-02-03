import { createContext } from "react";
import { ICheck, ISessionOrSubscription } from "../../interfaces";

interface ContextProps {
  check: ICheck;
  buy: ISessionOrSubscription[];

  // method
  selectedCheck: (business: ICheck) => void;
  sessionOrSubscription: (data: ISessionOrSubscription) => void
}

export const MembershipContext = createContext({} as ContextProps);
