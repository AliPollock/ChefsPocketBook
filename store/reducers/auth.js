import {
    LOGIN,
    SIGNUP,
    ADD_USER_TO_DATABASE,
    AUTHENTICATE,
    LOGOUT,
    SET_ALL_EMAILS,
    ADD_EMAIL_TO_DATABASE, ADD_EMAIL_TO_MAIN_COLLECTION
} from '../actions/authAction'

/**
 * Constant used to state the initial state of the state slice.
 */

const initialState = {
    token: null,
    userId: null,
    userEmail: null,
    allEmail: null
};

/**
 * Reducer function which receives action object and executes state updates based on the type attribute of the action.
 * @param {Object} state The current state slice.
 * @param {Object} action The action to be performed with an optional payload.
 */

export default (state = initialState, action ) => {
    switch (action.type) {
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
