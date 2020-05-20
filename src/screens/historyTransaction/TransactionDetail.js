import React, { useEffect, useState } from 'react'
import { View, Alert, findNodeHandle } from 'react-native'
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
    const [nomor,setNomor] = useState(null)
    const [nama,setNama] = useState(null)
    const [pay_image,setImage] = useState(null) 
    const [status , setStatus] = useState(props.route.params.status)
    // console.log(status)

    useEffect(() => {
        getData();
        setAddress(DataAddress)
    }, [])

    const onUploadClick = () => {
        ImagePicker.showImagePicker({title : "Select Your Image"},(response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                const source = { uri: response.uri , type : response.type, name : response.fileName};
                console.log(source)
                setImage(source)
              }
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
                <ListItem key={val.id} avatar>
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


    const onConfirmPayment = () => {
        if(pay_image && nama && nomor){
            const fd = new FormData()
            let dataTrans = {no_rek : nomor,nama : nama}
            dataTrans = JSON.stringify(dataTrans)

            fd.append('pay_image',pay_image)
            fd.append('data',dataTrans)

            Axios.post(API_URL + "transaction/payment/" + props.route.params.transaction_id,fd)
            .then((res) => {
                if(!res.data.error){
                    Alert.alert('Success', res.data.message)
                    return setStatus(2)
                }else{
                    return Alert.alert('Error', res.data.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            return Alert.alert('Error','All Form Must be FIlled')
        }
    }

    if(data === null || address === null) return <Loading/>

    return (
        <Container>
            <HeaderWithArrowBack onPressIcon={() => {
                props.route.params.onRefresh()
                props.navigation.goBack()
            
            } } 
                title='Detail Transaction' />
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
                    {
                        status === 1 ? 
                        <Card>
                            <CardItem header>
                                <Text>Payment Confirmation</Text>
                            </CardItem>
                            <CardItem>
                                <Content>
                                    <Form>
                                        <Item>
                                            <Input value={nomor} onChangeText={(text) => setNomor(text)} placeholder='Nomor Rekening' />
                                        </Item>
                                        <Item>
                                            <Input value={nama} onChangeText={(text) => setNama(text)} placeholder='Nama Rekening' />
                                        </Item>
                                            <Button onPress={onUploadClick} style={{marginTop:10}} full light iconRight>
                                                <Text>{pay_image !== null ? "image selected" : "Upload Bukti"}</Text>
                                                <Icon name='camera' />
                                            </Button>
                                    </Form>
                                </Content>
                            </CardItem>
                        </Card>
                        : status === 2 ?
                        <Card>
                            <CardItem header>
                                <Text>Your Payment Waiting for Approvement</Text>
                            </CardItem>
                        </Card>
                        : status === 3 ?
                        <Card>
                            <CardItem header>
                                <Text>On Packaging By Seller</Text>
                            </CardItem>
                        </Card>
                        :status === 4 ?
                        <Card>
                            <CardItem header>
                                <Text>On Delivery</Text>
                            </CardItem>
                        </Card>
                        :status === 5?
                        <Card>
                            <CardItem header>
                                <Text>Delivered</Text>
                            </CardItem>
                        </Card>
                        : status === 6 ?
                        <Card>
                            <CardItem header>
                                <Text>Success</Text>
                            </CardItem>
                        </Card>
                        :
                        <Card>
                            <CardItem header>
                                <Text>Error</Text>
                            </CardItem>
                        </Card>
                    }
                   
                </View>
            </Content>
            {
                status === 1 &&
                <Footer style={{paddingHorizontal: 20}}>
                    <Left>
                    </Left>
                    <Body>
                    </Body>
                    <Right>
                        <Button onPress={onConfirmPayment} full rounded light>
                            <Text>Confirm</Text>
                        </Button>
                    </Right>
                </Footer>
            }
        </Container>
    )
}

export default TransactionDetail
