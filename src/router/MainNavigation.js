import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductRouter from '../screens/product/ProductRouter';
import CartScreen from '../screens/cart/CartScreen';
import TransactionRouter from '../screens/historyTransaction/TransactionRouter';
import Account from '../screens/account/Account';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='home' component={ProductRouter} /> 
            <Tab.Screen name='cart' component={CartScreen} /> 
            <Tab.Screen name='history' component={TransactionRouter} /> 
            <Tab.Screen name='account' component={Account} /> 
        </Tab.Navigator>
    )
}

export default MainNavigation
