import {
    CREATE_GROUP,
    ADD_USER_TO_GROUP,
    ADD_GROUP_TO_COLLECTION,
    REMOVE_USER_FROM_GROUP,
    ADD_RECIPE_TO_GROUP,
    REMOVE_RECIPE_FROM_GROUP,
    SET_USER_GROUPS,
    SET_CURRENT_GROUP_MEMBERS } from "../actions/groupAction";
import React, {useState, useEffect, useCallback, useReducer} from 'react';
import Group from "../../models/Group";

const initialState = {
    userGroups: [],
    groupMembers: [],
    currentGroupRecipes: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_GROUP:
            return state;
        case ADD_USER_TO_GROUP:
            return state;
        case REMOVE_USER_FROM_GROUP:
            return state;
        case ADD_RECIPE_TO_GROUP:
            return state;
        case REMOVE_RECIPE_FROM_GROUP:
            return state;
        case SET_USER_GROUPS:
            return {...state, userGroups: action.groups};
        case SET_CURRENT_GROUP_MEMBERS:
            return state;
        case ADD_GROUP_TO_COLLECTION:
            const newGroup = new Group(
                action.groupData.id,
                action.groupData.mainCollectionId,
                action.groupData.groupName,
                action.groupData.recipes,
                action.groupData.members);
            console.log("new Group: " + newGroup);
            return {...state, userGroups: state.userGroups.concat(newGroup)};
        default:
            return state;
    }

};
