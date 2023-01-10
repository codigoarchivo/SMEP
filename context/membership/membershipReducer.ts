import { MembershipState } from './';
import { IBusiness, ISesion } from '../../interfaces';

type MembershipActionType =
    | { type: '[Sesion] - Select', payload: ISesion }
    | { type: '[Business] - Select', payload: IBusiness }

export const MembershipReducer = (state: MembershipState, action: MembershipActionType): MembershipState => {
    switch (action.type) {
        case '[Sesion] - Select':
            return {
                ...state,
                sesion: action.payload
            }
        case '[Business] - Select':
            return {
                ...state,
                business: action.payload
            }
        default:
            return state;
    }
}