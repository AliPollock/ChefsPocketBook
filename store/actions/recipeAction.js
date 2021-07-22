//action identifiers
import Recipe from "../../models/Recipe";



export const CREATE_RECIPE = 'CREATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const ADD_RECIPE_TO_COLLECTION = 'ADD_RECIPE_TO_COLLECTION';
export const REMOVE_RECIPE_FROM_COLLECTION = 'REMOVE_RECIPE_FROM_COLLECTION';
export const SET_USER_RECIPES = 'SET_USER_RECIPES';
export const SET_RECIPE_LIST = 'SET_RECIPE_LIST';
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const DO_NOTHING = "DO_NOTHING";
export const SET_CURRENT_RECIPES = "SET_CURRENT_RECIPES";
//action creator functions


//action which is used when the callback function requires and action with field 'type' but I don't want to carry out an action
export function doNothing(){
    return {type: DO_NOTHING};
}

// action which takes the fields and updates an existing recipe
export function updateRecipe(
    id,
    title,
    description,
    ingredients,
    directions,
    categories,
    servings,
    notes,
    preparationTime,
    cookTime,
    rating,
    isVegan,
    isVegetarian,
    isGlutenFree,
    isDairyFree,
    photos,
    groupName
) {
    console.log("recipe updated code yet to be implemented!")
    return {type: UPDATE_RECIPE, recipeId: id};

}

//action which adds a new recipe to the main recipe collection and triggers the add_to_user_collection action
export const createRecipe = (
    title,
    description,
    ingredients,
    directions,
    categories,
    servings,
    notes,
    preparationTime,
    cookTime,
    rating,
    isVegan,
    isVegetarian,
    isGlutenFree,
    isDairyFree,
    photos,
    groupName) => {
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
                ingredients,
                directions,
                categories,
                servings,
                notes,
                preparationTime,
                cookTime,
                rating,
                isVegan,
                isVegetarian,
                isGlutenFree,
                isDairyFree,
                photos,
                groupName
            })
        });

        const resData= await response.json();
        // console.log(resData);
        const recipeDatabaseId = resData.name;


        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch({
            type: CREATE_RECIPE,
            recipeData: {
                id: resData.name,
                mainCollectionId: resData.name,
                title,
                description,
                ingredients,
                directions,
                categories,
                servings,
                notes,
                preparationTime,
                cookTime,
                rating,
                isVegan,
                isVegetarian,
                isGlutenFree,
                isDairyFree,
                photos,
                groupName
            }
        });

        dispatch(
            addRecipeToCollection(
                recipeDatabaseId,
                title,
                description,
                ingredients,
                directions,
                categories,
                servings,
                notes,
                preparationTime,
                cookTime,
                rating,
                isVegan,
                isVegetarian,
                isGlutenFree,
                isDairyFree,
                photos,
                groupName)
        );

    };
};

//action which retrieves all recipes associated with the user
export const getUserRecipes = () => {
    console.log("running getUserRecipes action");
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
                    resData[key].mainCollectionId,
                    resData[key].title,
                    resData[key].description,
                    resData[key].ingredients,
                    resData[key].directions,
                    resData[key].categories,
                    resData[key].servings,
                    resData[key].notes,
                    resData[key].preparationTime,
                    resData[key].cookTime,
                    resData[key].rating,
                    resData[key].isVegan,
                    resData[key].isVegetarian,
                    resData[key].isGlutenFree,
                    resData[key].isDairyFree,
                    resData[key].photos,
                    resData[key].groupName
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


//action which retrieves all the recipes in the main collection
export const getAllRecipes = () => {
    return async (dispatch, getState) => {
        const token = getState().authenticate.token;
        const userId = getState().authenticate.userId;

        try {
            const response = await fetch(
                `https://chefspocketbook-259f1-default-rtdb.europe-west1.firebasedatabase.app/recipes.json?auth=${token}`);

            const resData = await response.json();
            // console.log(JSON.stringify(resData) + " the getUserRecipes Action");
            const loadedRecipes = [];

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            for (const key in resData) {
                loadedRecipes.push(new Recipe(
                    key,
                    resData[key].mainCollectionId,
                    resData[key].title,
                    resData[key].description,
                    resData[key].ingredients,
                    resData[key].directions,
                    resData[key].categories,
                    resData[key].servings,
                    resData[key].notes,
                    resData[key].preparationTime,
                    resData[key].cookTime,
                    resData[key].rating,
                    resData[key].isVegan,
                    resData[key].isVegetarian,
                    resData[key].isGlutenFree,
                    resData[key].isDairyFree,
                    resData[key].photos,
                    resData[key].groupName
                    )
                );
            }

            dispatch({
                type: SET_RECIPE_LIST,
                recipes: loadedRecipes
            });
        } catch(err) {
            throw(err)
        };
    };
};


export const deleteRecipe = recipeId => {
    console.log("delete code not yet implemented and not needed")
    return {type: DELETE_RECIPE, recipeId: recipeId };
}

//action which adds a recipe to the user's collection
export const addRecipeToCollection = (
    mainCollectionId,
    title,
    description,
    ingredients,
    directions,
    categories,
    servings,
    notes,
    preparationTime,
    cookTime,
    rating,
    isVegan,
    isVegetarian,
    isGlutenFree,
    isDairyFree,
    photos,
    groupName) => {
    return async (dispatch, getState) => {
        const token = getState().authenticate.token;
        const userId = getState().authenticate.userId;
        // console.log(getState())

        //promise will be returned and stored in const response
        const response = await fetch(
            `https://chefspocketbook-259f1-default-rtdb.europe-west1.firebasedatabase.app/${userId}/recipes.json?auth=${token}` ,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mainCollectionId,
                    title,
                    description,
                    ingredients,
                    directions,
                    categories,
                    servings,
                    notes,
                    preparationTime,
                    cookTime,
                    rating,
                    isVegan,
                    isVegetarian,
                    isGlutenFree,
                    isDairyFree,
                    photos,
                    groupName
                })
            });

        const resData= await response.json();
        // console.log(resData);


        if (!response.ok) {
            throw new Error('Something went wrong adding recipe to collection!');
        }

        //action to change state
        dispatch({
            type: ADD_RECIPE_TO_COLLECTION,
            recipeData: {
                id: resData.name,
                mainCollectionId,
                title,
                description,
                ingredients,
                directions,
                categories,
                servings,
                notes,
                preparationTime,
                cookTime,
                rating,
                isVegan,
                isVegetarian,
                isGlutenFree,
                isDairyFree,
                photos,
                groupName
            }
        });


    };
    return {type: ADD_RECIPE_TO_COLLECTION, recipeId: id };
}

//action which removes a recipe from a user's collection
export const removeRecipeFromCollection = id => {
    return {type: REMOVE_RECIPE_FROM_COLLECTION, recipeId: id };
}

export const setCurrentRecipes = (searchTerm) => {
    return {type: SET_CURRENT_RECIPES, searchTerm: searchTerm}
};
