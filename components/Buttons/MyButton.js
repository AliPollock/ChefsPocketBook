import React from 'react';
import {View, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from "../../constants/Colors";
import Input from "../Inputs/Input";
import {alignItems} from "styled-system";

/**
 * A component which contains styling information for a Button.
 * @param {function} props.onPress     A function which is activated when the button is pressed.
 * @param {String} props.title       The title of the button.
 * @param {Object} props.style       An object which contains styling data.
 * @returns {JSX.Element}   A Styled button to be used throughout the application.
 */

function MyButton(props) {

    return(
        <TouchableOpacity
            style={[styles.buttonContainer, props.style]}
            onPress={props.onPress}
            color={props.color}
        >
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical:10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width:0, height: 2},
        shadowRadius: 10,
        backgroundColor: Colors.primaryColor,
        height: 40
    },
    button: {
        padding: 7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: 'white'
    }
});

export default MyButton;

