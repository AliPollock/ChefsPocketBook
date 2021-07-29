import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, ScrollView, FlatList} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import Colors from "../constants/Colors";
import FooterButton from "../components/FooterButton";
import HeaderButtonLarge from "../components/HeaderButtonLarge";
import * as recipeActions from "../store/actions/recipeAction";
import * as groupActions from "../store/actions/groupAction";
import * as authActions from "../store/actions/authAction";
import {useDispatch, useSelector} from "react-redux";
import {store} from "../App";
import HorizontalRecipeCard from "../components/UIComponents/HorizontaRecipeCard";
import {Ionicons} from "@expo/vector-icons";
import {justifyContent} from "styled-system";
import HorizontalFlatList from "../components/HorizontalFlatList";
import GroupCard from "../components/UIComponents/GroupCard";
import HorizontalGroupCard from "../components/UIComponents/HorizontalGroupCard";

function HomeScreen(props) {
    const dispatch = useDispatch();

    const [userRecipes, setUserRecipes] = useState(useSelector(state => state.recipes.userRecipes));
    const [userGroups, setUserGroups] = useState(useSelector (state => state.groups.userGroups))
    // console.log("user Recipes: " + JSON.stringify(userRecipes));
    // console.log("user Groups: " + JSON.stringify(userGroups));

    useEffect(() => {
        dispatch(recipeActions.getUserRecipes())
        // console.log("user Recipes: " + JSON.stringify(userRecipes));
        dispatch(recipeActions.getAllRecipes());
        dispatch(groupActions.setUserGroups());
        dispatch(authActions.getAllEmails());
        console.log(JSON.stringify(store.getState()));
        // userRecipes(store.getState().recipes.userRecipes)
    }, [])

   store.subscribe(() => {
       setUserRecipes(store.getState().recipes.userRecipes)
       setUserGroups(store.getState().groups.userGroups)
   })



    function renderUserRecipeItem(itemData) {

        //this will be need when it is refactored into its own file
        // const userRecipes = useSelector(state => state.recipes.userRecipes);

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

    function renderUserGroupItem(itemData) {
        // console.log(itemData);

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
    };


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
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    mainBody: {
        flex: 1,
        width: '93%',
        marginBottom: '5%'
    },
    title: {
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
