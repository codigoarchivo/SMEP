import { MembershipState } from './';

type MembershipActionType =
    | { type: '[Membership] - List' }

export const MembershipReducer = (state: MembershipState, action: MembershipActionType): MembershipState => {
    switch (action.type) {
        case '[Membership] - List':
            return {
                ...state,
            }
        default:
            return state;
    }
}