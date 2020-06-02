import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import MainNavigation from './MainNavigation'
import LoginRegisterRouter from './../screens/authentication/LoginRegisterRouter'

const InitialRouter = (props) => {
    return props.user ? <MainNavigation /> : <LoginRegisterRouter />
}
const mapStateToProps = (state) => {
    return {
        user : state.user
    }
}
export default connect(mapStateToProps)(InitialRouter)
