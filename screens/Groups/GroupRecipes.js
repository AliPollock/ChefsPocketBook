import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, FlatList, Alert, Modal} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import * as groupActions from "../../store/actions/groupAction";
import RecipeCard from "../../components/Cards/RecipeCard";
import SearchInput from "../../components/Inputs/SearchInput";
import FooterButton from "../../components/Buttons/FooterButton";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButtonLarge from "../../components/Buttons/HeaderButtonLarge";
import Colors from "../../constants/Colors";
import {store} from "../../App";
import DropdownSearch from "../../components/Inputs/DropdownSearch";
import MyButton from "../../components/Buttons/MyButton";

/**
 * The screen which displays all recipes in a given group
 * @returns {JSX.Element} A screen containing a FlatList of group recipes
 */

function GroupRecipesScreen(props) {

    const dispatch = useDispatch();

    // console.log(JSON.stringify(store.getState().groups.groupRecipes));


    //Query database to obtain all group recipes and assign results to global state
    dispatch(groupActions.getGroupRecipes(props.navigation.getParam("mainCollectionId")))

    const [searchState, setSearchState] = useState("");

    //recipe modal
    const [recipeModalVisible, setRecipeModalVisible] = useState(false);
    const userRecipes = useSelector(state => state.recipes.userRecipes);

    const addRecipe = () => {
        setRecipeModalVisible(true);
    }

    //useEffect called once upon initial render
    useEffect(() => {
        //changing app global state to store current group recipes
        dispatch(groupActions.setCurrentGroupRecipes(""));
    }, [])

    //react hook that takes a slice of state and stores it in the groupRecipes variable
    const groupRecipes = useSelector(state => state.groups.currentGroupRecipes);


    const searchChangeHandler = (text) => {
        setSearchState(text);
        dispatch(groupActions.setCurrentGroupRecipes(text));
    }


    //The function which is called for every item in the FlatList
    function renderRecipeItem(itemData) {

        const isUserRecipe = true;


        return (
            <RecipeCard
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'GroupRecipe',
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
                            isPublic: itemData.item.isPublic,
                            groupName: itemData.item.groupName,
                            isUserRecipe: false,
                            isGroupRecipe: true,
                            groupId: props.navigation.getParam("mainCollectionId")
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
                data={groupRecipes}
                keyExtractor={item => item.id}
                renderItem={renderRecipeItem}
            />
            <Modal
                visible={recipeModalVisible}
                animationType="slide"
            >
                <DropdownSearch
                    multi={true}
                    onItemSelect={(item) => {
                        console.log(JSON.stringify(item));
                        dispatch(groupActions.addRecipeToGroup(item, props.navigation.getParam('mainCollectionId')));
                        setRecipeModalVisible(false);
                        Alert.alert(item.title + " recipe added to the group.")
                    }}
                    containerStyle={{backgroundColor: Colors.accentColor}}
                    onRemoveItem={() => {
                        console.log("item removed")
                    }}
                    itemStyle={{
                        backgroundColor: Colors.accentColor,
                        padding: 10,
                        marginTop: 2,
                        borderColor: Colors.primaryColor,
                        borderWidth: 1,
                        borderRadius: 5
                    }}
                    targetField="title"
                    itemTextStyle={{color: '#ffffff'}}
                    itemsContainerStyle={{ maxHeight: 140 }}
                    items={userRecipes}
                    textInputProps={
                        {
                            placeholder: "recipe name",
                            placeholderTextColor: 'white',
                            underlineColorAndroid: "transparent",
                            color: 'white',
                            textAlign: 'center',
                            style: {
                                backgroundColor: Colors.accentColor,
                                borderColor: Colors.primaryColor,
                                borderWidth: 2,
                                borderRadius:5
                            }
                        }
                    }
                    listProps={
                        {
                            nestedScrollEnabled: true,
                        }
                    }
                    setSort={(item, searchedText)=> item.title.toLowerCase().startsWith(searchedText.toLowerCase())}
                />
                <View style={styles.modal}>
                    <View style={styles.buttonContainer}>
                        <MyButton title={"cancel"} onPress={() => setRecipeModalVisible(false)}/>
                    </View>
                </View>
            </Modal>
            <FooterButton
                iconName={'add-to-list'}
                size={40}
                onSelect={() =>{
                    addRecipe()
                }}
                position="right"
            />
            <FooterButton
                iconName={'home'}
                size={40}
                onSelect={() =>{
                    props.navigation.navigate({
                        routeName: 'Home'
                    });
                }}
                position="left"
            />
        </View>
    );
}

/**
 * Assigning functionality and buttons to the header of the screen.
 * @param navData The navigation data for the screen.
 */

GroupRecipesScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Recipes'
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
    },
    modal: {
        backgroundColor: Colors.accentColor,
        flex: 1
    }
});

export default GroupRecipesScreen;
