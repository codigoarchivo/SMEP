import { createContext } from "react";
import { ICheck, ISubscription } from "../../interfaces";

interface ContextProps {
  check: ICheck;
  sub: ISubscription[];

  // method
  selectedCheck: (business: ICheck) => void;
  subscription: (data: ISubscription) => void
}

export const MembershipContext = createContext({} as ContextProps);
