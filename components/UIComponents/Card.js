import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from "../../constants/Colors";

const Card = props => {
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'white',
        shadowOpacity: 1,
        shadowOffset: { width: 5, height: 5 },
        shadowRadius: 20,
        elevation: 20,
        borderRadius: 10,
        backgroundColor: Colors.accentColor
    }
});

export default Card;
