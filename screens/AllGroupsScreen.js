import React, {useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, FlatList} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButtonSmall from "../components/HeaderButtonSmall";
import HeaderButtonLarge from "../components/HeaderButtonLarge";
import RecipeScreen from "./RecipeScreen";
import {useSelector} from "react-redux";
import GroupCard from "../components/UIComponents/GroupCard";
import Colors from "../constants/Colors";

function AllGroupsScreen(props) {

    useEffect(() => {
        props.navigation.setParams({createGroup: createGroup})

    }, [createGroup]);

    const userGroups = useSelector(state => state.groups.userGroups)
    console.log("User Groups: " + userGroups)

    const createGroup = useCallback(() => {
        props.navigation.navigate({
            routeName: 'CreateGroup'
        });
        console.log("pressed");
    }, []);

    function renderGroupItem(itemData) {
        console.log(itemData);

        return (
            <GroupCard
                groupName={itemData.item.groupName}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'Group',
                        params: {
                            groupId: itemData.item.id,
                            mainCollectionId: itemData.item.mainCollectionId,
                            member: itemData.item.member,
                            recipes: itemData.item.recipes
                        }
                    });
                }}
            />
        );
    };

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


        )
    };
}

export default AllGroupsScreen;
