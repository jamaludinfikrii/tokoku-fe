import React from 'react'
import { View, Text } from 'react-native'
import { Container } from 'native-base'
import HeaderWithArrowBack from '../../components/Header'

const TransactionDetail = (props) => {
    return (
        <Container>
            <HeaderWithArrowBack onPressIcon={() => props.navigation.goBack() } title='Detail Transaction' />
            <Text>TransactionDetail</Text>
        </Container>
    )
}

export default TransactionDetail
