import React from 'react';
import {View, StyleSheet} from 'react-native';
import Colors from "../../constants/Colors";

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
