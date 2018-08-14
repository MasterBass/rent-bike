import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function usersDataReducer(state = initialState.usersData, action) {
    switch (action.type) {
        case types.LOAD_ALL_USERS_DATA_SUCCESS:
            let result = [];
            Object.keys(action.data).map((user) => {
                if (action.data[user].reservations) {
                    const userData = Object.keys(action.data[user].reservations).map((reserve) => {
                        return {
                            email: action.data[user].email,
                            role: action.data[user].role,
                            model: action.data[user].reservations[reserve].model,
                            address: action.data[user].reservations[reserve].location,
                            start: action.data[user].reservations[reserve].start,
                            end: action.data[user].reservations[reserve].end,
                            isCancelled: !!action.data[user].reservations[reserve].isCancelled
                        };
                    });
                    result = [...result, ...userData];
                }
                return null;
            });
            return result;

        default:
            return state;
    }
}
