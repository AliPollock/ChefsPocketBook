import React from 'react';
import {View, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from "../../constants/Colors";
import Input from "./Input";
import {alignItems} from "styled-system";

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

