import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Container, Content, List, ListItem, Left,Text, Body, Right, Card, CardItem, Footer, Button, Input, Form, Item, Label, Icon } from 'native-base'
import HeaderWithArrowBack from '../../components/Header'
import Axios from 'axios'
import { API_URL } from '../../supports/constants/urlApi'
import Loading from '../../components/Loading'
import ImagePicker from 'react-native-image-picker';

const DataAddress = {
    address : "Jl. Titiran nomor 2, Bandung",
    note : "Samping Pos Ronda"
}


const TransactionDetail = (props) => {
    const [data,setData] = useState(null)
    const [address,setAddress] = useState(null)

    useEffect(() => {
        getData();
        setAddress(DataAddress)
    }, [])

    const onUploadClick = () => {
        ImagePicker.showImagePicker({title : "Select Your Image"},(response) => {
            console.log(response)
        })
    }

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

    if(data === null || address === null) return <Loading/>

    return (
        <Container>
            <HeaderWithArrowBack onPressIcon={() => props.navigation.goBack() } title='Detail Transaction' />
            <Content>
                <List>
                    {renderDataToJsx()}
                </List>
                <View style={{marginTop : 20,marginHorizontal:10}}>
                    <Card>
                        <CardItem header>
                            <Text>Alamat Pengiriman</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>Alamat : {address.address}</Text>
                                <Text>Note : {address.note}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </View>
                <View style={{marginTop : 20,marginHorizontal:10}}>
                    <Card>
                        <CardItem header>
                            <Text>Payment Confirmation</Text>
                        </CardItem>
                        <CardItem>
                            <Content>
                                <Form>
                                    <Item>
                                        <Input placeholder='Nomor Rekening' />
                                    </Item>
                                    <Item>
                                        <Input placeholder='Nama Rekening' />
                                    </Item>
                                        <Button onPress={onUploadClick} style={{marginTop:10}} full light iconRight>
                                            <Text>Upload Bukti</Text>
                                            <Icon name='camera' />
                                        </Button>
                                </Form>
                            </Content>
                        </CardItem>
                    </Card>
                </View>
            </Content>
            <Footer style={{paddingHorizontal: 20}}>
                <Left>
                </Left>
                <Body>
                </Body>
                <Right>
                    <Button full rounded light>
                        <Text>Confirm</Text>
                    </Button>
                </Right>
            </Footer>
        </Container>
    )
}

export default TransactionDetail
