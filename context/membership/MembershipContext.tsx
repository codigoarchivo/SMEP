import { createContext } from "react";
import { IBusiness, ISesion } from "../../interfaces";

interface ContextProps {
  sesion: ISesion;
  business: IBusiness;

  // method
  selectedSesion: (sesion: ISesion) => void;
  selectedBusiness: (business: IBusiness) => void;
}

export const MembershipContext = createContext({} as ContextProps);
