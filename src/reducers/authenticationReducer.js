import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authenticationReducer(state = initialState.authentication, action) {
    switch (action.type) {
        case types.AUTHENTICATE_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                name: action.auth.name,
                role: action.auth.role,
                uid: action.auth.uid,
                email: action.auth.email
            };

        case types.LOAD_USER_DATA_SUCCESS:
            return {
                ...state,
                reserves: Object.keys(action.data.reservations ?
                    action.data.reservations : []).map((res) => {
                    return {
                        id: action.data.reservations[res].id,
                        model: action.data.reservations[res].model,
                        location: action.data.reservations[res].location,
                        end: action.data.reservations[res].end,
                        start: action.data.reservations[res].start,
                        bikeId: action.data.reservations[res].bikeId,
                        isCancelled: !!action.data.reservations[res].isCancelled,
                        rate: action.data.reservations[res].rate ?
                            action.data.reservations[res].rate : null

                    }
                })
            };

        case types.CANCEL_RESERVE_SUCCESS:
            const reserveIndex = state.reserves.findIndex(res => res.id === action.reserve.id);
            return {
                ...state,
                reserves: [
                    ...state.reserves.slice(0, reserveIndex),
                    {...state.reserves[reserveIndex], isCancelled: true},
                    ...state.reserves.slice(reserveIndex + 1)
                ]
            };


        case types.RATE_RESERVATION_SUCCESS:
            const rateReserveIndex = state.reserves.findIndex(res => res.id === action.reserve.id);
            return {
                ...state,
                reserves: [
                    ...state.reserves.slice(0, rateReserveIndex),
                    {...state.reserves[rateReserveIndex], rate: action.reserveRate},
                    ...state.reserves.slice(rateReserveIndex + 1)
                ]
            };

        case types.BIKE_RESERVE_SUCCESS:
            return {
                ...state,
                reserves:
                    [...state.reserves.slice(),
                        {
                            id: action.reserve.id,
                            model: action.reserve.model,
                            location: action.reserve.location,
                            end: action.reserve.end,
                            start: action.reserve.start,
                            bikeId: action.reserve.bikeId,
                            rate: action.reserve.rate
                        }]
            };

        case types.LOG_OUT_SUCCESS:
            return {
                ...state,
                loggedIn: false,
                name: '',
                uid: '',
                email: '',
                role: '',
                reserves: []
            };


        default:
            return state;
    }
}