import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from "../../constants/Colors";

/**
 * Component to represent a reusable card.
 * @param {Object} props.style        a style object passed by the parent component which is merged with the styles in this component.
 * @param {Object} props.children     generic props which will take any props passed between the tags when used in a parent component
 * @returns {JSX.Element}   View    a View with styling which will enclose the child components passed inside of it
 */
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
