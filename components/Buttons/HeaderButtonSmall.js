import React from 'react';
import {Platform} from 'react-native';
import {HeaderButton} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons';

import Colors from '../../constants/Colors';

/**
 * A component which provides styling for a header button.
 * @returns {JSX.Element}   A styled Header Button.
 */

function HeaderButtonSmall(props) {
    return <HeaderButton {...props} IconComponent={Ionicons} iconSize={30} color={Platform.OS === 'android' ? 'white': Colors.primaryColor}/>;
}

export default HeaderButtonSmall;
