import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function bikeReducer(state = initialState.bikes, action) {
    switch (action.type) {
        case types.LOAD_BIKES_SUCCESS:
            if (action.bikes) {
                const bikes = Object.keys(action.bikes).map((el) => {
                    return {
                        id: el,
                        model: action.bikes[el].model,
                        colorId: action.bikes[el].colorId,
                        color: action.bikes[el].color,
                        weight: action.bikes[el].weight,
                        location: {
                            address: action.bikes[el].location.address,
                            lat: action.bikes[el].location.lat,
                            lng: action.bikes[el].location.lng,
                        },
                        reservations: Object.keys((action.bikes[el].reservations) ?
                            action.bikes[el].reservations : []).map((res) => {
                            return {
                                id: res,
                                start: action.bikes[el].reservations[res].start,
                                end: action.bikes[el].reservations[res].end,
                                isCancelled: !!action.bikes[el].reservations[res].isCancelled
                            }
                        }),
                        isAvailable: action.bikes[el].isAvailable,
                        isDeleted: action.bikes[el].isDeleted,
                        img: action.bikes[el].img,
                        rate: action.bikes[el].rate ? {
                            scores: action.bikes[el].rate.scores,
                            votes: action.bikes[el].rate.votes
                        } : null
                    };
                });
                return bikes.filter(bk => !bk.isDeleted);
            }
            return state;

        case types.DELETE_BIKE_SUCCESS:
            return [
                ...state.filter(bike => bike.id !== action.bikeId)
            ];

        case types.BIKE_RESERVE_SUCCESS:
            const bikeIndex = state.findIndex(bike => bike.id === action.reserve.bikeId);
            let reservationArray = state[bikeIndex].reservations.slice();
            reservationArray.push({
                id: action.reserve.id,
                start: action.reserve.start,
                end: action.reserve.end
            });


            return [
                ...state.slice(0, bikeIndex),
                {...state[bikeIndex], reservations: reservationArray},
                ...state.slice(bikeIndex + 1)
            ];

        case types.CANCEL_RESERVE_SUCCESS:
            const cancelReservBikeIndex = state.findIndex(bk => bk.id === action.reserve.bikeId);
            const reserveIndex = state[cancelReservBikeIndex].reservations.findIndex(res =>
                res.id === action.reserve.id);
            return [
                ...state.slice(0, cancelReservBikeIndex),
                {...state[cancelReservBikeIndex], reservations:[
                    ...state.slice(0, reserveIndex),
                    {...state[reserveIndex], isCancelled: true},
                    ...state.slice(reserveIndex + 1)
                ] },
                ...state.slice(cancelReservBikeIndex + 1)
            ];

        case types.RATE_RESERVATION_SUCCESS:
            const rateReservBikeIndex = state.findIndex(bk => bk.id === action.reserve.bikeId);

            return [
                ...state.slice(0, rateReservBikeIndex),
                {...state[rateReservBikeIndex], rate: action.rate },
                ...state.slice(rateReservBikeIndex + 1)
            ];

        case types.CREATE_BIKE_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.bike)
            ];

        case types.UPDATE_BIKE_SUCCESS:
            const index = state.findIndex(bk => bk.id === action.bike.id);

            if (index > -1 ) {
                return [
                    ...state.slice(0, index),
                    {...action.bike},
                    ...state.slice(index + 1)
                ];
            }
            return [
                ...state,
                Object.assign({}, action.bike)
            ];

        default:
            return state;
    }
}
