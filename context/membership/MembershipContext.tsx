import { createContext } from 'react';
import { ICheck } from '../../interfaces';

interface ContextProps {
  check: ICheck;

  // method
  selectedCheck: (business: ICheck) => void;
}

export const MembershipContext = createContext({} as ContextProps);
