import { createContext } from 'react';
import { ICheck, ISession, ISubscription } from '../../interfaces';

interface ContextProps {
  check: ICheck;
  sub: ISubscription[];
  ses: ISession[];

  // method
  listSession: (data: ISession[]) => void;
  listSubscription: (data: ISubscription[]) => void;
  selectedCheck: (business: ICheck) => void;
  subscription: (data: ISubscription) => void;
  session: (data: ISession) => void;
  deleteOne: (id: string) => void;
  deleteTwo: (id: string) => void;
}

export const MembershipContext = createContext({} as ContextProps);
