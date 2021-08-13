import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Button,
    FlatList,
    Platform,
    TouchableNativeFeedback, Dimensions, Alert, Modal
} from 'react-native';
import {store} from "../../App";
import {useDispatch, useSelector} from "react-redux";
import * as groupActions from "../../store/actions/groupAction";
import RecipeCard from "../../components/Cards/RecipeCard";
import SearchInput from "../../components/Inputs/SearchInput";
import FooterButton from "../../components/Buttons/FooterButton";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButtonLarge from "../../components/Buttons/HeaderButtonLarge";
import Colors from "../../constants/Colors";
import Card from "../../components/Cards/Card";
import MyButton from "../../components/Buttons/MyButton";
import DropdownSearch from "../../components/Inputs/DropdownSearch";

/**
 * The screen which displays all members in a given group
 * @returns {JSX.Element} A screen containing a FlatList of group members
 */

function GroupMembersScreen(props) {


    const dispatch = useDispatch();

    //react hook that takes a slice of state and stores it in the groupMembers variable
    const groupMembers = useSelector(state => state.groups.groupMembers);

    //member modal
    const [memberModalVisible, setMemberModalVisible] = useState(false);
    const allEmail = useSelector(state => state.authenticate.allEmail);

    const addMember = () => {
        setMemberModalVisible(true);
    }


    // The function which is called for every item in the FlatList
    function renderRecipeItem(itemData) {

        let TouchableCmp = TouchableOpacity;

        if (Platform.OS === 'android' && Platform.Version >= 21) {
            TouchableCmp = TouchableNativeFeedback;
        }

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
                                    <View></View> :
                                    <MyButton
                                        title="Remove Member"
                                        onPress={()=> {
                                            dispatch(groupActions.removeMemberFromGroup(itemData.item.userId, props.navigation.getParam("mainCollectionGroupId")));
                                            Alert.alert(itemData.item.email + " member removed from the group.")
                                        }}
                                    />
                            }
                            </View>
                        </View>
                    </TouchableCmp>
                </View>
            </Card>
        );
    }


    return (

        <View style={styles.screen}>
            <FlatList
                contentContainerStyle={styles.list}
                data={groupMembers}
                keyExtractor={item => item.userId}
                renderItem={renderRecipeItem}
            />
            <Modal
                visible={memberModalVisible}
                animationType="slide"
                style={styles.modal}
            >
                <DropdownSearch
                    multi={true}
                    onItemSelect={(item) => {
                        dispatch(groupActions.addMemberToGroup(
                            item,
                            props.navigation.getParam('mainCollectionId'),
                            props.navigation.getParam('groupName')
                        ));
                        setMemberModalVisible(false);
                        Alert.alert(item.email + " member added to the group.")
                    }}
                    containerStyle={{backgroundColor: Colors.accentColor}}
                    onRemoveItem={() => {
                        console.log("item removed")
                    }}
                    itemStyle={{
                        backgroundColor: Colors.accentColor,
                        padding: 10,
                        marginTop: 2,
                        borderColor: Colors.primaryColor,
                        borderWidth: 1,
                        borderRadius: 5
                    }}
                    targetField="email"
                    itemTextStyle={{color: '#ffffff'}}
                    itemsContainerStyle={{ maxHeight: 140 }}
                    items={allEmail}
                    textInputProps={
                        {
                            placeholder: "member email address",
                            placeholderTextColor: 'white',
                            underlineColorAndroid: "transparent",
                            color: 'white',
                            textAlign: 'center',
                            style: {
                                backgroundColor: Colors.accentColor,
                                borderColor: Colors.primaryColor,
                                borderWidth: 2,
                                borderRadius:5
                            }
                        }
                    }
                    listProps={
                        {
                            nestedScrollEnabled: true,
                        }
                    }
                    setSort={(item, searchedText)=> item.email.toLowerCase().startsWith(searchedText.toLowerCase())}
                />
                <View style={styles.modalButton}>
                    <View style={styles.buttonContainer}>
                        <MyButton title={"cancel"} onPress={() => setMemberModalVisible(false)}/>
                    </View>
                </View>
            </Modal>
            <FooterButton
                iconName={'home'}
                size={40}
                onSelect={() =>{
                    props.navigation.navigate({
                        routeName: 'Home'
                    });
                }}
            />
            <FooterButton
                iconName={'add-user'}
                size={40}
                onSelect={() =>{
                    addMember()
                }}
                position="right"
            />
        </View>
    );
}

/**
 * Assigning functionality and buttons to the header of the screen.
 * @param navData The navigation data for the screen.
 */

GroupMembersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Members'
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
    },
    modalButton: {
        backgroundColor: Colors.accentColor,
        flex: 1
    },
    modal: {
        marginTop: '10%',
        maxHeight: "50%",
        backgroundColor: Colors.accentColor,
        flex: 1
    }
});

export default GroupMembersScreen;
