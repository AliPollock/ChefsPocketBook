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
import * as firebase from 'firebase/app'
import 'firebase/firestore'
// import firestore from '@react-native-firebase/firestore'


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

const firebaseConfig = {
  apiKey: 'api-key',
  authDomain: 'project-id.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'project-id',
  storageBucket: 'project-id.appspot.com',
  messagingSenderId: 'sender-id',
  appId: 'app-id',
  measurementId: 'G-measurement-id',
};

firebase.initializeApp(firebaseConfig);


const dbh = firebase.firestore();

var userName = dbh.collection("users").doc("Ct9QDT8ZZTOOXcMd4x0B").get()


export default function App() {

  return (
    <SafeAreaView>
      <Text style={styles.text}>Hi there {userName}</Text>
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

