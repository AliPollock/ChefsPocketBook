import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, ScrollView} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import Colors from "../constants/Colors";
import FooterButton from "../components/FooterButton";
import HeaderButtonLarge from "../components/HeaderButtonLarge";
import * as recipeActions from "../store/actions/recipeAction";
import {useDispatch} from "react-redux";

function HomeScreen(props) {
    const dispatch = useDispatch();

    return (
        <View style={styles.screen}>
            <ScrollView>
                <Text>Welcome to the Home Screen</Text>
                <Button title={"Search"} onPress={() => {
                    // console.log(props.navigation);
                    props.navigation.navigate({
                        routeName: 'Search'
                    });
                }}
                />

            </ScrollView>
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

HomeScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Home',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButtonLarge}>
                <Item
                    title="Logout"
                    iconName='ios-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}/>
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.accentColor,
        justifyContent: 'space-between'
    },
    footer: {
        backgroundColor: Colors.accentColor
    },
    addRecipeContainer: {
        alignItems: 'flex-end',
        padding:20
    }
});

export default HomeScreen;
