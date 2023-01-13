import { MembershipState } from './';
import { ICheck } from '../../interfaces';

type MembershipActionType =
    | { type: '[Check] - all', payload: ICheck }

export const MembershipReducer = (state: MembershipState, action: MembershipActionType): MembershipState => {
    switch (action.type) {
        case '[Check] - all':
            return {
                ...state,
                check: action.payload
            }
        default:
            return state;
    }
}