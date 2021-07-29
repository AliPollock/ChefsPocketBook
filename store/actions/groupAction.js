import Group from "../../models/Group";
import Recipe from "../../models/Recipe";
import {useSelector} from "react-redux";
import {store} from "../../App";

export const CREATE_GROUP = 'CREATE_GROUP';
export const ADD_MEMBER_TO_GROUP = 'ADD_MEMBER_TO_GROUP';
export const ADD_GROUP_TO_COLLECTION = 'ADD_GROUP_TO_COLLECTION';
export const REMOVE_MEMBER_FROM_GROUP = 'REMOVE_MEMBER_FROM_GROUP';
export const ADD_RECIPE_TO_GROUP = 'ADD_RECIPE_TO_GROUP';
export const REMOVE_RECIPE_FROM_GROUP = 'REMOVE_RECIPE_FROM_GROUP';
export const SET_USER_GROUPS = 'SET_USER_GROUPS';
export const SET_GROUP_MEMBERS = 'SET_GROUP_MEMBERS';
export const SET_GROUP_RECIPES = 'SET_GROUP_RECIPES';
export const SET_CURRENT_GROUP_RECIPES = 'SET_CURRENT_GROUP_RECIPES';
export const DO_NOTHING = 'DO_NOTHING';


export const createGroup = (
    groupName,
    recipes,
    members) => {
    return async (dispatch, getState) => {
        const token = getState().authenticate.token;
        const userId = getState().authenticate.userId;

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
        // console.log("in create recipe: " + JSON.stringify(resData));
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

        const userEmail = store.getState().authenticate.userEmail

        const userObject = {
            email: userEmail,
            userId: userId}

        dispatch(
            addMemberToGroup(
                userObject,
                groupDatabaseId,
                groupName)
        );

    };
};


export const addMemberToGroup = (item, mainCollectionGroupId, groupName) => {
    const email = item.email
    const userId = item.userId

    return async (dispatch, getState) => {
        const token = getState().authenticate.token;
        // const userId = getState().authenticate.userId;
        // console.log(getState())

        //promise will be returned and stored in const response
        const response = await fetch(
            `https://chefspocketbook-259f1-default-rtdb.europe-west1.firebasedatabase.app/groups/${mainCollectionGroupId}/members.json?auth=${token}` ,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    email
                })
            });

        const resData= await response.json();
        // console.log("addRecipe resdata: " + resData);


        if (!response.ok) {
            throw new Error('Something went wrong adding recipe to collection!');
        }

        //action to change state
        dispatch({
            type: ADD_MEMBER_TO_GROUP, member: item
        });

        dispatch(
            addGroupToCollection(
                mainCollectionGroupId,
                groupName,
                userId)
        );

    };
    return {type: ADD_MEMBER_TO_GROUP};
}

export const removeMemberFromGroup = (userId, mainCollectionGroupId) => {
    return async (dispatch, getState) => {
        const token = getState().authenticate.token;
        let memberGroupId;

        try {
            const response = await fetch(
                `https://chefspocketbook-259f1-default-rtdb.europe-west1.firebasedatabase.app/groups/${mainCollectionGroupId}/members.json?auth=${token}`);

            const resData = await response.json();

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

        for (const key in resData) {
            if (resData[key].userId === userId) {
                memberGroupId = key
            }
        }
        } catch(err) {
            throw(err)
        }

        // console.log(memberGroupId)

        const res = await fetch(
            `https://chefspocketbook-259f1-default-rtdb.europe-west1.firebasedatabase.app/groups/${mainCollectionGroupId}/members/${memberGroupId}.json?auth=${token}` ,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        );

        // console.log(JSON.stringify(res))

        dispatch({type: REMOVE_MEMBER_FROM_GROUP, userId: userId});

        dispatch(removeGroupFromUser(userId, mainCollectionGroupId))
    }
}

export const removeGroupFromUser = (userId, mainCollectionGroupId) => {
    return async (dispatch, getState) => {
        const token = getState().authenticate.token;
        let groupId;

        try {
            const response = await fetch(
                `https://chefspocketbook-259f1-default-rtdb.europe-west1.firebasedatabase.app/${userId}/groups.json?auth=${token}`);

            const resData = await response.json();

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            for (const key in resData) {
                if (resData[key].mainCollectionId === mainCollectionGroupId) {
                    groupId = key
                }
            }
        } catch (err) {
            throw(err)
        }

        // console.log(groupId)

        const res = await fetch(
            `https://chefspocketbook-259f1-default-rtdb.europe-west1.firebasedatabase.app/${userId}/groups/${groupId}.json?auth=${token}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        );

        // console.log(JSON.stringify(res))

        dispatch({type: DO_NOTHING});
    }
}
export const addRecipeToGroup = (recipe, mainCollectionGroupId) => {

    const id = recipe.Id
    const title = recipe.title
    const description = recipe.description
    const ingredients = recipe.ingredients
    const directions = recipe.directions
    const categories = recipe.categories
    const servings = recipe.servings
    const notes = recipe.notes
    const cookTime = recipe.cookTime
    const preparationTime = recipe.preparationTime
    const rating = recipe.rating
    const isVegan = recipe.isVegan
    const isVegetarian = recipe.isVegetarian
    const isGlutenFree = recipe.isGlutenFree
    const isDairyFree = recipe.isDairyFree
    const isPublic = recipe.isPublic
    const mainCollectionId = recipe.mainCollectionId




    return async (dispatch, getState) => {
        const token = getState().authenticate.token;
        const userId = getState().authenticate.userId;
        // console.log(getState())

        //promise will be returned and stored in const response
        const response = await fetch(
            `https://chefspocketbook-259f1-default-rtdb.europe-west1.firebasedatabase.app/groups/${mainCollectionGroupId}/recipes.json?auth=${token}` ,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    mainCollectionId,
                    title,
                    description,
                    ingredients,
                    directions,
                    categories,
                    servings,
                    notes,
                    cookTime,
                    preparationTime,
                    rating,
                    isVegan,
                    isVegetarian,
                    isGlutenFree,
                    isDairyFree,
                    isPublic
                })
            });

        const resData= await response.json();
        // console.log("addRecipe resdata: " + resData);


        if (!response.ok) {
            throw new Error('Something went wrong adding recipe to collection!');
        }

        //action to change state
        dispatch({
            type: ADD_RECIPE_TO_GROUP, recipe: recipe
        });


    };
}
export const removeRecipeFromGroup = (groupId, recipeId) => {

    return async (dispatch, getState) => {
        const token = getState().authenticate.token;
        const res = await fetch(
            `https://chefspocketbook-259f1-default-rtdb.europe-west1.firebasedatabase.app/groups/${groupId}/recipes/${recipeId}.json?auth=${token}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        );

        dispatch(getGroupRecipes(groupId))

        dispatch({type: REMOVE_RECIPE_FROM_GROUP, groupId: groupId, recipeId: recipeId});
    };
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

export const setCurrentGroupRecipes = (searchTerm) => {
    let searchTermLowerCase = searchTerm.toString().toLowerCase();
    return {type: SET_CURRENT_GROUP_RECIPES, searchTerm: searchTermLowerCase}
};

export const getGroupMembers = (groupId) => {
    return async (dispatch, getState) => {
        const token = getState().authenticate.token;
        const userId = getState().authenticate.userId;


        try {
            const response = await fetch(
                `https://chefspocketbook-259f1-default-rtdb.europe-west1.firebasedatabase.app/groups/${groupId}/members.json?auth=${token}`);

            const resData = await response.json();
            // console.log(JSON.stringify(resData) + " the getUserRecipes Action");
            const groupMembers = [];

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }



            for (const key in resData) {
                groupMembers.push(resData[key]);
            }


            dispatch({type: SET_GROUP_MEMBERS, groupMembers: groupMembers});
        } catch(err) {
            throw(err)
        }
    };

}

export const getGroupRecipes = (groupId) => {

    return async (dispatch, getState) => {
        const token = getState().authenticate.token;
        const userId = getState().authenticate.userId;
        // console.log("groupId: " + groupId);

        try {
            const response = await fetch(
                `https://chefspocketbook-259f1-default-rtdb.europe-west1.firebasedatabase.app/groups/${groupId}/recipes.json?auth=${token}`);

            const resData = await response.json();
            const groupRecipes = [];

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            // console.log("response: " + JSON.stringify(resData));

            for (const key in resData) {
                groupRecipes.push(new Recipe(
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
                    resData[key].isPublic
                    )
                );
            }

            dispatch({type: SET_GROUP_RECIPES, groupRecipes: groupRecipes});
        } catch(err) {
            throw(err)
        };
    };
};

export const addGroupToCollection = (
    mainCollectionId,
    groupName,
    userId) => {
    return async (dispatch, getState) => {
        const token = getState().authenticate.token;


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
                    groupName
                })
            });

        const resData= await response.json();



        if (!response.ok) {
            throw new Error('Something went wrong adding recipe to collection!');
        }
        if (userId === getState().authenticate.userId) {

            //action to change state
            dispatch({
                type: ADD_GROUP_TO_COLLECTION,
                groupData: {
                    id: resData.name,
                    mainCollectionId,
                    groupName
                }
            });
        } else {
            dispatch({
                type: DO_NOTHING
            })
        }

    };
};


