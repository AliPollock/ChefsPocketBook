import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, ScrollView} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import Colors from "../constants/Colors";
import FooterButton from "../components/FooterButton";
import HeaderButtonLarge from "../components/HeaderButtonLarge";
import * as recipeActions from "../store/actions/recipeAction";
import * as groupActions from "../store/actions/groupAction";
import * as authActions from "../store/actions/authAction";
import {useDispatch} from "react-redux";
import {store} from "../App";

function HomeScreen(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(recipeActions.getUserRecipes());
        dispatch(recipeActions.getAllRecipes());
        dispatch(groupActions.setUserGroups());
        dispatch(authActions.getAllEmails());
        console.log(JSON.stringify(store.getState()));
    }, [])


    return (
        <View style={styles.screen}>
            <ScrollView>
                <Text>Welcome to the Home Screen</Text>
                <Button title={"Search"} onPress={() => {
                    // console.log(props.navigation);
                    props.navigation.navigate({
                        routeName: 'Search',
                        params: {
                            searchTerm: ""
                        }
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
