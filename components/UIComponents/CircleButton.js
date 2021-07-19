import React from 'react';
import {StyleSheet, TouchableOpacity} from "react-native";
import {Entypo} from "@expo/vector-icons";
import Colors from "../../constants/Colors";


function CircleButton(props) {

    return(
        <TouchableOpacity style={styles.button} onPress={props.onSelect}>
            <Entypo style={styles.symbol} name={props.iconName} size={props.size}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primaryColor,
        borderColor: Colors.accentColor,
        color: Colors.primary,
        width: 60,
        height: 60,
        borderRadius:30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    symbol: {
        alignItems: 'center',
        justifyContent: 'center',
        color: Colors.accentColor
    }
});


export default CircleButton;
