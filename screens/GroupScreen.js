import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Button,
    Modal,
    Alert,
    Platform,
    TouchableNativeFeedback
} from 'react-native';
import FooterButton from "../components/FooterButton";
import Colors from "../constants/Colors";
import * as groupActions from "../store/actions/groupAction";
import {useDispatch, useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButtonSmall from "../components/HeaderButtonSmall";
import DropdownSearch from "../components/DropdownSearch";
import AllGroupsScreen from "./AllGroupsScreen";
import {borderWidth, marginTop} from "styled-system";
import MyButton from "../components/UIComponents/MyButton";
import {store} from "../App";
import {MaterialIcons} from "@expo/vector-icons";
import {addRecipeToGroup} from "../store/actions/groupAction";
import Card from "../components/UIComponents/Card";
import {Rating} from "react-native-ratings";
import HeaderButtonLarge from "../components/HeaderButtonLarge";

function GroupScreen(props) {

    const dispatch = useDispatch();

    const [recipeModalVisible, setRecipeModalVisible] = useState(false);
    const [memberModalVisible, setMemberModalVisible] = useState(false);


    const userRecipes = useSelector(state => state.recipes.userRecipes);
    const allEmail = useSelector(state => state.authenticate.allEmail);
    // console.log("groupName: " + props.navigation.getParam("groupName") +", groupId: " + props.navigation.getParam("groupId"))

    useEffect(() => {
        dispatch(groupActions.getGroupRecipes(props.navigation.getParam("mainCollectionId")));
        dispatch(groupActions.getGroupMembers(props.navigation.getParam("mainCollectionId")));
        console.log(JSON.stringify(store.getState()));
    }, [])



    useEffect(() => {
        props.navigation.setParams({addRecipe: addRecipe})
        props.navigation.setParams({addMember: addMember})
    }, [addRecipe, addMember]);

    const addMember = () => {
        setMemberModalVisible(true);
    }

    const addRecipe = () => {
        setRecipeModalVisible(true);
    }

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.card}>
                <View style={styles.innerBox}>
                    <TouchableCmp style={styles.touchable} onPress={() => {
                        props.navigation.navigate({
                            routeName: 'GroupRecipes',
                            params: {mainCollectionId: props.navigation.getParam("mainCollectionId")}
                        });
                    }}>
                        <View style={styles.touchable}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>
                                    See Group Recipes
                                </Text>
                            </View>
                        </View>
                    </TouchableCmp>
                </View>
            </Card>
            <Card style={styles.card}>
                <View style={styles.innerBox}>
                    <TouchableCmp style={styles.touchable} onPress={() => {
                        props.navigation.navigate({
                            routeName: 'GroupMembers',
                            params: {groupId: props.navigation.getParam("mainCollectionId")}
                        });
                    }}>
                        <View style={styles.touchable}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>
                                    See Group Members
                                </Text>
                            </View>
                        </View>
                    </TouchableCmp>
                </View>
            </Card>
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
            <Modal
                visible={memberModalVisible}
                animationType="slide"
            >
                <DropdownSearch
                    multi={true}
                    onItemSelect={(item) => {
                        dispatch(groupActions.addMemberToGroup(
                            item,
                            props.navigation.getParam('mainCollectionId'),
                            props.navigation.getParam('groupName')
                        ));
                        setMemberModalVisible(false);
                        Alert.alert(item.email + " member added to the group.")
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
                    targetField="email"
                    itemTextStyle={{color: '#ffffff'}}
                    itemsContainerStyle={{ maxHeight: 140 }}
                    items={allEmail}
                    textInputProps={
                        {
                            placeholder: "member email address",
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
                    setSort={(item, searchedText)=> item.email.toLowerCase().startsWith(searchedText.toLowerCase())}
                />
                <View style={styles.modal}>
                    <View style={styles.buttonContainer}>
                        <MyButton title={"cancel"} onPress={() => setMemberModalVisible(false)}/>
                    </View>
                </View>
            </Modal>
            <FooterButton
                iconName={'plus'}
                size={40}
                onSelect={() =>{
                    props.navigation.navigate({
                        routeName: 'EditRecipe'
                    });
                }}
            />
        </View>
    );
}

GroupScreen.navigationOptions = navData => {
    const addRecipe = navData.navigation.getParam("addRecipe");
    const groupName =  navData.navigation.getParam("groupName");
    const addMember = navData.navigation.getParam("addMember");

    return{
        headerTitle: groupName,
        headerRight: () => (
            <HeaderButtons
                HeaderButtonComponent={HeaderButtonSmall}>

                <MaterialIcons
                    title='addRecipe'
                    onPress={addRecipe}
                    name="note-add"
                    size={40}
                    color="white"
                />
                <Item
                    title='addMember'
                    iconName={'md-person-add'}
                    onPress={addMember}
                />
            </HeaderButtons>
        ),
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
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.accentColor,
        alignItems: 'center'
    },
    modal: {
        backgroundColor: Colors.accentColor,
        flex: 1
    },
    buttonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        margin: 20
    },
    search: {
        backgroundColor: Colors.accentColor,
        borderColor: Colors.primaryColor,
        borderWidth: 2,
        borderRadius:5,
        margin: 20
    },
    card: {
        height: '25%',
        marginTop: '30%',
        width: '80%',
        alignItems: 'center'
    },
    titleContainer: {
        marginTop: '12%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        margin: 15,
        fontSize: 28,
        fontFamily: 'open-sans-bold',
        color: 'white'
    },
    touchable: {
        flex: 1
    },
    innerBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 15,
        borderColor: Colors.primaryColor,
        borderWidth:2
    }
});

export default GroupScreen;
