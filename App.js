import React, {useCallback, useState} from 'react';
import * as Font from 'expo-font';
import {
  Button,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox
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
import NavigationContainer from './navigation/NavigationContainer';
import authReducer from './store/reducers/auth';
import recipeReducer from './store/reducers/recipe';

/*statement which has to be made in the app.js file in order to use react-native-screens*/
enableScreens();




//async font initialisation
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('.//assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('.//assets/fonts/OpenSans-Bold.ttf'),
    'awesome': 'https://github.com/FortAwesome/Font-Awesome/raw/master/fonts/fontawesome-webfont.ttf'
  });
};

//reducer which will hold the state of the app
const rootReducer = combineReducers({
  recipes: recipeReducer,
  authenticate: authReducer
});

//redux store initialisation
export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

//main app component
export default function App() {

  // disabling expo warnings
  // console.LogBox = true;
  LogBox.ignoreLogs(['Setting a timer']);


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


  return (
    <Provider store={store}>
      <NavigationContainer/>
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




