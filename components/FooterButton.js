import React from 'react';
import {View, StyleSheet} from "react-native";
import CircleButton from "./UIComponents/CircleButton";
import Colors from "../constants/Colors";


function FooterButton(props) {
    return(
        <View style={styles.footer}>
            <View style={styles.buttonContainer}>
                <CircleButton
                    iconName={props.iconName}
                    size={props.size}
                    onSelect={props.onSelect}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    footer: {
        position: "absolute",
        bottom: 0,
        alignSelf: "flex-end",
        flexWrap: "wrap"
    },
    buttonContainer: {
        alignItems: 'flex-end',
        padding:20
    }
});

export default FooterButton;
