import * as types from './actionTypes';

export function authenticateStart() {
    return {type: types.AUTHENTICATE_START};
}

export function authenticateSuccess(auth) {
    return {type: types.AUTHENTICATE_SUCCESS, auth};
}

export function authenticateError() {
    return {type: types.AUTHENTICATE_ERROR};
}

export function logOut() {
    return {type: types.LOG_OUT_SUCCESS};
}

export function registerUserSuccess(user) {
    return {type: types.REGISTER_USER_SUCCESS, user};
}

export function registerUserError() {
    return {type: types.REGISTER_USER_ERROR};
}

export function loadUserDataSuccess(data) {
    return {type: types.LOAD_USER_DATA_SUCCESS, data}
}

export function loadAllUsersDataSuccess(data) {
    return {type: types.LOAD_ALL_USERS_DATA_SUCCESS, data}
}

export function loadAllUsersSuccess(users) {
    return {type: types.LOAD_ALL_USERS_SUCCESS, users}
}

export function saveUserSuccess(user) {
    return {type: types.SAVE_USER_SUCCESS, user}
}