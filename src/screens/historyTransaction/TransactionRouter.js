import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import HistoryTransaction from './HistoryTransaction'
import TransactionDetail from './TransactionDetail'

const Stack = createStackNavigator()
const TransactionRouter = () => {
    return (
        <Stack.Navigator headerMode={() => null}>
            <Stack.Screen name='history' component={HistoryTransaction}/>
            <Stack.Screen name='history-detail' component={TransactionDetail}/>
        </Stack.Navigator>
    )
}

export default TransactionRouter
