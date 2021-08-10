import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';
import Card from "./Card";
import {Rating} from "react-native-ratings";
import Colors from "../../constants/Colors";
import {Ionicons} from "@expo/vector-icons";

/**
 * A Component which will represent a group object in a Vertical FlatList.
 * @param {function} props.onSelect    A function which will be called when the Card is touched.
 * @param {string} props.groupName   The name of the Group.
 * @returns {JSX.Element}   A card representing a group object.
 */

function GroupCard(props) {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (

        <Card style={styles.group}>
            <View style={styles.innerBox}>
                <TouchableCmp style={styles.touchable} onPress={props.onSelect}>
                    <View style={styles.touchable}>
                        <Ionicons name="people-circle" size={45} color={Colors.primaryColor}/>
                        <Text style={styles.name}>
                            {props.groupName.toString()}
                        </Text>
                    </View>
                </TouchableCmp>
            </View>
        </Card>

    );
};

const styles = StyleSheet.create({
    group: {
        height: 100,
        margin: 20,
        alignItems: 'center',
        backgroundColor: Colors.accentColor
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        margin: 40,
        fontSize: 20,
        fontFamily: 'open-sans-bold',
        color: 'white'
    },
    touchable: {
        flex: 1,
        margin: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerBox: {
        flex: 1,
        width: '100%',
        borderRadius: 15,
        borderColor: Colors.primaryColor,
        borderWidth:2
    }
});

export default GroupCard;
