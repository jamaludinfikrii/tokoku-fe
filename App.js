import React from 'react'
import { View, Text } from 'react-native'
import CartScreen from './src/screens/cart/CartScreen'
import HistoryTransaction from './src/screens/historyTransaction/HistoryTransaction'
import TransactionRouter from './src/screens/historyTransaction/TransactionRouter'
import {NavigationContainer} from '@react-navigation/native'
import ProductPage from './src/screens/product/ProductPage'
import ProductRouter from './src/screens/product/ProductRouter'
import MainNavigation from './src/router/MainNavigation'
import LoginScreen from './src/screens/authentication/LoginScreen'
import RegisterScreen from './src/screens/authentication/RegsiterScreen'
import SplashScreen from './src/screens/authentication/SplashScreen'
const App = () => {
  return (
	<NavigationContainer>
    	<SplashScreen/>
    </NavigationContainer>
  )
}

export default App
