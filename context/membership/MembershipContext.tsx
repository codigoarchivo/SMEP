import { createContext } from "react";

interface ContextProps {
  membership: string;

  // method
}

export const MembershipContext = createContext({} as ContextProps);
