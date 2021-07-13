import React, {useCallback, useState} from 'react';
import * as Font from 'expo-font';
import {
  Button,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {enableScreens} from 'react-native-screens';
import AppLoading from "expo-app-loading";

//redux imports
import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {Provider, useDispatch} from 'react-redux';

//firebase imports
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import 'firebase/firestore';

//project imports
import RecipeNavigator from './navigation/RecipeNavigator';
import authReducer from './store/reducers/auth';
import recipeReducer from './store/reducers/recipe';



/*statement which has to be made in the app.js file in order to use react-native-screens*/
enableScreens();

//async font initialisation
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('.//assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('.//assets/fonts/OpenSans-Bold.ttf'),
  });
};

//reducer which will hold the state of the app
const rootReducer = combineReducers({
  recipes: recipeReducer,
  authenticate: authReducer
});

//redux store initialisation
export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

//firebase connection
// const firebaseConfig = {
//   apiKey: API_KEY,
//   authDomain: 'project-id.firebaseapp.com',
//   databaseURL: 'https://chefspocketbook-default-rtdb.europe-west1.firebasedatabase.app/',
//   projectId: 'chefspocketbook',
//   storageBucket: 'chefspocketbook.appspot.com',
//   messagingSenderId: MESSAGING_SENDER_ID,
//   appId: APP_ID,
//   measurementId: MEASUREMENT_ID
// };

//first time initialise new app, otherwise use existing app
// !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()


//main app component
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
        <AppLoading
            startAsync={fetchFonts}
            onFinish={() => setFontLoaded(true)}
            onError={err => console.log(err)}
        />
    );
  }

  // const getUser = async () => {
  //   const userDocument = await firebase.firestore().collection("users").doc("RSZFeKpFeH2TbUUlMgtP").get()
  //   console.log(userDocument);
  // }

  return (
    <Provider store={store}>
      <RecipeNavigator/>
    </Provider>
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

  // //logic for dummy button
  // const dispatch = useDispatch();
  //
  // const toggleFavouriteHandler = useCallback(() => {
  //   console.log("Pressed the Button");
  //   dispatch(createRecipe('dummyTitle', 'dummyDescription', 'dummyImageUrl'))
  // }, [dispatch]);


//practice logic for test button
import { createRecipe } from './store/actions/recipeAction';



// import 'firebase/auth';
// import firestore from '@react-native-firebase/firestore'


