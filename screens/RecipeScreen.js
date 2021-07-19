import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {useDispatch} from "react-redux";
import HeaderButtonLarge from "../components/HeaderButtonLarge";
import {size} from "styled-system";
import HeaderButtonSmall from "../components/HeaderButtonSmall";
import {addRecipeToCollection, doNothing} from "../store/actions/recipeAction";

function RecipeScreen(props) {

    //const that keeps charge of if the recipe is a user recipe
    const [isUserRecipe, setIsUserRecipe] = useState(props.navigation.getParam('isUserRecipe'))
    const dispatch = useDispatch();

    // function which handles a change in the toggleIsUser button
    const toggleIsUserRecipe = useCallback(() => {
        if (isUserRecipe) {
            dispatch(doNothing());
            props.navigation.navigate({
                    routeName: 'EditRecipe',
                    params: {
                        recipeId: props.navigation.getParam('recipeId')
                    }
                });
        } else {
            dispatch(addRecipeToCollection(
                props.navigation.getParam('mainCollectionId'),
                props.navigation.getParam('title'),
                props.navigation.getParam('description'),
                props.navigation.getParam('ingredients'),
                props.navigation.getParam('directions'),
                props.navigation.getParam('categories'),
                props.navigation.getParam('servings'),
                props.navigation.getParam('notes'),
                props.navigation.getParam('preparationTime'),
                props.navigation.getParam('cookTime'),
                props.navigation.getParam('rating'),
                props.navigation.getParam('isVegan'),
                props.navigation.getParam('isVegetarian'),
                props.navigation.getParam('isGlutenFree'),
                props.navigation.getParam('isDairyFree'),
                props.navigation.getParam('photos'),
                props.navigation.getParam('groupName')
            ));
            console.log(props.navigation.getParam('mainCollectionId'))
            //need to reset isuserrecipe param to be true here
            // props.navigation.setParams('isUserRecipe': true);
        }

    }, [dispatch, isUserRecipe]);

    //whenever there is a change in the isUserRecipe param, this effect is triggered
    useEffect(() => {
        props.navigation.setParams({toggleIsUserRecipe: toggleIsUserRecipe});
    }, [toggleIsUserRecipe]);

    // //second arguments are the dependencies, if they change, useEffect will run
    // ionicons
    // //passing whether the meal is currently a favourite to the header
    // useEffect(() => {
    //     props.navigation.setParams({isFav: currentMealIsFavourite});
    // }, [currentMealIsFavourite]);

    const recipeTitle = props.navigation.getParam('title')

    return (
        <View>
            <Text>{recipeTitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});

RecipeScreen.navigationOptions = (navigationData) => {
    const title = navigationData.navigation.getParam('title');
    const isUserRecipe = navigationData.navigation.getParam('isUserRecipe');
    const toggleIsUserRecipe = navigationData.navigation.getParam('toggleIsUserRecipe');

    return{
        headerTitle: title,
        headerRight: () => (
            <HeaderButtons
                    HeaderButtonComponent={isUserRecipe? HeaderButtonSmall: HeaderButtonLarge}>

                    <Item
                        title='Favourite'
                        iconName={isUserRecipe ? 'pencil-sharp' : 'md-add-circle-outline'}
                        onPress={toggleIsUserRecipe}
                    />
            </HeaderButtons>


        )
    };
}

export default RecipeScreen;
