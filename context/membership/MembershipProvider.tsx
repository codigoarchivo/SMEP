import { FC, useReducer, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import { ICheck, ISubscription, IUserLem } from '../../interfaces';
import { MembershipContext, membershipReducer } from './';
import { isEmpty } from '../../helpers';
import { mbepApi } from '../../api';
import { AuthProvider } from '../auth/AuthProvider';
import { useSession } from 'next-auth/react';

export interface MembershipState {
  check: ICheck;
  sub: ISubscription[];
}

interface Props {
  children: ReactNode;
}

const MEMBERSHIP_INITIAL_STATE: MembershipState = {
  check: {},
  sub: [],
};

export const MembershipProvider: FC<Props> = ({ children }) => {
  const el = useSession();
  /* Getting the user from the session. */
  const user = { ...el.data?.user } as IUserLem;

  useEffect(() => {
    const cookieCheck = Cookies.get('check')
      ? JSON.parse(Cookies.get('check')!)
      : {};
    try {
      dispatch({ type: '[Check] - all', payload: cookieCheck });
    } catch (error) {
      dispatch({ type: '[Check] - all', payload: {} as ICheck });
    }
  }, []);

  useEffect(() => {
    const sub = Cookies.get('sub') ? JSON.parse(Cookies.get('sub')!) : [];
    try {
      dispatch({
        type: '[Sub] - Subscription',
        payload: sub,
      });
    } catch (error) {
      dispatch({
        type: '[Sub] - Subscription',
        payload: [] as ISubscription[],
      });
    }
  }, []);

  const [state, dispatch] = useReducer(
    membershipReducer,
    MEMBERSHIP_INITIAL_STATE
  );

  const selectSave = (name: string, data: ICheck | ISubscription[]) => {
    Cookies.set(`${name}`, JSON.stringify(data));
  };

  const selectedCheck = (check: ICheck) => {
    dispatch({ type: '[Check] - all', payload: check });
    selectSave('check', check);
  };

  const subscription = async (dataSub: ISubscription) => {
    const addBuy = { ...dataSub, user: user._id, valid: false };

    const { data, statusText } = await mbepApi.post(
      `/membership/subscription`,
      addBuy
    );
   
    if (statusText === 'OK') {
      await mbepApi.post('/admin/order', {
        buy: data._id,
      });
      const sub = [addBuy, ...state.sub];
      dispatch({ type: '[Sub] - Subscription', payload: sub });
      selectSave('sub', sub);
    }
  };

  return (
    <MembershipContext.Provider
      value={{
        ...state,

        //method
        selectedCheck,
        subscription,
      }}
    >
      {children}
    </MembershipContext.Provider>
  );
};
