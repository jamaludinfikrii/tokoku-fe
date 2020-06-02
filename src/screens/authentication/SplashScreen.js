import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import {Text, H1, H2} from 'native-base'

const SplashScreen = () => {
    return (
        <View style={{flex :1, justifyContent: "center",alignItems :"center"}}>
            <H1>Tokoku</H1>
            <H2>Belanja Di Tokoku Saja</H2>
            <ActivityIndicator />
            <Text>loading ...</Text>
        </View>
    )
}

export default SplashScreen
