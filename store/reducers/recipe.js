import { CREATE_RECIPE, DELETE_RECIPE, ADD_RECIPE_TO_COLLECTION,REMOVE_RECIPE_FROM_COLLECTION } from "../actions/recipeAction";

const DUMMY_RECIPES_PLACEHOLDER = null;

const initialState = {
    recipes: DUMMY_RECIPES_PLACEHOLDER
}

function recipeReducers(state = initialState, action) {
    switch (action.type) {
        case CREATE_RECIPE:
            console.log("create code yet to be implemented");
            return state;
        case DELETE_RECIPE:
            console.log("delete code yet to be implemented");
            return state;
        case ADD_RECIPE_TO_COLLECTION:
            console.log("add recipe code yet to be implemented");
            return state;
        case REMOVE_RECIPE_FROM_COLLECTION:
            console.log("remove recipe code yet to be implemented");
            return state;
        default:
            return state;
    }

}

export default recipeReducers
