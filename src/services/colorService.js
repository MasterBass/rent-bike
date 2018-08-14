import colorApi from '../api/colorApi';
import {ajaxCallError, beginAjaxCall} from "../actions/ajaxStatusActions";
import {createColorSuccess, deleteColorSuccess, loadColorsSuccess} from "../actions/colorActions";


export function loadColors() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return colorApi.getAllColors().then(colors => {
            dispatch(loadColorsSuccess(colors.val()));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function saveColor(color) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return colorApi.saveColor(color).then(savedColor => {
            dispatch(createColorSuccess({...color, id: savedColor.key, name: color}));
            return {id: savedColor.key};
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function deleteColor(colorId) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return colorApi.deleteColor(colorId).then(() => {
            dispatch(deleteColorSuccess(colorId));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}
