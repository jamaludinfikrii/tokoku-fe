import React from 'react'
import { View, Text,Button, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { clearUserData } from '../../redux/actions/userAction'
import { connect } from 'react-redux'
 
class Account extends React.Component{
    onPressHandler = () => {
        Alert.alert("Logout","Are You Sure Want to Logout?",[{text : "Cancel" }
        ,{text:'Yes',onPress:this.onLogoutHandler}])
    }

    onLogoutHandler = () => {
        AsyncStorage.removeItem('data_user',(err) => {
            if(err) console.log(err)
            this.props.clearUserData()
        })
        // clear async storage
        // clear global state
    }
    render(){
        return (
            <View style={{flex : 1,justifyContent : "center"}}>
                <View style={{marginHorizontal : 30}}>
                    <Button 
                        title='Logout'
                        onPress={this.onPressHandler}
                    />
                </View>
            </View>
        )
    }
}

export default connect(null , {clearUserData})(Account);
// export default Account;
