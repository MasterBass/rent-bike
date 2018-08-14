import accountApi from '../api/accountApi';
import {ajaxCallError, beginAjaxCall} from "../actions/ajaxStatusActions";
import * as authActions from '../actions/authenticationActions';


export function signOut() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return accountApi.logOut().then(() => {
            localStorage.removeItem("USER");
            dispatch(authActions.logOut());
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error.message);
        });
    };
}

export function login(account) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());

        dispatch(authActions.authenticateSuccess({
            name: account.name,
            uid: account.uid,
            email: account.email,
            role: account.role
        }));
    };
}

export function authenticate(account) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return accountApi.login(account).then(res => {
            if (res) {
                return accountApi.getUserData(res.user.uid).then(u => {
                    if(!u.val().isActive) {
                        throw (new Error("User is not active. Please contact administrator"));
                    }

                    dispatch(authActions.authenticateSuccess({
                        name: res.user.displayName,
                        uid: res.user.uid,
                        email: res.user.email,
                        role: u.val().role
                    }));
                    localStorage.setItem('USER', JSON.stringify({
                        name: res.user.displayName,
                        uid: res.user.uid,
                        email: res.user.email,
                        role: u.val().role
                    }));
                });
            } else {
                dispatch(authActions.authenticateError());
            }
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error.message);
        });
    };
}


export function getUserData(uid) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return accountApi.getUserData(uid).then(ud => {
            dispatch(authActions.loadUserDataSuccess(ud.val()));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error.message);
        });
    };
}

export function getAllUsersData() {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return accountApi.getAllUsersData().then(ud => {
            dispatch(authActions.loadAllUsersDataSuccess(ud.val()));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error.message);
        });
    };
}

export function getAllUsers() {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return accountApi.getAllUsersData().then(u => {
            dispatch(authActions.loadAllUsersSuccess(u.val()));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error.message);
        });
    };
}

export function saveUser(user) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return accountApi.saveUser(
            {
                isActive: user.isActive,
                role: user.role
            }, user.uid).then(() => {
            dispatch(authActions.saveUserSuccess(user));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error.message);
        });
    };
}

export function register(user) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        const displayName = user.displayName;
        return accountApi.register(user).then(res => {
            if (res) {
                const user = accountApi.currentUser();
                user.updateProfile({
                    displayName: displayName
                });
                return res;
            }
        }).then(res => {
            if (res) {
                dispatch(authActions.registerUserSuccess({
                    username: user.username,
                    email: user.email
                }));
            } else {
                dispatch(authActions.registerUserError());
            }
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error.message);
        });
    };
}
