import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, Alert, TextInput} from 'react-native';
import Input from "../../components/Inputs/Input";
import Colors from "../../constants/Colors";
import MyButton from "../../components/Buttons/MyButton";
import {useDispatch} from "react-redux";
import * as groupActions from "../../store/actions/groupAction";

/**
 * The Screen which displays options to create a new group.
 * @returns {JSX.Element} A View containing a text input and buttons to create a new group.
 */

function CreateGroupScreen(props) {

    const dispatch = useDispatch();

    //local state for create group screen
    const [input, setInput] = useState("");
    const [inputIsValid, setInputIsValid] = useState(false);

    const inputChangeHandler = (text) => {
        console.log(text)
        console.log(text.length)
        setInput(text)
        if (text.length > 3) {
            setInputIsValid(true);
        } else {
            setInputIsValid(false);
        }
    };

    // function which handles a create action event
    const createHandler = useCallback( () => {
        if(inputIsValid) {
            dispatch(groupActions.createGroup(input, "", ""))
            props.navigation.goBack();
        } else {
            Alert.alert("Please enter a valid group name")
        }
    }, [dispatch, input]);

    return (
        <View style={styles.screen}>
            <TextInput
                style={styles.input}
                value={input}
                onChangeText={inputChangeHandler.bind(this)}
            />
            <MyButton
                title={"Create Group"}
                color={Colors.primaryColor}
                onPress={() => {
                    dispatch(createHandler)
                }
                }/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.accentColor
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        color: 'white'
    },
});

export default CreateGroupScreen;
