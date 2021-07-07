//Component which controls the navigation for the application

import React from 'react';

//Navigation imports
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

//Screen imports
import EditRecipeScreen from '../screens/EditRecipeScreen';
import ExploreByCategoryScreen from '../screens/ExploreByCategoryScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RecipeScreen from '../screens/RecipeScreen';
import SearchScreen from '../screens/SearchScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LandingScreen from '../screens/LandingScreen';

//Other imports
import {Platform} from 'react-native';
import Colors from '../constants/Colors';
import {Ionicons} from '@expo/vector-icons';

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

//main stack for navigation through the app
const RecipeNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {}
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {}
    },
    Recipe: {
        screen: RecipeScreen,
        navigationOptions: {}
    },
    Search: {
        screen: SearchScreen,
        navigationOptions: {}
    }
}, {
    defaultNavigationOptions:defaultStackNavOptions
})

const AuthNavigator = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {}
    },
    SignUp: {
        screen: SignUpScreen,
        navigationOptions: {}
    }
})

const MainNavigator = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: LandingScreen,
            App: RecipeNavigator,
            Auth: AuthNavigator,
        },
        {
            initialRouteName: 'AuthLoading',
        }
    )
);

export default createAppContainer(MainNavigator);
