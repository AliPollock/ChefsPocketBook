import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Button,
    ScrollView,
    KeyboardAvoidingView,
    TextInput, Keyboard
} from 'react-native';
import Colors from '../constants/Colors'
import Input from "../components/Input";
import MyButton from "../components/MyButton";
import {MaterialCommunityIcons} from '@expo/vector-icons';

function LoginScreen(props) {

    const [keyBoardIsVisible, setKeyboardIsVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardIsVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardIsVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);


    return (
        <View style={styles.screen}>
            <View style={styles.welcomeMessage}>

                {!keyBoardIsVisible && (
                    <View style={styles.keyBoardVisibleTitleContainer}>
                        <Text style={styles.titleWithoutKeyboard}>Welcome to{"\n"} Chefs Pocketbook</Text>
                        <MaterialCommunityIcons name={'notebook' } color={Colors.primaryColor} size={60}/>
                    </View>
                )}
                {keyBoardIsVisible && (
                    <Text style={styles.titleWithKeyboard}>Chefs Pocketbook</Text>
                )}
            </View>
            <KeyboardAvoidingView
                style={styles.bottomScreen}
                behaviour="padding"
                keyboardVerticalOffset={50}>
                <View style={styles.formContainer}>
                    <ScrollView>
                        <Input
                            style={styles.input}
                            id="email"
                                   label="E-Mail"
                                   keyboardType="email-address"
                                   required
                                   email
                                   autoCapitalize="none"
                                   error="Please enter a valid email address."
                                   onInputChange={() => {}}
                                   initialValue=""
                        />
                        <Input id="password"
                                   label="Password"
                                   keyboardType="default"
                                   secureTextEntry
                                   required
                                   minLength={5}
                                   autoCapitalize="none"
                                   error="Please enter a valid password."
                                   onInputChange={() => {}}
                                   initialValue=""
                        />
                        <MyButton title="Login" color={Colors.primaryColor}/>
                        <MyButton title="Don't have an account? Sign Up." color={Colors.primaryColor}/>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons.Button name={'facebook' } size={40} style={{justifyContent: 'center', padding: 5}}/>
                <MaterialCommunityIcons.Button name={'google' } backgroundColor={'red'} size={40} style={{justifyContent: 'center', padding: 5}} />
                <MaterialCommunityIcons.Button name={'twitter' } backgroundColor={'#00acee'} size={40} style={{justifyContent: 'center', padding: 5}} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    welcomeMessage: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleWithoutKeyboard: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 34,
        color: 'white',
        fontFamily: 'open-sans-bold'
    },
    titleWithKeyboard: {
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 34,
        color: 'white',
        fontFamily: 'open-sans-bold'
    },
    screen: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.accentColor
    },
    bottomScreen: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.accentColor
    },
    formContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        borderColor: Colors.primaryColor,
        borderRadius: 10,
        borderWidth: 4,
        padding: 10
    },
    keyBoardVisibleTitleContainer: {
        alignItems: 'center',
        marginBottom: 40
    },
    iconContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
    }
});

export default LoginScreen;
