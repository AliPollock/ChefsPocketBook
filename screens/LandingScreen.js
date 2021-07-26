import {Button, StyleSheet, Text, View, ActivityIndicator} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';
import React, {useEffect} from "react";
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/authAction'

function LandingScreen(props) {
    const dispatch = useDispatch();
    //function which will check if there is login data currently stored on the device
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');

            //user not logged in
            if (!userData) {
                props.navigation.navigate('Auth')
                return;
            }

            //user logged in
            const transformedData = JSON.parse(userData);
            const {token, userId, userEmail, expirationDate} = transformedData;
            const expiryDate = new Date(expirationDate)

            //not valid credentials or login expired
            if (expiryDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth')
                return;
            }

            const expirationTime = expiryDate.getTime() - new Date().getTime();

            //Valid credentials
            props.navigation.navigate('App');
            dispatch(authActions.authenticate(userId, token, userEmail, expirationTime));
        };

        tryLogin();
    }, [dispatch]);

    return (
        <View styles={styles.screen}>
            <ActivityIndicator size='large' color={Colors.primary}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LandingScreen;
