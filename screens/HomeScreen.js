import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';

function HomeScreen(props) {

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
            <Button title={"EditRecipe"} onPress={() => {
                console.log(props.navigation);
                props.navigation.navigate({
                    routeName: 'EditRecipe'
                });
            }}
            />
        </View>
    );
}

const styles = StyleSheet.create({

});

export default HomeScreen;
