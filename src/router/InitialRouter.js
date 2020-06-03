import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import MainNavigation from './MainNavigation'
import LoginRegisterRouter from './../screens/authentication/LoginRegisterRouter'
import { saveUserData } from '../redux/actions/userAction'
import SplashScreen from './../screens/authentication/SplashScreen'
import AsyncStorage from '@react-native-community/async-storage'
const InitialRouter = (props) => {
    const [loading,setLoading] = useState(false)


    useEffect( () => {
        setLoading(true)
        AsyncStorage.getItem('data_user', (err,result) => {
            if(err) console.log(err)
            if(result){
                var data = JSON.parse(result)
                props.saveUserData(data)
                setLoading(false)
            }else{
                setLoading(false)
            }
        })
        
    }, [] )

    if(loading) return <SplashScreen />
    return props.user ? <MainNavigation /> : <LoginRegisterRouter />
}
const mapStateToProps = (state) => {
    return {
        user : state.user
    }
}
export default connect(mapStateToProps,{saveUserData})(InitialRouter)
