import {StyleSheet, Text, TextInput, View, ScrollView, TouchableWithoutFeedback, Keyboard, Platform, KeyboardAvoidingView} from "react-native";
import {Picker} from "@react-native-picker/picker";
import Colors from "../constants/Colors";
import MyButton from "./Buttons/MyButton";
import {Modal} from "react-native-paper";
import React, {useState} from "react";


const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

/**
 * A component which will display the modal in the recipe screen.
 * @param {boolean} props.visible A boolean which controls whether the modal is visible.
 * @param {function} props.onDismiss A function which determines the action carried out when the modal is dismissed.
 * @param {String} props.unit A String which determines which unit scale is currently in use.
 * @param {String} props.scale A String which determines the multiplier which will be applied to the quantities.
 * @param {function} props.onChangeText A function which determines the action carried out when the text changes in the text input.
 * @param {function} props.onValueChange A function which determines the action carried out when the picker value is changes.
 * @param {function} props.onConfirm A function which determines the action carried out when the confirm button is pressed.
 * @returns {JSX.Element} A modal used to change the measurements and scale recipe quantities.
 */

function ScaleIngredientsModal(props) {

    const unit = props.unit
    const scale = props.scale

    return (
        <DismissKeyboard style={styles.touchableWithoutFeedback}>
        <Modal visible={props.visible} onDismiss={props.onDismiss} contentContainerStyle={styles.containerStyle}>

            <ScrollView>
            <Text style={{color: 'white'}}>Scale Ingredients?</Text>
            <View style={styles.modalForm}>
                <Text style={styles.label}>Scale</Text>
                <TextInput
                    style={styles.input}
                    value={scale.toString()}
                    keyboardType = 'numeric'
                    onChangeText={props.onChangeText}
                />
                <Text style={styles.label}>Units</Text>
                <Picker
                    itemStyle={{color:'white'}}
                    color={Colors.accentColor}
                    dropdownIconColor='white'
                    style={styles.picker}
                    selectedValue={unit}
                    onValueChange={props.onValueChange}>
                    <Picker.Item label="US Standard" value="US Standard" />
                    <Picker.Item label="Metric" value="Metric" />
                </Picker>
            </View>
            <View style={styles.modalButtonContainer}>
                <MyButton style={{margin: '5%'}} title="confirm" onPress={props.onConfirm}/>
                <MyButton style={{margin: '5%'}} title="cancel" onPress={props.onDismiss}/>
            </View>
            </ScrollView>

        </Modal>
        </DismissKeyboard>
    );
}

const styles = StyleSheet.create({
    touchableWithoutFeedback: {
        flex:1,
        alignItems: 'center'
    },
    containerStyle: {
        backgroundColor: Colors.accentColor,
        padding: 20,
        borderColor: Colors.primaryColor,
        borderWidth: 2,
        alignItems: 'center',
        borderRadius: 15,
        maxHeight: '60%'
    },
    modalButtonContainer: {
        flexDirection: 'row',
        marginTop: '10%'
    },
    unitButton: {
        margin: '5%',
        width: '80%',
        backgroundColor: Colors.primaryColor,
        height: '25%',
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width:0, height: 2},
        shadowRadius: 10,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    modalForm: {
        width: '100%',
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        color: 'white'
    },
    label: {
        color: 'white',
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
        fontSize: 16
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        marginLeft: '10%',
        marginTop: '1.5%'
    },
    picker: {
        marginTop: '5%',
        width: "100%",
        color: 'white',
    }
})

export default ScaleIngredientsModal;
