import { FC, useReducer, ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Cookies from 'js-cookie';
import {
  ISession,
  IUserLem,
  ISubscription,
  ISelectSession,
  ISelectSubscription,
} from '../../interfaces';
import { MembershipContext, membershipReducer } from './';
import { mbepApi } from '../../api';

export interface MembershipState {
  check: ISelectSubscription | ISelectSession;
  sub: ISubscription[];
  ses: ISession[];
}

interface Props {
  children: ReactNode;
}

const MEMBERSHIP_INITIAL_STATE: MembershipState = {
  check: {} as ISelectSubscription | ISelectSession,
  sub: [],
  ses: [],
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
      dispatch({
        type: '[Check] - all',
        payload: {} as ISelectSubscription | ISelectSession,
      });
    }
  }, []);

  useEffect(() => {
    try {
      dispatch({
        type: '[Sub] - Subscription',
        payload: Cookies.get('sub') ? JSON.parse(Cookies.get('sub')!) : [],
      });
    } catch (error) {
      dispatch({
        type: '[Sub] - Subscription',
        payload: [] as ISubscription[],
      });
    }
  }, []);

  useEffect(() => {
    try {
      dispatch({
        type: '[Ses] - Session',
        payload: Cookies.get('ses') ? JSON.parse(Cookies.get('ses')!) : [],
      });
    } catch (error) {
      dispatch({
        type: '[Ses] - Session',
        payload: [] as ISession[],
      });
    }
  }, []);

  const [state, dispatch] = useReducer(
    membershipReducer,
    MEMBERSHIP_INITIAL_STATE
  );

  const selectSave = (
    name: string,
    data: ISelectSubscription | ISelectSession | ISession[] | ISubscription[]
  ) => {
    Cookies.set(`${name}`, JSON.stringify(data));
  };

  const selectedSession = (check: ISelectSession) => {
    dispatch({ type: '[Check] - all', payload: check });
    selectSave('check', check);
  };

  const selectedSubscription = (check: ISelectSubscription) => {
    dispatch({ type: '[Check] - all', payload: check });
    selectSave('check', check);
  };

  const listSession = (d: ISession[]) => {
    dispatch({ type: '[Ses] - Session', payload: d });
    selectSave('ses', d);
  };

  const listSubscription = (d: ISubscription[]) => {
    dispatch({ type: '[Sub] - Subscription', payload: d });
    selectSave('sub', d);
  };

  const subscription = async (dataSub: ISubscription) => {
    const addBuy = {
      ...dataSub,
      user: user._id,
    };

    if (!addBuy) return;

    const { data, statusText } = await mbepApi.post(
      `/membership/subscription`,
      addBuy
    );

    if (!statusText) return;

    await mbepApi.post('/admin/order', { sub: data._id, user: user._id });

    const d = [addBuy, ...state.sub];
    dispatch({ type: '[Sub] - Subscription', payload: d });
    selectSave('sub', d);
  };

  const addRenewal = async (dataSub: ISubscription) => {
    if (user._id !== dataSub.user) return;

    const { data, statusText } = await mbepApi.post(
      `/membership/subscription`,
      dataSub
    );

    if (!statusText) return;

    await mbepApi.post('/admin/order', { sub: data._id, user: user._id });

    const d = [
      dataSub,
      ...state.sub.filter((item) => item._id !== dataSub._id),
    ];
    dispatch({ type: '[Sub] - Subscription', payload: d });
    selectSave('sub', d);
  };

  const session = async (dataSub: ISession) => {
    const addBuy = {
      ...dataSub,
      user: user._id,
    };

    if (!addBuy) return;

    const { data, statusText } = await mbepApi.post(
      `/membership/session`,
      addBuy
    );

    if (!statusText) return;

    await mbepApi.post('/admin/order', { ses: data._id, user: user._id });

    const d = [addBuy, ...state.ses];
    dispatch({ type: '[Ses] - Session', payload: d });
    selectSave('ses', d);
  };

  const deleteOne = async (id: string) => {
    const { statusText } = await mbepApi.put(`/membership/session`, { id });

    if (!statusText) return;

    const d = state.ses.filter((item) => item._id !== id);
    dispatch({ type: '[Ses] - Session', payload: d });
    selectSave('ses', d);
  };

  const deleteTwo = async (id: string) => {
    const { statusText } = await mbepApi.put(`/membership/subscription`, {
      id,
    });

    if (!statusText) return;

    const d = state.sub.filter((item) => item._id !== id);
    dispatch({ type: '[Sub] - Subscription', payload: d });
    selectSave('sub', d);
  };

  return (
    <MembershipContext.Provider
      value={{
        ...state,

        //method
        selectedSession,
        selectedSubscription,
        listSession,
        listSubscription,
        subscription,
        session,
        deleteOne,
        deleteTwo,
        addRenewal,
      }}
    >
      {children}
    </MembershipContext.Provider>
  );
};
