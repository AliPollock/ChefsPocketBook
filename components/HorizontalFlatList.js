import {Ionicons} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import {FlatList, View, StyleSheet} from "react-native";
import React from "react";


function HorizontalFlatList(props) {

    return (
        <View style={styles.listContainer}>
            <Ionicons  style={{marginRight: 3}} name="arrow-back-circle" size={40} color={Colors.primaryColor}/>
            <View style={styles.listInnerContainer}>
                <FlatList
                    horizontal
                    contentContainerStyle={styles.list}
                    data={props.data}
                    keyExtractor={item => item.id}
                    renderItem={props.renderItem}
                />
            </View>
            <Ionicons style={{marginLeft: 3}} name="arrow-forward-circle" size={40} color={Colors.primaryColor}/>
        </View>
    )


}

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        marginTop: "3%",
        width: '100%',
        alignItems: 'center',
        height: '55%'
    },
    listInnerContainer: {
        flex: 1,
        borderRadius: 15,
        borderColor: Colors.primaryColor,
        borderWidth:2,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    list: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    }
})

export default HorizontalFlatList;
