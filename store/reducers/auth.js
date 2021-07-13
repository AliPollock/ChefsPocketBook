import { LOGIN, SIGNUP, ADD_USER_TO_DATABASE } from '../actions/authAction'

const initialState = {
    token: null,
    userId: null
};

export default (state = initialState, action ) => {
    switch (action.type) {
        case LOGIN:
            return {
                token: action.token,
                userId: action.userId
            };
        case SIGNUP:
            return {
                token: action.token,
                userId: action.userId
            };
        case ADD_USER_TO_DATABASE:
            return state;
        default:
            return state;
    }
};
