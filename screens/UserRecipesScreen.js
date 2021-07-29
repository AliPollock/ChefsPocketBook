import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, FlatList} from 'react-native';
import {store} from "../App";
import * as recipeActions from "../store/actions/recipeAction";
import {useDispatch, useSelector} from "react-redux";
import RecipeCard from "../components/RecipeCard";
import Colors from "../constants/Colors";
import FooterButton from "../components/FooterButton";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButtonLarge from "../components/HeaderButtonLarge";
import SearchInput from "../components/UIComponents/SearchInput";
import {alignItems} from "styled-system";
import searchReducer from "../store/reducers/searchReducer";



function UserRecipesScreen(props) {

    console.log(JSON.stringify(store.getState()));
    const dispatch = useDispatch();
    dispatch(recipeActions.getUserRecipes())

    const [searchState, setSearchState] = useState("");

    useEffect(() => {
        dispatch(recipeActions.setCurrentRecipes(""));
    }, [])


    // console.log("store (currentUserRecipes): " + JSON.stringify(store.getState().recipes.currentUserRecipes))

    const userRecipes = useSelector(state => state.recipes.currentUserRecipes);
    // console.log("currentUserRecipes: " + userRecipes);

    const searchChangeHandler = (text) => {
        setSearchState(text);

        dispatch(recipeActions.setCurrentRecipes(text));
        // console.log("searchState in handler:" + searchState)
    }


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
    };


    return (

        <View style={styles.screen}>
            <SearchInput
                searchValue={searchState}
                onChange={text => searchChangeHandler(text)}
            />
            <FlatList
                contentContainerStyle={styles.list}
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
        backgroundColor: Colors.accentColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    list: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default UserRecipesScreen;

