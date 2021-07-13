import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, FlatList} from 'react-native';
import {store} from "../App";
import * as recipeActions from "../store/actions/recipeAction";
import {useDispatch, useSelector} from "react-redux";
import RecipeCard from "../components/RecipeCard";

function UserRecipeScreen(props) {


    const dispatch = useDispatch();
    dispatch(recipeActions.getUserRecipes())
    const userRecipes = useSelector(state => state.recipes.userRecipes);
    return (

            <FlatList
                data={userRecipes}
                keyExtractor={item => item.id}
                renderItem={itemData =>  (
                    <RecipeCard key={itemData.item.id} title={itemData.item.title} id={itemData.item.id}/>
                    )}
            />
    );
};
const styles = StyleSheet.create({

});

export default UserRecipeScreen;
