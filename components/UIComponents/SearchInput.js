import React, {useEffect, useReducer} from 'react';
import {View, TextInput, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
const INPUT_FOCUSED = 'INPUT_FOCUSED';

//handler to handle state changes for component
const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value
            };
        case INPUT_BLUR:
            return {
                ...state,
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

function SearchInput(props) {

    //state slice to pass value and focused changes to handler and to set intitial values
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.value ? props.value : '',
        focused: false
    });

    const { value, onChange} = props;

    //changes internal state of the component so that it knows about it's own value
    const changeHandler = (text) => {
        dispatch({ type: INPUT_CHANGE, value: text});
    };

    //changes internal state of the component so that it knows about it's own touched status
    const lostFocusHandler = () => {
        dispatch({ type: INPUT_BLUR });
    };

    //changes internal state of the component so that it knows about it's own touched status
    const gainedFocusHandler = () => {
        dispatch({type: INPUT_FOCUSED});
    }

    return (
        <TouchableOpacity style={styles.input}>
            <TextInput
                {...props}
                placeholder="Search Recipes"
                placeholderTextColor="white"
                style={styles.textInput}
                value={inputState.value}
                onChangeText={text => {
                    onChange(text);
                    changeHandler(text);
                }}
                onBlur={lostFocusHandler}
                onFocus={gainedFocusHandler}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    input: {
        borderColor: Colors.primaryColor,
        borderWidth: 2,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        width: "80%",
        borderRadius: 15,
        alignItems: 'center',
    },
    textInput: {
        color: "white",
        alignItems: "center"
    },
    errorText: {
        color: "white"
    }
});

export default SearchInput;
