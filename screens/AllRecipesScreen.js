import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, FlatList} from 'react-native';
import RecipeCard from "../components/RecipeCard";
import {useDispatch, useSelector} from "react-redux";
import Colors from "../constants/Colors";
import * as recipeActions from "../store/actions/recipeAction";
import FooterButton from "../components/FooterButton";
import SearchInput from "../components/UIComponents/SearchInput";

function AllRecipesScreen(props) {

    const dispatch = useDispatch();
    dispatch(recipeActions.getAllRecipes())

    const [searchState, setSearchState] = useState("");

    useEffect(() =>{
        dispatch(recipeActions.setCurrentRecipes(""));
    },[])

    const userRecipes = useSelector(state => state.recipes.userRecipes);
    const allRecipes = useSelector(state => state.recipes.currentAllRecipes)


    const searchChangeHandler = (text) => {
        setSearchState(text);
        dispatch(recipeActions.setCurrentRecipes(text));
    }

    //factor this function out into its own file
    function renderRecipeItem(itemData) {

        //this will be need when it is refactored into its own file
        // const userRecipes = useSelector(state => state.recipes.userRecipes);

        const isUserRecipe = userRecipes.some(recipe => recipe.mainCollectionId === itemData.item.id)
        // console.log(itemData.item.title + ": is user recipe?: " + isUserRecipe + ",id: " + itemData.item.id)

        return (
            <RecipeCard
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'Recipe',
                        params: {
                            recipeId: itemData.item.id,
                            mainCollectionId: itemData.item.id,
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
                data={allRecipes}
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

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.accentColor,
        alignItems: 'center'
    },
});

export default AllRecipesScreen;
