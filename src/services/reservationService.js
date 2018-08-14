import reservationApi from '../api/reservationApi';
import {ajaxCallError, beginAjaxCall} from "../actions/ajaxStatusActions";
import {
    bikeReserveSuccess,
    cancelReserveSuccess,
    rateReserveSuccess
} from "../actions/reservationActions";


export function reserveBike(reserve, userId, successHandler, errorHandler) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return reservationApi.reserveBike(userId, reserve,
            () => {
                dispatch(bikeReserveSuccess(reserve));
                successHandler();
            },
            (error) => {
                dispatch(ajaxCallError(error));
                errorHandler(error);
            });
    };
}

export function cancelReservation(userId, reserve) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return reservationApi.cancelReserve(userId, reserve).then(() => {
            dispatch(cancelReserveSuccess(reserve));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function rateReservation(userId, reserve, reserveRate, bike, successHandler, errorHandler) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        let bikeRate = {
            scores: reserveRate,
            votes: 1
        };
        if (bike.rate) {
            bikeRate.scores = bike.rate.scores + reserveRate;
            bikeRate.votes = bike.rate.votes + 1;
        }

        return reservationApi.rateReserve(userId,
            reserve, reserveRate, bikeRate,
            () => {
                dispatch(rateReserveSuccess(reserve, bikeRate, reserveRate));
                successHandler();
            }, (error) => {
                dispatch(ajaxCallError(error));
                errorHandler(error);
            })

    };
}