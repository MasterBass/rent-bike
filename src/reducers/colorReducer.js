import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function bikeReducer(state = initialState.colors, action) {
    switch (action.type) {
        case types.LOAD_COLORS_SUCCESS:
            if(action.colors) {
                return Object.keys(action.colors).map((el) => {
                    return {
                        id: el,
                        name: action.colors[el]
                    };
                });
            }
            return state;

        case types.DELETE_COLOR_SUCCESS:
            return [
                ...state.filter(color => color.id !== action.colorId)
            ];

        case types.CREATE_COLOR_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.color)
            ];

        default:
            return state;
    }
}
