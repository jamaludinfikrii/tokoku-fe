import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import MainNavigation from './MainNavigation'
import LoginRegisterRouter from './../screens/authentication/LoginRegisterRouter'
import { saveUserData } from '../redux/actions/userAction'
import SplashScreen from './../screens/authentication/SplashScreen'
import AsyncStorage from '@react-native-community/async-storage'
import OneSignal from 'react-native-onesignal';

const InitialRouter = (props) => {
    const [loading,setLoading] = useState(false)

    OneSignal.setLogLevel(6, 0);
    OneSignal.init("74b5282d-5f42-4905-a515-63f5350d27cb", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
    OneSignal.inFocusDisplaying(2);

    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);

    useEffect(() => {
        // window.addEventListener('mousemove', () => {});
        
        // returned function will be called on component unmount 
        return () => {
            OneSignal.removeEventListener('received', onReceived);
            OneSignal.removeEventListener('opened', onOpened);
            OneSignal.removeEventListener('ids', onIds);
        }
    }, [])

    const onReceived = (notification) => {
        console.log("Notification received: ", notification);
    }

    const onOpened = (openResult) => {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
    }

    const onIds = (device) => {
        console.log('Device info: ', device);
    }

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
