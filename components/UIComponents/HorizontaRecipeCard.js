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
import HorizontalRule from "./HorizontalRule";

function HorizontalRecipeCard(props) {
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
                                imageSize={15}
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
        height: '90%',
        alignItems: 'center',
        width: Dimensions.get('window').width/3,
        marginLeft: 10,
        marginRight: 10
    },
    titleContainer: {
        justifyContent: 'space-between'
    },
    title: {
        margin: "5%",
        fontSize: 20,
        fontFamily: 'open-sans-bold',
        color: 'white',
        textAlign: 'center'
    },
    rating: {
    },
    descriptionContainer: {
        margin: "5%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    description: {
        fontSize:15,
        fontFamily: 'open-sans-bold',
        color: 'white',
        textAlign: 'center'
    },
    touchable: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerBox: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 15,
        borderColor: Colors.primaryColor,
        borderWidth:2,
        overflow: 'hidden'
    }
});

export default HorizontalRecipeCard;
