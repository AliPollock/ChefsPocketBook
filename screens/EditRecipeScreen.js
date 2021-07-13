import React, {useReducer} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, ScrollView} from 'react-native';
import * as recipeActions from "../store/actions/recipeAction";
import {useSelector, useDispatch} from 'react-redux';
import {store} from "../App";
import Colors from "../constants/Colors";


//action type for reducer which will validate multiple fields at once
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

/*a reducer which handles any input into any text input, so all changes are centralised
and managed in this state rather than many different states for validities and values*/

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

function EditRecipeScreen(props) {

    //check if recipe id is in user recipes to pre-populate form
    const recipeId = props.navigation.getParam('productId');
    const selectedRecipe = useSelector(
        state => state.recipes.userRecipes.find(recipe => recipe.id === id)
    );

    const dispatch = useDispatch();

    /*form state will change with any change in any input and will call the formReducer upon the change*/
    /*using array destructuring here to save the below into the formState variable and the dispatchFormState is a function which will act upon it*/
    /*this is exactly the same as a normal react hook, but instead of managing one state it employs the reducer to manage many at once*/
    const [formState, dispatchFormState] = useReducer(formReducer, {
        /*this object stores the current text in the form corresponding with each field*/
        inputValues: {
            title: selectedRecipe ? selectedRecipe.title : '',
            description: selectedRecipe ? selectedRecipe.description : '',
            imageUrl: selectedRecipe ? selectedRecipe.imageUrl : ''
        },
        /*this object stores whether the current text in the form is valid or not corresponding with each field*/
        inputValidities: {title: selectedRecipe ? true: false,
            imageUrl: selectedRecipe ? true: false,
            description: selectedRecipe ? true: false,
            price: selectedRecipe ? true: false
        },
        formIsValid: selectedRecipe ? true: false
    });
    //Finished here for the night (need to add more fields to Recipe before I go on with the form

    return (
        <ScrollView>
        <View style={styles.screen}>
            <Button title={"Add Recipe"} onPress={() => {
                // console.log("pressed")
                dispatch(recipeActions.createRecipe( "test", "testing", "testiest"))
                dispatch(recipeActions.addRecipeToCollection(store.getState().authenticate.userId,"test", "testing", "testiest"))
            }}
            />
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.accentColor
    },
});

export default EditRecipeScreen;
