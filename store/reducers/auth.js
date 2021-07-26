import {
    LOGIN,
    SIGNUP,
    ADD_USER_TO_DATABASE,
    AUTHENTICATE,
    LOGOUT,
    SET_ALL_EMAILS,
    ADD_EMAIL_TO_DATABASE, ADD_EMAIL_TO_MAIN_COLLECTION
} from '../actions/authAction'

const initialState = {
    token: null,
    userId: null,
    userEmail: null,
    allEmail: null
};

export default (state = initialState, action ) => {
    switch (action.type) {
        // case LOGIN:
        //     return {
        //         token: action.token,
        //         userId: action.userId
        //     };
        // case SIGNUP:
        //     return {
        //         token: action.token,
        //         userId: action.userId
        //     };
        case AUTHENTICATE:
            return {...state,
                token: action.token,
                userId: action.userId,
                userEmail: action.userEmail
            };
        case ADD_USER_TO_DATABASE:
            return state;
        case LOGOUT:
            return initialState;
        case SET_ALL_EMAILS:
            return {...state, allEmail: action.emails};
        case ADD_EMAIL_TO_DATABASE:
            return {...state, userEmail: action.userEmail};
        case ADD_EMAIL_TO_MAIN_COLLECTION:
            return state;
        default:
            return state;
    }
};
