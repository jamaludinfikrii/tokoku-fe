import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Container, Content, List, ListItem, Left,Text, Body, Right } from 'native-base'
import HeaderWithArrowBack from '../../components/Header'
import Axios from 'axios'
import { API_URL } from '../../supports/constants/urlApi'
import Loading from '../../components/Loading'

const TransactionDetail = (props) => {
    const [data,setData] = useState(null)

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        console.log(props.route.params.transaction_id)
        Axios.get(API_URL + 'transaction/detail/' + props.route.params.transaction_id)
        .then((res) => {
            console.log(res.data)
            setData(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const renderDataToJsx = () => {
        return data.map((val) => {
            return(
                <ListItem key={val.id} avatar onPress={() => props.navigation.navigate('history-detail') }>
                    <Left>
                        <View style={{backgroundColor : "grey",height :40,width:40,borderRadius:25,justifyContent:'center',alignItems:'center'}} >
                            <Text style={{color : "white"}}>
                                {val.qty}
                            </Text>
                        </View>
                    </Left>
                    <Body>
                        <Text>{val.product_name}</Text>
                        <Text note>Rp. {val.product_price}</Text>
                    </Body>
                    <Right>
                        <Text note>total : {val.product_price * val.qty}</Text>
                    </Right>
                </ListItem>
            )
        })
    }

    if(data === null) return <Loading/>

    return (
        <Container>
            <HeaderWithArrowBack onPressIcon={() => props.navigation.goBack() } title='Detail Transaction' />
            <Content>
                <List>
                    {renderDataToJsx()}
                </List>
            </Content>
        </Container>
    )
}

export default TransactionDetail
