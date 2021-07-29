import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform, Dimensions
} from 'react-native';
import Card from "./Card";
import {Rating} from "react-native-ratings";
import Colors from "../../constants/Colors";
import {Ionicons} from "@expo/vector-icons";

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
                        <Ionicons name="people-circle" size={35} color={Colors.primaryColor}/>
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
        height: '90%',
        alignItems: 'center',
        width: Dimensions.get('window').width/3,
        marginLeft: 5,
        marginRight: 10,
        backgroundColor: Colors.accentColor
    },
    titleContainer: {
        justifyContent: 'center'
    },
    name: {
        margin: 5,
        fontSize: 20,
        fontFamily: 'open-sans-bold',
        color: 'white',
        textAlign: 'center'
    },
    touchable: {
        flex: 1,
        margin: 5,
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

export default GroupCard;
