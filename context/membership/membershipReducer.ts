import { MembershipState } from './';
import { ISelectSession, ISelectSubscription, ISession, ISubscription } from '../../interfaces';

type MembershipActionType =
    | { type: '[Check] - all', payload: ISelectSubscription | ISelectSession }
    | { type: '[Sub] - Subscription', payload: ISubscription[] }
    | { type: '[Ses] - Session', payload: ISession[] }

export const membershipReducer = (state: MembershipState, action: MembershipActionType): MembershipState => {
    switch (action.type) {
        case '[Check] - all':
            return {
                ...state,
                check: action.payload
            }
        case '[Sub] - Subscription':
            return {
                ...state,
                sub: action.payload
            }
        case '[Ses] - Session':
            return {
                ...state,
                ses: action.payload
            }
        default:
            return state;
    }
}