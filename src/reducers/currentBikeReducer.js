import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function currentBikeReducer(state = initialState.currentBike, action) {
    switch (action.type) {
        case types.CURRENT_BIKE_SAVE:
            return Object.assign({}, action.bike);

        default:
            return state;
    }
}
