import {
    CREATE_RECIPE,
    DELETE_RECIPE,
    ADD_RECIPE_TO_COLLECTION,
    REMOVE_RECIPE_FROM_COLLECTION,
    SET_USER_RECIPES,
    SET_RECIPE_LIST,
    SET_CURRENT_RECIPES } from "../actions/recipeAction";
import React, {useState, useEffect, useCallback, useReducer} from 'react';
import Recipe from "../../models/Recipe";



const initialState = {
    recipeList: [],
    userRecipes: [],
    currentUserRecipes:[],
    currentAllRecipes:[]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_RECIPE:
            const newRecipe = new Recipe(
                action.recipeData.id,
                action.recipeData.mainCollectionId,
                action.recipeData.title,
                action.recipeData.description,
                action.recipeData.ingredients,
                action.recipeData.directions,
                action.recipeData.categories,
                action.recipeData.servings,
                action.recipeData.notes,
                action.recipeData.preparationTime,
                action.recipeData.cookTime,
                action.recipeData.rating,
                action.recipeData.isVegan,
                action.recipeData.isVegetarian,
                action.recipeData.isGlutenFree,
                action.recipeData.isDairyFree,
                action.recipeData.photos,
                action.recipeData.groupName
            );
            // console.log("in the recipe reducer create-recipe");
            return {...state, recipes: state.recipeList.concat(newRecipe)};
        case DELETE_RECIPE:
            /*
            //code which will be used when delete is implemented
            console.log("in delete reducer code");
            return {
                ...state,
                userRecipes: state.userRecipes.filter(
                    recipe => recipe !== action.recipeId
                )
            };*/
            console.log("delete code yet to be implemented");
            return state;
        case ADD_RECIPE_TO_COLLECTION:
            const newUserRecipe = new Recipe(
                action.recipeData.id,
                action.recipeData.mainCollectionId,
                action.recipeData.title,
                action.recipeData.description,
                action.recipeData.ingredients,
                action.recipeData.directions,
                action.recipeData.categories,
                action.recipeData.servings,
                action.recipeData.notes,
                action.recipeData.preparationTime,
                action.recipeData.cookTime,
                action.recipeData.rating,
                action.recipeData.isVegan,
                action.recipeData.isVegetarian,
                action.recipeData.isGlutenFree,
                action.recipeData.isDairyFree,
                action.recipeData.photos,
                action.recipeData.groupName
            );
            return {...state, recipes: state.userRecipes.concat(newUserRecipe)};
        case REMOVE_RECIPE_FROM_COLLECTION:
            console.log("remove recipe code yet to be implemented");
            return state;
        case SET_USER_RECIPES:
            // console.log("in the set_user_recipes reducer")
            return {...state, userRecipes: action.recipes};
        case SET_RECIPE_LIST:
            return {...state, recipeList: action.recipes};
        case SET_CURRENT_RECIPES:
            //placeholders for state slice updates
            const updatedCurrentUserRecipes = [];
            const updatedCurrentAllRecipes = [];

            //checking if the search is empty, in which case I want to display all recipes
            if (action.searchTerm === "") {
                console.log("returning full list state")
                return {...state, currentUserRecipes: state.userRecipes, currentAllRecipes: state.recipeList};
            }

            for (let index = 0; index < state.userRecipes.length; index++) {
                let item = state.userRecipes[index];
                let match = false;

                // console.log("Key: " + item.key + ", value: " + item.key + ", and value: " + key)
                for (let index = 0; index < Object.values(item).length; index++) {


                    if (typeof(Object.values(item)[index]) == "string") {
                        // console.log("type: " + typeof(Object.values(item)[index]) + ", value: " + Object.values(item)[index]);
                        if (Object.values(item)[index].match(action.searchTerm)) {
                            match = true;
                        }
                    }
                }

                if (match === true) {
                    updatedCurrentUserRecipes.push(item);
                }
            };

            return {
                ...state,
                currentUserRecipes: updatedCurrentUserRecipes,
                currentAllRecipes: updatedCurrentAllRecipes
            };
        default:
            return state;
    }
};
