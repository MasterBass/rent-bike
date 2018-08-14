import bikeApi from '../api/bikeApi';
import mapApi from '../api/googleMapApi';
import accountApi from '../api/accountApi';
import {ajaxCallError, beginAjaxCall} from "../actions/ajaxStatusActions";
import {getNewKeySuccess} from "../actions/keyActions";
import * as authActions from "../actions/authenticationActions";
import {getLocationSuccess} from "../actions/mapActions";
import {
    createBikeSuccess,
    deleteBikeSuccess,
    updateBikeSuccess,
    loadBikesSuccess,
    loadImageUrlSuccess,
    imageUploadSuccess
} from "../actions/bikeActions";


export function loadBikes() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return bikeApi.getAllBikes().then(bikes => {
            dispatch(loadBikesSuccess(bikes.val()));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            if (error.code === 'PERMISSION_DENIED') {
                accountApi.logOut().then(() => {
                    localStorage.removeItem("USER");
                    dispatch(authActions.logOut());
                }).catch(error => {
                    throw(error.message);
                });
            } else {
                throw(error);
            }
        });
    };
}

export function saveBike(bike) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        const copyBike = Object.assign({}, bike, {id: null, isDeleted: null});
        return bikeApi.saveBike(copyBike, bike.id).then(savedBike => {
            bike.id ? dispatch(updateBikeSuccess(bike)) :
                dispatch(createBikeSuccess({...bike, id: savedBike.key}));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function deleteBike(bike) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return bikeApi.saveBike({...bike, isDeleted: true}, bike.id).then(() => {
            dispatch(deleteBikeSuccess(bike.id));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function uploadImage(file, fileName, progress, error, complete) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return bikeApi.uploadFile(file, fileName, progress, (err) => {
            dispatch(ajaxCallError(err));
            // eslint-disable-next-line no-eval
            eval(error(err));
        }, () => {
            dispatch(imageUploadSuccess());
            // eslint-disable-next-line no-eval
            eval(complete());
        });
    };
}

export function getImageUrl(fileName) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return bikeApi.getFileUrl(fileName).then((url) => {
            dispatch(loadImageUrlSuccess());
            return url;
        })
            .catch(error => {
                dispatch(ajaxCallError(error));
                throw(error);
            });
    };
}

export function getNewKey() {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return bikeApi.getNewKey().then((id) => {
            dispatch(getNewKeySuccess());
            return id.key;
        })
            .catch(error => {
                dispatch(ajaxCallError(error));
                throw(error);
            });
    };
}

export function getLocation(address) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return mapApi.getLocation(address).then((location) => {
            dispatch(getLocationSuccess(location));
            return location;
        })
            .catch(error => {
                dispatch(ajaxCallError(error));
                throw(error);
            });
    };
}


