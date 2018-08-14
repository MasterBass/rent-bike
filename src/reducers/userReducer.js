import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.users, action) {
    switch (action.type) {
        case types.LOAD_ALL_USERS_SUCCESS:
            return Object.keys(action.users).map((user) => {
                return {
                    email: action.users[user].email,
                    role: action.users[user].role,
                    isActive: action.users[user].isActive,
                    uid: user
                }
            });

        case types.SAVE_USER_SUCCESS:

            const userIndex = state.findIndex(u => u.uid === action.user.uid);

            return [
                ...state.slice(0, userIndex),
                Object.assign({}, action.user),
                ...state.slice(userIndex + 1)
            ];


        default:
            return state;
    }
}