import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function currentBikeFilterReducer(
    state = initialState.currentBikeFilter, action) {
    switch (action.type) {
        case types.CURRENT_BIKE_FILTER_SAVE:
            return Object.assign({}, action.filter);

        default:
            return state;
    }
}
