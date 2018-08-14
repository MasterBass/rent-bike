import * as types from './actionTypes';

export function loadBikesSuccess(bikes) {
    return {type: types.LOAD_BIKES_SUCCESS, bikes};
}

export function createBikeSuccess(bike) {
    return {type: types.CREATE_BIKE_SUCCESS, bike};
}

export function updateBikeSuccess(bike) {
    return {type: types.UPDATE_BIKE_SUCCESS, bike};
}

export function deleteBikeSuccess(bikeId) {
    return {type: types.DELETE_BIKE_SUCCESS, bikeId};
}

export function currentBikeSave(bike) {
    return {type: types.CURRENT_BIKE_SAVE, bike};
}

export function currentBikeFilterSave(filter) {
    return {type: types.CURRENT_BIKE_FILTER_SAVE, filter};
}

export function imageUploadSuccess() {
    return {type: types.BIKE_IMAGE_UPLOAD_SUCCESS};
}

export function loadImageUrlSuccess() {
    return {type: types.BIKE_IMAGE_URL_LOAD_SUCCESS};
}