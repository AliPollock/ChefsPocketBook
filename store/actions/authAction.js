import {WEB_API_KEY} from "../../constants/Config";
import {CREATE_RECIPE} from "./recipeAction";
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const ADD_USER_TO_DATABASE = 'ADD_USER_TO_DATABASE';

//action which will add user to firebase authentication and create a unique which will be added to the current state of the app along with a secure token
export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + WEB_API_KEY,
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        }
        );

        const resData = await response.json();
        console.log(resData);

        //error handling for signup form
        if(!response.ok) {
            const errorId = resData.error.message;
            let message = "Something went wrong with the servers."
            if(errorId === "EMAIL_EXISTS") {
                message = 'this account already exists in our database!'
            }
            throw new Error(message);
        }

        dispatch({type: SIGNUP, token: resData.idToken, userId: resData.localId });
    };
};

//action which will add user to the real time database and make no change to the app state
// export const addUserToDatabase = (email, password) => {
//     return async (dispatch, getState) => {
//         const token = getState().authenticate.token;
//         console.log(getState())
//         let userId = getState().authenticate.userId
//         //promise will be returned and stored in response
//         const response = await fetch(
//             `https://chefspocketbook-259f1-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=${token}` ,
//             {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     userId: userId,
//                     email: email,
//                     password: password,
//                 })
//             });
//
//         const resData= await response.json();
//         console.log(resData);
//
//
//         if (!response.ok) {
//             throw new Error('Something went wrong adding user to database!');
//         }
//
//         dispatch({
//             type: ADD_USER_TO_DATABASE,
//             userData: {
//                 userId: userId,
//                 email: email,
//                 password: password,
//             }
//         });
//
//
//     };
// };

//action which will check if user is listed as an authenticated user and add the user id to the current state of the app along with a secure token
export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + WEB_API_KEY,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        const resData = await response.json();
        console.log(resData);

        if(!response.ok) {
            const errorId = resData.error.message;
            let message = "Something went wrong with the servers."
            if(errorId === "EMAIL_NOT_FOUND") {
                message = 'this email could not be found'
            } else if (errorId === "INVALID_PASSWORD") {
                message = "This password does not match the email address."
            }
            throw new Error(message);
        }
        dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
    };
};
