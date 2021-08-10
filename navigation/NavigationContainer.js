import React, {useEffect, useRef} from 'react';
import RecipeNavigator from "./RecipeNavigator";
import {useSelector} from "react-redux";
import {NavigationActions} from 'react-navigation';

//this component will be continuously rendered by App.js and I want the app to auto logout once the token becomes invalid
//

/**
 * This is simply a wrapper component so that I can have access to redux within the top child component in the App.
 * @returns {JSX.Element} A wrapper component so that redux can be accessed by the app.
 */
export default function NavigationContainer(props) {
    const navRef = useRef();
    const isAuth = useSelector(state => !!state.authenticate.token);

    useEffect(() => {
        if (!isAuth) {
            navRef.current.dispatch(
                NavigationActions.navigate({routeName: 'Auth'})
            );
        }
    }), [isAuth];
    return(
        <RecipeNavigator ref={navRef} />
    );

};

