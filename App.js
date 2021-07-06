import React, {useState} from 'react';
import * as Font from 'expo-font';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {createStore, combineReducers} from 'redux';
import recipeReducer from './store/reducers/recipe';
import {Provider} from 'react-redux';
import firestore from '@react-native-firebase/firestore'


/*some statement which has to be made in the app.js file to use react-native-screens*/
enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('.//assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('.//assets/fonts/OpenSans-Bold.ttf'),
  });
};

//reducer which will hold the state of the app

const rootReducer = combineReducers({
  recipes: recipeReducer
});

const store = createStore(rootReducer);

// const userName = firestore().collection("users").doc(
//     "Ct9QDT8ZZTOOXcMd4x0B")

export default function App() {

  return (
    <SafeAreaView>
      <Text style={styles.text}>Hi there</Text>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    paddingVertical: 20,
    paddingHorizontal: 12,
    textAlign: 'center'
  }

});

