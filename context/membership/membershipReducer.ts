import { MembershipState } from './';
import { ICheck, ISubscription } from '../../interfaces';

type MembershipActionType =
    | { type: '[Check] - all', payload: ICheck }
    | { type: '[Sub] - Subscription', payload: ISubscription[] }

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
        default:
            return state;
    }
}