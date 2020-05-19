import React, { Component } from 'react'
import { View, Text } from 'native-base'
import HeaderWithArrowBack from '../../components/Header'
import Axios from 'axios'
import { API_URL } from '../../supports/constants/urlApi'

export default class ProductDetail extends Component {

    state = {
        data : null
    }

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        console.log(this.props.route.params.id)
        Axios.get(API_URL + `product-detail/` + this.props.route.params.id)
        .then((res)=>{
            console.log(res.data)
            this.setState({data : res.data.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    renderData = () => {
        return this.state.data.map((val)=>{
            return(
                <View>
                    <Text>{val.name}</Text>
                    <Text>{val.price}</Text>
                    <Text>{val.description}</Text>
                </View>
            )
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
                {this.renderData()}
            </View>
        )
    }
}
