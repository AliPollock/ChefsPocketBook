import {StyleSheet, Text, TextInput, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import Colors from "../constants/Colors";
import MyButton from "./UIComponents/MyButton";
import {Modal} from "react-native-paper";
import React, {useState} from "react";


function ScaleIngredientsModal(props) {

    const unit = props.unit
    const scale = props.scale

    return (
        <Modal visible={props.visible} onDismiss={props.onDismiss} contentContainerStyle={styles.containerStyle}>
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
        </Modal>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: Colors.accentColor,
        padding: 20,
        borderColor: Colors.primaryColor,
        borderWidth: 2,
        alignItems: 'center',
        borderRadius: 15,
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
        width: '50%',
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
