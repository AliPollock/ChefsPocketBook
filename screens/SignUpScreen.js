import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';

function SignUpScreen(props) {
    function goHome() {
        console.log("Go Home")
    }
    return (
        <View>
            <Text>Welcome to the SignUp Screen</Text>
            <Button title={"Home"} onPress={() => {
                console.log(props.navigation);
                props.navigation.navigate({
                    routeName: 'Home'
                });
            }}
            />
        </View>
    );
}

const styles = StyleSheet.create({

});

export default SignUpScreen;
