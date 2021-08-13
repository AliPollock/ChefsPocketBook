import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, ScrollView, FlatList} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import Colors from "../constants/Colors";
import FooterButton from "../components/Buttons/FooterButton";
import HeaderButtonLarge from "../components/Buttons/HeaderButtonLarge";
import * as recipeActions from "../store/actions/recipeAction";
import * as groupActions from "../store/actions/groupAction";
import * as authActions from "../store/actions/authAction";
import {useDispatch, useSelector} from "react-redux";
import {store} from "../App";
import HorizontalRecipeCard from "../components/Cards/HorizontalRecipeCard";
import {Ionicons} from "@expo/vector-icons";
import {justifyContent} from "styled-system";
import HorizontalFlatList from "../components/HorizontalFlatList";
import GroupCard from "../components/Cards/GroupCard";
import HorizontalGroupCard from "../components/Cards/HorizontalGroupCard";

/**
 * The home screen of the which displays the user's data and provides routes around the app.
 * @param {object} props.navigation Navigation information passed from the previous screen.
 * @returns {JSX.Element}
 * @constructor
 */

function HomeScreen(props) {
    const dispatch = useDispatch();

    //local state for home screen
    const [userRecipes, setUserRecipes] = useState(useSelector(state => state.recipes.userRecipes));
    const [userGroups, setUserGroups] = useState(useSelector (state => state.groups.userGroups))

    //useEffect which is called once upon initial render
    useEffect(() => {
        dispatch(recipeActions.getUserRecipes())
        dispatch(recipeActions.getAllRecipes());
        dispatch(groupActions.setUserGroups());
        dispatch(authActions.getAllEmails());
    }, [])

    //this is triggered upon a change in the store. Required to render the FlatLists on the home page
   store.subscribe(() => {
       setUserRecipes(store.getState().recipes.userRecipes)
       setUserGroups(store.getState().groups.userGroups)
   })



    // The function which is called for every item in the recipe FlatList
    function renderUserRecipeItem(itemData) {

        const isUserRecipe = true;


        return (
            <HorizontalRecipeCard
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'Recipe',
                        params: {
                            recipeId: itemData.item.id,
                            mainCollectionId: itemData.item.mainCollectionId,
                            title: itemData.item.title,
                            description: itemData.item.description,
                            ingredients: itemData.item.ingredients,
                            directions: itemData.item.directions,
                            categories: itemData.item.categories,
                            servings: itemData.item.servings,
                            notes: itemData.item.notes,
                            preparationTime: itemData.item.preparationTime,
                            cookTime: itemData.item.cookTime,
                            rating: itemData.item.rating,
                            isVegan: itemData.item.isVegan,
                            isVegetarian: itemData.item.isVegetarian,
                            isGlutenFree: itemData.item.isGlutenFree,
                            isDairyFree: itemData.item.isDairyFree,
                            photos: itemData.item.isPublic,
                            isUserRecipe: isUserRecipe,
                            isGroupRecipe: false
                        }
                    });
                }}
                key={itemData.item.id}
                title={itemData.item.title}
                id={itemData.item.id}
                rating={itemData.item.rating}
                description={itemData.item.description}/>
        );
    }

    // The function which is called for every item in the group FlatList
    function renderUserGroupItem(itemData) {

        return (
            <HorizontalGroupCard
                groupName={itemData.item.groupName}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'Group',
                        params: {
                            groupId: itemData.item.id,
                            groupName: itemData.item.groupName,
                            mainCollectionId: itemData.item.mainCollectionId,
                            member: itemData.item.member,
                            recipes: itemData.item.recipes
                        }
                    });
                }}
            />
        );
    }


    return (
        <View style={styles.screen}>
            <View style={styles.mainBody}>
                <Text style={styles.title}>ChefsPocketBook</Text>
                <View style={styles.listContainer}>
                    <View style={styles.headingsContainer}>
                        <Text style={styles.subHeadingOne}>My Recipes</Text>
                        <Text
                            style={styles.subHeadingTwo}
                            onPress={() =>{
                                props.navigation.navigate({
                                    routeName: 'Search',
                                    params: {
                                        searchTerm: ""
                                    }
                                });
                            }}
                        >View All
                        </Text>
                    </View>
                    <HorizontalFlatList
                        data={userRecipes}
                        renderItem={renderUserRecipeItem}
                    />
                </View>
                <View style={styles.listContainer}>
                    <View style={styles.headingsContainer}>
                        <Text style={styles.subHeadingOne}>My Groups</Text>
                        <Text
                            style={styles.subHeadingTwo}
                            onPress={ () => {
                                props.navigation.navigate({
                                    routeName: 'AllGroups'
                                })
                            }}
                        >View All
                        </Text>
                    </View>
                    <HorizontalFlatList
                        data={userGroups}
                        renderItem={renderUserGroupItem}
                    />
                </View>

            </View>
            <FooterButton
                iconName={'plus'}
                size={40}
                onSelect={() =>{
                    props.navigation.navigate({
                        routeName: 'EditRecipe'
                    });
                }}
                position="right"
            />
        </View>
    );
}

/**
 * Assigning functionality and buttons to the header of the screen.
 * @param navData The navigation data for the screen.
 */

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
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    mainBody: {
        flex: 1,
        width: '93%',
        marginBottom: '5%'
    },
    title: {
        alignSelf: 'center',
        marginTop: '5%',
        color: Colors.primaryColor,
        fontSize: 40,
        fontFamily: 'open-sans-bold',
        marginBottom: '5%'
    },
    footer: {
        backgroundColor: Colors.accentColor
    },
    listContainer: {
        flex: 1
    },
    headingsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginRight: '5%',
        marginLeft: '5%',
        marginBottom: '5%'
    },
    subHeadingOne: {
        fontSize: 25,
        color: 'white',
        fontFamily: 'open-sans-bold'
    },
    subHeadingTwo: {
        fontSize: 20,
        color: Colors.primaryColor,
        fontFamily: 'open-sans-bold',
        marginBottom: 4
    }
});

export default HomeScreen;
