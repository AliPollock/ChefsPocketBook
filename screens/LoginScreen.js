import React, {useEffect, useState, useReducer, useCallback} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Button,
    ScrollView,
    KeyboardAvoidingView,
    TextInput,
    Keyboard,
    ActivityIndicator,
    Alert
} from 'react-native';
import Colors from '../constants/Colors'
import Input from "../components/UIComponents/Input";
import MyButton from "../components/UIComponents/MyButton";
import {MaterialCommunityIcons} from '@expo/vector-icons';

import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/authAction';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

/*a reducer which handles any input into any text input,
so all changes are centralised and managed in this state rather than many different states for validities and values*/
const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

function LoginScreen(props) {

    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isSignedup, setIsSignedup] = useState(false);
    //Logic to adjust screen if keyboard is present

    const [keyBoardIsVisible, setKeyboardIsVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardIsVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardIsVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    //auth
    const dispatch = useDispatch();

    /*form state will be changed when there is a change in any input and will call the formReducer upon the change*/
    const [formState, dispatchFormState] = useReducer(formReducer,{
        /*this object stores the current text in the form corresponding with each field*/
        inputValues: {
            email: '',
            password: ''

        },
        /*this object simply stores whether the current text in the form is valid or not corresponding with each field*/
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if(error) {
            Alert.alert("An Error occurred!", error,[{text: 'Okay'}]);
        }
    }, [error]);

    const authHandler = async () => {
        let action;
        if (isSignedup) {
            action =
                authActions.signup(
                    formState.inputValues.email,
                    formState.inputValues.password
                );
        } else {
            action =
                authActions.login(
                    formState.inputValues.email,
                    formState.inputValues.password
                );
        }
        setError(null);
        setIsLoading(true);
        try {
            //adding user to authenticated users
            await dispatch(action);
            //Adding user to real time database
            // if (isSignedup) {
            //     await dispatch(
            //         authActions.addUserToDatabase(
            //             formState.inputValues.email,
            //             formState.inputValues.password
            //         )
            //     )
            // }
            props.navigation.navigate('App')
        } catch(err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    //this function is called upon each change in form inputs and saves the current contents of the form to formState
    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    },
        [dispatchFormState]
    );



    return (
        <View style={styles.screen}>
            <View style={styles.welcomeMessage}>

                {!keyBoardIsVisible && (
                    <View style={styles.keyBoardVisibleTitleContainer}>
                        <Text style={styles.titleWithoutKeyboard}>Welcome to{"\n"} Chefs Pocketbook</Text>
                        <MaterialCommunityIcons name={'notebook' } color={Colors.primaryColor} size={60}/>
                    </View>
                )}
                {keyBoardIsVisible && (
                    <Text style={styles.titleWithKeyboard}>Chefs Pocketbook</Text>
                )}
            </View>
            <KeyboardAvoidingView
                style={styles.bottomScreen}
                behaviour="padding"
                keyboardVerticalOffset={50}>
                <View style={styles.formContainer}>
                    <ScrollView>
                        <Input
                            style={styles.input}
                            id="email"
                            label="E-Mail"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid email address."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={6}
                            autoCapitalize="none"
                            errorText="Please enter a valid password."
                            onInputChange={inputChangeHandler}
                            initialValue=""
                        />
                        {isLoading ? (
                            <ActivityIndicator size='large' color={Colors.primaryColor}/>
                        ): (
                        <View>
                            <MyButton
                                title={isSignedup ? "Sign up." : "Login"}
                                color={Colors.primaryColor}
                                onPress={authHandler}/>
                            <MyButton
                                title={isSignedup ? "Already have an account? Switch to Login." : "Don't have an account? Sign Up."}
                                color={Colors.primaryColor}
                                onPress={() => setIsSignedup(prevState => !prevState)}
                            />
                        </View>
                        )}
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons.Button name={'facebook' } size={40} style={{justifyContent: 'center', padding: 5}}/>
                <MaterialCommunityIcons.Button name={'google' } backgroundColor={'red'} size={40} style={{justifyContent: 'center', padding: 5}} />
                <MaterialCommunityIcons.Button name={'twitter' } backgroundColor={'#00acee'} size={40} style={{justifyContent: 'center', padding: 5}} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    welcomeMessage: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleWithoutKeyboard: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 34,
        color: 'white',
        fontFamily: 'open-sans-bold'
    },
    titleWithKeyboard: {
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 34,
        color: 'white',
        fontFamily: 'open-sans-bold'
    },
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.accentColor
    },
    bottomScreen: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.accentColor
    },
    formContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        borderColor: Colors.primaryColor,
        borderRadius: 10,
        borderWidth: 4,
        padding: 10
    },
    keyBoardVisibleTitleContainer: {
        alignItems: 'center',
        marginBottom: 40
    },
    iconContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
    }
});

export default LoginScreen;
