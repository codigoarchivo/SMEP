import { MembershipState } from './';
import { ICheck, ISessionOrSubscription } from '../../interfaces';

type MembershipActionType =
    | { type: '[Check] - all', payload: ICheck }
    | { type: '[buy] - Session or Subscription', payload: ISessionOrSubscription }

export const membershipReducer = (state: MembershipState, action: MembershipActionType): MembershipState => {
    switch (action.type) {
        case '[Check] - all':
            return {
                ...state,
                check: action.payload
            }
        case '[buy] - Session or Subscription':
            return {
                ...state,
                buy: [...state.buy, action.payload]
            }
        default:
            return state;
    }
}