import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, FlatList} from 'react-native';
import {store} from "../../App";
import * as recipeActions from "../../store/actions/recipeAction";
import {useDispatch, useSelector} from "react-redux";
import RecipeCard from "../../components/Cards/RecipeCard";
import Colors from "../../constants/Colors";
import FooterButton from "../../components/Buttons/FooterButton";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButtonLarge from "../../components/Buttons/HeaderButtonLarge";
import SearchInput from "../../components/Inputs/SearchInput";
import {alignItems} from "styled-system";

/**
 * The user recipes screen which displays all of the user's recipes.
 * @returns {JSX.Element} A screen which displays a flatlist of all of the user's recipes with search functionality.
 */

function UserRecipesScreen(props) {

    const dispatch = useDispatch();

    //Query database to obtain user recipes and assign results to global state
    dispatch(recipeActions.getUserRecipes())

    //local state for the current screen
    const [searchState, setSearchState] = useState("");

    //useEffect called once upon initial render
    useEffect(() => {
        dispatch(recipeActions.setCurrentRecipes(""));
    }, [])


    //react hook selecting a state slice and storing in the userRecipes variable
    const userRecipes = useSelector(state => state.recipes.currentUserRecipes);

    const searchChangeHandler = (text) => {
        setSearchState(text);
        dispatch(recipeActions.setCurrentRecipes(text));
    }


    // The function which is called for every item in the FlatList
    function renderRecipeItem(itemData) {

        const isUserRecipe = true;


        return (
            <RecipeCard
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'Recipe',
                        params: {
                            recipeId: itemData.item.id,
                            mainCollectionId: itemData.item.mainCollectionId,
                            title: itemData.item.title,
                            description: itemData.item.description,
                            ingredients: itemData.item.ingredients,
                            directions: itemData.item.directions,
                            categories: itemData.item.categories,
                            servings: itemData.item.servings,
                            notes: itemData.item.notes,
                            preparationTime: itemData.item.preparationTime,
                            cookTime: itemData.item.cookTime,
                            rating: itemData.item.rating,
                            isVegan: itemData.item.isVegan,
                            isVegetarian: itemData.item.isVegetarian,
                            isGlutenFree: itemData.item.isGlutenFree,
                            isDairyFree: itemData.item.isDairyFree,
                            photos: itemData.item.isPublic,
                            isUserRecipe: isUserRecipe,
                            isGroupRecipe: false
                        }
                    });
                }}
                key={itemData.item.id}
                title={itemData.item.title}
                id={itemData.item.id}
                rating={itemData.item.rating}
                description={itemData.item.description}/>
        );
    }


    return (

        <View style={styles.screen}>
            <SearchInput
                searchValue={searchState}
                onChange={text => searchChangeHandler(text)}
            />
            <FlatList
                contentContainerStyle={styles.list}
                data={userRecipes}
                keyExtractor={item => item.id}
                renderItem={renderRecipeItem}
            />
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

/**
 * Assigning functionality and buttons to the header of the screen.
 * @param navData The navigation data for the screen.
 */

UserRecipesScreen.navigationOptions = navData => {
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
        backgroundColor: Colors.accentColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    list: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default UserRecipesScreen;

