import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform, Dimensions
} from 'react-native';
import Card from "./Card";
import {alignItems, flexDirection, fontSize} from "styled-system";
import {Rating} from "react-native-ratings";
import Colors from "../../constants/Colors";
import HorizontalRule from "../HorizontalRule";

/**
 * A component which represents a Recipe to be used in a vertical FlatList
 * @param {function} props.onSelect   A function which is called when the card is touched.
 * @param {int}       props.rating    An int between from 0-5 which determines the rating for the card.
 * @param {String}       props.title      An String which holds the title of the Recipe.
 * @returns {JSX.Element}   A card which represents a group item.
 * @constructor
 */

function RecipeCard(props) {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (

            <Card style={styles.recipe}>
                <View style={styles.innerBox}>
                    <TouchableCmp style={styles.touchable} onPress={props.onSelect}>
                        <View style={styles.touchable}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>
                                    {props.title.toString()}
                                </Text>
                                <Rating
                                    style={styles.rating}
                                    imageSize={30}
                                    readonly
                                    startingValue={props.rating}
                                    tintColor={Colors.accentColor}
                                />
                            </View>
                            <View style={styles.descriptionContainer}>
                                <Text style={styles.description}>{props.description.toString()}</Text>
                            </View>
                        </View>
                    </TouchableCmp>
                </View>
            </Card>

    );
};

const styles = StyleSheet.create({
    recipe: {
        marginTop: 20,
        height: 150,
        alignItems: 'center',
        width: Dimensions.get('window').width,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        margin: 15,
        fontSize: 20,
        fontFamily: 'open-sans-bold',
        color: 'white'
    },
    rating: {
        margin: 15
    },
    descriptionContainer: {
        margin: 15
    },
    description: {
        fontSize:15,
        fontFamily: 'open-sans-bold',
        color: 'white'
    },
    touchable: {
        flex: 1
    },
    innerBox: {
        flex: 1,
        width: '100%',
        borderRadius: 15,
        borderColor: Colors.primaryColor,
        borderWidth:2
    }
});

export default RecipeCard;
