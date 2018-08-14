import * as types from './actionTypes';

export function loadColorsSuccess(colors) {
    return { type: types.LOAD_COLORS_SUCCESS, colors };
}

export function createColorSuccess(color) {
    return { type: types.CREATE_COLOR_SUCCESS, color };
}

export function deleteColorSuccess(colorId) {
    return { type: types.DELETE_COLOR_SUCCESS, colorId };
}