import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';

function HomeScreen(props) {
    function goHome() {
        console.log("Go Home")
    }
    return (
        <View>
            <Text>Welcome to the Home Screen</Text>
            <Button title={"Search"} onPress={() => {
                console.log(props.navigation);
                props.navigation.navigate({
                    routeName: 'Search'
                });
            }}
            />
            <Button title={"Profile"} onPress={() => {
                console.log(props.navigation);
                props.navigation.navigate({
                    routeName: 'Profile'
                });
            }}
            />
            <Button title={"Recipe"} onPress={() => {
                console.log(props.navigation);
                props.navigation.navigate({
                    routeName: 'Recipe'
                });
            }}
            />
        </View>
    );
}

const styles = StyleSheet.create({

});

export default HomeScreen;
