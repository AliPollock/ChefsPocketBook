import {
    CREATE_RECIPE,
    DELETE_USER_RECIPE,
    ADD_RECIPE_TO_COLLECTION,
    REMOVE_RECIPE_FROM_COLLECTION,
    SET_USER_RECIPES,
    SET_RECIPE_LIST,
    SET_CURRENT_RECIPES,
    UPDATE_RECIPE} from "../actions/recipeAction";
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
                action.recipeData.isPublic
            );
            // console.log("in the recipe reducer create-recipe");
            return {...state, recipes: state.recipeList.concat(newRecipe)};
        case DELETE_USER_RECIPE:
            console.log("/delete code not implemented, should not be possible for a user to remove a recipe from the main collection.");
            return state;
        case UPDATE_RECIPE:
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
                action.recipeData.isPublic
            );
            return {...state, recipes: state.userRecipes.concat(newUserRecipe)};
        case REMOVE_RECIPE_FROM_COLLECTION:
            console.log("remove recipe code yet to be implemented");
            return state;
        case SET_USER_RECIPES:
            return {...state, userRecipes: action.recipes};
        case SET_RECIPE_LIST:
            return {...state, recipeList: action.recipes};
        case SET_CURRENT_RECIPES:
            //placeholders for state slice updates
            const updatedCurrentUserRecipes = [];
            const updatedCurrentAllRecipes = [];

            //checking if the search is empty, in which case I want to display all recipes
            if (action.searchTerm === "") {
                return {...state, currentUserRecipes: state.userRecipes, currentAllRecipes: state.recipeList};
            }

            //iterate across userRecipes to get each individual recipe separately
            for (let index = 0; index < state.userRecipes.length; index++) {
                let item = state.userRecipes[index];
                let match = false;

                //iterate across each item in the recipe
                for (let index = 0; index < Object.values(item).length; index++) {

                    //filter for only string types
                    if (typeof(Object.values(item)[index]) == "string") {

                        if (Object.values(item)[index].toLowerCase().match(action.searchTerm)) {
                            match = true;
                        }
                    }
                }

                if (match === true) {
                    updatedCurrentUserRecipes.push(item);
                }
            };

            //iterate across recipeList to get each individual recipe separately
            for (let index = 0; index < state.recipeList.length; index++) {
                let item = state.recipeList[index];
                let match = false;

                //iterate across each item in the recipe
                for (let index = 0; index < Object.values(item).length; index++) {

                    //filter for only string types
                    if (typeof(Object.values(item)[index]) == "string") {

                        if (Object.values(item)[index].toLowerCase().match(action.searchTerm)) {
                            match = true;
                        }
                    }
                }

                if (match === true) {
                    updatedCurrentAllRecipes.push(item);
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
