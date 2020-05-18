import React from 'react'
import { View, Text } from 'react-native'
import CartScreen from './src/screens/cart/CartScreen'
import HistoryTransaction from './src/screens/historyTransaction/HistoryTransaction'
import TransactionRouter from './src/screens/historyTransaction/TransactionRouter'
import {NavigationContainer} from '@react-navigation/native'
const App = () => {
  return (
    <NavigationContainer>
      <TransactionRouter />
    </NavigationContainer>
  )
}

export default App
