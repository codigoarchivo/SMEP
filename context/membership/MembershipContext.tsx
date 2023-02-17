import { createContext } from 'react';
import { ICheck, ISession, ISubscription } from '../../interfaces';

interface ContextProps {
  check: ICheck;
  sub: ISubscription[];
  ses: ISession[];

  // method
  selectedCheck: (business: ICheck) => void;
  subscription: (data: ISubscription) => void
  session: (data: ISession) => void
}

export const MembershipContext = createContext({} as ContextProps);
