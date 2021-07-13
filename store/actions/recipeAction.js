//action identifiers
import Recipe from "../../models/Recipe";

export const CREATE_RECIPE = 'CREATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const ADD_RECIPE_TO_COLLECTION = 'ADD_RECIPE_TO_COLLECTION';
export const REMOVE_RECIPE_FROM_COLLECTION = 'REMOVE_RECIPE_FROM_COLLECTION';
export const SET_USER_RECIPES = 'SET_USER_RECIPES';
//action creator functions

export const createRecipe = ( title, description, imageUrl) => {
    return async (dispatch, getState) => {
        const token = getState().authenticate.token;
        // console.log(getState())
        //promise will be returned and stored in response
        const response = await fetch(
            `https://chefspocketbook-259f1-default-rtdb.europe-west1.firebasedatabase.app/recipes.json?auth=${token}` ,
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl
            })
        });

        const resData= await response.json();
        console.log(resData);


        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch({
            type: CREATE_RECIPE,
            recipeData: {
                id: resData.name,
                title,
                description,
                imageUrl,
            }
        });


    };
};

//action which retrieves all recipes associated with the user
export const getUserRecipes = () => {
    return async (dispatch, getState) => {
        const token = getState().authenticate.token;
        const userId = getState().authenticate.userId;

        try {
            const response = await fetch(
                `https://chefspocketbook-259f1-default-rtdb.europe-west1.firebasedatabase.app/${userId}/recipes.json?auth=${token}`);

            const resData = await response.json();
            // console.log(JSON.stringify(resData) + " the getUserRecipes Action");
            const loadedRecipes = [];

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            for (const key in resData) {
                loadedRecipes.push(new Recipe(
                    key,
                    resData[key].title,
                    resData[key].description,
                    resData[key].imageUrl
                    )
                );
            }

            dispatch({
                type: SET_USER_RECIPES,
                recipes: loadedRecipes
            });
        } catch(err) {
            throw(err)
        };
    };
};

export const deleteRecipe = recipeId => {
    return {type: DELETE_RECIPE, recipeId: recipeId };
}

export const addRecipeToCollection = (id, title, description, imageUrl) => {
    return async (dispatch, getState) => {
        const token = getState().authenticate.token;
        const userId = getState().authenticate.userId;
        // console.log(getState())
        //promise will be returned and stored in response
        const response = await fetch(
            `https://chefspocketbook-259f1-default-rtdb.europe-west1.firebasedatabase.app/${userId}/recipes.json?auth=${token}` ,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    title,
                    description,
                    imageUrl
                })
            });

        const resData= await response.json();
        console.log(resData);


        if (!response.ok) {
            throw new Error('Something went wrong adding recipe to collection!');
        }

        dispatch({
            type: ADD_RECIPE_TO_COLLECTION,
            recipeData: {
                id: resData.name,
                title,
                description,
                imageUrl,
            }
        });


    };
    return {type: ADD_RECIPE_TO_COLLECTION, recipeId: id };
}

export const removeRecipeFromCollection = id => {
    return {type: REMOVE_RECIPE_FROM_COLLECTION, recipeId: id };
}
