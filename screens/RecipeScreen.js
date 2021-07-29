import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput, ScrollView} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {useDispatch, useSelector} from "react-redux";
import HeaderButtonLarge from "../components/HeaderButtonLarge";
import HeaderButtonSmall from "../components/HeaderButtonSmall";
import {addRecipeToCollection, doNothing} from "../store/actions/recipeAction";
import Colors from "../constants/Colors";
import {Rating} from "react-native-ratings";
import MyButton from "../components/UIComponents/MyButton";
import MyTabButton from "../components/UIComponents/MyTabButton";
import * as groupActions from "../store/actions/groupAction";
import {Ionicons} from "@expo/vector-icons";
import * as recipeActions from "../store/actions/recipeAction";
import {Modal, Portal, Provider} from 'react-native-paper';
import {Picker} from "@react-native-picker/picker";
import ScaleIngredientsModal from "../components/ScaleIngredientsModal";

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
            return;
        } else if (currentViewTab === "ingredients" && buttonClicked === "ingredients") {
            return;
        } else if(currentViewTab === "directions" && buttonClicked === "ingredients") {
            setCurrentViewTab("ingredients")
        } else if(currentViewTab === "ingredients" && buttonClicked === "directions") {
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

    useEffect(() => {
        getIngredients()
    }, [])


    const recipeTitle = props.navigation.getParam('title')

    //Ingredient scaling


    //modal state management
    const [scaleModalVisible, setScaleModalVisible] = useState(false);
    const showScaleModal = () => setScaleModalVisible(true);
    const hideScaleModal = () => setScaleModalVisible(false);

    //dropdown state management
    const [showDropDown, setShowDropDown] = useState(false);

    const [scale, setScale] = useState(1)
    const [unit, setUnit] = useState("Metric")
    const [ingredients, setIngredients] = useState(props.navigation.getParam('ingredients') + "\n\n\n")




    const getIngredients = () => {
        let rawIngredients = props.navigation.getParam('ingredients')
        console.log("starting regex >>>>>>>>>>>>>>>>>>>>>>>>")

        if(unit === "US Standard"){
            //search and replace grams
            const gramRegex = /[0-9.]+ *grams\.* *|[0-9.]+ *gram\.* *|[0-9.]+ *gs\.* *|[0-9.]+ *g\.* /g
            let gramResult;

            while(gramResult = gramRegex.exec(rawIngredients)) {
                // console.log(`found ${gramResult[0]} at position ${gramResult.index} and ending at position ${gramResult.index + gramResult[0].length}`)
                let gramNumberRegex = /[0-9.]+/
                let gramNumber = gramNumberRegex.exec(gramResult[0])
                rawIngredients = rawIngredients.slice(0,gramResult.index) + (gramNumber*0.035274).toFixed(2) + " oz. " + rawIngredients.slice(gramResult.index +gramResult[0].length,rawIngredients.length)
            }
            // console.log(rawIngredients)

            //search and replace millilitres
            const millimetreRegex = /[0-9.]+ *millilitres\.* *|[0-9.]+ *millilitre\.* *|[0-9.]+ *mls\.* *|[0-9.]+ *ml\.* */g
            let millimetreResult;

            while(millimetreResult = millimetreRegex.exec(rawIngredients)) {
                let millimetreNumberRegex = /[0-9.]+/
                let millimetreNumber = millimetreNumberRegex.exec(millimetreResult[0])
                rawIngredients = rawIngredients.slice(0,millimetreResult.index) + (millimetreNumber*0.0351951).toFixed(2) + "  fl. oz. " + rawIngredients.slice(millimetreResult.index +millimetreResult[0].length,rawIngredients.length)
            }
            //search and replace kilos
            const kiloRegex = /[0-9.]+ *kilos\.* *|[0-9.]+ *kilo\.* *|[0-9.]+ *kgs\.* *|[0-9.]+ *kg\.* */g
            let kiloResult;

            while(kiloResult = kiloRegex.exec(rawIngredients)) {
                let kiloNumberRegex = /[0-9.]+/
                let kiloNumber = kiloNumberRegex.exec(kiloResult[0])
                rawIngredients = rawIngredients.slice(0,kiloResult.index) + (kiloNumber*2.20462).toFixed(2) + "  lb. " + rawIngredients.slice(kiloResult.index +kiloResult[0].length,rawIngredients.length)
            }
            //search and replace litres
            const litreRegex = /[0-9.]+ *litres\.* *|[0-9.]+ *litre\.* *|[0-9.]+ *ls\.* |[0-9.]+ *l\.* /g
            let litreResult;

            while(litreResult = litreRegex.exec(rawIngredients)) {
                let litreNumberRegex = /[0-9.]+/
                let litreNumber = litreNumberRegex.exec(litreResult[0])
                rawIngredients = rawIngredients.slice(0,litreResult.index) + (litreNumber*0.219969).toFixed(2) + " gal. " + rawIngredients.slice(litreResult.index +litreResult[0].length,rawIngredients.length)
            }

        } else {
            //search and replace fluid ounces
            const fluidOunceRegex = /[0-9.]+ *fluid ounces\.* *|[0-9.]+ *fluid ounce*\.*|[0-9.]+ *fl. ozs\.* *|[0-9.]+ *fl. oz.\.* */g
            let fluidOunceResult;

            while(fluidOunceResult = fluidOunceRegex.exec(rawIngredients)) {
                let fluidOunceNumberRegex = /[0-9.]+/
                let fluidOunceNumber = fluidOunceNumberRegex.exec(fluidOunceResult[0])
                console.log("gram number: " + fluidOunceNumber)
                rawIngredients = rawIngredients.slice(0,fluidOunceResult.index) + (fluidOunceNumber*0.473176).toFixed(2) + "  litres " + rawIngredients.slice(fluidOunceResult.index +fluidOunceResult[0].length,rawIngredients.length)
            }

            //search and replace ounces
            const ounceRegex = /[0-9.]+ *ounces\.* *|[0-9.]+ *ounce\.* *|[0-9.]+ *ozs\.* *|[0-9.]+ *oz\.* */g
            let ounceResult;

            while(ounceResult = ounceRegex.exec(rawIngredients)) {
                let ounceNumberRegex = /[0-9.]+/
                let ounceNumber = ounceNumberRegex.exec(ounceResult[0])
                rawIngredients = rawIngredients.slice(0,ounceResult.index) + (ounceNumber*28.3495).toFixed(2) + "  g " + rawIngredients.slice(ounceResult.index +ounceResult[0].length,rawIngredients.length)
            }
            //search and replace pounds
            const poundRegex = /[0-9.]+ *pounds\.* *|[0-9.]+ *pound\.* *|[0-9.]+ *lbs\.* *|[0-9.]+ *lb\.* */g
            let poundResult;

            while(poundResult = poundRegex.exec(rawIngredients)) {
                let poundNumberRegex = /[0-9.]+/
                let poundNumber = poundNumberRegex.exec(poundResult[0])
                rawIngredients = rawIngredients.slice(0,poundResult.index) + (poundNumber*0.453592).toFixed(2) + "  kg " + rawIngredients.slice(poundResult.index +poundResult[0].length,rawIngredients.length)
            }
            //search and replace quarts
            const quartRegex = /[0-9.]+ *quarts\.* *|[0-9.]+ *quart\.* *|[0-9.]+ *qts\.* *|[0-9.]+ *qt\.* */g
            let quartResult;

            while(quartResult = quartRegex.exec(rawIngredients)) {
                let quartNumberRegex = /[0-9.]+/
                let quartNumber = quartNumberRegex.exec(quartResult[0])
                rawIngredients = rawIngredients.slice(0,quartResult.index) + (quartNumber*0.946353).toFixed(2) + "  litres " + rawIngredients.slice(quartResult.index +quartResult[0].length,rawIngredients.length)
            }
            //search and replace pints
            const pintRegex = /[0-9.]+ *pints\.* *|[0-9.]+ *pint\.* *|[0-9.]+ *pts\.* *|[0-9.]+ *pt\.* */g
            let pintResult;

            while(pintResult = pintRegex.exec(rawIngredients)) {
                let pintNumberRegex = /[0-9.]+/
                let pintNumber = pintNumberRegex.exec(pintResult[0])
                rawIngredients = rawIngredients.slice(0,pintResult.index) + (pintNumber*0.473176).toFixed(2) + "  litres " + rawIngredients.slice(pintResult.index +pintResult[0].length,rawIngredients.length)
            }
            //search and replace gallons
            const gallonRegex = /[0-9.]+ *gallons\.* *|[0-9.]+ *gallon\.* *|[0-9.]+ *gals\.* *|[0-9.]+ *gal\.* */g
            let gallonResult;

            while(gallonResult = gallonRegex.exec(rawIngredients)) {
                let gallonNumberRegex = /[0-9.]+/
                let gallonNumber = gallonNumberRegex.exec(gallonResult[0])
                rawIngredients = rawIngredients.slice(0,gallonResult.index) + (gallonNumber*0.473176).toFixed(2) + "  litres " + rawIngredients.slice(gallonResult.index +gallonResult[0].length,rawIngredients.length)
            }

            //search and replace cups
            const cupRegex = /[0-9.]+ *cups\.* *|[0-9.]+ *cup\.* */g
            let cupResult;

            while(cupResult = cupRegex.exec(rawIngredients)) {
                let cupNumberRegex = /[0-9.]+/
                let cupNumber = cupNumberRegex.exec(cupResult[0])
                rawIngredients = rawIngredients.slice(0,cupResult.index) + (cupNumber*236.588).toFixed(2) + "  ml " + rawIngredients.slice(cupResult.index +cupResult[0].length,rawIngredients.length)
            }

        }

        setIngredients(rawIngredients + "\n\n")
    }

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
            <ScrollView style={styles.recipeBox}>
                {currentViewTab === "ingredients" ?
                    <View>
                        <TouchableOpacity style={styles.unitButton} title="Units" onPress={showScaleModal}>
                            <Ionicons style={{marginTop: '1%'}} size={30} name="options" color='white'/>
                            <Text style={styles.buttonText}> Scale: {scale}x, Units: {unit}</Text>
                        </TouchableOpacity>
                        <Text style={styles.recipeText}>
                            {ingredients}
                        </Text>
                    </View>
                    :
                    <Text style={styles.recipeText}>
                        {props.navigation.getParam('directions')  + "\n\n\n"}
                    </Text>
                }
            </ScrollView>
            <Portal>
                <ScaleIngredientsModal
                    scale={scale}
                    unit={unit}
                    visible={scaleModalVisible}
                    onDismiss={hideScaleModal}
                    onConfirm={() => {
                        console.log("scale: " + scale + ", unit: " + unit);
                        hideScaleModal()
                        getIngredients()
                    }}
                    onChangeText={(text) => {
                        setScale(parseInt(text))
                    }}
                    onValueChange={(itemValue) => {
                        setUnit(itemValue)
                    }}
                />
            </Portal>
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
        padding: '5%',
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
        flexDirection: 'row',
        marginTop: '10%'
    },
    unitButton: {
        marginBottom: '10%',
        width: '95%',
        backgroundColor: Colors.primaryColor,
        height: 40,
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width:0, height: 2},
        shadowRadius: 10,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    modalForm: {
        width: '50%',
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        color: 'white'
    },
    label: {
        color: 'white',
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
        fontSize: 16
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        marginLeft: '10%',
        marginTop: '1.5%'
    },
    picker: {
        marginTop: '5%',
        width: "100%",
        color: 'white',
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
