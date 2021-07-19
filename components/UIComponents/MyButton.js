import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import Colors from "../../constants/Colors";
import Input from "./Input";

function MyButton(props) {

    return(
        <View style={styles.buttonContainer}>
            <Button
                title={props.title}
                style={styles.button}
                onPress={props.onPress}
                color={props.color}
            />
        </View>
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
    },
    button: {
        height: 10
    }
});

export default MyButton;

