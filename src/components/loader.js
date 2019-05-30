import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Color } from '../styles/theme';

export const Loader = () => {
    return <View style={style.container}>
        <ActivityIndicator size={"large"} color={Color.blue} />
    </View>
}

const style = StyleSheet.create({
    container: {
        alignItems: 'center'
    }
})