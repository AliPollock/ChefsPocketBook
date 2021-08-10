//Component which controls the navigation for the application

import React from 'react';

//Navigation imports
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator, DrawerNavigatorItems} from 'react-navigation-drawer';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

//Screen imports
import EditRecipeScreen from '../screens/Recipes/EditRecipeScreen';
import ExploreByCategoryScreen from '../screens/ExploreByCategoryScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UserRecipesScreen from '../screens/Recipes/UserRecipesScreen';
import AllRecipesScreen from '../screens/Recipes/AllRecipesScreen';
import LandingScreen from '../screens/Auth/LandingScreen';

//Other imports
import {Platform, SafeAreaView, Button, View} from 'react-native';
import Colors from '../constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/authAction';
import RecipeScreen from "../screens/Recipes/RecipeScreen";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButtonLarge from "../components/Buttons/HeaderButtonLarge";
import AllGroupsScreen from "../screens/Groups/AllGroupsScreen";
import GroupScreen from "../screens/Groups/GroupScreen";
import CreateGroupScreen from "../screens/Groups/CreateGroupScreen";
import GroupRecipesScreen from "../screens/Groups/GroupRecipes";
import GroupMembers from "../screens/Groups/GroupMembers";
import GroupMembersScreen from "../screens/Groups/GroupMembers";

/**
 * This file contains all of the navigators for the app which are nested within each other.
 */

/**
 * A set of default options for other navigators to use.
 */

//default options
const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor: ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white': Colors.primaryColor,
    backgroundColor: Colors.accentColor
};

/**
 * A navigator used in the search screen which contains UserRecipeScreen and AllRecipesScreen.
 */

const SearchNavigator = createMaterialTopTabNavigator({
        MyRecipes: {
            screen: UserRecipesScreen,
            navigationOptions: {}
        },
        AllRecipes: {
            screen: AllRecipesScreen,
            navigationOptions: {}
        }
    }, {
        initialRouteName: 'MyRecipes',
        defaultNavigationOptions:defaultStackNavOptions,
        tabBarOptions: {
            style: {
                backgroundColor: Colors.accentColor
            },
            indicatorStyle: {
                backgroundColor: Colors.primaryColor
            },
            activeTintColor:Colors.primaryColor,
            inactiveTineColor: Colors.accentColor
        }
    }
);

/**
 * A navigator which controls navigation in the main recipe part of the app.
 */

//main stack for navigation through the app
const RecipeNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {}
    },
    Search: {
        screen: SearchNavigator,
        navigationOptions: (navData) => ({
            title: 'Recipes',
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
        })

    },
    EditRecipe: {
        screen: EditRecipeScreen,
        navigationOptions: {}
    },
    Recipe: {
        screen: RecipeScreen,
        navigationOptions: {}
    }
}, {
    defaultNavigationOptions:defaultStackNavOptions
})

/**
 * A navigator which controls navigation within the profile section of the app.
 */

const ProfileNavigator = createStackNavigator({
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {}
    }
}, {defaultNavigationOptions:defaultStackNavOptions})

const AuthNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {}
    }
},{
        defaultNavigationOptions:defaultStackNavOptions
})

/**
 * A navigator which controls navigation in the group section of the app.
 */

const GroupNavigator = createStackNavigator({
    AllGroups: {
        screen: AllGroupsScreen,
        navigationOptions: {}
    },
    Group: {
        screen: GroupScreen,
        navigationOptions: {}
    },
    CreateGroup: {
        screen: CreateGroupScreen,
        navigationOptions: {}
    },
    GroupRecipes: GroupRecipesScreen,
    GroupMembers: GroupMembersScreen,
    GroupRecipe: RecipeScreen

},{
    initialRouteName: 'AllGroups',
    defaultNavigationOptions:defaultStackNavOptions}
)

/**
 * The app navigator which controls the side drawer and acts as the highest level navigator within the main section of the app.
 */


//side drawer navigator
const DrawerNavigator = createDrawerNavigator({
        Profile: ProfileNavigator,
        Home: RecipeNavigator,
        Groups: GroupNavigator
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions:defaultStackNavOptions,
        contentComponent: props => {
            const dispatch = useDispatch();
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                    <DrawerNavigatorItems {...props}/>
                    <Button title="Logout" color={Colors.primaryColor} onPress={() => {
                        dispatch(authActions.logout());
                        props.navigation.navigate('Auth');
                    }}/>
                </SafeAreaView>
            </View>
            )
        }
    }
)

/**
 * The top most level navigator in the app which controls navigation between the auth section and main app section.
 */
const MainNavigator = createSwitchNavigator(
    {
        Startup: LandingScreen,
        Auth: AuthNavigator,
        App: DrawerNavigator
    },
    {
        initialRouteName: 'Startup'
    }
);

export default createAppContainer(MainNavigator);
