import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import FooterButton from "../components/FooterButton";
import Colors from "../constants/Colors";

function GroupScreen(props) {

    return (
        <View style={styles.screen}>
            <Text>{props.navigation.getParam('groupName')}</Text>
            <Button title={"Groups"}></Button>
            <FooterButton
                iconName={'plus'}
                size={40}
                onSelect={() =>{
                    props.navigation.navigate({
                        routeName: 'EditRecipe'
                    });
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.accentColor,
        alignItems: 'center'
    },
});

export default GroupScreen;
