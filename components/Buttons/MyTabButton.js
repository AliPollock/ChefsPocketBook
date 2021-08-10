import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Colors from "../../constants/Colors";
import React, {useState} from "react";
import {borderWidth} from "styled-system";

/**
 * A Button to be used as a tab header.
 * @param {function} props.onPress     A function which is activated when the button is pressed.
 * @param {String} props.title       The title of the button.
 * @param {Object} props.style       An object which contains styling data.
 * @returns {JSX.Element}   A styled tab header.
 */

function MyTabButton(props) {

    const [isSelected, setIsSelected] = useState(false);

    return(
        <TouchableOpacity
            style={[styles.buttonContainer, props.style]}
            onPress={props.onPress}
        >
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 5,
        overflow: 'hidden',
        marginVertical:10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width:0, height: 2},
        shadowRadius: 10,
        backgroundColor: Colors.primaryColor,
        height: 40,
        borderWidth: 1
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

export default MyTabButton;
