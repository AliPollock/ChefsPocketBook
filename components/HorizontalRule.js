import React from 'react';
import {View, StyleSheet} from 'react-native';
import Colors from "../constants/Colors";

/**
 * A reusable UI component which will be a Horizontal Line to act as a divider.
 */

function HorizontalRule(props) {
    return (
        <View style={styles.line}/>
    );
};

const styles = StyleSheet.create({
    line: {
        borderBottomColor: Colors.primaryColor,
        borderBottomWidth: 3,
        width: '90%'
    }
});

export default HorizontalRule;
