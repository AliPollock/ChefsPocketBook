import AsyncStorage from '@react-native-async-storage/async-storage';
import {WEB_API_KEY} from "../../constants/Config";
import {ADD_RECIPE_TO_COLLECTION, CREATE_RECIPE, SET_USER_RECIPES} from "./recipeAction";
import Recipe from "../../models/Recipe";

//action identifiers
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const ADD_USER_TO_DATABASE = 'ADD_USER_TO_DATABASE';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_ALL_EMAILS = 'GET_ALL_EMAILS';
export const ADD_EMAIL_TO_DATABASE = 'ADD_EMAIL_TO_DATABASE';
export const ADD_EMAIL_TO_MAIN_COLLECTION = 'ADD_EMAIL_TO_MAIN_COLLECTION';

let timer;

//function used to authenticate user login/signup
export const authenticate = (userId, token, email, expirationTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expirationTime));
        dispatch({type: AUTHENTICATE, userId: userId, token: token, userEmail: email});
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
        // console.log("resData: " + JSON.stringify(resData));     //error handling for signup form
        if(!response.ok) {
            const errorId = resData.error.message;
            let message = "Something went wrong with the servers when signingup."
            if(errorId === "EMAIL_EXISTS") {
                message = 'this account already exists in our database!'
            }
            throw new Error(message);
        }


        dispatch(authenticate(resData.localId, resData.idToken, resData.email,parseInt(resData.expiresIn) * 1000));
        dispatch(addEmailToDatabase(resData.email));
        dispatch(addEmailToMainCollection(resData.email));
        // dispatch({type: SIGNUP, token: resData.idToken, userId: resData.localId });
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn)*1000);
        saveDataToStorage(resData.idToken, resData.localId, resData.email, expirationDate);
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
        // console.log("login resData: " + JSON.stringify(resData));

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
        dispatch(authenticate(resData.localId, resData.idToken, resData.email, parseInt(resData.expiresIn) * 1000));
        // dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn)*1000);
        saveDataToStorage(resData.idToken, resData.localId, resData.email, expirationDate);
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
const saveDataToStorage = (token, userId, email, expirationDate) => {
    // console.log('data being saved: ' +  JSON.stringify({
    //     token: token,
    //     userId: userId,
    //     expirationDate: expirationDate.toISOString()
    // })
    // );
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        userEmail: email,
        expirationDate: expirationDate.toISOString()
    })
    );
}

export const getAllEmails = () => {

    return async (dispatch, getState) => {
        const token = getState().authenticate.token;
        const userId = getState().authenticate.userId;

        try {
            const response = await fetch(
                `https://chefspocketbook-259f1-default-rtdb.europe-west1.firebasedatabase.app/email.json?auth=${token}`);

            const resData = await response.json();
            const loadedEmails = [];

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            for (const key in resData) {
                // console.log(JSON.stringify(resData[key]));
                loadedEmails.push(resData[key]);
            }

            // console.log(loadedEmails);

            dispatch({
                type: SET_ALL_EMAILS, emails: loadedEmails
            });
        } catch(err) {
            throw(err)
        }
    };
}

export const addEmailToDatabase = (email) => {
    return async (dispatch, getState) => {
        const token = getState().authenticate.token;
        const userId = getState().authenticate.userId;
        // console.log(JSON.stringify(getState()));
        //promise will be returned and stored in const response
        const response = await fetch(
            `https://chefspocketbook-259f1-default-rtdb.europe-west1.firebasedatabase.app/${userId}/email.json?auth=${token}` ,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email
                })
            });

        const resData= await response.json();
        // console.log("here is the resData: " + resData);


        if (!response.ok) {
            throw new Error('Something went wrong adding email to database!');
        }

        //action to change state
        dispatch({
            type: ADD_EMAIL_TO_DATABASE,
            userEmail: email
        });

    };
}

export const addEmailToMainCollection = (email) => {
    return async (dispatch, getState) => {
        const token = getState().authenticate.token;
        const userId = getState().authenticate.userId;
        // console.log(JSON.stringify(getState()));
        //promise will be returned and stored in co1nst response
        const response = await fetch(
            `https://chefspocketbook-259f1-default-rtdb.europe-west1.firebasedatabase.app/email.json?auth=${token}` ,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    email
                })
            });

        const resData= await response.json();
        console.log("here is the resData: " + resData);


        if (!response.ok) {
            throw new Error('Something went wrong adding email to main collection!');
        }

        //action to change state
        dispatch({
            type: ADD_EMAIL_TO_MAIN_COLLECTION,
            userEmail: email
        });

    };
}
