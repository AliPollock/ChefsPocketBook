import {
    CREATE_GROUP,
    ADD_MEMBER_TO_GROUP,
    ADD_GROUP_TO_COLLECTION,
    REMOVE_MEMBER_FROM_GROUP,
    ADD_RECIPE_TO_GROUP,
    REMOVE_RECIPE_FROM_GROUP,
    SET_USER_GROUPS,
    SET_GROUP_MEMBERS,
    SET_CURRENT_GROUP_RECIPES,
    DO_NOTHING, SET_GROUP_RECIPES
} from "../actions/groupAction";
import React, {useState, useEffect, useCallback, useReducer} from 'react';
import Group from "../../models/Group";
import {StackActions as updatedRecipes} from "react-navigation";

const initialState = {
    userGroups: [],
    groupMembers: [],
    groupRecipes: [],
    currentGroupRecipes: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case DO_NOTHING:
            return state;
        case CREATE_GROUP:
            return state;
        case SET_USER_GROUPS:
            return {...state, userGroups: action.groups};
        case SET_GROUP_RECIPES:
            return {...state, groupRecipes: action.groupRecipes}
        case SET_CURRENT_GROUP_RECIPES:
            //placeholders for state slice updates
            const updatedCurrentGroupRecipes = [];

            //checking if the search is empty, in which case I want to display all recipes
            if (action.searchTerm === "") {
                return {...state, currentGroupRecipes: state.groupRecipes};
            }

            //iterate across userRecipes to get each individual recipe separately
            for (let index = 0; index < state.groupRecipes.length; index++) {
                let item = state.groupRecipes[index];
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
                    updatedCurrentGroupRecipes.push(item);
                }
            }


            return {
                ...state,
                currentGroupRecipes: updatedCurrentGroupRecipes
            };
        case ADD_RECIPE_TO_GROUP:
            return {...state, groupRecipes: state.groupRecipes.concat(action.recipe)};
        case ADD_MEMBER_TO_GROUP:
            return {...state, groupMembers: state.groupMembers.concat(action.member)};
        case ADD_GROUP_TO_COLLECTION:
            const newGroup = new Group(
                action.groupData.id,
                action.groupData.mainCollectionId,
                action.groupData.groupName);
            return {...state, userGroups: state.userGroups.concat(newGroup)};
        case REMOVE_MEMBER_FROM_GROUP:
            const newGroupMembers = []
            for(let key in state.groupMembers) {
                if ( state.groupMembers[key].userId !== action.userId) {
                    newGroupMembers.push(state.groupMembers[key])
                }
            }
            return {...state, groupMembers: newGroupMembers};
        case REMOVE_RECIPE_FROM_GROUP:
            let updatedGroupRecipes = []
            // console.log("action.recipeID: " + action.recipeId)
            for (let key in state.groupRecipes) {
                console.log("state.groupRecipes[key]: " + JSON.stringify(state.groupRecipes[key]))
                if (state.groupRecipes[key].id !== action.recipeId ) {
                    updatedGroupRecipes.push(state.groupRecipes[key])
                }
            }
            // console.log("updatedGroupRecipe: " + JSON.stringify(updatedGroupRecipes))
            return {...state, groupRecipes: updatedGroupRecipes};
        case SET_GROUP_MEMBERS:
            return {...state, groupMembers: action.groupMembers};
        default:
            return state;
    }

};
