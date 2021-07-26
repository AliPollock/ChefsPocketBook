import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Button,
    FlatList,
    Platform,
    TouchableNativeFeedback, Dimensions
} from 'react-native';
import {store} from "../App";
import {useDispatch, useSelector} from "react-redux";
import * as groupActions from "../store/actions/groupAction";
import RecipeCard from "../components/RecipeCard";
import SearchInput from "../components/UIComponents/SearchInput";
import FooterButton from "../components/FooterButton";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButtonLarge from "../components/HeaderButtonLarge";
import Colors from "../constants/Colors";
import Card from "../components/UIComponents/Card";
import MyButton from "../components/UIComponents/MyButton";

function GroupMembersScreen(props) {
    console.log(JSON.stringify(store.getState()));

    const dispatch = useDispatch();
    // dispatch(groupActions.getGroupMembers(props.navigation.getParam("mainCollectionId")));



    const groupMembers = useSelector(state => state.groups.groupMembers);



    //factor this function out into its own file
    function renderRecipeItem(itemData) {

        //this will be need when it is refactored into its own file
        // const userMembers = useSelector(state => state.Members.userMembers);

        let TouchableCmp = TouchableOpacity;

        if (Platform.OS === 'android' && Platform.Version >= 21) {
            TouchableCmp = TouchableNativeFeedback;
        }

        let PotentialButton;



        return (
            <Card style={styles.card}>
                <View style={styles.innerBox}>
                    <TouchableCmp style={styles.touchable} onPress={() => {
                        console.log("removing member: " + itemData.item.email)
                    }}>
                        <View style={styles.touchable}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>
                                    {itemData.item.email}
                                </Text>
                            </View>
                            <View>
                                {itemData.item.userId === store.getState().authenticate.userId ?
                                <View></View> : <MyButton title="Remove Member" onPress={()=> {
                                    dispatch(groupActions.removeMemberFromGroup(itemData.item.userId))
                                    }}/>
                            }
                            </View>
                        </View>
                    </TouchableCmp>
                </View>
            </Card>
        );
    };


    return (

        <View style={styles.screen}>
            <FlatList
                contentContainerStyle={styles.list}
                data={groupMembers}
                keyExtractor={item => item.userId}
                renderItem={renderRecipeItem}
            />
            <FooterButton
                iconName={'home'}
                size={40}
                onSelect={() =>{
                    props.navigation.navigate({
                        routeName: 'Home'
                    });
                }}
            />
        </View>
    );
};

GroupMembersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Members',
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
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.accentColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    list: {
        flex: 1,
        alignItems: 'center',
    },
    card: {
        height: '29%',
        marginTop: '30%',
        width: Dimensions.get('window').width,
        alignItems: 'center'
    },
    titleContainer: {
        marginTop: '2%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        alignItems: 'center',
        fontSize: 20,
        fontFamily: 'open-sans-bold',
        color: 'white'
    },
    touchable: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 15,
        borderColor: Colors.primaryColor,
        borderWidth:2
    }
});

export default GroupMembersScreen;
