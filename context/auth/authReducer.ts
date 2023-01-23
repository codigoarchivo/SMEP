import { AuthState } from './';
import { IUser } from '../../interfaces';

type AuthActionType =
    | { type: '[Auth] - Login', payload: IUser }

export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
    switch (action.type) {
        case '[Auth] - Login':
            return {
                ...state,
                isLoggeIn: true,
                user: action.payload,
            }

        default:
            return state;
    }
}