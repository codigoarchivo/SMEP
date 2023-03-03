import { createContext } from 'react';
import {
  ISelectSession,
  ISelectSubscription,
  ISession,
  ISubscription,
} from '../../interfaces';

interface ContextProps {
  check: ISelectSubscription | ISelectSession;
  sub: ISubscription[];
  ses: ISession[];

  // method
  selectedSession: (check: ISelectSession) => void;
  selectedSubscription: (check: ISelectSubscription) => void;
  listSession: (data: ISession[]) => void;
  listSubscription: (data: ISubscription[]) => void;
  subscription: (data: ISubscription) => void;
  session: (data: ISession) => void;
  deleteOne: (id: string) => void;
  deleteTwo: (id: string) => void;
  addRenewal: (dataSub: ISubscription) => Promise<void>;
}

export const MembershipContext = createContext({} as ContextProps);
