import React, { Component } from 'react'
import { View, Text } from 'native-base'
import HeaderWithArrowBack from '../../components/Header'
import Axios from 'axios'
import { API_URL } from '../../supports/constants/urlApi'
import { Button, Alert } from 'react-native'
import { connect } from 'react-redux'

class ProductDetail extends Component {

    state = {
        data : null,
        qty : 1
    }

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        console.log(this.props.route.params.id)
        Axios.get(API_URL + `product-detail/` + this.props.route.params.id) // id_product,id_user(mapStateToProps),qty(counter)
        .then((res)=>{
            console.log(res.data)
            this.setState({data : res.data.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onAddToCartPress = () => {
        let id_products  = this.props.route.params.id;
        let id_users = this.props.user.id
        let qty = this.state.qty;
        let data = {
            id_products : id_products,
            id_users : id_users,
            qty : qty,
            is_deleted : 0
        }
        Axios.post(API_URL + 'transaction/cart',data)
        .then((res) => {
            if(!res.data.error){
                Alert.alert("Success" , res.data.message)
            }
        })
        .catch((err) => {
            if(err) throw err
        })
        
    }

    

    render() {
        if (this.state.data === null){
            return(
                <Text>Loading ...</Text>
            )
        }
        return (
            <View>
                <HeaderWithArrowBack title='Product Detail' />
                <View>
                    <Text>{this.state.data[0].name}</Text>
                    <Text>{this.state.data[0].price}</Text>
                    <Text>{this.state.data[0].description}</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Button onPress={() => this.state.qty !== 1 && this.setState({qty:this.state.qty-1})} title='-' />
                        <Text style={{marginHorizontal:10}}>{this.state.qty}</Text>
                        <Button onPress={() => this.setState({qty:this.state.qty+1})} title='+' />
                    </View>
                    <View style={{justifyContent : "flex-start",flexDirection:"row",marginTop:10}}>
                        <Button onPress={this.onAddToCartPress} title='Add To Cart' />
                    </View>

                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user : state.user
    }
}

export default connect(mapStateToProps)(ProductDetail);