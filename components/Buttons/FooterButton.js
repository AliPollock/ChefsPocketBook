import React from 'react';
import {View, StyleSheet} from "react-native";
import CircleButton from "./CircleButton";
import Colors from "../../constants/Colors";

/**
 * A footer button component which will hover separate from ScrollViews and will provide extra navigation access for the user.
 * @param {String} props.iconName    The name of the icon to be displayed on the Button.
 * @returns {JSX.Element}   A view which will stick to the bottom of the screen place the Button on the right.
 */

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
