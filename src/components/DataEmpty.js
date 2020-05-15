import React from 'react'
import { View ,Image} from 'react-native'
import { H1 } from 'native-base'

const DataEmpty = (props) => {
    return (
        <View style={{justifyContent :"center",flex:1,alignItems:'center'}}>
            <H1>{props.title}</H1>

            <Image 
                source={require('./../supports/icons/shopping.png')}
                style={{height : 200,width:200,marginTop: 50}}

            />
        </View>
    )
}

export default DataEmpty
