import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';

function SearchScreen(props) {
    function goHome() {
        console.log("Go Home")
    }
    return (
        <View>
            <Text>Welcome to the Search Screen</Text>
            <Button title={"Home"} onPress={goHome()}></Button>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default SearchScreen;
