import { FC, useReducer, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import { IBusiness, ISesion } from '../../interfaces';
import { MembershipContext, MembershipReducer } from './';
import { isEmpty } from '../../helpers';

export interface MembershipState {
  sesion: ISesion;
  business: IBusiness;
}

interface Props {
  children: ReactNode;
}

const MEMBERSHIP_INITIAL_STATE: MembershipState = {
  sesion: {} as ISesion,
  business: {} as IBusiness,
};

export const MembershipProvider: FC<Props> = ({ children }) => {
  useEffect(() => {
    const cookieSesion = Cookies.get('sesion')
      ? JSON.parse(Cookies.get('sesion')!)
      : {};
    try {
      dispatch({ type: '[Sesion] - Select', payload: cookieSesion });
    } catch (error) {
      dispatch({ type: '[Sesion] - Select', payload: {} as ISesion });
    }
  }, []);

  useEffect(() => {
    const cookieBusiness = Cookies.get('business')
      ? JSON.parse(Cookies.get('business')!)
      : {};
    try {
      dispatch({ type: '[Business] - Select', payload: cookieBusiness });
    } catch (error) {
      dispatch({ type: '[Business] - Select', payload: {} as IBusiness });
    }
  }, []);

  const [state, dispatch] = useReducer(
    MembershipReducer,
    MEMBERSHIP_INITIAL_STATE
  );

  useEffect(() => {
    if (!isEmpty(state.sesion)!)
      Cookies.set('sesion', JSON.stringify(state.sesion));
  }, [state.sesion]);

  useEffect(() => {
    if (!isEmpty(state.business)!)
      Cookies.set('business', JSON.stringify(state.business));
  }, [state.business]);

  /**
   * SelectedSesion is a function that takes a sesion as a parameter and returns a dispatch function
   * that takes an object with a type and payload property.
   * @param {ISesion} sesion - ISesion
   */
  const selectedSesion = (sesion: ISesion) => {
    dispatch({ type: '[Sesion] - Select', payload: sesion });
  };

  /**
   * SelectedBusiness is a function that takes a business as a parameter and returns a dispatch
   * function that takes an object with a type and payload property.
   * @param {IBusiness} business - IBusiness - this is the business object that is being passed in from
   * the parent component.
   */
  const selectedBusiness = (business: IBusiness) => {
    dispatch({ type: '[Business] - Select', payload: business });
  };

  return (
    <MembershipContext.Provider
      value={{
        ...state,

        //method
        selectedSesion,
        selectedBusiness,
      }}
    >
      {children}
    </MembershipContext.Provider>
  );
};
