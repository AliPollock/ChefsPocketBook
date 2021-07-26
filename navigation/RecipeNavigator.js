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
import EditRecipeScreen from '../screens/EditRecipeScreen';
import ExploreByCategoryScreen from '../screens/ExploreByCategoryScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UserRecipesScreen from '../screens/UserRecipesScreen';
import AllRecipesScreen from '../screens/AllRecipesScreen';
import LandingScreen from '../screens/LandingScreen';

//Other imports
import {Platform, SafeAreaView, Button, View} from 'react-native';
import Colors from '../constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/authAction';
import RecipeScreen from "../screens/RecipeScreen";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButtonLarge from "../components/HeaderButtonLarge";
import AllGroupsScreen from "../screens/AllGroupsScreen";
import GroupScreen from "../screens/GroupScreen";
import CreateGroupScreen from "../screens/CreateGroupScreen";
import GroupRecipesScreen from "../screens/GroupRecipes";
import GroupMembers from "../screens/GroupMembers";
import GroupMembersScreen from "../screens/GroupMembers";

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
    GroupMembers: GroupMembersScreen

},{
    initialRouteName: 'AllGroups',
    defaultNavigationOptions:defaultStackNavOptions}
)



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
