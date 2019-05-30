import React from 'react';
import { View, Text } from 'react-native';

export const Error = (props) => {
    return <View>
        <Text>Error: {props.errorCode}</Text>
    </View>
}