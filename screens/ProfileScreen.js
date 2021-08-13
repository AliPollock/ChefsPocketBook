import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import Colors from "../constants/Colors";
import FooterButton from "../components/Buttons/FooterButton";
import {useSelector} from "react-redux";
import {store} from "../App";

/**
 * The Profile screen which will display user data.
 */

function ProfileScreen(props) {
    const userEmail = useSelector(state => state.authenticate.userEmail);
    console.log(JSON.stringify(store.getState()));

    return (
        <View style={styles.screen}>
            <View>
                <Text style={styles.title}>My Profile</Text>
                <Text style={styles.subHeading}>Email: {userEmail}</Text>
            </View>

            <Text style={styles.subHeadingTwo}
                  onPress={() =>{
                      props.navigation.navigate({
                          routeName: 'Search',
                          params: {
                              searchTerm: ""
                          }
                      });
                  }}>My Recipes
            </Text>

            <Text style={styles.subHeadingTwo}
                  onPress={ () => {
                      props.navigation.navigate({
                          routeName: 'AllGroups'
                      })
                  }}>My Groups
            </Text>
            <FooterButton
                iconName={'home'}
                size={40}
                onSelect={() =>{
                    props.navigation.navigate({
                        routeName: 'Home'
                    });
                }}
                position="left"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.accentColor,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleContainer: {}
    ,
    title: {
        alignSelf: 'center',
        marginTop: '5%',
        color: Colors.primaryColor,
        fontSize: 40,
        fontFamily: 'open-sans-bold',
        marginBottom: '5%'
    },
    subHeading: {
        alignSelf: 'center',
        fontSize: 25,
        color: 'white',
        fontFamily: 'open-sans-bold',
        marginBottom: '30%'
    },
    subHeadingTwo: {
        alignSelf: 'center',
        fontSize: 25,
        color: Colors.primaryColor,
        fontFamily: 'open-sans-bold',
        marginBottom: '40%'
    }
});

export default ProfileScreen;
