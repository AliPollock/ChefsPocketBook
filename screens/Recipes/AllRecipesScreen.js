import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, FlatList} from 'react-native';
import RecipeCard from "../../components/Cards/RecipeCard";
import {useDispatch, useSelector} from "react-redux";
import Colors from "../../constants/Colors";
import * as recipeActions from "../../store/actions/recipeAction";
import FooterButton from "../../components/Buttons/FooterButton";
import SearchInput from "../../components/Inputs/SearchInput";

/**
 * The screen which displays all the public recipes.
 * @returns {JSX.Element} A screen which contains a FlatList to display all public recipes.
 * @constructor
 */

function AllRecipesScreen(props) {

    const dispatch = useDispatch();

    //Query database to obtain all recipes and assign results to global state
    dispatch(recipeActions.getAllRecipes())

    //local state for the current screen
    const [searchState, setSearchState] = useState("");

    //useEffect called once upon initial render
    useEffect(() =>{
        dispatch(recipeActions.setCurrentRecipes(""));
    },[])

    //react hooks selecting state slice and storing in variables
    const userRecipes = useSelector(state => state.recipes.userRecipes);
    const allRecipes = useSelector(state => state.recipes.currentAllRecipes)



    const searchChangeHandler = (text) => {
        setSearchState(text);
        dispatch(recipeActions.setCurrentRecipes(text));
    }

    // The function which is called for every item in the FlatList
    function renderRecipeItem(itemData) {

        const isUserRecipe = userRecipes.some(recipe => recipe.mainCollectionId === itemData.item.id)

        //getting userRecipeId of item to pass to next screen
        let recipeId;
        for (let key in userRecipes) {
            if(userRecipes[key].mainCollectionId === itemData.item.id){
                recipeId = userRecipes[key].id
            }
        }

        return (
            <RecipeCard
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'Recipe',
                        params: {
                            recipeId: recipeId,
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
                            isUserRecipe: isUserRecipe,
                            isGroupRecipe: false,
                            isPublic: itemData.item.isPublic
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
                iconName={'plus'}
                size={40}
                onSelect={() =>{
                    props.navigation.navigate({
                        routeName: 'EditRecipe'
                    });
                }}
                position="right"
            />
            <FooterButton
                iconName={'home'}
                size={40}
                onSelect={() =>{
                    props.navigation.navigate({
                        routeName: 'Home'
                    });
                }}
                position="left"
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

export default AllRecipesScreen;
