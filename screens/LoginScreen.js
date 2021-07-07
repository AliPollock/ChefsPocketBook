import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';

function LoginScreen(props) {
    function goHome() {
        console.log("Go Home")
    }
    return (
        <View>
            <Text>Welcome to the Login Screen</Text>
            <Button title={"Home"} onPress={() => {
                console.log(props.navigation);
                props.navigation.navigate({
                    routeName: 'Home'
                });
            }}
            />
            <Button title={"Sign Up"} onPress={() => {
                console.log(props.navigation);
                props.navigation.navigate({
                    routeName: 'SignUp'
                });
            }}
            />
        </View>
    );
}

const styles = StyleSheet.create({

});

export default LoginScreen;
