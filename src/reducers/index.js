import {combineReducers} from 'redux';
import authentication from './authenticationReducer';
import bikes from './bikeReducer';
import currentBike from './currentBikeReducer';
import currentBikeFilter from './currentBikeFilterReducer';
import usersData from './usersDataReducer';
import users from './userReducer';
import colors from './colorReducer';
import {routerReducer} from 'react-router-redux';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    router: routerReducer,
    ajaxCallsInProgress,
    authentication,
    usersData,
    users,
    bikes,
    currentBike,
    currentBikeFilter,
    colors
});

export default rootReducer;