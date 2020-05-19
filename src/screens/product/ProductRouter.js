import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import ProductPage from './ProductPage'
import ProductDetail from './ProductDetail'


const Stack = createStackNavigator()
const ProductRouter = () => {
    return(
        <Stack.Navigator headerMode={()=> null}>
            <Stack.Screen name='productpage' component={ProductPage}/>
            <Stack.Screen name='productdetail' component={ProductDetail}/>
        </Stack.Navigator>
    )
}

export default ProductRouter