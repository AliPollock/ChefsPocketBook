//action identifiers
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const ADD_RECIPE_TO_COLLECTION = 'ADD_RECIPE_TO_COLLECTION';
export const REMOVE_RECIPE_FROM_COLLECTION = 'REMOVE_RECIPE_FROM_COLLECTION'

//action creator functions

export const createRecipe = (title, description, imageUrl) => {
    // return async dispatch => {
    //     //promise will be returned and stored in response
    //     const response = await fetch("https://chefspocketbook-default-rtdb.europe-west1.firebasedatabase.app/recipes.json", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             title,
    //             description,
    //             imageUrl
    //         })
    //     });
    //
    //     const resData= await response.json();
    //     console.log(resData);
    //
    //
    //     dispatch({type: CREATE_RECIPE,
    //         recipeData: {
    //             title,
    //             description,
    //             imageUrl,
    //         }
    //     });


    // };
    return {type: CREATE_RECIPE, recipeId: title };
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
