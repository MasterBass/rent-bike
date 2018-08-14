import * as types from './actionTypes';

export function getLocationSuccess(location) {
    return {type: types.GET_LOCATION_SUCCESS, location};
}