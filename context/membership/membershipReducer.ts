import { MembershipState } from './';
import { ICheck, ISessionOrSubscription } from '../../interfaces';

type MembershipActionType =
    | { type: '[Check] - all', payload: ICheck }
    | { type: '[Sub] - Subscription', payload: ISessionOrSubscription[] }
    | { type: '[Ses] - Session', payload: ISessionOrSubscription[] }

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