import React, {useEffect, useReducer} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import Colors from '../../constants/Colors';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
const INPUT_FOCUSED = 'INPUT_FOCUSED';

/**
 * A Reducer component which generalises and sorts actions to determine the state change the action will make.
 * @param {String} state The state that the action will make a change to.
 * @param {Object} action The action which contains a type value and determines what data should be added to the state.
 */

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            };
        case INPUT_BLUR:
            return {
                ...state,
                touched: true,
                focused: false
            };
        case INPUT_FOCUSED:
            return {
                ...state,
                focused: true
            };
        default:
            return state;
    }
};

/**
 * A custom input component which contains styling and adds functionality on top of the React-native library Text Input.
 * @param {String} props.initialValue The initial value of the Text Input.
 * @param {function} props.onInputChange The function which is called when the value of the Input changes.
 * @param {String} props.id The unique id which is used to identify the Instance of the Text Input.
 * @param {Boolean} props.required A Boolean which determines if the Input is required.
 * @param props.email An empty prop which acts a boolean to determine whether the text input is an email type input.
 * @param {int} props.min A minimum numerical value for the Input.
 * @param {int} props.max A maximum numerical value for the Input.
 * @param {int} props.minLength The minimum Length that is required to be entered into the input.
 * @param {String} props.label The label text for the Input.
 * @param {String} props.errorText The message to be displayed if there is an error with the value of the Input.
 * @returns {JSX.Element} A Text Input with added functionality and styling.
 */

function Input(props) {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: true,
        touched: false,
        focused: false
    });

    const { onInputChange, id } = props;

    useEffect(() => {
        if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange, id]);

    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
    };

    const lostFocusHandler = () => {
        dispatch({ type: INPUT_BLUR });
    };

    const gainedFocusHandler = () => {
        dispatch({type: INPUT_FOCUSED});
    }

    return (
        <View style={styles.input}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                {...props}
                style={styles.textInput}
                value={inputState.value}
                onChangeText={textChangeHandler}
                onBlur={lostFocusHandler}
                onFocus={gainedFocusHandler}/>
            {!inputState.isValid && !inputState.focused && <Text style={styles.errorText}>{props.errorText}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderColor: Colors.primaryColor,
        borderBottomWidth: 2,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
        color: "white"
    },
    textInput: {
        color: "white"
    },
    errorText: {
        color: "white"
    }
});

export default Input;
