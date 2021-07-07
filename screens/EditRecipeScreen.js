import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';

function EditRecipeScreen(props) {
    function goHome() {
        console.log("Go Home")
    }
    return (
        <View>
            <Text>Welcome to the EditRecipe Screen</Text>
            <Button title={"Home"} onPress={goHome()}></Button>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default EditRecipeScreen;
