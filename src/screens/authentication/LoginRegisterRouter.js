import React from 'react'
import { View, Text } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegsiterScreen'

const Stack = createStackNavigator()
const LoginRegisterRouter = () => {
    return (
        <Stack.Navigator headerMode={() => null}>
            <Stack.Screen name='login' component={LoginScreen} />
            <Stack.Screen name='register' component={RegisterScreen} />
        </Stack.Navigator>
    )
}

export default LoginRegisterRouter
