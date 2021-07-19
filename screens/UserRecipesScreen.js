import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, FlatList} from 'react-native';
import {store} from "../App";
import * as recipeActions from "../store/actions/recipeAction";
import {useDispatch, useSelector} from "react-redux";
import RecipeCard from "../components/RecipeCard";
import Colors from "../constants/Colors";
import FooterButton from "../components/FooterButton";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButtonLarge from "../components/HeaderButtonLarge";

function UserRecipesScreen(props) {


    const dispatch = useDispatch();
    dispatch(recipeActions.getUserRecipes())
    const userRecipes = useSelector(state => state.recipes.userRecipes);

    // console.log(JSON.stringify(userRecipes) + ": user recipes \n \n")

    //factor this function out into its own file
    function renderRecipeItem(itemData) {

        //this will be need when it is refactored into its own file
        // const userRecipes = useSelector(state => state.recipes.userRecipes);

        const isUserRecipe = true;


        return (
            <RecipeCard
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
                            photos: itemData.item.photos,
                            groupName: itemData.item.groupName,
                            isUserRecipe: isUserRecipe
                        }
                    });
                }}
                key={itemData.item.id}
                title={itemData.item.title}
                id={itemData.item.id}
                rating={itemData.item.rating}
                description={itemData.item.description}/>
        );
    };


    return (

        <View style={styles.screen}>
            <FlatList
                data={userRecipes}
                keyExtractor={item => item.id}
                renderItem={renderRecipeItem}
            />
            <FooterButton
                iconName={'home'}
                size={40}
                onSelect={() =>{
                    props.navigation.navigate({
                    routeName: 'Home'
                    });
                }}
            />
        </View>
    );
};

UserRecipesScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Recipes',
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
        backgroundColor: Colors.accentColor
    },
});

export default UserRecipesScreen;
