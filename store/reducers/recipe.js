import { CREATE_RECIPE, DELETE_RECIPE, ADD_RECIPE_TO_COLLECTION,REMOVE_RECIPE_FROM_COLLECTION, SET_USER_RECIPES } from "../actions/recipeAction";
import React, {useState, useEffect, useCallback, useReducer} from 'react';
import Recipe from "../../models/Recipe";



const initialState = {
    recipeList: [new Recipe('firstId','dummy-recipe', 'dummy-recipe', 'dummy-recipe')],
    userRecipes: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_RECIPE:
            const newRecipe = new Recipe(
                action.recipeData.id,
                action.recipeData.title,
                action.recipeData.description,
                action.recipeData.imageUrl
            );
            // console.log("in the recipe reducer create-recipe");
            return {...state, recipes: state.recipeList.concat(newRecipe)};
        case DELETE_RECIPE:
            console.log("delete code yet to be implemented");
            return state;
        case ADD_RECIPE_TO_COLLECTION:
            //no change in state
            return state;
        case REMOVE_RECIPE_FROM_COLLECTION:
            console.log("remove recipe code yet to be implemented");
            return state;
        case SET_USER_RECIPES:
            // console.log("in the set_user_recipes reducer")
            return {...state, userRecipes: action.recipes};
        default:
            return state;
    }

};
