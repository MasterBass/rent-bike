import * as types from './actionTypes';

export function bikeReserveSuccess(reserve) {
    return { type: types.BIKE_RESERVE_SUCCESS, reserve};
}

export function cancelReserveSuccess(reserve) {
    return { type: types.CANCEL_RESERVE_SUCCESS, reserve };
}

export function rateReserveSuccess(reserve, rate, reserveRate) {
    return { type: types.RATE_RESERVATION_SUCCESS, reserve, rate, reserveRate };
}
