import AsyncStorage from '@react-native-async-storage/async-storage';
import {WEB_API_KEY} from "../../constants/Config";
import {CREATE_RECIPE} from "./recipeAction";

//action identifiers
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const ADD_USER_TO_DATABASE = 'ADD_USER_TO_DATABASE';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT;'

let timer;

//function used to authenticate user login/signup
export const authenticate = (userId, token, expirationTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expirationTime));
        dispatch({type: AUTHENTICATE, userId: userId, token: token});
    };
};

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

        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
        // dispatch({type: SIGNUP, token: resData.idToken, userId: resData.localId });
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn)*1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};

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
        // console.log(resData);

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
        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
        // dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn)*1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};

//function to log user out, deleted async storage data and navigating back to auth Login Screen
export const logout = () => {
    clearLogoutTimer()
    AsyncStorage.removeItem('userData');
    return {type: LOGOUT};
};

//function to clear the timer so that it is ready to be set on next login
const clearLogoutTimer = () => {
    if (timer){
        clearTimeout(timer);
    }
}

//function to set logout timer when firebase token expires
const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

//function to save data to device memory so that token persists between sessions and can be ultimately be called on by redux at the start of each new session
const saveDataToStorage = (token, userId, expirationDate) => {
    // console.log('data being saved: ' +  JSON.stringify({
    //     token: token,
    //     userId: userId,
    //     expirationDate: expirationDate.toISOString()
    // })
    // );
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expirationDate: expirationDate.toISOString()
    })
    );
}
