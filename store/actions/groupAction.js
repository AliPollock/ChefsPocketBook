import Group from "../../models/Group";
import {
    ADD_RECIPE_TO_COLLECTION,
    addRecipeToCollection,
    CREATE_RECIPE,
    SET_USER_RECIPES,
    UPDATE_RECIPE
} from "./recipeAction";
import Recipe from "../../models/Recipe";

export const CREATE_GROUP = 'CREATE_GROUP';
export const ADD_USER_TO_GROUP = 'ADD_USER_TO_GROUP';
export const ADD_GROUP_TO_COLLECTION = 'ADD_GROUP_TO_COLLECTION';
export const REMOVE_USER_FROM_GROUP = 'REMOVE_USER_FROM_GROUP';
export const ADD_RECIPE_TO_GROUP = 'ADD_RECIPE_TO_GROUP';
export const REMOVE_RECIPE_FROM_GROUP = 'REMOVE_RECIPE_FROM_GROUP';
export const SET_USER_GROUPS = 'SET_USER_GROUPS';
export const SET_CURRENT_GROUP_MEMBERS = 'SET_CURRENT_GROUP_MEMBERS';


export const createGroup = (
    groupName,
    recipes,
    members) => {
    return async (dispatch, getState) => {
        const token = getState().authenticate.token;
        console.log("groupName: " + groupName)

        //promise will be returned and stored in response
        const response = await fetch(
            `https://chefspocketbook-259f1-default-rtdb.europe-west1.firebasedatabase.app/groups.json?auth=${token}` ,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    groupName,
                    recipes,
                    members
                })
            });

        const resData= await response.json();
        console.log("in create recipe: " + JSON.stringify(resData));
        const groupDatabaseId = resData.name;


        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        dispatch({
            type: CREATE_GROUP,
            groupData: {
                id: resData.name,
                mainCollectionId: resData.name,
                groupName,
                recipes,
                members
            }
        });

        dispatch(
            addGroupToCollection(
                groupDatabaseId,
                groupName,
                recipes,
                members)
        );

    };
};


export const addUserToGroup = () => {
    return {type: ADD_USER_TO_GROUP};
}

export const removeUserFromGroup = () => {
    return {type: REMOVE_USER_FROM_GROUP};
}
export const addRecipeToGroup = () => {
    return {type: ADD_RECIPE_TO_GROUP};
}
export const removeRecipeFromGroup = () => {
    return {type: REMOVE_RECIPE_FROM_GROUP};
}

export const setUserGroups = () => {
    return async (dispatch, getState) => {
        const token = getState().authenticate.token;
        const userId = getState().authenticate.userId;

        try {
            const response = await fetch(
                `https://chefspocketbook-259f1-default-rtdb.europe-west1.firebasedatabase.app/${userId}/groups.json?auth=${token}`);

            const resData = await response.json();
            // console.log(JSON.stringify(resData) + " the getUserRecipes Action");
            const loadedGroups = [];

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            for (const key in resData) {
                loadedGroups.push(new Group(
                    key,
                    resData[key].mainCollectionId,
                    resData[key].groupName,
                    resData[key].recipes,
                    resData[key].members
                    )
                );
            }

            dispatch({
                type: SET_USER_GROUPS,
                groups: loadedGroups
            });
        } catch(err) {
            throw(err)
        };
    };
};

export const setCurrentGroupRecipes = () => {
    return {type: SET_CURRENT_GROUP_MEMBERS};
}

export const addGroupToCollection = (
    mainCollectionId,
    groupName,
    recipes,
    members) => {
    return async (dispatch, getState) => {
        const token = getState().authenticate.token;
        const userId = getState().authenticate.userId;

        //promise will be returned and stored in const response
        const response = await fetch(
            `https://chefspocketbook-259f1-default-rtdb.europe-west1.firebasedatabase.app/${userId}/groups.json?auth=${token}` ,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    mainCollectionId,
                    groupName,
                    recipes,
                    members
                })
            });

        const resData= await response.json();
        console.log(resData);


        if (!response.ok) {
            throw new Error('Something went wrong adding recipe to collection!');
        }

        //action to change state
        dispatch({
            type: ADD_GROUP_TO_COLLECTION,
            groupData: {
                id: resData.name,
                mainCollectionId,
                groupName,
                recipes,
                members
            }
        });

    };
};


