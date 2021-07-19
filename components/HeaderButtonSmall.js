import React from 'react';
import {Platform} from 'react-native';
import {HeaderButton} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons';

import Colors from '../constants/Colors';

function HeaderButtonSmall(props) {
    return <HeaderButton {...props} IconComponent={Ionicons} iconSize={30} color={Platform.OS === 'android' ? 'white': Colors.primaryColor}/>;
}

export default HeaderButtonSmall;
