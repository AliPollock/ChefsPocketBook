import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, ScrollView, Alert, TextInput, Switch, SafeAreaView} from 'react-native';
import * as recipeActions from "../store/actions/recipeAction";
import {useSelector, useDispatch} from 'react-redux';
import {store} from "../App";
import Colors from "../constants/Colors";
import {Ionicons} from '@expo/vector-icons';
import {Rating} from 'react-native-ratings';
import {Provider} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import FooterButton from "../components/FooterButton";
import HeaderButtonLarge from "../components/HeaderButtonLarge";


//action type for reducer which will validate multiple fields at once
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const TOUCHED = 'TOUCHED';
const SWITCH = 'SWITCH';
const RATING = 'RATING';


/*a reducer which handles any input into any text input, so all changes are centralised
and managed in this state rather than many different states for validities and values*/


const formReducer = (state, action) => {
    //this action is to handle the event when one of the text inputs has changed
    if (action.type === FORM_INPUT_UPDATE) {
        //Changes value in formState to new value attached to the action
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        //changes boolean isValid to new validity attached to action
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        //if all fields in form state are valid, makes form is valid true, else false
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        // console.log(JSON.stringify(updatedValues));
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues,
            inputTouched: state.inputTouched
        };
    }
    //this action is to display help text under each input once the input is touched if the input is not yet valid
    else if (action.type === TOUCHED) {
        console.log('touched');
        const updatedTouched = {
            ...state.inputTouched,
            [action.input]: action.isTouched
        };
        return {
            formIsValid: state.formIsValid,
            inputValidities: state.inputValidities,
            inputValues: state.inputValues,
            inputTouched: updatedTouched
        };
        //this action is to handle the event when one of the switches changes
    } else if (action.type === SWITCH){
        let switchType = action.input;
        let updatedValues;
        if (state.inputValues[switchType] === false){
            updatedValues = { ...state.inputValues, [action.input]: true}
        } else if (state.inputValues[switchType] === true) {
            updatedValues = { ...state.inputValues, [action.input]: false}
        }
        return {
            formIsValid: state.formIsValid,
            inputValidities: state.inputValidities,
            inputValues: updatedValues,
            inputTouched: state.inputTouched
        };
    }
    // else if (action.type === RATING) {
    //     console.log(action.input);
    //     console.log(action.value);
    //     const updatedValues = {
    //         ...state.inputValues,
    //         [action.input]: action.value
    //     }
    //     console.log(JSON.stringify(updatedValues));
    //     console.log(JSON.stringify(state.inputValues));
    //     return {
    //         formIsValid: state.formIsValid,
    //         inputValidities: state.inputValidities,
    //         //for some reason expo crashes when this state gets changed to updatedValues (despite the fact the console.logs show it to be identical
    //         //it did work for a few minutes and then when I commented out the console.logs it stopped working
    //         inputValues: state.inputValues,
    //         inputTouched: state.inputTouched
    //     };
    // }
    return state;
};

function EditRecipeScreen(props) {

    //get the current id of recipe from navigation params (if it doesn't exist, it will be null
    const recipeId = props.navigation.getParam('recipeId');
    //check if recipe id is in user recipes to pre-populate form
    const selectedRecipe = useSelector(
        state => state.recipes.userRecipes.find(recipe => recipe.id === recipeId)
    );
    // console.log(selectedRecipe.id)
    // console.log(selectedRecipe.title)
    //state to keep track of ratings
    const [currentRating, setCurrentRating] = useState(0);
    const [showServingsDropDown, setServingsDropDown] = useState(false);

    const dispatch = useDispatch();

    /*this function is fired every time a change happens in the form and gives the specific field as an argument to this function
    * along with the current text as another argument*/
    const textChangeHandler = (inputIdentifier, text) => {
        let isValid = false;
        if (text.trim().length > 0) {
            isValid = true;
        }
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: text,
            isValid: isValid,
            input: inputIdentifier
        });
    }

    //function which handles the first touch event in each field
    const touchHandler = (inputIdentifier) => {
        dispatchFormState({
            type: TOUCHED,
            input: inputIdentifier,
            isTouched: true
        })
    }

    //function which handles switch changes
    const switchChangeHandler = (inputIdentifier) => {
        dispatchFormState({
            type: SWITCH,
            input: inputIdentifier
        })
    }

    //this function sets the navigation parameter as a side effect when the submitHandler is called
    // (needed if I want the submit button to be in the header then it will be able to access navigation params)
    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    //no longer need to call formstate, just directly sending rating state to firebase
    //function which handles rating changes
    // useEffect(() => {
    //     dispatchFormState({
    //         type: RATING,
    //         value: currentRating,
    //         input: 'rating'
    //     })
    // },[currentRating]);

    /*form state will change with any change in any input and will call the formReducer upon the change*/
    /*using array destructuring here to save the below into the formState variable and the dispatchFormState is a function which will act upon it*/
    /*this is exactly the same as a normal react hook, but instead of managing one state it employs the reducer to manage many at once*/
    const [formState, dispatchFormState] = useReducer(formReducer, {
        /*this object stores the current text in the form corresponding with each field*/
        inputValues: {
            title: selectedRecipe ? selectedRecipe.title : '',
            description: selectedRecipe ? selectedRecipe.description : '',
            ingredients: selectedRecipe ? selectedRecipe.ingredients : '',
            directions: selectedRecipe ? selectedRecipe.directions : '',
            categories: selectedRecipe ? selectedRecipe.categories : '',
            servings: selectedRecipe ? selectedRecipe.servings : '',
            notes: selectedRecipe ? selectedRecipe.notes : '',
            preparationTime: selectedRecipe ? selectedRecipe.preparationTime : '',
            cookTime: selectedRecipe ? selectedRecipe.cookTime : '',
            rating: selectedRecipe ? selectedRecipe.rating : 0,
            isVegan: selectedRecipe ? selectedRecipe.isVegan : false,
            isVegetarian: selectedRecipe ? selectedRecipe.isVegetarian : false,
            isGlutenFree: selectedRecipe ? selectedRecipe.isGlutenFree : false,
            isDairyFree: selectedRecipe ? selectedRecipe.isDairyFree : false,
            photos: selectedRecipe ? selectedRecipe.photos : '',
            groupName: selectedRecipe ? selectedRecipe.groupName : ''

        },
        /*this object stores whether the current text in the form is valid or not corresponding with each field*/
        inputValidities: {
            title: selectedRecipe ? true: false,
            description: selectedRecipe ? true: false,
            ingredients: selectedRecipe ? true: false,
            directions: selectedRecipe ? true: false,
            categories: selectedRecipe ? true: false,
            servings: selectedRecipe ? true: false,
            notes: selectedRecipe ? true: false,
            preparationTime: selectedRecipe ? true: false,
            cookTime: selectedRecipe ? true: false,
            rating: true,
            isVegan: true,
            isVegetarian: true,
            isGlutenFree: true,
            isDairyFree: true,
            photos: true,
            groupName: true
        },
        inputTouched: {
            title: false,
            ingredients: false,
            description: false,
            directions: false,
            categories: false,
            servings: false,
            notes: false,
            preparationTime: false,
            cookTime: false,
            rating: false,
            isVegan: false,
            isVegetarian: false,
            isGlutenFree: false,
            isDairyFree: false,
            photos: false,
            groupName: false
        },
        formIsValid: selectedRecipe ? true: false
    });

    //this function is called when the form is submitted
    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert("wrong input","please check the errors", [
                {text: 'okay'}
            ])
            return;
        }
        /*if recipe exists*/
        if (selectedRecipe) {
            dispatch(
                recipeActions.updateRecipe(
                    recipeId,
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.ingredients,
                    formState.inputValues.directions,
                    formState.inputValues.categories,
                    formState.inputValues.servings,
                    formState.inputValues.notes,
                    formState.inputValues.preparationTime,
                    formState.inputValues.cookTime,
                    currentRating,
                    formState.inputValues.isVegan,
                    formState.inputValues.isVegetarian,
                    formState.inputValues.isGlutenFree,
                    formState.inputValues.isDairyFree,
                    formState.inputValues.photos,
                    formState.inputValues.groupName
                )
            );
        } else {
            /*recipe doesn't exist, so create a new one*/
            dispatch(
                recipeActions.createRecipe(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.ingredients,
                    formState.inputValues.directions,
                    formState.inputValues.categories,
                    formState.inputValues.servings,
                    formState.inputValues.notes,
                    formState.inputValues.preparationTime,
                    formState.inputValues.cookTime,
                    currentRating,
                    formState.inputValues.isVegan,
                    formState.inputValues.isVegetarian,
                    formState.inputValues.isGlutenFree,
                    formState.inputValues.isDairyFree,
                    formState.inputValues.photos,
                    formState.inputValues.groupName
                )
            );
        }
        props.navigation.goBack();
    }, [
        dispatch,
        recipeId,
        formState.inputValues.title,
        formState.inputValues.description,
        formState.inputValues.ingredients,
        formState.inputValues.directions,
        formState.inputValues.categories,
        formState.inputValues.servings,
        formState.inputValues.notes,
        formState.inputValues.preparationTime,
        formState.inputValues.cookTime,
        currentRating,
        formState.inputValues.isVegan,
        formState.inputValues.isVegetarian,
        formState.inputValues.isGlutenFree,
        formState.inputValues.isDairyFree,
        formState.inputValues.photos,
        formState.inputValues.groupName
    ]);




    return (
        <View style={styles.screen}>
        <ScrollView >
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.title}
                        onChangeText={textChangeHandler.bind(this, 'title')}
                        keyboardType={'default'}
                        autoCapitalize={'sentences'}
                        autoCorrect
                        onFocus={touchHandler.bind(this, 'title')}
                        returnKeyType="next"
                    />
                    {!formState.inputValidities.title && formState.inputTouched.title && <Text style={styles.warningText}>Please enter a valid title</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.description}
                        onChangeText={textChangeHandler.bind(this, 'description')}
                        onFocus={touchHandler.bind(this, 'description')}
                    />
                    {!formState.inputValidities.description && formState.inputTouched.description && <Text style={styles.warningText}>Please enter a valid description</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Ingredients</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.ingredients}
                        onChangeText={textChangeHandler.bind(this, 'ingredients')}
                        onFocus={touchHandler.bind(this, 'ingredients')}
                    />
                    {!formState.inputValidities.ingredients && formState.inputTouched.ingredients && <Text style={styles.warningText}>Please enter valid ingredients</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Directions</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.directions}
                        onChangeText={textChangeHandler.bind(this, 'directions')}
                        onFocus={touchHandler.bind(this, 'directions')}
                    />
                    {!formState.inputValidities.directions && formState.inputTouched.directions && <Text style={styles.warningText}>Please enter valid Directions</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Categories</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.categories}
                        onChangeText={textChangeHandler.bind(this, 'categories')}
                        onFocus={touchHandler.bind(this, 'categories')}
                    />
                    {!formState.inputValidities.categories && formState.inputTouched.categories && <Text style={styles.warningText}>Please enter valid Categories</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Servings</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.servings}
                        onChangeText={textChangeHandler.bind(this, 'servings')}
                        onFocus={touchHandler.bind(this, 'servings')}
                    />
                    {!formState.inputValidities.servings && formState.inputTouched.servings && <Text style={styles.warningText}>Please enter valid Servings</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Notes</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.notes}
                        onChangeText={textChangeHandler.bind(this, 'notes')}
                        onFocus={touchHandler.bind(this, 'notes')}
                    />
                    {!formState.inputValidities.notes && formState.inputTouched.notes && <Text style={styles.warningText}>Please enter valid Notes</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Preparation Time</Text>
                    <TextInput
                        style={styles.input}
                        value={formState.inputValues.preparationTime}
                        onChangeText={textChangeHandler.bind(this, 'preparationTime')}
                        onFocus={touchHandler.bind(this, 'preparationTime')}
                    />
                    {!formState.inputValidities.preparationTime && formState.inputTouched.preparationTime && <Text style={styles.warningText}>Please enter a valid Preparation Time</Text>}
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Cook Time</Text>
                        <TextInput
                            style={styles.input}
                            value={formState.inputValues.cookTime}
                            onChangeText={textChangeHandler.bind(this, 'cookTime')}
                            onFocus={touchHandler.bind(this, 'cookTime')}
                        />
                        {!formState.inputValidities.cookTime && formState.inputTouched.cookTime && <Text style={styles.warningText}> Please enter a valid Cook Time</Text>}
                    </View>
                    <Text style={styles.label}>Rating</Text>
                    <Rating
                    ratingCount={5}
                    showRating
                    onFinishRating={setCurrentRating}
                    tintColor={Colors.accentColor}
                    />
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Group Name</Text>
                        <TextInput
                            style={styles.input}
                            value={formState.inputValues.groupName}
                            onChangeText={textChangeHandler.bind(this, 'groupName')}
                            onFocus={touchHandler.bind(this, 'groupName')}
                        />
                        {!formState.inputValidities.groupName && formState.inputTouched.groupName && <Text style={styles.warningText}>Please enter valid Group Name</Text>}
                    </View>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Vegan</Text>
                    <Switch
                        label="Vegan"
                        value={formState.inputValues.isVegan}
                        onValueChange={switchChangeHandler.bind(this, 'isVegan')}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Vegetarian</Text>
                    <Switch
                        label="Vegetarian"
                        value={formState.inputValues.isVegetarian}
                        onValueChange={switchChangeHandler.bind(this, 'isVegetarian')}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Gluten Free</Text>
                    <Switch
                        label="Gluten Free"
                        value={formState.inputValues.isGlutenFree}
                        onValueChange={switchChangeHandler.bind(this, 'isGlutenFree')}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Dairy Free</Text>
                    <Switch
                        label="Dairy Free"
                        value={formState.inputValues.isDairyFree}
                        onValueChange={switchChangeHandler.bind(this, 'isDairyFree')}
                    />
                </View>
                <Button title={"Add Recipe"} onPress={() => {
                    dispatch(submitHandler)}}
                />
            </View>
        </ScrollView>
        <FooterButton
            iconName={'home'}
            size={40}
            onSelect={() =>{
                props.navigation.navigate({
                    routeName: 'Home'
                });
            }}
        />
    </View>
    );
}

EditRecipeScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Recipes',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButtonLarge}>
                <Item
                    title="Logout"
                    iconName='ios-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}/>
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.accentColor
    },
    form: {
        margin: 30,
        justifyContent: 'center'
    },
    formControl: {
        width: '100%',
        justifyContent: 'center'
    },
    label: {
        color: 'white',
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        color: 'white'
    },
    rating: {
        color: Colors.accentColor
    },
    warningText: {
        color: 'white'
    }
});

export default EditRecipeScreen;
