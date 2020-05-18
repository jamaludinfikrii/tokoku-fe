import React, { Component } from 'react'
import { Text, View, ActivityIndicator, Platform, Alert } from 'react-native'
import { Container, Header, Left, Button, Icon, Body, Right, Footer, Content, List, ListItem, Thumbnail } from 'native-base'
import HeaderWithArrowBack from '../../components/Header'
import Loading from '../../components/Loading'
import DataEmpty from '../../components/DataEmpty'
import Axios from 'axios'
import { API_URL } from '../../supports/constants/urlApi'


class CartScreen extends Component {
    state = {
        data:null,
        totalPrice : 0
    }

    componentDidMount(){
        this.getData()
    }

    createTwoButtonAlert = () =>
    Alert.alert(
      "Checkout",
      "Are You Sure Want to Chekout",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: this.onBayarClick }
      ],
      { cancelable: false }
    );

    totalPriceCount = () => {
        let total = 0
        this.state.data.forEach((val) => {
            total += (val.price * val.qty)
        })
        this.setState({totalPrice : total})
    }

    changeQtyOnState = (minorplus,index,qtyNow) => {
        let data = this.state.data
        data[index].qty = minorplus === 'min' ? Number(qtyNow) -1 : Number(qtyNow) + 1
        this.setState({data : data})
        this.totalPriceCount()
    }

    onChangeQtyHandler = (minorplus,id,qtyNow,index) => {
        let qtyUpdate;
        if(minorplus === 'min'){
            if(qtyNow === 1){
                return
            }
            qtyUpdate = Number(qtyNow) - 1
        }else{

            qtyUpdate = Number(qtyNow) + 1
        }

        Axios.patch(API_URL + "cart/" + id, {qty : qtyUpdate})
        .then((res) => {
            console.log(res.data)
            if(!res.data.error){
                this.changeQtyOnState(minorplus,index ,qtyNow)
                // this.getData()
            }else{
                console.log(res.data)
            }
        })
        .catch((err) => {
            console.log(err)
        })

    }

    getData = () => {
        Axios.get(API_URL + "cart/3")
        .then((res) => {
            if(!res.data.error){
                this.setState({data :res.data.data})
                this.totalPriceCount()
            }
            console.log(res.data)
        })
        .catch((err) => {
            return Alert.alert("Network Error, try again later")
            console.log(err)
        })
    }

    onBayarClick = () => {
        
        let dataTransaction = {
            total_transaction : this.state.totalPrice,
            total_item : this.state.data.length,
            status : 1,
            users_id : 3
        }
        let dataTransactionDetail = this.state.data.map((val) => {
            return {
                product_name : val.name,
                product_price : val.price,
                qty : val.qty
            }
        })

        Axios.post(API_URL + 'transaction',{dataTransaction,dataTransactionDetail})
        .then((res) => {
            if(!res.data.error){
                Alert.alert(res.data.message)
                this.setState({data : []})

            }
        })
    }

    renderDataToJsx = () => {
        return this.state.data.map((val,index) => {
            return (
                <ListItem key={index} thumbnail>
                    <Left>
                        <Thumbnail square source={{ uri:API_URL + val.url_image }} />
                    </Left>
                    <Body>
                        <Text>{val.name}</Text>
                        <Text note numberOfLines={1}>Rp . {val.price}</Text>
                    </Body>
                    <Right style={{flexDirection : "row",alignItems:"center"}}>
                        <Button onPress={() => this.onChangeQtyHandler('min',val.id,val.qty,index)} transparent>
                            <Text>-</Text>
                        </Button>
                        <Text style={{marginHorizontal : 10}}>
                            {val.qty}
                        </Text>
                        <Button onPress={() => this.onChangeQtyHandler('plus',val.id,val.qty,index)} transparent>
                            <Text>+</Text>
                        </Button>
                    </Right>
                </ListItem>
            )
        })
    }
    render() {
        if(this.state.data === null){
            return(
                <Container>
                    <HeaderWithArrowBack title='Cart Page' />
                    <Loading />
                </Container>
            )
        }
        if(this.state.data.length === 0){
            return(
                <Container>
                    <HeaderWithArrowBack 
                        title='Cart Page'
                    />
                    <DataEmpty 
                        title= 'Keranjang Masih Kosong'
                    />

                </Container>
            )
        }
        return (
            <Container>
                <HeaderWithArrowBack title='Cart Page' />
                <Content>
                    <List>
                        {this.renderDataToJsx()}
                    </List>
                </Content>
                <Footer style={{paddingHorizontal: 20}}>
                    <Left>
                        <Text style={{color : Platform.OS==='ios' ? "black" : "white" }}>Rp. {this.state.totalPrice}</Text>
                    </Left>
                    <Body>
                    </Body>
                    <Right>
                        <Button onPress={this.createTwoButtonAlert} full rounded light>
                            <Text>Bayar</Text>
                        </Button>
                    </Right>
                </Footer>
            </Container>
        )
    }
}

export default CartScreen
