import React, {useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, FlatList} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButtonSmall from "../../components/Buttons/HeaderButtonSmall";
import HeaderButtonLarge from "../../components/Buttons/HeaderButtonLarge";
import RecipeScreen from "../Recipes/RecipeScreen";
import {useSelector} from "react-redux";
import GroupCard from "../../components/Cards/GroupCard";
import Colors from "../../constants/Colors";
import GroupRecipesScreen from "./GroupRecipes";

/**
 * The Screen which displays all group the user is a member of.
 * @param {object} props.navigation Navigation information passed from the previous screen.
 * @returns {JSX.Element} A screen which contains a FlatList of the user's groups.
 */

function AllGroupsScreen(props) {

    //React hook which selects a state slice
    const userGroups = useSelector(state => state.groups.userGroups)

    const createGroup = useCallback(() => {
        props.navigation.navigate({
            routeName: 'CreateGroup'
        });
        console.log("pressed");
    }, []);

    //useEffect called on change in createGroup state
    useEffect(() => {
        props.navigation.setParams({createGroup: createGroup})

    }, [createGroup]);

    function renderGroupItem(itemData) {
        // console.log(itemData);

        return (
            <GroupCard
                groupName={itemData.item.groupName}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'Group',
                        params: {
                            groupId: itemData.item.id,
                            groupName: itemData.item.groupName,
                            mainCollectionId: itemData.item.mainCollectionId,
                            member: itemData.item.member,
                            recipes: itemData.item.recipes
                        }
                    });
                }}
            />
        );
    }

    return (
        <View style={styles.screen}>
            <FlatList
                style={styles.list}
            data={userGroups}
            keyExtractor={item => item.id}
            renderItem={renderGroupItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.accentColor,
        alignItems: 'center'
    },
    list: {
        width: "80%"
    }
});

/**
 * Assigning functionality and buttons to the header of the screen.
 * @param navData The navigation data for the screen.
 */

AllGroupsScreen.navigationOptions = navData => {
    const createGroup = navData.navigation.getParam("createGroup");




    return{
        headerTitle: "My Groups",
        headerRight: () => (
            <HeaderButtons
                HeaderButtonComponent={HeaderButtonSmall}>

                <Item
                    title='CreateGroup'
                    iconName={'add'}
                    onPress={createGroup}
                />
            </HeaderButtons>


        ),
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
}

export default AllGroupsScreen;
