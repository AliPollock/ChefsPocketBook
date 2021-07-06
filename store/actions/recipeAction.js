//action identifiers
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const ADD_RECIPE_TO_COLLECTION = 'ADD_RECIPE_TO_COLLECTION';
export const REMOVE_RECIPE_FROM_COLLECTION = 'REMOVE_RECIPE_FROM_COLLECTION'

//action creator functions

export const createRecipe = id => {
    return {type: CREATE_RECIPE, recipeId: id };
}

export const deleteRecipe = id => {
    return {type: DELETE_RECIPE, recipeId: id };
}

export const addRecipeToCollection = id => {
    return {type: ADD_RECIPE_TO_COLLECTION, recipeId: id };
}

export const removeRecipeFromCollection = id => {
    return {type: REMOVE_RECIPE_FROM_COLLECTION, recipeId: id };
}
