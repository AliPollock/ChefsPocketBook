import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {useDispatch, useSelector} from "react-redux";
import HeaderButtonLarge from "../components/HeaderButtonLarge";
import {borderWidth, fontSize, size} from "styled-system";
import HeaderButtonSmall from "../components/HeaderButtonSmall";
import {addRecipeToCollection, doNothing} from "../store/actions/recipeAction";
import Colors from "../constants/Colors";
import {Rating} from "react-native-ratings";
import MyButton from "../components/UIComponents/MyButton";
import MyTabButton from "../components/UIComponents/MyTabButton";
import * as groupActions from "../store/actions/groupAction";
import {Ionicons} from "@expo/vector-icons";
import {store} from "../App";
import * as recipeActions from "../store/actions/recipeAction";
import {Modal, Portal, Provider} from 'react-native-paper';

function RecipeScreen(props) {
    //const that keeps charge of if the recipe is a user recipe
    const [isUserRecipe, setIsUserRecipe] = useState(props.navigation.getParam('isUserRecipe'))
    const dispatch = useDispatch();

    const[currentViewTab, setCurrentViewTab] = useState("ingredients");

    //modal state management
    const [modalVisible, setModalVisible] = useState(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    // function which handles a change in the toggleIsUser button
    const toggleIsUserRecipe = useCallback(() => {
        console.log("checkingId")
        if (isUserRecipe) {
            dispatch(doNothing());
            props.navigation.navigate({
                    routeName: 'EditRecipe',
                    params: {
                        recipeId: props.navigation.getParam('recipeId'),
                        mainCollectionId: props.navigation.getParam('mainCollectionId'),
                    }
                });
        } else {
            dispatch(addRecipeToCollection(
                props.navigation.getParam('mainCollectionId'),
                props.navigation.getParam('title'),
                props.navigation.getParam('description'),
                props.navigation.getParam('ingredients'),
                props.navigation.getParam('directions'),
                props.navigation.getParam('categories'),
                props.navigation.getParam('servings'),
                props.navigation.getParam('notes'),
                props.navigation.getParam('preparationTime'),
                props.navigation.getParam('cookTime'),
                props.navigation.getParam('rating'),
                props.navigation.getParam('isVegan'),
                props.navigation.getParam('isVegetarian'),
                props.navigation.getParam('isGlutenFree'),
                props.navigation.getParam('isDairyFree'),
                props.navigation.getParam('isPublic')
            ));
            // console.log(props.navigation.getParam('mainCollectionId'))

            /**in order to be able to update, need to have access to recipe in user collection
             * therefore if the UserRecipes state slice is refreshed here, we can access the new entry in the edit screen**/

            dispatch(recipeActions.getUserRecipes());

            //need to reset isUserRecipe param to be true here so that the header button updates
            setIsUserRecipe(true);
            props.navigation.setParams({isUserRecipe: true})
        }

    }, [dispatch, isUserRecipe]);


    const toggleCurrentViewTab = (buttonClicked) => {
        if(currentViewTab === "directions" && buttonClicked === "directions") {
            // console.log("Scenario 1")
            return;
        } else if (currentViewTab === "ingredients" && buttonClicked === "ingredients") {
            // console.log("Scenario 2")
            return;
        } else if(currentViewTab === "directions" && buttonClicked === "ingredients") {
            // console.log("Scenario 3");
            setCurrentViewTab("ingredients")
        } else if(currentViewTab === "ingredients" && buttonClicked === "directions") {
            // console.log("Scenario 4");
            setCurrentViewTab("directions");
        } else {
            console.log("a tab error has occurred");
            return;
        }
    }

    //whenever there is a change in the isUserRecipe param, this effect is triggered
    useEffect(() => {
        props.navigation.setParams({toggleIsUserRecipe: toggleIsUserRecipe});
    }, [toggleIsUserRecipe]);


    const recipeTitle = props.navigation.getParam('title')

    return (
        <Provider>
        <View style={styles.screen}>
            <Text style={styles.title}>{recipeTitle}</Text>
            <Rating
                style={styles.rating}
                imageSize={30}
                readonly
                startingValue={props.navigation.getParam('rating')}
                tintColor={Colors.accentColor}
            />
            <Text style={styles.recipeText}>{props.navigation.getParam('categories')}</Text>
            <View style={styles.tabContainer}>
                <MyTabButton
                    style={{flex: 1, borderColor: currentViewTab === "ingredients" ? 'white' :'black'}}
                    title="ingredients"
                    onPress={() => {
                        toggleCurrentViewTab("ingredients")
                    }}
                />
                <MyTabButton
                    style={{flex: 1, borderColor: currentViewTab === "directions" ? 'white' :'black'}}
                    title="directions"
                    onPress={() => {
                        toggleCurrentViewTab("directions")
                    }}
                />
            </View>
            <View style={styles.recipeBox}>
                <Text style={styles.recipeText}>
                    {currentViewTab === "ingredients" ? props.navigation.getParam('ingredients')
                    : props.navigation.getParam('directions')
                    }
                </Text>
            </View>
            <View>
                {props.navigation.getParam('isGroupRecipe') ?
                    <MyButton title="Remove Group Recipe" onPress={() => {
                        dispatch(groupActions.removeRecipeFromGroup( props.navigation.getParam('groupId'), props.navigation.getParam('recipeId')));
                        props.navigation.navigate({
                            routeName: 'Group',
                            params: {
                                groupId: props.navigation.getParam("groupId"),
                                groupName: props.navigation.getParam("groupName"),
                                mainCollectionId: props.navigation.getParam("mainCollectionId")
                            }
                        });
                    }}/>
                    : <View/>
                }
            </View>
            <View style={styles.topBooleanBox}>
                <View>
                    {props.navigation.getParam("isVegan") ?
                        <View style={styles.booleanBox}>
                            <Text style={styles.title}>Vegan         </Text>
                            <Ionicons name="checkbox" size={32} color={Colors.primaryColor}/>
                        </View>
                        : <View/>}
                </View>
                <View>
                    {props.navigation.getParam("isVegetarian") ?
                        <View style={styles.booleanBox}>
                            <Text style={styles.title}>Vegetarian</Text>
                            <Ionicons name="checkbox" size={32} color={Colors.primaryColor}/>
                        </View>
                        : <View/>}
                </View>
            </View>
            <View style={styles.bottomBooleanBox}>
                <View>
                    {props.navigation.getParam("isGlutenFree") ?
                        <View style={styles.booleanBox}>
                            <Text style={styles.title}>GlutenFree</Text>
                            <Ionicons name="checkbox" size={32} color={Colors.primaryColor}/>
                        </View>
                        : <View/>}
                </View>
                <View>
                    {props.navigation.getParam("isDairyFree") ?
                        <View style={styles.booleanBox}>
                            <Text style={styles.title}>DairyFree</Text>
                            <Ionicons name="checkbox" size={32} color={Colors.primaryColor}/>
                        </View>
                        : <View/>}
                </View>
            </View>
            <View>
                {isUserRecipe?
                    <MyButton title="Delete recipe" onPress={showModal} />
                    : <View/>
                }
            </View>
                <Portal>
                    <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
                        <Text style={{color: 'white'}}>Are you sure you want to delete this recipe?</Text>
                        <View style={styles.modalButtonContainer}>
                        <MyButton style={{margin: '5%'}} title="confirm" onPress={() => {
                            dispatch(recipeActions.deleteUserRecipe(props.navigation.getParam('recipeId')))
                            props.navigation.navigate({
                                routeName: 'Home'
                            });
                        }}/>
                        <MyButton style={{margin: '5%'}} title="cancel" onPress={hideModal}/>
                        </View>
                    </Modal>
                </Portal>
        </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.accentColor,
        flex: 1
    },
    title: {
        fontSize: 20,
        margin: 10,
        color: 'white',
        fontFamily: 'open-sans-bold'
    },
    rating: {
        margin: 5
    },
    recipeText: {
        fontSize: 15,
        fontFamily: 'open-sans-bold',
        color: 'white'
    },
    tabContainer: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 0,
        padding: 0
    },
    recipeBox: {
        margin: 0,
        padding: 0,
        borderColor: 'white',
        borderWidth: 1,
        width: Dimensions.get('window').width,
        height : Dimensions.get('window').height*3/7,
        borderRadius: 5,
        overflow: 'hidden',
        marginVertical:10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width:0, height: 2},
        shadowRadius: 10,
    },
    booleanBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    topBooleanBox: {
        marginLeft: '5%',
        marginRight: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottomBooleanBox: {
        marginLeft: '5%',
        marginRight: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containerStyle: {
        backgroundColor: Colors.accentColor,
        padding: 20,
        borderColor: Colors.primaryColor,
        borderWidth: 2,
        alignItems: 'center',
        borderRadius: 15,
    },
    modalButtonContainer: {
        flexDirection: 'row'
    }
});

RecipeScreen.navigationOptions = (navigationData) => {
    const title = navigationData.navigation.getParam('title');
    const isUserRecipe = navigationData.navigation.getParam('isUserRecipe');
    const toggleIsUserRecipe = navigationData.navigation.getParam('toggleIsUserRecipe');
    const groupRecipe = navigationData.navigation.getParam('isGroupRecipe');

    return{
        headerTitle: title,
        headerRight: () => (
                    <HeaderButtons

                        HeaderButtonComponent={isUserRecipe ? HeaderButtonSmall : HeaderButtonLarge}>
                        { groupRecipe ?<View></View> :
                        <Item
                            title='userRecipe'
                            iconName={isUserRecipe ? 'pencil-sharp' : 'md-add-circle-outline'}
                            onPress={toggleIsUserRecipe}
                        />
                             }
                    </HeaderButtons>

        )
    };
}

export default RecipeScreen;
